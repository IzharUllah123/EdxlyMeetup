import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bot,
  Loader2,
  AlertTriangle,
  Trophy,
  RefreshCcw,
  Sparkles,
  BookOpen,
  Volume2,
  StopCircle
} from "lucide-react";
import { curriculumDatabase } from "@/data/curriculum";
import type { AILesson } from "@/data/curriculum";

// --- CONSTANTS ---

const PRAISE_WORDS = [
  "Terrific!", "Superb!", "Excellent!", "Correct!", "Great Job!", 
  "Amazing!", "Wonderful!", "Perfect!", "Brilliant!", "Outstanding!"
];

const LOADING_MESSAGES = [
  "Sharpening virtual pencils...",
  "Summoning the math wizards...",
  "Calculating the fun...",
  "Building your custom challenge...",
  "Double-checking the answers...",
  "Almost ready to learn!"
];

const FUN_FACTS = [
  "Did you know? Zero is the only number that can't be represented by Roman numerals.",
  "Did you know? A 'jiffy' is an actual unit of time: 1/100th of a second.",
  "Did you know? The number 4 is the only number with the same amount of letters as its value.",
  "Did you know? Oranges were originally green.",
  "Did you know? Honey never spoils. You can eat 3000-year-old honey!",
  "Did you know? Octopuses have three hearts.",
  "Did you know? 40 is the only number that is spelled with letters arranged in alphabetical order.",
  "Did you know? 'Forty' is the only number that is spelled in alphabetical order."
];

const LearningPage = () => {
  const { gradeId, subjectId, skillId } = useParams();

  // --- Data State ---
  const [lesson, setLesson] = useState<AILesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0); // For loading animation

  // --- Quiz State ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // --- Feedback & Speech State ---
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrectState, setIsCorrectState] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const subjectData = curriculumDatabase[gradeId as string]?.[subjectId as string];
  const skill = subjectData?.topics
    .flatMap((topic) => topic.skills)
    .find((s) => s.id === skillId);

  // --- Fetch Data ---
  useEffect(() => {
    if (!skill || !subjectData) {
      setError("Skill not found.");
      setIsLoading(false);
      return;
    }

    const fetchLesson = async () => {
      setIsLoading(true);
      try {
        // Relative path works for both Localhost (with vercel dev) and Production
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [skill, subjectData]);

  // --- Loading Animation Timer ---
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => prev + 1);
    }, 2500); // Change message every 2.5 seconds
    return () => clearInterval(interval);
  }, [isLoading]);

  // --- Speech Function ---
  const handleSpeak = () => {
    if (!lesson) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const currentQ = lesson.questions[currentQuestionIndex];
    let textToRead = "";
    
    if (currentQuestionIndex === 0) {
       textToRead += `Topic Overview: ${lesson.topicIntro}. `;
    }

    textToRead += `Question: ${currentQ.question}. `;
    textToRead += "Options: ";
    currentQ.options.forEach((opt) => {
       textToRead += `${opt}. `;
    });

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; 
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // --- Logic Functions ---

  const handleOptionSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || !lesson) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const currentQ = lesson.questions[currentQuestionIndex];
    const selectedLetter = selectedAnswer.split(/[).]/)[0].trim().toUpperCase();
    const correctLetter = currentQ.correctAnswer.trim().toUpperCase();
    
    const isCorrect = selectedLetter === correctLetter;
    setIsCorrectState(isCorrect);
    setIsAnswerChecked(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      const randomPraise = PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)];
      setFeedbackMessage(randomPraise);

      const praiseUtterance = new SpeechSynthesisUtterance(randomPraise);
      window.speechSynthesis.speak(praiseUtterance);

      setTimeout(() => {
         handleNextQuestion();
      }, 1500); 
    } else {
      setFeedbackMessage(`The correct answer was ${correctLetter}.`);
      const correctionUtterance = new SpeechSynthesisUtterance(`Not quite. The correct answer was ${correctLetter}.`);
      window.speechSynthesis.speak(correctionUtterance);
    }
  };

  const handleNextQuestion = () => {
    if (!lesson) return;
    
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      setIsCorrectState(null);
      setFeedbackMessage("");
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const backUrl = `/grade/${gradeId}/subject/${subjectId}`;

  return (
    <section className="py-8 bg-muted/30 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 max-w-3xl flex-grow flex flex-col">
        
        {/* Top Bar */}
        <div className="mb-4 flex justify-between items-center">
          <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
            <Link to={backUrl}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Skills
            </Link>
          </Button>
          {!isLoading && !quizCompleted && lesson && (
             <div className="flex items-center gap-4">
                <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Score: {Math.round((score / (currentQuestionIndex + 1)) * 100)}%
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                    Q: {currentQuestionIndex + 1}/{lesson.questions.length}
                </div>
             </div>
          )}
        </div>

        <Card className="border-primary/20 shadow-lg flex flex-col flex-grow overflow-hidden min-h-[600px]">
          <CardHeader className="bg-primary/5 border-b py-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center text-primary text-lg">
              <Bot className="w-6 h-6 mr-2" />
              {quizCompleted ? "Quiz Results" : `Topic: ${skill?.title}`}
            </CardTitle>

            {!isLoading && !quizCompleted && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSpeak}
                className={isSpeaking ? "text-red-500 animate-pulse" : "text-primary"}
                title="Read aloud"
              >
                {isSpeaking ? <StopCircle className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
            )}
          </CardHeader>
          
          <CardContent className="p-6 flex-grow flex flex-col relative">
            
            {/* 1. Enhanced Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center flex-grow h-full text-center p-8 animate-in fade-in duration-500">
                
                {/* Bouncing Icon */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  <div className="relative bg-white p-4 rounded-full shadow-xl border-2 border-primary/10">
                    <Bot className="w-12 h-12 text-primary animate-bounce" />
                  </div>
                </div>

                {/* Rotating Status Message */}
                <h3 className="text-2xl font-bold text-primary mb-2 transition-all duration-500">
                  {LOADING_MESSAGES[loadingStep % LOADING_MESSAGES.length]}
                </h3>

                {/* Progress Bar Visual */}
                <div className="w-64 h-2 bg-gray-100 rounded-full mt-4 mb-8 overflow-hidden">
                  <div className="h-full bg-primary animate-progress-infinite rounded-full" 
                       style={{ width: '100%', animation: 'progress 2s infinite ease-in-out' }} 
                  />
                </div>

                {/* Fun Fact Card */}
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl max-w-md shadow-sm transform transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-2 text-blue-600">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">While you wait</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-blue-900 font-medium italic text-lg">
                    "{FUN_FACTS[loadingStep % FUN_FACTS.length]}"
                  </p>
                </div>

              </div>
            )}

            {/* 2. Error State */}
            {error && (
              <div className="flex flex-col items-center justify-center flex-grow text-destructive">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p className="text-lg font-semibold">Something went wrong</p>
                <p className="text-sm mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                    Try Again
                </Button>
              </div>
            )}

            {/* 3. Quiz Interface */}
            {lesson && !isLoading && !quizCompleted && (
               <div className="flex flex-col h-full">
                  
                  {/* Topic Explanation Box */}
                  <div className="bg-blue-50 p-5 rounded-xl text-blue-900 mb-8 border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-sm uppercase tracking-wide text-blue-700">Concept Overview</h4>
                    </div>
                    <p className="text-base leading-relaxed opacity-90">
                        {lesson.topicIntro}
                    </p>
                  </div>

                  {/* Question Text */}
                  <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-4 leading-relaxed">
                          {lesson.questions[currentQuestionIndex].question}
                      </h3>
                      
                      {/* Options */}
                      <div className="space-y-3">
                          {lesson.questions[currentQuestionIndex].options.map((option) => {
                              let btnClass = "w-full justify-start text-left py-4 text-base transition-all duration-200 ";
                              const selectedLetter = option.split(/[).]/)[0].trim().toUpperCase();
                              const correctLetter = lesson.questions[currentQuestionIndex].correctAnswer.trim().toUpperCase();
                              
                              if (isAnswerChecked) {
                                  if (selectedLetter === correctLetter) {
                                      btnClass += "bg-green-100 border-green-500 text-green-900 font-medium"; 
                                  } else if (selectedAnswer === option) {
                                      btnClass += "bg-red-100 border-red-500 text-red-900";
                                  } else {
                                      btnClass += "opacity-50";
                                  }
                              } else {
                                  btnClass += selectedAnswer === option 
                                    ? "border-primary bg-primary/10 ring-2 ring-primary text-primary font-medium" 
                                    : "hover:bg-muted border-input";
                              }

                              return (
                                <Button
                                    key={option}
                                    variant="outline"
                                    className={btnClass}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={isAnswerChecked}
                                >
                                    {option}
                                </Button>
                              )
                          })}
                      </div>
                  </div>

                  {/* Feedback Overlay */}
                  {isAnswerChecked && (
                      <div className={`mt-auto p-6 rounded-xl mb-4 animate-in slide-in-from-bottom-4 fade-in duration-300 border-l-4 ${isCorrectState ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}>
                          <div className="flex items-center gap-3 mb-2">
                              {isCorrectState ? (
                                  <Sparkles className="w-6 h-6 text-green-600 fill-green-600" />
                              ) : (
                                  <AlertTriangle className="w-6 h-6 text-red-600" />
                              )}
                              <h4 className={`text-xl font-bold ${isCorrectState ? "text-green-700" : "text-red-700"}`}>
                                  {feedbackMessage}
                              </h4>
                          </div>
                          {!isCorrectState && (
                              <p className="text-sm text-red-800 mt-1">
                                  {lesson.questions[currentQuestionIndex].explanation}
                              </p>
                          )}
                      </div>
                  )}

                  {/* Bottom Action Button */}
                  <div className="mt-auto pt-4 border-t">
                      {!isAnswerChecked ? (
                          <Button 
                            className="w-full py-6 text-lg font-semibold shadow-lg hover:scale-[1.01] transition-transform" 
                            onClick={handleCheckAnswer}
                            disabled={!selectedAnswer}
                            size="lg"
                          >
                            Submit
                          </Button>
                      ) : (
                           !isCorrectState && (
                            <Button 
                                className="w-full py-6 text-lg" 
                                onClick={handleNextQuestion}
                                variant="secondary"
                            >
                                Got it
                            </Button>
                           )
                      )}
                  </div>
               </div>
            )}

            {/* 4. Results Screen */}
            {quizCompleted && lesson && (
                <div className="flex flex-col items-center justify-center flex-grow text-center animate-in zoom-in-95">
                    <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <Trophy className="w-16 h-16 text-yellow-600" />
                    </div>
                    
                    <h2 className="text-4xl font-bold mb-2 text-primary">Fantastic!</h2>
                    <p className="text-muted-foreground mb-8 text-lg">You have mastered this skill.</p>

                    <div className="w-full max-w-md bg-card border p-8 rounded-xl mb-8 shadow-sm">
                        <div className="text-7xl font-black text-primary mb-2 tracking-tighter">
                            {Math.round((score / lesson.questions.length) * 100)}
                        </div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">SmartScore</div>
                        <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                            <span>Correct: <span className="font-bold text-green-600">{score}</span></span>
                            <span>Total: <span className="font-bold">{lesson.questions.length}</span></span>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full max-w-md">
                        <Button variant="outline" className="flex-1 h-12" asChild>
                            <Link to={backUrl}>Back to Skills</Link>
                        </Button>
                        <Button className="flex-1 h-12" onClick={handleRetry}>
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Practice Again
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