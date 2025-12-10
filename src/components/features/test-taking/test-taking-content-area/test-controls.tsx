import { AlertCircle, Pause, Play, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const TestControls = ({
  isPaused,
  onPause,
  onResume,
  onEnd,
}: {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
}) => {
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
      <h3 className="font-bold text-gray-900 mb-4">Test Controls</h3>

      <div className="space-y-3">
        {!isPaused ? (
          <Button
            onClick={onPause}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Pause size={20} />
            Pause Test
          </Button>
        ) : (
          <Button
            onClick={onResume}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Resume Test
          </Button>
        )}

        <Button
          onClick={() => setShowEndConfirm(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <X size={20} />
          End Test
        </Button>
      </div>

      {/* End Test Confirmation Modal */}
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
                  End Test?
                </h3>
                <p className="text-gray-600 text-sm">
                  Are you sure you want to end this test? You won't be able to
                  continue after ending.
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
                Yes, End Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Info */}
      <div className="mt-6 pt-6 border-t space-y-3">
        <div>
          <p className="text-xs text-gray-600">Total Questions</p>
          <p className="text-lg font-bold text-gray-900">30</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Attempt</p>
          <p className="text-lg font-bold text-gray-900">1 of 1</p>
        </div>
      </div>
    </div>
  );
};
