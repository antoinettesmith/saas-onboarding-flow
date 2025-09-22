# 🧭 React Onboarding Progress Tracker

A comprehensive, multi-phase onboarding component built with **React** and **Tailwind CSS**. Features dynamic step layouts, progress tracking, and customizable workflows perfect for user onboarding, setup wizards, and multi-step processes.

## ✨ Features

- **Multi-Phase Workflow** – Organize complex processes into distinct phases  
- **Dynamic Step Layouts** – Different visualization styles for each phase  
- **Progress Tracking** – Visual progress bars and completion percentages  
- **Interactive Navigation** – Click to jump between phases and steps  
- **Responsive Design** – Works across desktop and mobile devices  
- **Modern Color Scheme** – Rose, amber, emerald, violet, and cyan theme
- **Step Grouping** – Special grouped layout for complex setup phases (Phase 3)
- **Completion Detection** – Automatic celebration of completion  

## 🚀 Live Demo

[View Live Prototype](https://saas-onboarding-flow.netlify.app/)

## 🎨 Color Scheme

The component uses a modern, vibrant color palette:
- **Primary Actions**: Rose (#e11d48)
- **Completion States**: Warm amber tones
- **Phase 3 Groups**:
  - Essential: Emerald (#059669)
  - Account: Violet (#8b5cf6) 
  - Final: Cyan (#06b6d4)

## 📸 Screenshots

- Phase Navigation with Progress Tracking  
<img width="2898" height="296" alt="image" src="https://github.com/user-attachments/assets/d779bbaf-21e6-4b09-826a-f3650cc13cec" />
- Standard Step Layout
<img width="1360" height="168" alt="image" src="https://github.com/user-attachments/assets/7a5eb55c-0eec-4ddb-9adf-855bc59e7e31" />
- Responsive Mobile Design
  
<img width="365" height="192" alt="image" src="https://github.com/user-attachments/assets/1e4e9b4f-aeb6-4f45-a8fa-f22585c0a8ef" />

- Completion Celebration State  
<img width="3024" height="2815" alt="image" src="https://github.com/user-attachments/assets/3e0802f8-1ce7-4430-8392-bb11edac21fa" />

## 🛠️ Development

### Netlify Setup (Recommended)

This project is optimized for a Netlify workflow:

1. **Fork/Clone** this repository on GitHub  
2. In **Netlify → Add new site → Import an existing project**  
3. Connect your GitHub account and select the repo  
4. **Build command:** `npm run build`  
5. **Publish directory:** `build`  
6. Add the following **Environment Variables** in your Netlify dashboard → *Site settings → Build & deploy → Environment*:  

   ```bash
   NODE_VERSION=20
   DISABLE_ESLINT_PLUGIN=true
````

7. Deploy 🚀

### Local Development

```bash
# Clone the repository
git clone https://github.com/antoinettesmith/saas-onboarding-flow.git
cd saas-onboarding-flow

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000` in your browser.

## 🚀 Deployment Options

### Deploy on Netlify (Easiest)

1. Push changes to your GitHub repo
2. In Netlify, **Trigger deploy → Clear cache and deploy site** when needed

**Manual deploy (alternative):**

```bash
npm run build
# Drag the generated /build folder into the Netlify dashboard (Sites → drag & drop)
```

**Netlify notes:**

* Recommended Node version: **LTS (Node 20)**
* Ensure environment variables are set (`NODE_VERSION`, `DISABLE_ESLINT_PLUGIN`)
* If Tailwind classes don’t appear, confirm `tailwind.config.js` includes:

  ```js
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"]
  ```

## 📦 Basic Implementation

```jsx
import OnboardingProgressTracker from './OnboardingProgressTracker';

function App() {
  return (
    <div className="App">
      <OnboardingProgressTracker />
    </div>
  );
}
```

## 🎨 Customization

### Custom Phase Configuration

```jsx
const customPhases = [
  {
    name: "Getting Started",
    description: "Initial setup and account creation",
    steps: [
      { name: "Create Account", completed: false },
      { name: "Verify Email", completed: false },
      { name: "Set Password", completed: false },
    ],
  },
  // Add more phases...
];
```

### Color Themes

```js
const customColors = {
  purple: "#e11d48", // Rose-600 - Primary Action
  lightGreen: "#fef3c7", // Amber-100 - Completion Indicator  
  darkGreen: "#b45309", // Amber-700 - Success State
  borderGreen: "#b45309", // Border for completed states
  checkmarkGreen: "#b45309",

  // Phase 3 group colors
  essential: "#059669", // Emerald-600
  account: "#8b5cf6", // Violet-500
  final: "#06b6d4", // Cyan-500
};
```

### Phase Types

* **Standard Phases** – Traditional step-by-step layout in rows
* **Grouped Phases** – Horizontal flow with categorized step groups (Phase 3)

## 🏗️ Technical Details

### Built With

* **React** – Component framework with hooks (useState)
* **Tailwind CSS** – Utility-first CSS framework
* **Create React App** – Build tool and development server
* **Modern JavaScript** – ES6+ features

### Component Architecture

```
OnboardingProgressTracker/
├── Phase Navigation Bar
├── Progress Tracking System
├── Dynamic Step Renderers
│   ├── Standard Layout (Phases 1,2,4)
│   └── Grouped Layout (Phase 3)
├── Current Step Panel
├── Interactive Step Content
└── Completion Celebration
```

### State Management

* **Phase Tracking** – Active phase and navigation
* **Step Progress** – Individual step completion status
* **UI State** – Hover effects, active steps, step indices

### Project Structure

```
src/
├── App.jsx
├── OnboardingProgressTracker.jsx  # Main component
├── index.js                       # React entry point
└── index.css                      # Global styles

public/
├── index.html
└── ...

package.json                       # Dependencies & scripts
README.md                          # This file
```

## 🧪 Testing

The component includes interactive testing:

* Click phase buttons to navigate
* Click step circles to jump between steps
* Use "CONTINUE" buttons to complete steps
* Test completion celebration

For automated testing:
Automated testing can be added via tools like Jest or React Testing Library. For now, use the interactive demo to test behavior.

## 🌟 Key Features in Detail

### Multi-Phase Navigation

* Visual phase selector with progress indicators
* Hover tooltips with phase descriptions
* Color-coded completion states

### Dynamic Step Layouts

* **Phases 1,2,4**: Traditional grid layout with numbered circles
* **Phase 3**: Horizontal flow with grouped categories

### Progress Tracking

* Real-time completion percentages
* Visual progress bars with smooth animations
* Step-by-step advancement

### Interactive Elements

* Clickable step navigation
* Form inputs and dropdowns
* Skip/Continue button actions

## 📄 License

This project is licensed under the MIT License – feel free to use it in your own projects!

## 🤝 Contributing

1. Fork the GitHub repository
2. Make your improvements
3. Test thoroughly
4. Submit a pull request
