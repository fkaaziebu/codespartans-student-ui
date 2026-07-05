"use client";
import { useRouter } from "next/navigation";

export default function StepOnePage() {
  const router = useRouter();

  return (
    <div className="pers-right">
      <div className="pers-panel">
        <div className="pers-eyebrow" id="p-eyebrow">
          Step 1 of 3
        </div>
        <div className="pers-title" id="p-title">
          What are you preparing for?
        </div>
        <div className="pers-sub" id="p-sub">
          This shapes your test recommendations, question banks and study plan.
        </div>
        <div id="p-body-1">
          <div
            className="pers-section-label"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--t4)",
              textTransform: "uppercase",
              letterSpacing: "0.7px",
              marginBottom: 12,
            }}
          >
            Select your exam
          </div>
          <div className="chip-wrap" id="exam-chips">
            <div className="chip sel">WAEC / WASSCE</div>
            <div className="chip">JAMB / UTME</div>
            <div className="chip">BECE</div>
            <div className="chip">SAT / A-Levels</div>
            <div className="chip">University Exams</div>
            <div className="chip">General Study</div>
          </div>
        </div>
        <div id="p-body-2" style={{ display: "none" }}>
          <div
            className="pers-section-label"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--t4)",
              textTransform: "uppercase",
              letterSpacing: "0.7px",
              marginBottom: 12,
            }}
          >
            Select subjects (up to 5)
          </div>
          <div className="chip-wrap" id="subj-chips">
            <div className="chip sel">Mathematics</div>
            <div className="chip">English Language</div>
            <div className="chip sel">Physics</div>
            <div className="chip">Chemistry</div>
            <div className="chip">Biology</div>
            <div className="chip">Economics</div>
            <div className="chip">Geography</div>
            <div className="chip">Literature</div>
            <div className="chip">Government</div>
            <div className="chip">History</div>
          </div>
        </div>
        <div id="p-body-3" style={{ display: "none" }}>
          <div
            className="pers-section-label"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--t4)",
              textTransform: "uppercase",
              letterSpacing: "0.7px",
              marginBottom: 12,
            }}
          >
            What is your main goal?
          </div>
          <div className="goal-opt sel">
            <div className="goal-radio" />
            <div>
              <div className="goal-title">Pass my exams</div>
              <div className="goal-desc">
                Focus on core topics and exam technique
              </div>
            </div>
          </div>
          <div className="goal-opt">
            <div className="goal-radio" />
            <div>
              <div className="goal-title">Improve my score</div>
              <div className="goal-desc">I'm passing — I want A's and B's</div>
            </div>
          </div>
          <div className="goal-opt">
            <div className="goal-radio" />
            <div>
              <div className="goal-title">Master a subject</div>
              <div className="goal-desc">
                Deep understanding, not just exam prep
              </div>
            </div>
          </div>
        </div>
        <div className="pers-footer">
          <button
            className="btn btn-ghost"
            id="p-back"
            style={{ display: "none" }}
          >
            ← Back
          </button>
          <div className="text-sm text-muted">
            Your preferences are saved automatically
          </div>
          <button
            className="btn btn-primary"
            id="p-next"
            onClick={() => router.push("/step-two")}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
