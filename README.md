# MirrorMind — Your Magical Mental Companion

Welcome to MirrorMind, a Harry Potter–themed AI-powered journaling assistant.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd mirror-mind
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Firebase and Gemini API keys. You can use `.env.example` as a template.

    ```
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    ...

    # Gemini API Key
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the magic happen.

### ✨ Features

-   Firebase Authentication
-   AI-powered journaling with Gemini
-   Magical chat companion ("The Mirror")
-   Mood tracking and data visualization
-   Harry Potter–themed UI/UX

### 🔧 Tech Stack

-   Next.js (React)
-   Firebase (Auth, Firestore)
-   Gemini Pro API
-   Framer Motion
-   Recharts
-   Tailwind CSS