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

[View Live Prototype](https://n4ngyf.csb.app/) <!-- Replace with your actual deployed URL -->

## 🎨 Color Scheme

The component uses a modern, vibrant color palette:
- **Primary Actions**: Rose (#e11d48)
- **Completion States**: Warm amber tones
- **Phase 3 Groups**:
  - Essential: Emerald (#059669)
  - Account: Violet (#8b5cf6) 
  - Final: Cyan (#06b6d4)

## 📸 Screenshots

<!-- Add screenshots of your component here -->
- Phase Navigation with Progress Tracking
<img width="1512" alt="Phase Navigation with Progress Tracking" src="https://github.com/user-attachments/assets/bfd98f3b-0598-4574-9c46-028407f54e12"/>
- Standard Step Layout (Phases 1, 2, 4)
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/a46bdcc1-de05-4ea5-8744-d7c63f58432b"/>
- Grouped Horizontal Layout (Phase 3)
<img width="1509" alt="Standard Step Layout 2" src="https://github.com/user-attachments/assets/6a018ade-386e-49c0-b06b-224b606ad5e7"/>
- Completion Celebration State
<img width="1512" alt="Completion Celebration State" src="https://github.com/user-attachments/assets/33f1db88-f673-47f7-a93c-1ce4939ce01a" />


## 🛠️ Development

### CodeSandbox Setup (Recommended)
This project is optimized for CodeSandbox development:

1. Fork this CodeSandbox
2. Make your modifications
3. Deploy directly from CodeSandbox using the "Deploy" button

### Local Development
If you prefer local development:

```bash
# Clone the repository
git clone https://github.com/antoinettesmith/Onboarding-Tracker-UI.git
cd Onboarding-Tracker-UI

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000` in your browser.

## 🚀 Deployment Options

### From CodeSandbox (Easiest)
1. Click the **"Deploy"** button in your CodeSandbox
2. Choose **"Deploy to Vercel"** or **"Deploy to Netlify"**
3. Sign in and deploy instantly

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Drag build folder to netlify.com
```


### Basic Implementation
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

## 🎨 Customization

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
- **Standard Phases** – Traditional step-by-step layout in rows  
- **Grouped Phases** – Horizontal flow with categorized step groups (Phase 3)

## 🏗️ Technical Details

### Built With
- **React** – Component framework with hooks (useState)
- **Tailwind CSS** – Utility-first CSS framework
- **Create React App** – Build tool and development server
- **Modern JavaScript** – ES6+ features

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
- **Phase Tracking** – Active phase and navigation
- **Step Progress** – Individual step completion status
- **UI State** – Hover effects, active steps, step indices

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
README.md                         # This file
```

## 🧪 Testing

The component includes interactive testing:
- Click phase buttons to navigate
- Click step circles to jump between steps
- Use "CONTINUE" buttons to complete steps
- Test completion celebration

For automated testing:
Automated testing can be added via tools like Jest or React Testing Library. For now, use the interactive demo to test behavior.

## 🌟 Key Features in Detail

### Multi-Phase Navigation
- Visual phase selector with progress indicators
- Hover tooltips with phase descriptions
- Color-coded completion states

### Dynamic Step Layouts
- **Phases 1,2,4**: Traditional grid layout with numbered circles
- **Phase 3**: Horizontal flow with grouped categories

### Progress Tracking
- Real-time completion percentages
- Visual progress bars with smooth animations
- Step-by-step advancement

### Interactive Elements
- Clickable step navigation
- Form inputs and dropdowns
- Skip/Continue button actions

## 📄 License

This project is licensed under the MIT License – feel free to use it in your own projects!

## 🤝 Contributing

1. Fork the CodeSandbox or GitHub repository
2. Make your improvements
3. Test thoroughly
4. Submit a pull request
