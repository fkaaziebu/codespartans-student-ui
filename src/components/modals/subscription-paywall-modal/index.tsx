"use client";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDataStore } from "@/common/hooks/use-data-store";

function resolveCta(message: string): {
  text: string;
  href: string | null;
} {
  if (message.includes("parent")) {
    return { text: "Ask your parent to subscribe", href: null };
  }
  if (message.includes("school") || message.includes("administrator")) {
    return { text: "Contact your administrator", href: null };
  }
  return { text: "View Plans", href: "/billing" };
}

export default function SubscriptionPaywallModal() {
  const { paywall, closePaywall } = useDataStore();
  const cta = resolveCta(paywall.message);

  return (
    <Dialog open={paywall.open} onOpenChange={closePaywall}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Subscription Required
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 flex items-start gap-4">
            <div className="bg-amber-100 rounded-full p-3 flex-shrink-0">
              <Lock className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-amber-900 mb-2">
                Access Locked
              </h3>
              <p className="text-sm text-amber-800">{paywall.message}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <Button onClick={closePaywall} variant="outline" className="flex-1">
              Close
            </Button>
            {cta.href ? (
              <Button asChild className="flex-1">
                <Link href={cta.href} onClick={closePaywall}>
                  {cta.text}
                </Link>
              </Button>
            ) : (
              <Button disabled className="flex-1">
                {cta.text}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
