import { Bot, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AIAssistantButton = () => {
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleAIAssistantClick = () => {
    if (!isConnected) {
      // Start AI Assistant session
      setIsConnected(true);
      toast({
        title: "AI Assistant",
        description: "AI Assistant is now ready to help you learn!",
      });
    } else if (!isListening) {
      // Start listening
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Ask me anything about your studies!",
      });
      
      // Simulate listening timeout
      setTimeout(() => {
        setIsListening(false);
        toast({
          title: "AI Assistant",
          description: "I'm here to help! Click to ask another question.",
        });
      }, 5000);
    } else {
      // Stop listening
      setIsListening(false);
    }
  };

  const getIcon = () => {
    if (isListening) return <MicOff className="h-6 w-6" />;
    if (isConnected) return <Mic className="h-6 w-6" />;
    return <Bot className="h-6 w-6" />;
  };

  const getButtonClass = () => {
    if (isListening) return "ai-assistant-btn listening";
    if (isConnected) return "ai-assistant-btn connected";
    return "ai-assistant-btn";
  };

  return (
    <Button
      onClick={handleAIAssistantClick}
      className={getButtonClass()}
      size="icon"
      aria-label="AI Assistant"
    >
      {getIcon()}
    </Button>
  );
};

export default AIAssistantButton;