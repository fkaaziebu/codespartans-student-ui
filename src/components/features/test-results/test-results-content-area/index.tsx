"use client";
import { RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTestStats } from "@/common/hooks/queries";
import { Button } from "@/components/ui/button";
import { QuestionTabs } from "./question-tabs";
import { RetestModal } from "./retest-modal";
import { ScoreCard } from "./score-card";

export const TestResultsContentArea = () => {
  const [retestOpen, setRetestOpen] = useState(false);
  const [retestScore, setRetestScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { testId } = useParams<{ testId: string }>();
  const { data: testData, testStats } = useTestStats();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await testStats({ variables: { testId } });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <p className="text-gray-600">Failed to load test results.</p>
      </div>
    );
  }

  const submittedAnswers = testData.submitted_answers ?? [];
  const questions = testData.test_suite?.questions ?? [];
  const totalQuestions = questions.length;
  const pendingCount = submittedAnswers.filter(
    (a) => a.is_marked === false,
  ).length;
  const correctCount = submittedAnswers.filter((a) => a.is_correct === true).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-12">
        {pendingCount > 0 && (
          <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-800">
              ⏳ {pendingCount} question{pendingCount > 1 ? "s are" : " is"} still being marked by AI
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              Your score may change once marking is complete. Refresh the page to check for updates.
            </p>
          </div>
        )}
        <ScoreCard score={correctCount} total={totalQuestions} />

        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setRetestOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Retest
          </Button>
          {retestScore !== null && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1 flex items-center justify-between">
              <span className="text-green-800 font-medium">
                Retest Score: {retestScore}/{submittedAnswers.length}
              </span>
              <span className="text-sm text-green-700">
                {((retestScore / submittedAnswers.length) * 100).toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        <QuestionTabs
          questions={questions}
          submittedAnswers={submittedAnswers}
          correctCount={correctCount}
          totalQuestions={totalQuestions}
        />
      </div>

      <RetestModal
        isOpen={retestOpen}
        // @ts-expect-error extended test type
        testStats={testData}
        onClose={() => setRetestOpen(false)}
        onRetestComplete={(score) => setRetestScore(score)}
      />
    </div>
  );
};
