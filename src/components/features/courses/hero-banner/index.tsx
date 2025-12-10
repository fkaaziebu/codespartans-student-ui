import { Button } from "@/components/ui/button";

// Hero Banner Component
export const HeroBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-orange-500 mt-12 overflow-hidden">
      <div className="flex items-center justify-between px-8 py-12 min-h-64">
        <div className="max-w-sm">
          <h1 className="text-4xl font-bold text-white mb-4">
            Learn more, spend less — Cyber Monday Sale from $9.99
          </h1>
          <p className="text-gray-100 mb-6">
            Sitewide savings on thousands of courses. Ends Dec 1.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium">
            Save now
          </Button>
        </div>
        <div className="hidden lg:block">
          <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
};
