const STEPS = [
  { label: "Exam Type", sub: "Choose your target" },
  { label: "Subjects", sub: "Select your subjects" },
  { label: "Your Goal", sub: "Set your objective" },
];

export default function LeftProgress({ step }: { step: number }) {
  return (
    <div className="pers-left">
      <div className="pers-left-logo">
        <div className="brand-mark">EF</div>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--blue)",
          }}
        >
          ExamForge
        </span>
      </div>

      <div id="pers-step-list">
        {STEPS.map((s, i) => {
          const num = i + 1;
          const isActive = num === step;
          const isDone = num < step;
          return (
            <div key={num}>
              <div className={`pers-step-row${isActive ? " active" : ""}`}>
                <div className={`pers-step-node${isActive ? " active" : isDone ? " done" : " pending"}`}>
                  {isDone ? "✓" : num}
                </div>
                <div>
                  <div className="pers-step-label">{s.label}</div>
                  <div className="text-xs text-muted">{s.sub}</div>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`pers-connector${isDone ? " done" : ""}`} />
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="text-xs text-muted">
          ✏️ You can change these later from Settings
        </div>
      </div>
    </div>
  );
}
