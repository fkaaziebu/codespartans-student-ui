"use client";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoursePricingProps {
  price?: number;
  currency?: string;
  isSubscribed?: boolean;
  isInCart: boolean;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onEnrollNow: () => void;
  onStartLearning: () => void;
}

export default function CoursePricing({
  price,
  currency,
  isSubscribed,
  isInCart,
  onAddToCart,
  onRemoveFromCart,
  onEnrollNow,
  onStartLearning,
}: CoursePricingProps) {
  const formatPrice = (price?: number, currency?: string) => {
    if (price === undefined || price === null || price === 0) return "Free";
    return `${currency || "$"}${price.toFixed(2)}`;
  };

  const isFree = !price || price === 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      {/* Action Buttons */}
      <div className="p-6">
        {isSubscribed ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="bg-green-600 rounded-full p-2">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-green-900">
                  You're enrolled!
                </p>
                <p className="text-xs text-green-700">Start learning now</p>
              </div>
            </div>
            <Button
              onClick={onStartLearning}
              className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-base"
            >
              Start Learning
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={onEnrollNow}
              className="w-full bg-gray-800 hover:bg-gray-950 py-6 text-base"
            >
              {isFree ? "Enroll for Free" : "Enroll Now"}
            </Button>
          </div>
        )}
      </div>

      {/* What's Included */}
      <div className="border-t border-gray-200 p-6">
        <h4 className="text-sm font-bold text-gray-950 mb-3">
          This course includes:
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>Lifetime access</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>All course materials</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>Practice questions</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>Certificate of completion</span>
          </li>
        </ul>
      </div>

      {/* Money Back Guarantee */}
      {!isFree && !isSubscribed && (
        <div className="border-t border-gray-200 bg-blue-50 p-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 rounded-full p-2 mt-0.5">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-900 mb-1">
                30-Day Money-Back Guarantee
              </p>
              <p className="text-xs text-blue-700">
                Full refund if you're not satisfied with the course
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
