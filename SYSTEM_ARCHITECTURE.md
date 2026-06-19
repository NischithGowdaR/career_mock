# 🏗️ Career-Mock System Architecture

## System Overview

The Career-Mock platform is a distributed, three-tier AI-powered interview system with multiple integrated services. Below is a comprehensive breakdown of the system architecture.

---

## 📊 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│  Recruiter Dashboard  │  Candidate Portal  │  Admin Dashboard        │
│  (React/Next.js)      │  (React/Next.js)   │  (React/Next.js)        │
└───────────┬─────────────────────────┬───────────────────────────────┘
            │                         │
            │                         │
┌───────────▼─────────────────────────▼─────────────────────────────────┐
│                    API LAYER (Next.js Backend)                         │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Auth Routes  │  │ Interview    │  │ AI Feedback  │  │ Razorpay  │ │
│  │ (Supabase)   │  │ Management   │  │ Routes       │  │ Routes    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └───────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ Create Room  │  │ AI Model     │  │ Webhooks     │               │
│  │ (Daily.co)   │  │ Routes       │  │ (Admin)      │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└────┬─────────────────┬──────────────────┬──────────────┬──────────────┘
     │                 │                  │              │
     │                 │                  │              │
┌────▼────┐    ┌──────▼─────┐   ┌──────▼────┐  ┌──────▼──────┐
│Supabase  │    │ VAPI Voice │   │ Grok AI   │  │  Razorpay   │
│• Auth    │    │ • Call Mgmt│   │• Questions│  │  • Payments │
│• Database│    │• Recording │   │• Feedback │  │• Webhooks   │
│• Storage │    │• Analytics │   │• Analysis │  │             │
└──────────┘    └────────────┘   └───────────┘  └─────────────┘

     ┌────────────────────────────┐
     │    Daily.co (Video Rooms)  │
     │    • Live Interview Space  │
     │    • Recording & Streaming │
     └────────────────────────────┘
```

---

## 🔄 Data Flow Architecture

```
RECRUITER FLOW:
┌──────────────────┐
│ Create Interview │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Grok AI Question Generation     │
│ (Send context to AI)            │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Store Interview in Supabase DB  │
│ (Questions, Config)             │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Generate Interview Link         │
│ (Share with Candidate)          │
└─────────────────────────────────┘


CANDIDATE FLOW:
┌──────────────────┐
│ Start Interview  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│ Create Daily.co Room         │
│ (Candidate joins room)       │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ VAPI Voice AI Interaction    │
│ • AI asks questions          │
│ • Candidate responds         │
│ • Voice analyzed            │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Interview Completed          │
│ • Recording saved            │
│ • Data transferred to Grok AI│
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Grok AI Feedback Generation  │
│ • Analyze responses          │
│ • Score candidate            │
│ • Generate insights          │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Store Results in Supabase    │
│ • Scores                     │
│ • Feedback                   │
│ • Performance metrics        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Recruiter Dashboard Updated  │
│ • View candidate performance │
│ • AI insights visible        │
└──────────────────────────────┘
```

---

## 📁 Component Breakdown

### 1. **Frontend Layer (React/Next.js)**

**Components:**
- **Recruiter Dashboard**
  - Interview creation interface
  - Scheduling system
  - Performance analytics
  - Candidate feedback viewer
  - Credit management

- **Candidate Portal**
  - Interview list
  - Interview start interface
  - Live interview room (Daily.co embedded)
  - Results and feedback view

- **Admin Dashboard**
  - User management
  - Interview monitoring
  - Credit management
  - Ban/delete user controls
  - System analytics

**Technologies:**
- React.js / Next.js
- TypeScript
- Tailwind CSS / shadcn/ui
- Context API (State management)

---

### 2. **API Layer (Next.js Backend)**

**API Routes:**

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/` | POST/GET | Authentication via Supabase |
| `/api/create-interview/` | POST | Interview creation with Grok AI |
| `/api/ai-feedback/` | POST | Process AI feedback from VAPI |
| `/api/ai-model/` | POST/GET | Grok AI integration |
| `/api/create-daily-room/` | POST | Create Daily.co video room |
| `/api/razorpay/` | POST | Payment processing |
| `/api/razorpay-webhook/` | POST | Razorpay webhooks |
| `/api/admin/ban-user/` | POST | User management |

---

### 3. **External Services Integration**

#### **A. Supabase (Backend-as-a-Service)**
```
Database Schema:
├── users
│   ├── id (UUID)
│   ├── email
│   ├── role (recruiter/candidate/admin)
│   ├── auth_id (Supabase)
│   └── profile_data
│
├── interviews
│   ├── id (UUID)
│   ├── recruiter_id (FK)
│   ├── questions (JSON)
│   ├── scheduled_date
│   ├── status
│   └── room_id (Daily.co)
│
├── interview_results
│   ├── id (UUID)
│   ├── interview_id (FK)
│   ├── candidate_id (FK)
│   ├── score
│   ├── feedback (JSON)
│   ├── recording_url
│   └── timestamp
│
├── recruiter_credits
│   ├── recruiter_id (FK)
│   ├── total_credits
│   ├── used_credits
│   └── balance
│
└── admin_logs
    ├── action_id
    ├── action_type
    ├── user_id
    └── timestamp
```

**Services Used:**
- Authentication (Email, Google OAuth)
- PostgreSQL Database
- File Storage (for recordings)
- Real-time subscriptions

---

#### **B. VAPI (Voice AI)**
```
VAPI Integration Flow:
├── Call Management
│   ├── Initialize call session
│   ├── Pass interview questions
│   └── Handle call routing
│
├── Voice Analysis
│   ├── Tone detection
│   ├── Confidence scoring
│   ├── Fluency measurement
│   └── Clarity assessment
│
├── Recording Management
│   ├── Record conversation
│   ├── Upload to storage
│   └── Extract transcripts
│
└── Callback/Webhooks
    ├── Call completion
    ├── Recording ready
    └── Analysis results
```

---

#### **C. Grok AI (Question Generation & Analysis)**
```
Grok AI Integration:
├── Question Generation
│   ├── Receive job role/level
│   ├── Generate intelligent questions
│   ├── Customize difficulty level
│   └── Store in database
│
├── Candidate Analysis
│   ├── Receive interview data
│   ├── Analyze responses
│   ├── Generate performance scores
│   ├── Create feedback report
│   └── Provide hiring recommendations
│
└── Feedback Generation
    ├── Strengths identification
    ├── Improvement areas
    ├── Skill assessment
    └── Overall rating
```

---

#### **D. Daily.co (Video Conferencing)**
```
Daily.co Integration:
├── Room Creation
│   ├── Generate unique room URL
│   ├── Set room permissions
│   └── Configure recording settings
│
├── Interview Session
│   ├── Embed video component
│   ├── Manage participant access
│   └── Handle connection issues
│
└── Recording & Playback
    ├── Auto-record sessions
    ├── Store recordings
    └── Provide playback URLs
```

---

#### **E. Razorpay (Payment Processing)**
```
Razorpay Integration:
├── Payment Processing
│   ├── Create payment orders
│   ├── Handle payment gateway
│   └── Manage transaction logs
│
├── Webhook Management
│   ├── Payment success callback
│   ├── Payment failure handling
│   ├── Update recruiter credits
│   └── Send notifications
│
└── Credit System
    ├── Add credits on payment
    ├── Deduct credits on interview creation
    └── Maintain credit history
```

---

### 4. **Authentication Flow**

```
┌─────────────────────────────────────────────────────┐
│              USER AUTHENTICATION                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Candidate/Recruiter/Admin initiates login          │
│           │                                          │
│           ▼                                          │
│  ┌─────────────────────────────────────┐            │
│  │ Multiple Auth Options:              │            │
│  │ • Email & Password (Supabase)       │            │
│  │ • Google OAuth (Supabase)           │            │
│  │ • LinkedIn OAuth (Optional)         │            │
│  └────┬────────────────────────────────┘            │
│       │                                              │
│       ▼                                              │
│  ┌─────────────────────────────────────┐            │
│  │ Supabase Authenticates Credentials  │            │
│  │ • Verify email/password             │            │
│  │ • Validate OAuth token              │            │
│  └────┬────────────────────────────────┘            │
│       │                                              │
│       ▼                                              │
│  ┌─────────────────────────────────────┐            │
│  │ Create JWT Token                    │            │
│  │ • Store user role                   │            │
│  │ • Set expiration (24-48 hours)      │            │
│  └────┬────────────────────────────────┘            │
│       │                                              │
│       ▼                                              │
│  ┌─────────────────────────────────────┐            │
│  │ Return Auth Context                 │            │
│  │ • Token stored in localStorage      │            │
│  │ • Redirect to dashboard             │            │
│  │ • Set user context                  │            │
│  └─────────────────────────────────────┘            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

### 5. **Role-Based Access Control (RBAC)**

```
┌────────────────────────────────────────────────────────┐
│                  RECRUITER (role: recruiter)           │
├────────────────────────────────────────────────────────┤
│ ✓ Create interviews                                    │
│ ✓ Schedule interviews                                  │
│ ✓ Generate candidate links                            │
│ ✓ View all scheduled interviews                       │
│ ✓ View candidate performance                          │
│ ✓ Access AI-based feedback                            │
│ ✓ Manage recruiter credits                            │
│ ✗ View other recruiter's data                         │
│ ✗ Access admin panel                                  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                 CANDIDATE (role: candidate)            │
├────────────────────────────────────────────────────────┤
│ ✓ View assigned interviews                            │
│ ✓ Start interview                                     │
│ ✓ Attend live interview                               │
│ ✓ View personal performance & feedback                │
│ ✓ Upload CV/Resume                                    │
│ ✓ View profile                                        │
│ ✗ Create interviews                                   │
│ ✗ View other candidate's data                         │
│ ✗ Access admin/recruiter features                     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                  ADMIN (role: admin)                   │
├────────────────────────────────────────────────────────┤
│ ✓ Monitor all users                                   │
│ ✓ View all interviews                                 │
│ ✓ Manage recruiter credits                            │
│ ✓ Ban/delete users                                    │
│ ✓ Delete interviews                                   │
│ ✓ View system analytics                               │
│ ✓ Access all audit logs                               │
│ ✓ Configure system settings                           │
└────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Architecture

### Authentication & Authorization
- **Supabase Auth**: Secure authentication with JWT tokens
- **Row-Level Security (RLS)**: Database policies for role-based access
- **Environment Variables**: Sensitive data stored securely
- **HTTPS Only**: All API calls encrypted

### Data Protection
- **Encryption**: Sensitive data encrypted at rest
- **Recording Security**: Interview recordings stored securely
- **User Privacy**: PII protected with proper consent

### API Security
- **Rate Limiting**: Prevent abuse
- **CORS Configuration**: Restrict cross-origin requests
- **Input Validation**: Sanitize all inputs
- **SQL Injection Prevention**: Use parameterized queries

---

## 🚀 Deployment Architecture

```
┌──────────────────────────────────────┐
│         Vercel Deployment            │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Edge Functions (API Routes)   │ │
│  │  • Serverless execution        │ │
│  │  • Auto-scaling                │ │
│  │  • Geographic distribution     │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Static Site Generation (SSG)  │ │
│  │  • Pre-rendered pages          │ │
│  │  • CDN distribution            │ │
│  │  • Fast load times             │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Environment Variables         │ │
│  │  • Supabase keys               │ │
│  │  • VAPI credentials            │ │
│  │  • Grok AI API keys            │ │
│  │  • Razorpay credentials        │ │
│  └────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│     External Services Connections    │
│  • Supabase Cloud                    │
│  • VAPI Cloud                        │
│  • Grok AI API                       │
│  • Daily.co Cloud                    │
│  • Razorpay Cloud                    │
└──────────────────────────────────────┘
```

---

## 📊 Database Schema Summary

### Key Tables

1. **users** - All users (recruiters, candidates, admins)
2. **interviews** - Interview configurations and metadata
3. **interview_results** - Candidate performance and feedback
4. **recruiter_credits** - Credit tracking for recruiters
5. **payments** - Payment transaction records
6. **admin_logs** - Audit logs for admin actions

---

## 🔄 Interview Lifecycle

```
1. CREATION
   Recruiter creates interview → Grok AI generates questions → Store in DB

2. SCHEDULING
   Set date/time → Generate unique link → Share with candidate

3. EXECUTION
   Candidate joins → Daily.co room created → VAPI voice interaction begins

4. RECORDING
   Interview recorded → Transcript generated → Data stored

5. ANALYSIS
   Grok AI analyzes responses → Generate scores and feedback → Update dashboard

6. REPORTING
   Recruiter reviews results → Make hiring decisions → Archive interview
```

---

## 🛠️ Tech Stack Summary

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js, Next.js, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth (Email, OAuth) |
| **Voice AI** | VAPI |
| **AI Analysis** | Grok AI |
| **Video** | Daily.co |
| **Payments** | Razorpay |
| **Hosting** | Vercel |
| **File Storage** | Supabase Storage |

---

## 📈 Scalability Considerations

1. **Database Optimization**
   - Indexing on frequently queried fields
   - Connection pooling with Supabase

2. **API Optimization**
   - Caching strategies
   - Rate limiting
   - Load balancing (Vercel handles)

3. **Storage Optimization**
   - Compress recordings
   - Archive old data
   - CDN distribution

4. **Real-time Updates**
   - Supabase real-time subscriptions
   - WebSocket connections

---

## 🔍 Monitoring & Analytics

- **Error Tracking**: Sentry integration (recommended)
- **Performance Monitoring**: Vercel Analytics
- **User Analytics**: Mixpanel or similar
- **Interview Metrics**: Custom dashboards
- **System Health**: Uptime monitoring

---

## 🚦 API Rate Limits & Quotas

- Interview Creation: Limited by recruiter credits
- VAPI Calls: Based on plan
- Grok AI Queries: API tier dependent
- Daily.co Rooms: Concurrent room limit
- Razorpay: Standard payment gateway limits

