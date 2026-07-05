"use client";
import { BookOpen, Clock, Lightbulb, ShieldCheck, Timer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TestModeType } from "@/common/graphql/generated/graphql";

interface TestModeModalProps {
  open: boolean;
  onClose: () => void;
  onSelectMode: (mode: TestModeType) => void;
  loading?: boolean;
}

export default function TestModeModal({
  open,
  onClose,
  onSelectMode,
  loading,
}: TestModeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent style={{ maxWidth: 448, padding: 40 }}>
        <DialogHeader>
          <DialogTitle
            style={{
              fontFamily: "var(--serif)",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--t1)",
            }}
          >
            Select test mode
          </DialogTitle>
          <p style={{ fontSize: 13, color: "var(--t3)", marginTop: 2 }}>
            Choose how you want to take this test.
          </p>
        </DialogHeader>

        <div className="test-mode-options">
          {/* Proctored */}
          <button
            disabled={loading}
            onClick={() => onSelectMode(TestModeType.Proctured)}
            className="test-mode-option mode-proctored"
          >
            <div className="test-mode-icon icon-blue">
              <ShieldCheck size={18} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="test-mode-label">
                Proctored
                <span
                  className="badge badge-blue"
                  style={{ fontSize: 10, padding: "2px 7px" }}
                >
                  Exam
                </span>
              </div>
              <div className="test-mode-desc">
                Timed &amp; strictly monitored — simulates real exam conditions.
              </div>
              <div className="test-mode-tags">
                <span className="test-mode-tag">
                  <Timer size={12} /> Timed
                </span>
                <span className="test-mode-tag">
                  <ShieldCheck size={12} /> No hints
                </span>
              </div>
            </div>
          </button>

          {/* Learning */}
          <button
            disabled={loading}
            onClick={() => onSelectMode(TestModeType.UnProctured)}
            className="test-mode-option mode-learning"
          >
            <div className="test-mode-icon icon-green">
              <BookOpen size={18} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="test-mode-label">
                Learning
                <span
                  className="badge badge-green"
                  style={{ fontSize: 10, padding: "2px 7px" }}
                >
                  Study
                </span>
              </div>
              <div className="test-mode-desc">
                Self-paced with hints — ideal for reviewing and studying.
              </div>
              <div className="test-mode-tags">
                <span className="test-mode-tag">
                  <Clock size={12} /> No time limit
                </span>
                <span className="test-mode-tag">
                  <Lightbulb size={12} /> Hints enabled
                </span>
              </div>
            </div>
          </button>
        </div>

        <div className="test-mode-cancel">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
