# UserSphere 🌐

UserSphere is a premium, state-of-the-art random user profile explorer dashboard. Built using **React 19**, **Vite 8**, and styled with **custom Vanilla CSS** variables, it provides a gorgeous, glassmorphic dark-theme user experience. UserSphere enables real-time search, robust multi-criteria filtering, client-side sorting, dynamic analytics insights, and interactive profile cards.

All data is fetched dynamically from the [FreeAPI Random Users Endpoint](https://api.freeapi.app).

---

## ✨ Features

- **🎨 Glassmorphic Dark Aesthetics**: A beautiful, premium interface featuring smooth gradients, subtle glowing borders, backdrop filters (`backdrop-filter: blur`), custom scrollbars, and premium typography (`Plus Jakarta Sans`).
- **📊 Real-time Stats Dashboard**: Instantly computes and displays insights for the fetched user pool, including:
  - **Total Pool**: Total number of profiles fetched.
  - **Average Age**: Live-updated average age of the users.
  - **Gender Split**: Percentage breakdown of Male and Female profiles.
  - **Top Nationality**: The most frequent nationality represented in the current pool.
- **🔍 Instant Search Engine**: Real-time searching that matches against user names, locations (city, state, and country), and emails.
- **⚙️ Advanced Multi-Filtering**:
  - **Gender Filter**: Toggle between *All*, *Male*, or *Female* users.
  - **Dynamic Nationality Filter**: Automatically extracts unique nationalities present in the fetched pool to populate filter choices.
- **🔀 Smart Sorting Options**:
  - Alphabetical sorting (Name: A-Z / Z-A)
  - Age-based sorting (Youngest First / Oldest First)
- **🎴 Interactive User Cards**:
  - **Flag Emoji Generator**: Dynamically translates ISO country/nationality codes into correct flag emojis using Unicode code points.
  - **Click-to-Copy Data**: Seamlessly copy emails and phone numbers with quick, temporary "Copied" badge animations.
  - **Secured Credentials Drawer**: Clickable security drawer toggles to reveal/hide system credentials (username/password) with fluid layout animations and individual copy toggles.
- **⏳ Micro-animations & Loading States**: Sleek skeleton cards with custom CSS shimmers loading states, customized empty states for search misses, and robust error fallback cards with retry options.
- **📱 Fully Responsive**: Custom CSS grid and Flexbox layouts optimized for mobile, tablet, and ultra-wide desktop monitors.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 19](https://react.dev) (Functional Components, Hooks like `useState`, `useEffect`)
- **Build Tool / Bundler**: [Vite 8](https://vite.dev) (Fast HMR & build optimization)
- **Styling**: Vanilla CSS (Custom properties/variables, flexbox, grid, glassmorphic effects, custom `@keyframes` animations)
- **Icons**: [Lucide React](https://lucide.dev)
- **API DataSource**: [FreeAPI Public API](https://api.freeapi.app)

---

## 🚀 Getting Started

### Prerequisites

To run this project locally, ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Lohar-anil-01/Rando-user.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Rando-user
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running Locally

Launch the Vite local development server:
```bash
npm run dev
```
By default, the application will run at [http://localhost:5173](http://localhost:5173).

### Building for Production

Compile and optimize the assets for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Code Quality (Linting)

Check for code syntax issues and rules using ESLint:
```bash
npm run lint
```

---

## 📂 Project Structure

The project has a clean, component-driven structure:

```text
├── public/
│   └── favicon.svg           # Application logo icon
├── src/
│   ├── assets/               # Local images or static assets
│   ├── components/
│   │   └── Card.jsx          # Individual User Profile Card with toggle drawers & clipboard utilities
│   ├── App.css               # Page layout, dashboards, inputs, grid & media query overrides
│   ├── App.jsx               # Root component: API fetching, global state & core filter logic
│   ├── index.css             # Design tokens, variables, typography, keyframes & custom scrollbars
│   └── main.jsx              # Application entry point
├── eslint.config.js          # ESLint configuration rules
├── index.html                # HTML entry point (Plus Jakarta Sans font setup)
├── package.json              # Project scripts & dependencies
└── vite.config.js            # Vite configuration with React plugin
```

---

## 🔬 Component Breakdown

### 1. `App.jsx`
Responsible for the dashboard state machine and business logic:
- Handles loading, success, and error states during API fetch.
- Uses `AbortController` in `useEffect` to safely handle component unmounting and prevent memory leaks.
- Dynamically computes user stats (average age, female-to-male ratio, and top nationality) on the fly.
- Filters and sorts the users array client-side according to inputs from the controls panel.

### 2. `Card.jsx`
Renders an individual user's profile card using modern micro-interactions:
- Converts ISO country codes (e.g., `IN`, `US`, `GB`) into emoji flags (🇮🇳, 🇺🇸, 🇬🇧) programmatically.
- Uses the `navigator.clipboard` API to write values to the user clipboard.
- Provides interactive visual feedback showing a temporary checkmark and "Copied" alert when copying.
- Implements an accordion drawer for user login credentials, revealing details using fluid CSS transitions.

### 3. `index.css` & `App.css`
Contains the styling system:
- Defines the color tokens (indigos, violets, dark-glass variants, error roses, and emerald greens).
- Utilizes CSS radial-gradients and backdrop-filters to achieve a premium UI aesthetic.
- Employs fluid keyframe-based animations (`fadeIn`, `pulse-glow`, `shimmer`, `spin`).

----
