"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EndTestModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EndTestModal({
  open,
  onClose,
  onConfirm,
}: EndTestModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            End Test?
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-red-900 mb-2">
                Are you sure you want to end this test?
              </h3>
              <p className="text-sm text-red-800">
                Once you end the test, you won't be able to continue answering
                questions. Your current progress will be saved and graded.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900">
              <span className="font-bold">Tip:</span> If you just need a break,
              consider pausing the test instead. You can resume it later and
              continue from where you left off.
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Yes, End Test
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
