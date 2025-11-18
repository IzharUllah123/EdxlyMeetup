import { useState, useEffect, useRef } from "react";
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
  User,
} from "lucide-react";
import { curriculumDatabase } from "@/data/curriculum";
import type { AILesson } from "@/data/curriculum";

// Define a type for chat messages
interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

const LearningPage = () => {
  const { gradeId, subjectId, skillId } = useParams();

  // Lesson State
  const [lesson, setLesson] = useState<AILesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Scroll ref for chat
  const chatEndRef = useRef<HTMLDivElement>(null);

  const subjectData = curriculumDatabase[gradeId as string]?.[subjectId as string];
  
  const skill = subjectData?.topics
    .flatMap((topic) => topic.skills)
    .find((s) => s.id === skillId);

  // --- 1. FETCH LESSON ---
  useEffect(() => {
    if (!skill || !subjectData) {
      setError("Skill not found.");
      setIsLoading(false);
      return;
    }

    const fetchLesson = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/generate-lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skillTitle: skill.title,
            gradeTitle: subjectData.title,
          }),
        });

        if (!response.ok) throw new Error("Failed to get a response");

        const data: AILesson = await response.json();
        setLesson(data);
        
        // Add the initial explanation to chat history
        setChatHistory([
          { role: "ai", text: data.explanation }
        ]);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [skill, subjectData]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // --- 2. FIX: ROBUST ANSWER CHECKING ---
  const handleAnswerSubmit = (option: string) => {
    if (!lesson) return;
    
    // Split by ')' OR '.' to handle "A) Text" or "A. Text"
    // Trim whitespace to be safe
    const userSelectedLetter = option.split(/[).]/)[0].trim().toUpperCase();
    const correctLetter = lesson.correctAnswer.trim().toUpperCase();

    setSelectedAnswer(option);
    
    if (userSelectedLetter === correctLetter) {
      setIsCorrect(true);
      setChatHistory(prev => [...prev, { role: "ai", text: "That's correct! Great job! 🎉 Do you have any other questions?" }]);
    } else {
      setIsCorrect(false);
      setChatHistory(prev => [...prev, { role: "ai", text: `Not quite. The correct answer was ${correctLetter}. Let me know if you need help understanding why!` }]);
    }
  };

  // --- 3. NEW: HANDLE CHAT SUBMIT ---
  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput(""); // Clear input
    setChatHistory(prev => [...prev, { role: "user", text: userMessage }]);
    setIsChatLoading(true);

    try {
      // You need to create this API route (see instructions below)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          context: `Skill: ${skill?.title}. Previous Explanation: ${lesson?.explanation}`
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: "ai", text: data.reply }]);

    } catch (err) {
      setChatHistory(prev => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const backUrl = `/grade/${gradeId}/subject/${subjectId}`;

  return (
    <section className="py-8 bg-muted/30 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 max-w-3xl flex-grow flex flex-col">
        <div className="mb-4">
          <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
            <Link to={backUrl}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Skills
            </Link>
          </Button>
        </div>

        <Card className="border-primary/20 shadow-lg flex flex-col flex-grow overflow-hidden">
          <CardHeader className="bg-primary/5 border-b py-4">
            <CardTitle className="flex items-center text-primary text-lg">
              <Bot className="w-6 h-6 mr-2" />
              AI Tutor: {skill?.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col flex-grow h-[600px]"> 
            {/* Scrollable Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p>Preparing your lesson...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center h-full text-destructive">
                  <AlertTriangle className="w-8 h-8 mb-2" />
                  <p>{error}</p>
                </div>
              )}

              {lesson && !isLoading && (
                <>
                  {/* 1. The Lesson/Quiz Section (Always at top) */}
                  <div className="bg-background rounded-lg border p-4 shadow-sm space-y-4">
                     <div className="prose prose-sm max-w-none">
                        <p className="text-lg leading-relaxed">{lesson.explanation}</p>
                     </div>

                     <div className="mt-6 p-4 bg-muted/50 rounded-md">
                        <p className="font-semibold mb-3">Practice Question:</p>
                        <p className="mb-4">{lesson.question}</p>
                        <div className="grid gap-2">
                          {lesson.options.map((option) => (
                            <Button
                              key={option}
                              variant={selectedAnswer === option ? (isCorrect ? "default" : "destructive") : "outline"}
                              className={`w-full justify-start text-left h-auto py-3 px-4 ${
                                selectedAnswer === option && isCorrect ? "bg-green-600 hover:bg-green-700" : ""
                              }`}
                              onClick={() => !selectedAnswer && handleAnswerSubmit(option)}
                              disabled={selectedAnswer !== null}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                        {/* Feedback Message */}
                         {selectedAnswer && (
                            <div className={`mt-4 p-3 rounded-md text-sm font-medium ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {isCorrect 
                                ? "Correct! Good job!" 
                                : `Not quite. The correct answer is ${lesson.correctAnswer}.`}
                            </div>
                         )}
                     </div>
                  </div>

                  {/* 2. Chat History */}
                  {chatHistory.slice(1).map((msg, index) => ( // Skip first msg as it's the explanation
                    <div
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isChatLoading && (
                    <div className="flex justify-start">
                       <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                          <Loader2 className="w-4 h-4 animate-spin" />
                       </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t bg-background">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleChatSubmit(); }}
                className="flex gap-2"
              >
                <Input 
                  placeholder="Ask a question about this topic..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isLoading || isChatLoading}
                />
                <Button type="submit" disabled={isLoading || isChatLoading || !chatInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LearningPage;