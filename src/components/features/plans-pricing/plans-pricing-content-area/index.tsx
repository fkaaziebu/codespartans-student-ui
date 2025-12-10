"use client";
import { Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Plan Card Component
interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  description: string;
  users: string;
  price?: string;
  priceSubtext?: string;
  buttonText: string;
  buttonAction: "subscribe" | "try" | "contact";
  features: PlanFeature[];
  highlighted?: boolean;
}

const PlanCard = ({ plan }: { plan: Plan }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      {/* Top Border */}
      <div
        className={`h-1 ${plan.highlighted ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-purple-600"}`}
      ></div>

      {/* Card Content */}
      <div className="p-8">
        {/* Plan Header */}
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

        {/* User Count */}
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <Users size={18} />
          <span className="text-sm">{plan.users}</span>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          {plan.price ? (
            <>
              <div className="text-3xl font-bold text-gray-900">
                {plan.price}
              </div>
              {plan.priceSubtext && (
                <p className="text-sm text-gray-600 mt-1">
                  {plan.priceSubtext}
                </p>
              )}
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-900 mb-1">
              Contact sales for pricing
            </div>
          )}
        </div>

        {/* Call to Action Button */}
        <Button
          className={`w-full py-3 px-4 rounded-lg font-bold mb-6 text-white transition-all ${
            plan.buttonAction === "contact"
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {plan.buttonText}
          <span className="ml-2">→</span>
        </Button>

        {/* Features List */}
        <div className="space-y-3 border-t pt-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
export const PlansPricingContentArea = () => {
  const plans: Plan[] = [
    {
      name: "Personal Plan",
      description: "For you",
      users: "Individual",
      price: "Starting at $10.00 per month",
      priceSubtext: "Billed monthly or annually. Cancel anytime.",
      buttonText: "Start subscription",
      buttonAction: "subscribe",
      features: [
        { text: "Access to 26,000+ top courses" },
        { text: "Certification prep" },
        { text: "Goal-focused recommendations" },
        { text: "AI-powered coding exercises" },
      ],
    },
    {
      name: "Team Plan",
      description: "For your team",
      users: "2 to 50 people",
      price: "$30.00 a month per user",
      priceSubtext: "Billed annually. Cancel anytime.",
      buttonText: "Try it free",
      buttonAction: "try",
      features: [
        { text: "Access to 13,000+ top courses" },
        { text: "Certification prep" },
        { text: "Goal-focused recommendations" },
        { text: "AI-powered coding exercises" },
        { text: "Analytics and adoption reports" },
      ],
      highlighted: true,
    },
    {
      name: "Enterprise Plan",
      description: "For your whole organization",
      users: "More than 20 people",
      price: undefined,
      priceSubtext: undefined,
      buttonText: "Request a demo",
      buttonAction: "contact",
      features: [
        { text: "Access to 30,000+ top courses" },
        { text: "Certification prep" },
        { text: "Goal-focused recommendations" },
        { text: "AI-powered coding exercises" },
        { text: "Advanced analytics and insights" },
        { text: "Dedicated customer success team" },
        { text: "International course collection featuring 15 languages" },
        { text: "Customizable content" },
        { text: "Hands-on tech training with add-on" },
        { text: "Strategic implementation services with add-on" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose a plan for success
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't want to buy courses one by one? Pick a plan to help you, your
            team, or your organization achieve outcomes faster.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>

        {/* Footer Section */}
        <div className="text-center mt-16 pt-12 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All plans include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600">Customer support</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                30-day
              </div>
              <p className="text-gray-600">Money-back guarantee</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                Mobile
              </div>
              <p className="text-gray-600">Learning apps</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
              <p className="text-gray-600">Lifetime access</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-12 border-t max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I change my plan?
              </h3>
              <p className="text-gray-600">
                Yes, you can change or cancel your subscription at any time. If
                you upgrade, you'll be charged the difference for the remainder
                of your current billing cycle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Team and Enterprise plans offer a free trial period. Personal
                Plan starts at $10/month. All plans are backed by our 30-day
                money-back guarantee.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and other digital
                payment methods. Billing can be done monthly or annually.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do I get a discount for annual billing?
              </h3>
              <p className="text-gray-600">
                Yes! When you choose annual billing instead of monthly, you'll
                receive a discount. Check your plan details for specific
                savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
