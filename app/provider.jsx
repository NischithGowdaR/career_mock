"use client";

import React, { useEffect, useState, useContext, createContext } from "react";
import { supabase } from "@/services/supabaseClient";

// ✅ Create context here (no need for separate UserDetailContext file)
const UserDetailContext = createContext();

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CreateOrFetchUser();
  }, []);

  const CreateOrFetchUser = async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      console.warn("No authenticated user found:", authError?.message);
      return;
    }

    const currentUser = authData.user;
    const cleanEmail = currentUser.email?.toLowerCase();
    if (!cleanEmail) return;

    try {
      const { data: Users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (!Users) {
        const userRole = currentUser.user_metadata?.role || (typeof window !== "undefined" ? localStorage.getItem("pending_role") : null) || "candidate";
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || cleanEmail.split("@")[0],
              email: cleanEmail,
              picture: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              credits: 3,
              role: userRole,
              banned: false,
            },
          ])
          .select()
          .maybeSingle();

        if (insertError) {
          if (insertError.code === '23505') {
            const { data: reFetched } = await supabase
              .from("users")
              .select("*")
              .eq("email", cleanEmail)
              .maybeSingle();
            setUser(reFetched || null);
          } else {
            console.error("Error creating user:", insertError.message);
          }
          return;
        }

        setUser(newUser || null);
        console.log("✅ User created:", newUser);
      } else {
        if (currentUser.user_metadata?.role && currentUser.user_metadata.role !== Users.role) {
          await supabase
            .from("users")
            .update({ role: currentUser.user_metadata.role })
            .eq("email", cleanEmail);
          Users.role = currentUser.user_metadata.role;
        }
        setUser(Users);
        console.log("✅ Existing user:", Users);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // ✅ Add credit update logic
  const updateUserCredits = async (newCredits) => {
    if (!user?.email) return { success: false };

    const { error } = await supabase
      .from("users")
      .update({ credits: newCredits })
      .eq("email", user.email);

    if (error) {
      console.error("Credit update failed:", error);
      return { success: false, error };
    }

    setUser((prev) => ({ ...prev, credits: newCredits }));
    console.log("✅ Credits updated:", newCredits);
    return { success: true };
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser, updateUserCredits }}>
      {children}
    </UserDetailContext.Provider>
  );
}

// ✅ Default export (to match your working import)
export default Provider;

// ✅ Named hook export
export const useUser = () => useContext(UserDetailContext);
