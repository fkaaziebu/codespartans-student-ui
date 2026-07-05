import { Question, SubmittedAnswer } from "@/common/graphql/generated/graphql";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { QuestionReviewCard } from "./question-review-card";

const byQuestionNumber = (a: SubmittedAnswer, b: SubmittedAnswer) =>
  (a.question?.question_number || 0) - (b.question?.question_number || 0);

export const QuestionTabs = ({
  questions,
  submittedAnswers,
  correctCount,
  totalQuestions,
}: {
  questions: Question[];
  submittedAnswers: SubmittedAnswer[];
  correctCount: number;
  totalQuestions: number;
}) => {
  const flaggedCount = submittedAnswers.filter((a) => a.is_flagged).length;

  return (
    <Tabs defaultValue="all" className="mb-8">
      <TabsList className="border-b">
        <TabsTrigger value="all">
          All Questions ({totalQuestions})
        </TabsTrigger>
        <TabsTrigger value="correct">Correct ({correctCount})</TabsTrigger>
        <TabsTrigger value="incorrect">
          Incorrect ({totalQuestions - correctCount})
        </TabsTrigger>
        <TabsTrigger value="flagged">Flagged ({flaggedCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        {questions.map((question) => (
          <QuestionReviewCard
            key={question.id}
            question={question}
            answer={submittedAnswers.find(
              (ans) => ans.question_id === question.id,
            )}
          />
        ))}
      </TabsContent>

      <TabsContent value="correct" className="mt-6">
        {[...submittedAnswers]
          .sort(byQuestionNumber)
          .filter((a) => a.answer_provided === a.question?.correct_answer)
          .map((answer) => (
            <QuestionReviewCard
              key={answer.id}
              question={answer.question || undefined}
              answer={answer}
            />
          ))}
      </TabsContent>

      <TabsContent value="incorrect" className="mt-6">
        {questions
          .filter(
            (question) =>
              question.correct_answer !==
              submittedAnswers.find((sa) => sa.question_id === question.id)
                ?.answer_provided,
          )
          .map((question) => (
            <QuestionReviewCard
              key={question.id}
              question={question}
              answer={submittedAnswers.find(
                (ans) => ans.question_id === question.id,
              )}
            />
          ))}
      </TabsContent>

      <TabsContent value="flagged" className="mt-6">
        {[...submittedAnswers]
          .sort(byQuestionNumber)
          .filter((a) => a.is_flagged)
          .map((answer) => (
            <QuestionReviewCard
              key={answer.id}
              question={answer.question || undefined}
              answer={answer}
            />
          ))}
      </TabsContent>
    </Tabs>
  );
};
