import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  AreaChart,
} from "recharts";
import { useState, useEffect } from "react";

export default function OnboardingProgressTracker() {
  const customColors = {
    purple: "#6b65ff",
    lightGreen: "#d2ff66",
    darkGreen: "#00785d",
    borderGreen: "#00785d",
    checkmarkGreen: "#00785d",
    // New colors for the Platform Setup phase groups
    essential: "#6b65ff",
    account: "#4299e1",
    final: "#9061f9",
  };

  const analysisGroupMeta = {
    current: {
      label: "Current Setup",
      color: "#6b65ff",
      bg: "bg-indigo-50",
      text: "text-indigo-800",
      shadow: "rgba(107, 101, 255, 0.2)",
    },
    company: {
      label: "Our Recommendation",
      color: "#4299e1",
      bg: "bg-blue-50",
      text: "text-blue-800",
      shadow: "rgba(66, 153, 225, 0.2)",
    },
    next: {
      label: "What's Next?",
      color: "#9061f9",
      bg: "bg-purple-50",
      text: "text-purple-800",
      shadow: "rgba(144, 97, 249, 0.2)",
    },
  };

  const phases = [
    {
      name: "Getting Started",
      description:
        "These initial tasks help us obtain ad partner approvals and gather information for your Initial Assessment.",
      steps: [
        { name: "Connect Your Analytics Tool", completed: false },
        { name: "Data Integration", completed: false },
        { name: "Account Permissions & Access", completed: false },
      ],
    },
    {
      name: "Initial Assessment",
      description:
        "Once the Getting Started phase is complete and your approvals are in, we'll send over your Initial Assessment along with personalized recommendations.",
      steps: [
        {
          name: "Current Configuration",
          group: "Current Setup",
          completed: false,
        },
        {
          name: "Performance Analysis",
          group: "Current Setup",
          completed: false,
        },
        {
          name: "Recommended Setup",
          group: "Our Recommendation",
          completed: false,
        },
        {
          name: "Implementation Plan",
          group: "Our Recommendation",
          completed: false,
        },
        {
          name: "Performance Projections",
          group: "Our Recommendation",
          completed: false,
        },
        { name: "Next Steps", group: "Next", completed: false },
      ],
    },
    {
      name: "Platform Setup",
      description:
        "After you approve your review, we'll guide you through a few final steps to prepare your account for install.",
      steps: [
        {
          id: 1,
          name: "Integration Setup",
          group: "essential",
          completed: false,
        },
        {
          id: 2,
          name: "System Access Configuration",
          group: "essential",
          completed: false,
        },
        {
          id: 3,
          name: "Compliance Review",
          group: "essential",
          completed: false,
        },
        {
          id: 4,
          name: "Identity Verification",
          group: "account",
          completed: false,
        },
        {
          id: 5,
          name: "Billing Information",
          group: "account",
          completed: false,
        },
        {
          id: 6,
          name: "Terms and Conditions",
          group: "final",
          completed: false,
        },
      ],
    },
    {
      name: "Final Review",
      description:
        "We're nearing your install date! We'll complete one more Initial Assessment to check for any changes in site data or ad performance.",
      steps: [
        {
          name: "Current Configuration",
          group: "Current Setup",
          completed: false,
        },
        {
          name: "Performance Analysis",
          group: "Current Setup",
          completed: false,
        },
        {
          name: "Final Recommendations",
          group: "Our Recommendation",
          completed: false,
        },
        {
          name: "Implementation Confirmation",
          group: "Our Recommendation",
          completed: false,
        },
        {
          name: "Performance Projections",
          group: "Our Recommendation",
          completed: false,
        },
        { name: "Launch Preparation", group: "Next", completed: false },
      ],
    },
  ];

  ///
  const RevenueGrowthCharts = () => {
    const [activeChart, setActiveChart] = useState("initial");

    // Initial Assessment Data
    const initialProjectionData = [
      { month: "Current", current: 2500, projected: 2500, engagement: 4.2 },
      { month: "Month 1", current: 2500, projected: 3200, engagement: 5.1 },
      { month: "Month 2", current: 2500, projected: 4100, engagement: 5.8 },
      { month: "Month 3", current: 2500, projected: 5200, engagement: 6.3 },
      { month: "Month 4", current: 2500, projected: 6100, engagement: 6.8 },
      { month: "Month 5", current: 2500, projected: 6800, engagement: 7.2 },
      { month: "Month 6", current: 2500, projected: 7000, engagement: 7.5 },
    ];

    // Final Assessment Data (slightly improved baseline)
    const finalProjectionData = [
      { month: "Current", current: 2650, projected: 2650, engagement: 4.4 },
      { month: "Month 1", current: 2650, projected: 3400, engagement: 5.2 },
      { month: "Month 2", current: 2650, projected: 4300, engagement: 6.0 },
      { month: "Month 3", current: 2650, projected: 5400, engagement: 6.5 },
      { month: "Month 4", current: 2650, projected: 6300, engagement: 7.0 },
      { month: "Month 5", current: 2650, projected: 7000, engagement: 7.4 },
      { month: "Month 6", current: 2650, projected: 7400, engagement: 7.8 },
    ];

    // Revenue Per View Data
    const revenuePerViewData = [
      { metric: "Revenue Per View", current: 0.003, target: 0.008 },
      { metric: "Brand Partnerships", current: 2, target: 6 },
      { metric: "Engagement Rate", current: 4.2, target: 7.5 },
    ];

    const finalRevenuePerViewData = [
      { metric: "Revenue Per View", current: 0.0032, target: 0.008 },
      { metric: "Brand Partnerships", current: 2, target: 6 },
      { metric: "Engagement Rate", current: 4.4, target: 7.8 },
    ];

    const formatCurrency = value => `$${value.toLocaleString()}`;
    const formatPercentage = value => `${value}%`;
    const formatDecimal = value =>
      value < 1 ? `$${value.toFixed(4)}` : value.toString();

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
            <p className="font-semibold">{label}</p>
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}:{" "}
                {entry.name === "Engagement Rate"
                  ? formatPercentage(entry.value)
                  : formatCurrency(entry.value)}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
      <div className="w-full space-y-8">
        {/* Initial Assessment Charts */}
        {activeChart === "initial" && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">
                Revenue Growth Projections
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={initialProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    yAxisId="revenue"
                    orientation="left"
                    tickFormatter={formatCurrency}
                  />
                  <YAxis
                    yAxisId="engagement"
                    orientation="right"
                    tickFormatter={formatPercentage}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="current"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Current Revenue"
                    dot={{ fill: "#94a3b8", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="projected"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    name="Projected Revenue"
                    dot={{ fill: "#7c3aed", strokeWidth: 2, r: 5 }}
                  />
                  <Line
                    yAxisId="engagement"
                    type="monotone"
                    dataKey="engagement"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Engagement Rate"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">
                Performance Improvement Targets
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={revenuePerViewData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "Revenue Per View"
                        ? formatDecimal(value)
                        : name === "Engagement Rate"
                        ? formatPercentage(value)
                        : value,
                      name,
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="current" fill="#94a3b8" name="Current" />
                  <Bar dataKey="target" fill="#7c3aed" name="6-Month Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Final Assessment Charts */}
        {activeChart === "final" && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">
                Final Revenue Growth Projections
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={finalProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    yAxisId="revenue"
                    orientation="left"
                    tickFormatter={formatCurrency}
                  />
                  <YAxis
                    yAxisId="engagement"
                    orientation="right"
                    tickFormatter={formatPercentage}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="current"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.3}
                    name="Current Baseline"
                  />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="projected"
                    stroke="#7c3aed"
                    strokeWidth={4}
                    name="Confirmed Revenue Target"
                    dot={{ fill: "#7c3aed", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    yAxisId="engagement"
                    type="monotone"
                    dataKey="engagement"
                    stroke="#059669"
                    strokeWidth={3}
                    name="Engagement Growth"
                    dot={{ fill: "#059669", strokeWidth: 2, r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">
                Confirmed Performance Targets
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={finalRevenuePerViewData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "Revenue Per View"
                        ? formatDecimal(value)
                        : name === "Engagement Rate"
                        ? formatPercentage(value)
                        : value,
                      name,
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="current"
                    fill="#10b981"
                    name="Current (Improved)"
                  />
                  <Bar dataKey="target" fill="#7c3aed" name="6-Month Goal" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  };
  ///

  const [phaseData, setPhaseData] = useState(phases);
  const [activePhase, setActivePhase] = useState(-1);
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = e => setIsMobile(e.matches);
    setIsMobile(mq.matches); // set initial
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleStep = (phaseIndex, stepIndex) => {
    const updatedPhases = [...phaseData];
    updatedPhases[phaseIndex].steps[stepIndex].completed = true;
    setPhaseData(updatedPhases);
    if (stepIndex + 1 < updatedPhases[phaseIndex].steps.length) {
      setActiveStepIndex(stepIndex + 1);
    }
  };

  const calculateCompletion = phase => {
    const totalSteps = phase.steps.length;
    const completedSteps = phase.steps.filter(step => step.completed).length;
    return totalSteps === 0
      ? 0
      : Math.round((completedSteps / totalSteps) * 100);
  };

  const isAllComplete = () => {
    return phaseData.every(phase => phase.steps.every(step => step.completed));
  };

  // Standard step renderer for all phases
  const renderStepCircle = (step, idx, small = false) => {
    const isActive = idx === activeStepIndex;
    const isComplete = step.completed;
    const size = small ? "w-8 h-8" : "w-20 h-20";

    return (
      <div
        key={idx}
        onClick={() => setActiveStepIndex(idx)}
        className="
          flex items-center gap-3 cursor-pointer
          md:flex-col md:items-center md:gap-1
        "
      >
        {/* Circle */}
        <div
          className={`${size} rounded-full flex items-center justify-center border-2`}
          style={{
            backgroundColor: isComplete
              ? customColors.purple
              : isActive
              ? customColors.lightGreen
              : "#e5e7eb",
            color: isComplete
              ? customColors.offwhite
              : isActive
              ? "black"
              : "#4b5563",
          }}
        >
          {isComplete ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={small ? "h-4 w-4" : "h-6 w-6"}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            step.id || idx + 1
          )}
        </div>

        {/* Label */}
        <span className="text-xs text-gray-800 text-center">{step.name}</span>
      </div>
    );
  };

  // 0–1 progress for a single phase
  const getPhaseProgress = phase => {
    const total = phase.steps.length || 0;
    const done = phase.steps.filter(s => s.completed).length;
    return total === 0 ? 0 : done / total;
  };

  // 0–100 overall %
  const getTotalProgressPct = () => {
    if (!phaseData.length) return 0;
    const avg =
      phaseData.reduce((sum, p) => sum + getPhaseProgress(p), 0) /
      phaseData.length;
    return Math.round(avg * 100);
  };

  // Simplified horizontal flow renderer for Site Setup phase
  const renderSiteSetupFlow = steps => {
    return (
      <div className="mb-6 mt-12 md:mt-6">
        {" "}
        <div className="relative">
          {/* show the horizontal connector only on desktop */}
          <div className="hidden md:block absolute inset-x-0 top-1/2 h-0.5 bg-gray-300 -z-10 -translate-y-1/2"></div>

          {/* All Steps */}
          <div className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-between md:overflow-visible pt-2 min-w-0">
            {" "}
            {steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isComplete = step.completed;

              return (
                <div
                  key={step.id || idx}
                  className="flex items-center gap-3 md:flex-col md:items-center md:gap-1"
                >
                  <div
                    className="rounded-full flex items-center justify-center mb-2 cursor-pointer
             w-8 h-8 md:w-20 md:h-20"
                    style={{
                      backgroundColor: isComplete
                        ? customColors.purple
                        : isActive
                        ? customColors.lightGreen
                        : "#e5e7eb",
                      color: isComplete
                        ? customColors.white
                        : isActive
                        ? "#2d5a27"
                        : "#4b5563",
                    }}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    {isComplete ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-6 md:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.id || idx + 1
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-medium">{step.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Simplified horizontal flow renderer for Analysis phases
  const renderAnalysisFlow = steps => {
    return (
      <div className="mb-6 mt-12 md:mt-6">
        {" "}
        <div className="relative">
          {/* show the horizontal connector only on desktop */}
          <div className="hidden md:block absolute inset-x-0 top-1/2 h-0.5 bg-gray-300 -z-10 -translate-y-1/2"></div>

          <div className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-between md:overflow-visible pt-2 min-w-0">
            {" "}
            {steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isComplete = step.completed;

              const bg = isComplete
                ? customColors.purple
                : isActive
                ? customColors.lightGreen
                : "#e5e7eb";

              const fg = isComplete
                ? customColors.white
                : isActive
                ? "#2d5a27"
                : "#4b5563";

              return (
                <div
                  key={step.name}
                  className="flex items-center gap-3 md:flex-col md:items-center md:gap-1"
                >
                  <div
                    className="rounded-full flex items-center justify-center mb-2 cursor-pointer
             w-8 h-8 md:w-20 md:h-20"
                    style={{
                      backgroundColor: isComplete
                        ? customColors.purple
                        : isActive
                        ? customColors.lightGreen
                        : "#e5e7eb",
                      color: isComplete
                        ? customColors.white
                        : isActive
                        ? "#2d5a27"
                        : "#4b5563",
                    }}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    {isComplete ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-6 md:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.id || idx + 1
                    )}
                  </div>

                  <p className="text-xs font-medium text-center">{step.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Current step panel (shows only for Site Setup phase)
  const renderCurrentStepPanel = () => {
    if (activePhase !== 2 || activeStepIndex === null) return null;

    const currentStep = phaseData[activePhase].steps[activeStepIndex];
    if (!currentStep) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <div
            className="w-8 h-8 rounded-full text-white flex items-center justify-center mr-3"
            style={{
              backgroundColor: customColors.purple,
            }}
          >
            {currentStep.id || activeStepIndex + 1}
          </div>
          <h3 className="font-bold text-lg">{currentStep.name}</h3>
          <span className="ml-auto px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            Current Step
          </span>
        </div>
        <div className="ml-11">
          <p className="text-gray-600 text-sm mb-2">
            Complete this step to proceed with your Raptive site setup.
          </p>
          <button
            className="text-white px-4 py-1 rounded-md text-sm font-medium hover:opacity-90"
            style={{
              backgroundColor: customColors.purple,
            }}
            onClick={() => toggleStep(activePhase, activeStepIndex)}
          >
            Start
          </button>
        </div>
      </div>
    );
  };

  // Build a list that preserves each phase's original index
  const phasesWithIndex = phaseData.map((p, i) => ({ ...p, __idx: i }));
  const phasesForUI = isMobile
    ? activePhase >= 0
      ? [{ ...phaseData[activePhase], __idx: activePhase }]
      : []
    : phasesWithIndex; // Desktop: show all

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white rounded-lg p-8 overflow-x-hidden">
      {/* Phase Pills + Connectors + % (no numbers; purple when active, green when complete) */}
      <div
        className={`w-full !mx-0 !justify-start text-left md:mb-10 mb-5 ${
          isMobile && activePhase < 0 ? "hidden" : ""
        }`}
      >
        <div className="flex items-center">
      <div className="flex md:flex-row flex-col md:flex-wrap items-start md:items-center gap-4 md:gap-4 min-w-0">

            {phasesForUI.map(phase => {
              const index = phase.__idx; // keep using the original index everywhere below
              const prog = getPhaseProgress(phase); // 0..1
              const pct = Math.round(prog * 100);
              const isActive = activePhase === index;
              const isComplete = pct === 100;
              const canClick = index <= activePhase + 1 || isComplete;

              // STATES
              const baseBg = isComplete
                ? customColors.purple // once 100% complete → purple
                : isActive
                ? "#e6ffb3" // light pastel green for active pill
                : "#F6FAFF"; // inactive pill

              const baseText = isComplete
                ? customColors.white
                : isActive
                ? "#2d5a27" // dark green text on light green bg
                : "#3B2BB3"; //dark purple

              const baseBrd = isComplete
                ? customColors.purple
                : isActive
                ? "#99cc66" // green border for active
                : "#6b65ff"; //purple

              return (
                <div
                  key={phase.name}
                  className="flex items-center flex-shrink min-w-0"
                  onMouseEnter={() => setHoveredPhase(index)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* PILL */}
                  <div className="relative group">
                    <button
                      onClick={() => canClick && setActivePhase(index)}
                      className="relative rounded-full border-2 px-6 md:px-10 py-4 text-sm md:text-md font-semibold transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden text-ellipsis
                      focus:outline-none focus-visible:outline-none focus:ring-0"
                      style={{
                        backgroundColor: baseBg,
                        color: baseText,
                        borderColor: baseBrd,
                      }}
                    >
                      {/* INNER PROGRESS FILL (only show if not complete) */}
                      {!isComplete && (
                        <span
                          className="absolute left-0 top-0 h-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: isActive
                              ? "#99cc66" // darker green fill for contrast
                              : "rgba(0,120,93,0.14)",
                          }}
                        />
                      )}

                      <span className="relative z-10">{phase.name}</span>
                    </button>

                    {/* TOOLTIP */}
                    {hoveredPhase === index && (
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                        <div className="bg-white text-black text-xs px-3 py-2 rounded shadow-lg max-w-xs text-center">
                          {phase.description}
                        </div>
                        <div className="absolute left-1/2 top-full -translate-x-1/2 w-3 h-3 rotate-45" />
                      </div>
                    )}
                  </div>

                  {/* CONNECTOR to NEXT PILL */}
                  {index !== phaseData.length - 1 && !isMobile && (
                    <div className="hidden md:block flex-1 min-w-[32px] mx-3">
                        <div className="h-1 w-full bg-gray-200 rounded overflow-hidden relative">
                          <div
                            className="absolute left-0 top-0 h-full rounded transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: customColors.lightGreen,
                            }}
                          />
                        </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* GLOBAL % ON RIGHT */}
          <div
            className="ml-auto pr-2 text-xl md:text-2xl font-extrabold shrink-0 hidden md:block"
            style={{ color: "#C2B4FF" }}
          >
            {getTotalProgressPct()}%
          </div>
        </div>
      </div>

      {/* Render Steps */}
      {activePhase >= 0 &&
        (activePhase === 2
          ? // Horizontal flow for Site Setup phase
            renderSiteSetupFlow(phaseData[activePhase].steps)
          : activePhase === 1 || activePhase === 3
          ? // Horizontal flow for Analysis phases
            renderAnalysisFlow(phaseData[activePhase].steps)
          : // Standard two-row layout for other phases
            (() => {
              const steps = phaseData[activePhase].steps;
              const firstRow = steps.slice(0, 4);
              const secondRow = steps.slice(4);

              return (
                <div className="space-y-4">
                  {isMobile ? (
                    // MOBILE: one horizontal row (no duplicate desktop)
                    <div className="flex flex-col gap-4 pb-2">
                      {steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {renderStepCircle(step, idx, true)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // DESKTOP: keep two-row layout
                    <>
                      <div className="flex justify-around text-center">
                        {firstRow.map((step, idx) =>
                          renderStepCircle(step, idx)
                        )}
                      </div>
                      {secondRow.length > 0 && (
                        <div className="flex justify-around text-center mt-4">
                          {secondRow.map((step, idx) =>
                            renderStepCircle(step, idx + 4)
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })())}

      {/* Initial Welcome Page */}
      {activePhase === -1 && (
        <div className="space-y-6 bg-white p-6 rounded shadow max-w-3xl">
          <h1 className="text-3xl font-bold">
            Welcome to your Onboarding Portal!
          </h1>

          <p className="text-gray-800">
            Your onboarding experience starts here. This portal, along with
            support from our dedicated Customer Success team, will guide you
            through each step to help you get up and running smoothly.
          </p>

          <p className="text-gray-800">
            Throughout the process, you’ll be able to share key information,
            complete setup tasks, and ensure everything is ready for a
            successful launch.
          </p>

          <div className="pl-6">
            <p className="text-gray-800">
              🔐 <strong> Protect your account with 2-step verification</strong>
            </p>
            <p>
              Your account access is tied to your Google account. To keep your
              data secure, we recommend enabling 2-step verification (2FA). It
              only takes a few minutes and adds an important layer of protection
              against unauthorized access. Set it up today to stay in control
              and secure.
            </p>
          </div>

          <p className="text-gray-800">
            When you’re ready to begin, click 'Get Started' below to start your
            onboarding.
          </p>

          <div className="flex justify-start mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => setActivePhase(0)}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      {/* Connect Your Analytics Tool Step */}
      {activePhase === 0 &&
        activeStepIndex === 0 &&
        calculateCompletion(phaseData[0]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Connect Your Analytics Tool</h2>

            <p>
              To help us better understand your business’s performance, you can
              grant temporary viewer access to your analytics tool (such as
              Google Analytics). This enables us to run an initial performance
              review and personalize your dashboard setup. You can follow these
              directions to share Google Analytics access with us:
            </p>

            <ol className="list-decimal pl-6 text-sm text-gray-800 space-y-1">
              <li>
                In{" "}
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline"
                >
                  Admin
                </a>
                , under <strong>Account</strong>, click{" "}
                <strong>Access Management</strong>.
              </li>
              <li>
                In the <em>Account/Properties permissions</em> list, click{" "}
                <strong>+</strong>, then click <strong>Add users</strong>.
              </li>
              <li>
                Enter <strong>email@gmail.com</strong>
              </li>
              <li>
                Select <strong>Notify new users by email</strong> to send a
                message to the user.
              </li>
              <li>
                Select the <strong>“Viewer”</strong> role as the level of
                permissions.
              </li>
              <li>
                Click <strong>Add</strong>.
              </li>
            </ol>

            <p className="text-sm">
              You can read more about this process in{" "}
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline"
              >
                this help center article
              </a>
              .
            </p>

            <p className="text-sm">
              Later, we'll also use this access to sync your company data with
              our dashboard.
            </p>

            <div className="flex justify-end mt-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(0, 0)}
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}
      {/* Data Integration Review Step */}
      {activePhase === 0 &&
        activeStepIndex === 1 &&
        calculateCompletion(phaseData[0]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Data Integration</h2>
            <p className="text-gray-800">
              Once you've connected your analytics tools, we'll begin reviewing
              performance trends to help inform your setup. This may include
              traffic patterns, engagement metrics, or integration health.
            </p>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="radio" name="data-option" className="form-radio" />
                <span className="text-gray-800">
                  Upload historical performance data
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="data-option" className="form-radio" />
                <span className="text-gray-800">
                  Connect additional data sources
                </span>
              </label>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button className="text-sm font-semibold text-purple-600">
                SKIP THIS STEP FOR NOW
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(0, 1)}
              >
                SAVE UPLOADS
              </button>
            </div>
          </div>
        )}

      {/* Approvals Step */}
      {activePhase === 0 &&
        activeStepIndex === 2 &&
        calculateCompletion(phaseData[0]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Account Setup & Permissions</h2>
            <p className="text-gray-800">
              We need to configure the necessary permissions and access levels
              for your account. This step ensures we can provide you with the
              best possible service while maintaining security.
            </p>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="account-type"
                  className="form-radio"
                />
                <span>I have existing integrations to configure</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="account-type"
                  className="form-radio"
                />
                <span>This is a new setup</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="account-type"
                  className="form-radio"
                />
                <span>I'm not sure</span>
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(0, 2)}
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}

      {/* Data Agreement & OWI Complete Page */}
      {activePhase === 0 && calculateCompletion(phaseData[0]) === 100 && (
        <div className="space-y-6 bg-white p-6 rounded shadow max-w-3xl">
          {!hasSubmitted ? (
            <>
              <div>
                <h3 className="font-semibold text-lg">
                  Please Review Before Submitting:
                </h3>
                <p className="text-sm text-gray-700">
                  Use the navigation above to return and complete any remaining
                  tasks, then submit your information.
                </p>
              </div>
              <div className="bg-purple-100 border-l-4 border-purple-600 space-y-4 p-6 shadow rounded">
                <p className="text-gray-800">
                  By submitting this information, you agree to allow us to use
                  the information supplied for the purposes of setting up your
                  account and ensuring we're a great fit for your business.
                </p>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                  onClick={() => setHasSubmitted(true)}
                >
                  SUBMIT MY INFORMATION
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold">Thank you!</h2>
              <p className="text-gray-800">
                We have everything we need to start your initial assessment!
                From here, our team of experts will analyze your current setup,
                performance data, and requirements to design a custom strategy
                for your business.
              </p>
              <p className="text-gray-800">
                This step usually takes a few business days. We'll be in touch
                once we finish our review!
              </p>
              <div className="bg-purple-100 border-l-4 border-purple-600 p-4 mt-8 rounded">
                <p className="text-sm text-purple-800 font-semibold">
                  To do: Review your compliance documentation
                </p>
                <p className="text-sm">
                  In the meantime, get a head start on making sure your business
                  meets regulatory requirements by reviewing our compliance
                  guidelines in your account dashboard.
                </p>
              </div>
              <div className="flex justify-start mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                  onClick={() => {
                    setActivePhase(1);
                    setActiveStepIndex(-1);
                  }}
                >
                  Go to Assessment Phase
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Initial Assessment Phase */}
      {/* Initial Assessment Phase */}
      {activePhase === 1 && activeStepIndex === -1 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            Revenue Optimization Assessment
          </h2>
          <p>
            We've analyzed your content performance, audience engagement,
            monetization channels, and revenue streams to create a personalized
            growth strategy tailored specifically for your content creation
            business.
          </p>
          <p>
            This comprehensive overview includes your current monetization
            setup, our recommended optimizations to maximize your revenue
            potential, and the advanced features and tools you'll gain access
            to.
          </p>
          <p>
            We'll also identify any quick wins and growth opportunities that
            require your attention—don't worry, we'll walk you through every
            step to ensure maximum revenue impact.
          </p>
          <p>
            Click the <strong>Get Started</strong> button below to explore your
            Revenue Assessment and discover your growth potential!
          </p>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => setActiveStepIndex(0)}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      {/* Current Setup */}
      {activePhase === 1 && activeStepIndex === 0 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Current Monetization Setup</h2>
          <p>Here's your current content monetization configuration:</p>
          <div>
            <p className="font-semibold">Active Revenue Streams:</p>
            <ul className="list-disc pl-5">
              <li>Ad revenue optimization</li>
              <li>Affiliate marketing tracking</li>
              <li>Sponsored content management</li>
              <li>Basic audience analytics</li>
              <li>Standard revenue reporting</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Current Platform Settings:</p>
            <ul className="list-disc pl-5">
              <li>Auto-optimization: Enabled for ads</li>
              <li>Content analysis: Basic level</li>
              <li>Audience insights: Standard</li>
              <li>Revenue tracking: Last 30 days</li>
              <li>Brand safety: Basic filtering</li>
            </ul>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(1, 0);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Current performance metrics */}
      {activePhase === 1 && activeStepIndex === 1 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Revenue Performance Analysis</h2>
          <div className="overflow-x-auto rounded border border-gray-300">
            <table className="min-w-full text-sm text-left text-gray-800 border-collapse">
              <thead className="bg-gray-100 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-4 py-2">Metric</th>
                  <th className="px-4 py-2">Your Performance</th>
                  <th className="px-4 py-2">Average</th>
                  <th className="px-4 py-2">Top 10% Target</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    metric: "Monthly Revenue",
                    current: "$2,500",
                    average: "$1,800",
                    target: "$8,500",
                    status: "Above Average",
                  },
                  {
                    metric: "Revenue Per View",
                    current: "$0.003",
                    average: "$0.004",
                    target: "$0.012",
                    status: "Needs Improvement",
                  },
                  {
                    metric: "Engagement Rate",
                    current: "4.2%",
                    average: "3.8%",
                    target: "7.5%",
                    status: "Above Average",
                  },
                  {
                    metric: "Conversion Rate",
                    current: "2.1%",
                    average: "1.9%",
                    target: "4.8%",
                    status: "Good",
                  },
                  {
                    metric: "Monthly Views",
                    current: "850K",
                    average: "450K",
                    target: "2.5M",
                    status: "Excellent",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2 font-medium">{row.metric}</td>
                    <td className="px-4 py-2">{row.current}</td>
                    <td className="px-4 py-2">{row.average}</td>
                    <td className="px-4 py-2">{row.target}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          row.status === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : row.status === "Good" ||
                              row.status === "Above Average"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(1, 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Recommended optimization strategy */}
      {activePhase === 1 && activeStepIndex === 2 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Recommended Revenue Strategy</h2>
          <p>
            Based on your content analysis and audience data, here's our
            optimized monetization strategy to maximize your revenue:
          </p>
          <div>
            <p className="font-semibold">Enhanced Revenue Features:</p>
            <ul className="list-disc pl-5">
              <li>AI-powered content optimization for higher engagement</li>
              <li>Premium brand partnership matching</li>
              <li>Advanced audience segmentation for targeted monetization</li>
              <li>Multi-platform revenue synchronization</li>
              <li>Real-time revenue optimization dashboard</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Optimized Monetization Settings:</p>
            <ul className="list-disc pl-5">
              <li>Dynamic ad placement with revenue maximization</li>
              <li>Content performance tracking: Advanced analytics</li>
              <li>Audience insights</li>
              <li>Revenue tracking: Extended 12-month analysis</li>
              <li>Brand safety: Premium filtering with custom controls</li>
              <li>Automated A/B testing for content optimization</li>
            </ul>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(1, 2);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Implementation Note */}
      {activePhase === 1 && activeStepIndex === 3 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Revenue Optimization Rollout</h2>
          <p>
            To maximize your earning potential immediately, you'll be
            automatically enrolled in our premium revenue optimization suite and
            advanced tools. Once your dashboard is live, you'll have full
            control to fine-tune any settings through your dashboard's control
            panel.
          </p>
          <p>
            To ensure consistent revenue growth, we recommend following the
            optimization guidelines outlined in your personalized strategy. Our
            dedicated Customer Success team will provide ongoing support and
            monthly performance reviews to help you hit your revenue targets.
          </p>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(1, 3);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Revenue Projections */}
      {activePhase === 1 && activeStepIndex === 4 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Revenue Growth Projections</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/5 space-y-6">
              <div>
                <p className="text-gray-800 mb-2">
                  Current revenue performance:
                </p>
                <table className="w-full text-sm text-left text-gray-800 border border-collapse">
                  <thead className="bg-gray-100 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-2">Metric</th>
                      <th className="px-4 py-2">Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Monthly Revenue</td>
                      <td className="px-4 py-2 font-semibold">$2,500</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Revenue Per View</td>
                      <td className="px-4 py-2 font-semibold">$0.003</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Brand Partnerships</td>
                      <td className="px-4 py-2 font-semibold">2/month</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-gray-800 mb-2">
                  Projected growth with our platform:
                </p>
                <p className="text-sm italic font-semibold text-gray-600">
                  180% revenue increase + 65% engagement boost = 245% total
                  growth potential
                </p>
                <table className="w-full text-sm text-left text-gray-800 border border-collapse">
                  <thead className="bg-gray-100 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-2">Metric</th>
                      <th className="px-4 py-2">6-Month Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Monthly Revenue</td>
                      <td className="px-4 py-2 font-semibold">$7,000</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Revenue Per View</td>
                      <td className="px-4 py-2 font-semibold">$0.008</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Brand Partnerships</td>
                      <td className="px-4 py-2 font-semibold">6/month</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="lg:w-3/4">
                <RevenueGrowthCharts activeChart="initial" />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(1, 4);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* START Onboarding Next Steps */}
      {activePhase === 1 && activeStepIndex === 5 && (
        <div className="bg-purple-100 p-8 rounded-xl space-y-6 shadow-md">
          <h2 className="text-3xl font-bold flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Next Steps</span>
          </h2>
          <p className="text-lg text-gray-800">
            If you're ready to move forward with our recommended strategy, click{" "}
            <strong>"I Agree"</strong> below. Your Customer Success Manager will
            follow up with the next steps.
          </p>
          <p className="text-lg text-gray-800">
            Not quite ready or have questions? Click{" "}
            <strong>"No, I Have Questions"</strong> to connect with your
            Customer Success Manager — we're here to help.
          </p>
          <hr className="my-4 border-gray-300" />
          <p className="text-xs text-gray-500 italic">
            As a reminder, regular updates are fine, but please do not make any
            major changes to your business configuration. Any changes made at
            this point could alter our performance projections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-3 px-6 rounded-full shadow"
              onClick={() => {
                setActivePhase(2);
                setActiveStepIndex(0);
                toggleStep(1, 5);
              }}
            >
              I Agree
            </button>
            <button
              className="bg-white border border-red-500 text-red-600 hover:bg-red-50 text-sm font-bold py-3 px-6 rounded-full"
              onClick={() => {
                setActivePhase(2);
                setActiveStepIndex(0);
              }}
            >
              No, I have questions
            </button>
          </div>
        </div>
      )}
      {/* END Onboarding Next Steps */}
      {/* START OWII PROCESS*/}
      {/* Comscore Step */}
      {activePhase === 2 &&
        activeStepIndex === 0 &&
        calculateCompletion(phaseData[2]) < 100 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-gray-800">
              We're almost at your launch date—just a few quick steps to go. The
              tasks below help us ensure optimal configuration and security for
              your business.
            </p>
            <h2 className="text-xl font-semibold">Integration Setup</h2>
            <p>
              Configure the necessary integrations for your business. Click the
              button to generate your integration code, then follow the setup
              instructions to connect your systems.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Integration Code
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value="saas-integration-key-2024"
                readOnly
              />
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full">
              CONFIGURE INTEGRATION
            </button>
            <div>
              <h3 className="text-lg font-semibold mt-6 mb-2">
                External Connections
              </h3>
              <p className="text-gray-700 mb-2">
                Review your external service connections below to ensure they're
                up to date. Update any outdated integrations and add any missing
                services. If you don't use a particular service, you can leave
                that field blank.
              </p>
              <div className="space-y-3">
                <input
                  placeholder="https://api.analytics-service.com"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  placeholder="https://api.payment-gateway.com"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  placeholder="https://api.notification-service.com"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  placeholder="https://api.backup-service.com"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(2, 0)}
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}
      {/* Install Access Step */}
      {activePhase === 2 &&
        activeStepIndex === 1 &&
        calculateCompletion(phaseData[2]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">System Access Configuration</h2>
            <p>
              Create the necessary access credentials for our platform
              management team. This will allow us to configure your system
              optimally and provide ongoing support without requiring manual
              intervention from your team.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Platform Type</label>
                <select className="border border-gray-300 rounded w-full p-2">
                  <option>Cloud-based SaaS</option>
                  <option>On-premise</option>
                  <option>Hybrid</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Admin Portal URL *
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="https://admin.yourplatform.com"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Service Account Email
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full border border-gray-300 p-2 rounded-l"
                    value="platform-admin@yourservice.com"
                    readOnly
                  />
                  <button className="bg-gray-200 px-3 py-2 rounded-r text-sm">
                    COPY
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button className="text-sm text-purple-600">
                SAVE THIS STEP FOR LATER
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(2, 1)}
              >
                READY FOR NEXT STEP!
              </button>
            </div>
          </div>
        )}

      {/* Privacy Policy Step */}
      {activePhase === 2 &&
        activeStepIndex === 2 &&
        calculateCompletion(phaseData[2]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Compliance Review</h2>
            <p>
              Please review and update your business's compliance documentation.
              This ensures your business meets all regulatory requirements and
              industry standards.
            </p>
            <div>
              <textarea
                className="w-full border border-gray-300 p-2 rounded"
                rows={6}
                value="We comply with industry standards including SOC 2, GDPR, CCPA, and other applicable regulations. 
                Our platform implements comprehensive data protection measures and maintains audit trails for all system activities."
                readOnly
              ></textarea>
            </div>
            <div>
              <label className="block font-medium mb-1 mt-4">
                Privacy Policy URL
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="https://yourplatform.com/privacy"
              />
            </div>
            <div className="requirements">
              <strong>Additional Requirements:</strong>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>
                  The link to your privacy policy must be accessible from your
                  main navigation
                </li>
                <li>
                  Terms of service must be clearly displayed and accessible for
                  users
                </li>
                <li>
                  Data processing agreements must be in place for all
                  integrations
                </li>
                <li>
                  Contact information for data protection officer must be
                  provided
                </li>
              </ul>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(2, 2)}
              >
                COMPLIANCE UPDATED
              </button>
            </div>
          </div>
        )}
      {/* Identity and Business Step */}
      {activePhase === 2 &&
        activeStepIndex === 3 &&
        calculateCompletion(phaseData[2]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Identity Verification</h2>
            <p>
              To keep your account secure, we need to verify your identity and
              business ownership. This helps us:
            </p>
            <ul className="list-disc pl-5">
              <li>
                Confirm you're the owner or authorized representative of the
                business
              </li>
              <li>
                Validate your ownership or management of the platform(s)
                associated with your account
              </li>
            </ul>
            <div className="bg-purple-100 border-l-4 border-purple-600 p-4 mt-8 rounded">
              <p className="text-sm text-purple-800">
                <strong>What you'll need:</strong> A government-issued photo ID
                and basic business details (e.g., legal name, business type, and
                business domain). Your information is kept private and only used
                to verify your account.
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(2, 3)}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      {/* END of Identity and Business Step */}
      {/* Payment and Tax Info Step */}
      {activePhase === 2 &&
        activeStepIndex === 4 &&
        calculateCompletion(phaseData[2]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Billing Information</h2>
            <p>
              To ensure uninterrupted service, we need your billing information
              and any required tax details for your region.
            </p>
            <p>What you'll need:</p>
            <ul className="list-disc pl-5">
              <li>
                Payment method details (personal, or business bank account)
              </li>
              <li>
                Legal name and tax identification information (e.g. SSN, EIN,
                VAT number, or equivalent)
              </li>
            </ul>
            <div className="bg-purple-100 border-l-4 border-purple-600 p-4 mt-8 rounded">
              <p className="text-sm text-purple-800">
                <strong>Need help with billing setup?</strong> Check out our
                billing resources and documentation. If you have questions about
                tax requirements, we recommend consulting your local certified
                tax advisor.
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(2, 4)}
              >
                Get Started
              </button>
            </div>
          </div>
        )}

      {/* END of Payment and Tax Info Step */}
      {/* Terms and Conditions Step */}
      {activePhase === 2 &&
        activeStepIndex === 5 &&
        calculateCompletion(phaseData[2]) < 100 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contract</h2>
            <p>
              Below are some highlights from our Terms and Conditions (the full
              and binding description can be found in the complete Terms and
              Conditions):
            </p>
            <p>
              <strong>Data Protection:</strong> We maintain strict data security
              standards and will protect your information according to our
              privacy policy.
            </p>
            <p>
              <strong>Compliance:</strong> You agree that your platform usage
              will comply with all applicable laws and regulations in your
              jurisdiction.
            </p>
            <p>
              <strong>Terms:</strong> Should you choose to terminate your
              service, standard notice periods apply as outlined in the full
              agreement.
            </p>
            <p>
              Sign our Terms and Conditions using the button below. We'll send
              you a copy by email.
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                onClick={() => toggleStep(2, 5)}
              >
                SIGN TERMS AND CONDITIONS
              </button>
            </div>
          </div>
        )}

      {/* END OWII PROCESS*/}
      {/* Reminder and OWII Complete Page */}
      {activePhase === 2 && calculateCompletion(phaseData[2]) === 100 && (
        <div className="space-y-6 bg-white p-6 rounded shadow max-w-3xl">
          {!hasSubmitted ? (
            <>
              <div>
                <h3 className="font-semibold text-lg">
                  Please Review Before Submitting:
                </h3>
                <p className="text-sm text-gray-700">
                  Use the navigation above to return and complete any remaining
                  tasks, then continue to the next phase.
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                  onClick={() => setHasSubmitted(true)}
                >
                  CONTINUE
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold">Setup Complete!</h2>
              <p className="text-gray-800">
                Now that we have all the necessary information, we'll finish
                configuring everything in our system. We'll be back in touch
                soon with next steps!
              </p>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                  onClick={() => {
                    setActivePhase(3);
                    setActiveStepIndex(-1);
                  }}
                >
                  Go to Final Review
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Final Review Phase */}
      {/* Ad Performance Step */}
      {activePhase === 3 && activeStepIndex === -1 && (
        <>
          {!hasSubmitted ? (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Thanks!</h3>
              <p className="text-sm text-gray-700">
                We'll get started on your final review to confirm that our
                original recommendations are still the best way to optimize your
                business performance. We'll reach back out as soon as we're
                done!
              </p>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                  onClick={() => setHasSubmitted(true)}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Final Review</h2>
              <p>
                We've taken a final deep dive into your business's analytics,
                configuration, performance, and more to make sure the original
                strategy we shared is still the best plan for your business.
              </p>
              <p>
                This is an updated overview of what's currently running on your
                business—we will include if we noticed any changes, our
                recommended configuration to help you achieve optimal
                performance, and another look at the settings and features
                you'll be opted into.
              </p>
              <p>
                Click the <strong>Get Started</strong> button below to check out
                your final review and launch preparation steps!
              </p>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
                  onClick={() => setActiveStepIndex(0)}
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Final Review Steps */}
      {activePhase === 3 && activeStepIndex === 0 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Current Revenue Setup Review</h2>
          <p>
            Before we finalize your revenue optimization strategy, let's confirm
            your current monetization configuration is still the same as we
            initially assessed:
          </p>
          <div>
            <p className="font-semibold">Current Active Revenue Streams:</p>
            <ul className="list-disc pl-5">
              <li>Ad revenue optimization</li>
              <li>Affiliate marketing tracking</li>
              <li>Sponsored content management</li>
              <li>Basic audience analytics</li>
              <li>Standard revenue reporting</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Current Platform Settings:</p>
            <ul className="list-disc pl-5">
              <li>Auto-optimization: Enabled for ads</li>
              <li>Content analysis: Basic level</li>
              <li>Audience insights: Standard</li>
              <li>Revenue tracking: Last 30 days</li>
              <li>Brand safety: Basic filtering</li>
            </ul>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(3, 0);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {activePhase === 3 && activeStepIndex === 1 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            Final Revenue Performance Review
          </h2>
          <div className="overflow-x-auto rounded border border-gray-300">
            <table className="min-w-full text-sm text-left text-gray-800 border-collapse">
              <thead className="bg-gray-100 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-4 py-2">Metric</th>
                  <th className="px-4 py-2">Your Performance</th>
                  <th className="px-4 py-2">Average</th>
                  <th className="px-4 py-2">Top 10% Target</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    metric: "Monthly Revenue",
                    current: "$2,650",
                    average: "$1,800",
                    target: "$8,500",
                    status: "Improving",
                  },
                  {
                    metric: "Revenue Per View",
                    current: "$0.0032",
                    average: "$0.004",
                    target: "$0.012",
                    status: "Needs Improvement",
                  },
                  {
                    metric: "Engagement Rate",
                    current: "4.4%",
                    average: "3.8%",
                    target: "7.5%",
                    status: "Above Average",
                  },
                  {
                    metric: "Conversion Rate",
                    current: "2.3%",
                    average: "1.9%",
                    target: "4.8%",
                    status: "Improved",
                  },
                  {
                    metric: "Monthly Views",
                    current: "920K",
                    average: "450K",
                    target: "2.5M",
                    status: "Excellent",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2 font-medium">{row.metric}</td>
                    <td className="px-4 py-2">{row.current}</td>
                    <td className="px-4 py-2">{row.average}</td>
                    <td className="px-4 py-2">{row.target}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          row.status === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : row.status === "Above Average"
                            ? "bg-blue-100 text-blue-800"
                            : row.status === "Improved" ||
                              row.status === "Improving"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="font-semibold mt-4">Optimization Readiness Check:</p>
            <ul className="list-disc pl-5">
              <li>Content analysis complete: ✅ Ready for AI optimization</li>
              <li>Audience segmentation: ✅ Premium targeting configured</li>
              <li>
                Brand partnership eligibility: ✅ Qualified for premium matches
              </li>
              <li>Multi-platform sync: ✅ Revenue streams identified</li>
            </ul>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(3, 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {activePhase === 3 && activeStepIndex === 2 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            Final Revenue Strategy Confirmation
          </h2>
          <p>
            Based on our comprehensive analysis, we're confirming the same
            revenue optimization strategy we outlined in your initial
            assessment. This approach is specifically tailored to your content
            style and audience demographics:
          </p>
          <div>
            <p className="font-semibold">
              Enhanced Revenue Features (Ready to Deploy):
            </p>
            <ul className="list-disc pl-5">
              <li>AI-powered content optimization for higher engagement</li>
              <li>Premium brand partnership matching</li>
              <li>Advanced audience segmentation for targeted monetization</li>
              <li>Multi-platform revenue synchronization</li>
              <li>Real-time revenue optimization dashboard</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">
              Optimized Monetization Settings (Pre-configured):
            </p>
            <ul className="list-disc pl-5">
              <li>Dynamic ad placement with revenue maximization</li>
              <li>Content performance tracking: Advanced analytics</li>
              <li>Audience insights</li>
              <li>Revenue tracking: Extended 12-month analysis</li>
              <li>Brand safety: Premium filtering with custom controls</li>
              <li>Automated A/B testing for content optimization</li>
            </ul>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(3, 2);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {activePhase === 3 && activeStepIndex === 3 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            Revenue Optimization Launch Confirmation
          </h2>
          <p>
            You're all set to launch your optimized revenue strategy! You'll be
            automatically enrolled in our premium revenue suite with all the
            features we've discussed. Your enhanced dashboard will be live
            within 24 hours, giving you complete control over your monetization
            settings.
          </p>
          <p>
            Your dedicated Customer Success Manager will reach out within 48
            hours to schedule your onboarding call and provide your personalized
            revenue growth roadmap. We're committed to helping you achieve the
            revenue targets we've projected together.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
            <p className="text-sm font-semibold text-purple-800">
              Revenue Growth Guarantee: We're confident in achieving at least
              150% revenue growth within your first 6 months, or we'll provide
              additional optimization support at no extra cost.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(3, 3);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {activePhase === 3 && activeStepIndex === 4 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Final Revenue Growth Targets</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/5 space-y-6">
              <div>
                <p className="text-gray-800 mb-2">
                  Your current revenue baseline:
                </p>
                <table className="w-full text-sm text-left text-gray-800 border border-collapse">
                  <thead className="bg-gray-100 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-2">Metric</th>
                      <th className="px-4 py-2">Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Monthly Revenue</td>
                      <td className="px-4 py-2 font-semibold">$2,650</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Revenue Per View</td>
                      <td className="px-4 py-2 font-semibold">$0.0032</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Brand Partnerships</td>
                      <td className="px-4 py-2 font-semibold">2/month</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-gray-800 mb-2">
                  Confirmed 6-month revenue targets:
                </p>
                <p className="text-sm italic font-semibold text-gray-600">
                  180% revenue increase + 65% engagement boost = 245% total
                  growth potential
                </p>
                <table className="w-full text-sm text-left text-gray-800 border border-collapse">
                  <thead className="bg-gray-100 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-2">Metric</th>
                      <th className="px-4 py-2">6-Month Goal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Monthly Revenue</td>
                      <td className="px-4 py-2 font-semibold">$7,400</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Revenue Per View</td>
                      <td className="px-4 py-2 font-semibold">$0.008</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Brand Partnerships</td>
                      <td className="px-4 py-2 font-semibold">6/month</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="lg:w-3/4">
                <RevenueGrowthCharts activeChart="final" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-green-800 mb-2">
              You're Ready to Launch!
            </h3>
            <p className="text-sm text-green-700">
              Your revenue optimization strategy is confirmed and ready for
              deployment. Expect to see initial improvements within the first 30
              days, with full revenue targets achievable by month 6.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(3, 4);
              }}
            >
              Complete Assessment
            </button>
          </div>
        </div>
      )}

      {activePhase === 3 && activeStepIndex === 5 && (
        <div className="bg-purple-100 p-8 rounded-xl space-y-6 shadow-md">
          <h2 className="text-3xl font-bold flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Launch Preparation</span>
          </h2>
          <p className="text-lg text-gray-800">
            If you're ready to move forward with our recommended strategy, click{" "}
            <strong>"I Agree"</strong> below. Your Customer Success Manager will
            follow up with the final launch steps.
          </p>
          <p className="text-lg text-gray-800">
            Not quite ready or have questions? Click{" "}
            <strong>"No, I Have Questions"</strong> to connect with your
            Customer Success Manager — we're here to help.
          </p>
          <hr className="my-4 border-gray-300" />
          <p className="text-xs text-gray-500 italic">
            As a reminder, regular updates are fine, but please do not make any
            major changes to your business configuration. Any changes made at
            this point could alter our performance projections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-3 px-6 rounded-full shadow"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(3, 5);
              }}
            >
              I Agree
            </button>
            <button
              className="bg-white border border-red-500 text-red-600 hover:bg-red-50 text-sm font-bold py-3 px-6 rounded-full"
              onClick={() => {
                setActiveStepIndex(prev => prev + 1);
                toggleStep(3, 5);
              }}
            >
              No, I have questions
            </button>
          </div>
        </div>
      )}
      {/* END Onboarding Next Steps */}
      {/* Final Complete Page */}
      {isAllComplete() && (
        <div
          className="mb-8 mx-4 p-6 rounded-md flex flex-col space-y-6"
          style={{
            backgroundColor: "rgba(210, 255, 102, 0.2)",
            borderWidth: "1px",
            borderColor: customColors.borderGreen,
          }}
        >
          <div className="flex items-start space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: customColors.darkGreen }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span
              className="text-xl font-semibold"
              style={{ color: customColors.darkGreen }}
            >
              You've completed the onboarding process, and your business is
              ready for launch within our platform! Keep an eye out for another
              email from your Customer Success Manager with information about
              what to expect on your launch date and moving forward.
            </span>
          </div>

          <p
            className="text-base font-medium"
            style={{ color: customColors.darkGreen }}
          >
            In the meantime, please complete the following final steps to ensure
            you make the most out of our platform once you have full access:
          </p>

          <ul className="space-y-2">
            {[
              "Connect your analytics tools to your dashboard",
              "Complete your user profile and verify contact information",
              "Review and update your integration settings",
              "Configure your notification preferences",
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm text-gray-800">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <p className="text-sm text-gray-800 font-semibold mb-2">
              Explore these additional resources and tools:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-bold">Account & Billing</p>
                <ul className="list-disc pl-6">
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Payment Methods
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Billing Cycle Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      How to update billing information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Tax documentation
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold">Platform Features</p>
                <ul className="list-disc pl-6">
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Getting started with analytics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      API Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Integration guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Performance optimization tips
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Feature roadmap
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold">Security & Compliance</p>
                <ul className="list-disc pl-6">
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Secure your account with 2FA
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Data security best practices
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Compliance documentation
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold">Support & Community</p>
                <ul className="list-disc pl-6">
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Community Forum
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Video Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Contact Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold">Growth & Optimization</p>
                <ul className="list-disc pl-6">
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Performance benchmarking
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Scaling strategies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Advanced features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Case studies
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold">Stay Connected</p>
                <ul className="list-disc pl-6">
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Follow us on LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Join our newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Product updates blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 underline">
                      Referral program
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
