import { AlertCircle, Eye, Pause, Play, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { TestModeType } from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";

export const TestControls = ({
  mode,
  isPaused,
  totalQuestions,
  answeredCount,
  onPause,
  onResume,
  onEnd,
}: {
  mode: TestModeType | null;
  isPaused: boolean;
  totalQuestions: number;
  answeredCount: number;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
}) => {
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const isLearningMode = mode === TestModeType.UnProctured;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24 space-y-6">
      {/* Mode badge */}
      {mode && (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            isLearningMode
              ? "bg-blue-50 text-blue-700"
              : "bg-orange-50 text-orange-700"
          }`}
        >
          {isLearningMode ? (
            <Eye className="w-4 h-4 flex-shrink-0" />
          ) : (
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          )}
          {isLearningMode ? "Learning Mode" : "Proctored Mode"}
        </div>
      )}

      {/* Controls */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide text-gray-500">
          Controls
        </h3>
        <div className="space-y-3">
          {!isPaused ? (
            <Button
              onClick={onPause}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Pause size={18} />
              {isLearningMode ? "Save Progress" : "Pause Test"}
            </Button>
          ) : (
            <Button
              onClick={onResume}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Play size={18} />
              {isLearningMode ? "Continue" : "Resume Test"}
            </Button>
          )}

          <Button
            onClick={() => setShowEndConfirm(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            <X size={18} />
            End &amp; Submit
          </Button>
        </div>
      </div>

      {/* Progress info */}
      <div className="border-t pt-4 space-y-3">
        <div>
          <p className="text-xs text-gray-500">Progress</p>
          <p className="text-lg font-bold text-gray-900">
            {answeredCount}{" "}
            <span className="text-sm font-normal text-gray-500">
              / {totalQuestions} answered
            </span>
          </p>
          <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-800 rounded-full transition-all"
              style={{
                width: totalQuestions
                  ? `${(answeredCount / totalQuestions) * 100}%`
                  : "0%",
              }}
            />
          </div>
        </div>

        {isLearningMode && (
          <p className="text-xs text-blue-600">
            Hints and answer explanations are available in this mode.
          </p>
        )}
      </div>

      {/* End confirmation dialog */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle
                size={24}
                className="text-red-600 flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  End &amp; Submit?
                </h3>
                <p className="text-gray-600 text-sm">
                  {answeredCount < totalQuestions
                    ? `You have ${totalQuestions - answeredCount} unanswered question(s). `
                    : ""}
                  You won&apos;t be able to continue after submitting.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 border border-gray-300 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onEnd}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
