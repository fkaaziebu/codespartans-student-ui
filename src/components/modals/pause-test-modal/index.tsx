"use client";
import { Coffee, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PauseTestModalProps {
  open: boolean;
  onClose: () => void;
  onResume: () => void;
  onEnd: () => void;
}

export default function PauseTestModal({
  open,
  onClose,
  onResume,
  onEnd,
}: PauseTestModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Test Paused
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="bg-yellow-100 rounded-full p-4 mb-4">
              <Coffee className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-yellow-900 mb-2">
              Take a Break
            </h3>
            <p className="text-sm text-yellow-800">
              Your test progress has been saved. You can resume whenever you're
              ready or end the test to view your results.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900">
              <span className="font-bold">Note:</span> Your timer is paused.
              When you resume, the timer will continue from where you left off.
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              onClick={onResume}
              className="w-full bg-gray-800 hover:bg-gray-950 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Resume Test
            </Button>
            <Button
              onClick={onEnd}
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              End Test
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
