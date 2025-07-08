# ![Ed-Cred Logo](./client/public/images/logo.png)  
# **Ed-Cred**

> **Your Trusted Platform for Honest Feedback**  
> With stellar one-click reports and unmatched support, see how Ed-Cred will make a difference in your community.

> ⚠️ **Note:** This project is currently under construction.

---

## 🧩 Introduction

**Ed-Cred** is a feedback-driven platform allowing users to review and rate international schools, staff, districts, teachers, and leadership. It also includes forums, posts, and user interactions to foster a transparent and engaged educational community.

### 🎯 Purpose
- To provide a space for users to offer authentic feedback on educational institutions and their staff.
  
### 📌 Scope
- Users can **read**, **add**, and **manage feedback**.
- Social features like **forums** and **posts** to encourage discussion.
- Admins can **moderate and approve** feedback to maintain quality.

### 👥 Audience
- Parents, students, and community members seeking to share or view educational experiences.

---

## ⚙️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/shahroozdev/ed-cred-live.git
cd ed-cred

# Install dependencies
npm install

# Run development server
npm run dev
```

### 🛠️ Prerequisites
- Node.js
- npm
- PostgreSQL

### 🔧 Configuration
- Create a `.env` file in the root directory.
- Add the following variables:

### Database
DATABASE_URL=your_postgres_connection_url

### Stripe
STRIPE_SECRET_KEY=your_stripe_secret

### Any other variables

- Create a `.env.local` file in the root directory.
- Add the following variables:
### Stripe
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

## Flow
* After submitting the feedback admin must have to approve
* Complete the user/dashboard page like https://www.yelp.com/search
* Single review page needs to be finished
* Focus on UI/UX 

## Features

- Authentication with NextAuth
- SSR & SSG hybrid pages
- Dynamic routing with App Router
- Responsive UI with Tailwind CSS
- API routes for backend logic
- Stripe payment integration

## Tech Stack

**Frontend:** Next.js, React, Tailwind CSS  
**Backend:** Next.js API Routes / NestJS  
**Database:** PostgreSQL 
**Payments:** Stripe  

# A projec by
# ![M Shahrooz Altaf](https://shahroozdev.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75)  