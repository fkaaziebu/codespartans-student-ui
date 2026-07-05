"use client";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
  deletionScheduledFor?: string;
}

function formatPurgeDate(iso?: string) {
  if (iso) {
    try {
      return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      // fall through to calculated date
    }
  }
  return new Date(Date.now() + 90 * 86_400_000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
  loading,
  deletionScheduledFor,
}: DeleteAccountModalProps) {
  const purgeDate = formatPurgeDate(deletionScheduledFor);

  return (
    <Dialog open={open} onOpenChange={loading ? undefined : onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Delete Account?
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-red-900 mb-2">
                This action schedules permanent deletion
              </h3>
              <p className="text-sm text-red-800">
                Your account will be deactivated immediately. All personal data
                will be permanently deleted on <strong>{purgeDate}</strong>.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              What happens to your data
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>
                <span className="text-red-600 font-semibold">Deleted:</span>{" "}
                Profile, email, phone, passwords &amp; tokens
              </li>
              <li>
                <span className="text-amber-600 font-semibold">Anonymised:</span>{" "}
                Test scores &amp; performance stats (kept for analytics, no
                longer linked to you)
              </li>
              <li>
                <span className="text-gray-500 font-semibold">Retained:</span>{" "}
                Subscription &amp; payment references (7 years — financial
                compliance)
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900">
              <span className="font-bold">Changed your mind?</span> Log in any
              time before <strong>{purgeDate}</strong> and use the OTP sent to
              your email to cancel.
            </p>
          </div>

          <div className="flex gap-3 mt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete My Account"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
