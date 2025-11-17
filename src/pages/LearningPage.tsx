import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Bot,
  Send,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { curriculumDatabase } from "@/data/curriculum"; // <-- Import shared data
import type { AILesson } from "@/data/curriculum"; // <-- Import shared type

const LearningPage = () => {
  // 1. Get IDs from the URL
  const { gradeId, subjectId, skillId } = useParams();

  // 2. State for this page
  const [lesson, setLesson] = useState<AILesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 3. Find the skill title from the database
  const subjectData =
    curriculumDatabase[gradeId as string]?.[subjectId as string];
  
  const skill = subjectData?.topics
    .flatMap((topic) => topic.skills)
    .find((s) => s.id === skillId);

  // 4. Call the AI API on page load
  useEffect(() => {
    if (!skill || !subjectData) {
      setError("Skill not found.");
      setIsLoading(false);
      return;
    }

    const fetchLesson = async () => {
      setIsLoading(true);
      setError(null);
      setLesson(null);
      setSelectedAnswer(null);
      setIsCorrect(null);

      try {
        const response = await fetch("/api/generate-lesson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skillTitle: skill.title,
            gradeTitle: subjectData.title,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get a response from the AI");
        }

        const data: AILesson = await response.json();
        setLesson(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [skill, subjectData]); // Re-run if these change

  // 5. Check Answer
  const handleAnswerSubmit = (option: string) => {
    if (!lesson) return;
    const answerLetter = option.split(".")[0];
    setSelectedAnswer(option);
    setIsCorrect(answerLetter === lesson.correctAnswer);
  };

  // 6. Get the "Back" link URL
  const backUrl = `/grade/${gradeId}/subject/${subjectId}`;

  return (
    <section className="py-16 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link to={backUrl}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Skills
            </Link>
          </Button>
        </div>

        {/* --- AI LEARNING ZONE --- */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="flex items-center text-primary">
              <Bot className="w-5 h-5 mr-2" />
              AI Tutor
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[400px] p-6">
            {/* Loading State */}
            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="font-semibold">Generating your lesson...</p>
                <p className="text-sm text-muted-foreground">
                  The AI is preparing your content.
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
                <p className="font-semibold">Error</p>
                <p className="text-sm text-muted-foreground">
                  {error}. Please try again.
                </p>
              </div>
            )}

            {/* Success State (Lesson Loaded) */}
            {lesson && !isLoading && (
              <div className="flex flex-col h-full animate-in fade-in duration-300">
                <h3 className="font-semibold text-lg mb-2">{skill?.title}</h3>

                <p className="text-sm p-3 bg-muted rounded-md mb-4">
                  {lesson.explanation}
                </p>

                <p className="text-sm font-medium mb-2">Practice Question:</p>
                <Card className="p-4">
                  <p className="mb-4 font-semibold">{lesson.question}</p>
                  <div className="space-y-2">
                    {lesson.options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className={`w-full justify-start ${
                          selectedAnswer === option
                            ? isCorrect
                              ? "bg-green-100 border-green-300 hover:bg-green-100"
                              : "bg-red-100 border-red-300 hover:bg-red-100"
                            : ""
                        }`}
                        onClick={() => handleAnswerSubmit(option)}
                        disabled={selectedAnswer != null}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </Card>

                {isCorrect === true && (
                  <div className="p-3 bg-green-100 border border-green-300 rounded-md text-sm text-green-800 mt-4">
                    That's right! Great job.
                  </div>
                )}
                {isCorrect === false && (
                  <div className="p-3 bg-red-100 border-red-300 rounded-md text-sm text-red-800 mt-4">
                    Not quite. The correct answer was {lesson.correctAnswer}.
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t mt-auto">
                  <Input placeholder="Ask a follow-up question..." />
                  <Button>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LearningPage;