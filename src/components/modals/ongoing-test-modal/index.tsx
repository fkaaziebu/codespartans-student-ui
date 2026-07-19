"use client";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TestModeType,
  TestStatusType,
} from "@/common/graphql/generated/graphql";

interface OngoingTestModalProps {
  open: boolean;
  onClose: () => void;
  onResume: () => void;
  test: {
    mode: TestModeType;
    status: TestStatusType;
  } | null;
  courseTitle?: string;
}

const MODE_LABEL: Record<TestModeType, string> = {
  [TestModeType.Proctured]: "Proctored",
  [TestModeType.UnProctured]: "Learning",
};

export default function OngoingTestModal({
  open,
  onClose,
  onResume,
  test,
  courseTitle,
}: OngoingTestModalProps) {
  const isPaused = test?.status === TestStatusType.Paused;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Test In Progress
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 flex items-start gap-4">
            <div className="bg-amber-100 rounded-full p-3 flex-shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-amber-900 mb-2">
                {courseTitle ? `${courseTitle} test` : "You have an ongoing test"}
              </h3>
              <p className="text-sm text-amber-800">
                {isPaused
                  ? "This test is paused. Resume it before starting a new one."
                  : "This test is still in progress. Continue it before starting a new one."}
                {test && ` Mode: ${MODE_LABEL[test.mode]}.`}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={onResume} className="flex-1">
              {isPaused ? "Resume" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
