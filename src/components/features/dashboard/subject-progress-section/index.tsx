type SubjectProgressItem = {
  subject: string;
  score: number;
  total: number;
  correct: number;
};

const SUBJECT_COLORS = [
  "#3B6D11",
  "#1D9E75",
  "#BA7517",
  "#854F0B",
  "#639922",
  "#085041",
];

interface SubjectProgressSectionProps {
  items: SubjectProgressItem[] | null | undefined;
}

export default function SubjectProgressSection({ items }: SubjectProgressSectionProps) {
  return (
    <div>
      <div className="section-title" style={{ marginBottom: 12 }}>
        📊 Subject Progress
      </div>
      <div className="card card-p">
        {items && items.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item, idx) => {
              const color = SUBJECT_COLORS[idx % SUBJECT_COLORS.length];
              const pct = Math.round(item.score);
              return (
                <div key={item.subject}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span className="text-sm" style={{ fontWeight: 500 }}>
                      {item.subject}
                    </span>
                    <span className="text-xs" style={{ color, fontWeight: 600 }}>
                      {pct}%
                    </span>
                  </div>
                  <div className="prog-track">
                    <div
                      className="prog-fill"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <div className="text-xs text-muted" style={{ marginTop: 2 }}>
                    {item.total} session{item.total !== 1 ? "s" : ""} · {item.correct} correct
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
            <div className="text-sm" style={{ fontWeight: 600, marginBottom: 4 }}>
              No progress yet
            </div>
            <div className="text-xs text-muted">
              Complete a test to see your subject progress here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
