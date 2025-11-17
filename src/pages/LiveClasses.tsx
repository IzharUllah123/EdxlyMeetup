import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  MessageCircle, 
  Users, 
  Settings, 
  Phone, 
  PhoneOff,
  Monitor,
  MoreVertical,
  Send,
  Volume2,
  VolumeX
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  role: "admin" | "tutor" | "student";
  videoEnabled: boolean;
  audioEnabled: boolean;
  isPresenting: boolean;
}

const LiveClasses = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Admin", message: "Welcome to today's math lesson!", time: "2:00 PM", role: "admin" },
    { id: 2, sender: "John (Student)", message: "Thank you! I'm ready to learn.", time: "2:01 PM", role: "student" },
    { id: 3, sender: "Ms. Smith (Tutor)", message: "Let's start with addition problems.", time: "2:02 PM", role: "tutor" }
  ]);

  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "Admin (You)", role: "admin", videoEnabled: true, audioEnabled: true, isPresenting: false },
    { id: "2", name: "Ms. Smith", role: "tutor", videoEnabled: true, audioEnabled: true, isPresenting: true },
    { id: "3", name: "John", role: "student", videoEnabled: true, audioEnabled: true, isPresenting: false },
    { id: "4", name: "Emma", role: "student", videoEnabled: false, audioEnabled: true, isPresenting: false }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Admin (You)",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role: "admin" as const
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const joinCall = () => {
    setIsInCall(true);
  };

  const leaveCall = () => {
    setIsInCall(false);
  };

  if (!isInCall) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Live Classes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join interactive learning sessions with tutors and students from around the world
            </p>
          </div>

          {/* Upcoming Classes */}
          <div className="grid gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Pre-K Math: Numbers and Counting</CardTitle>
                    <CardDescription>Learn basic number recognition and counting skills</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Live Now
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>4 participants</span>
                    </div>
                    <div>2:00 PM - 3:00 PM</div>
                    <div>Ms. Smith (Tutor)</div>
                  </div>
                  <Button onClick={joinCall} className="btn-hero">
                    Join Class
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">1st Grade Language Arts: Reading Comprehension</CardTitle>
                    <CardDescription>Practice reading skills and comprehension strategies</CardDescription>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>6 registered</span>
                    </div>
                    <div>4:00 PM - 5:00 PM</div>
                    <div>Mr. Johnson (Tutor)</div>
                  </div>
                  <Button variant="outline">
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Pre-K Math: Numbers and Counting</h1>
            <p className="text-sm text-muted-foreground">with Ms. Smith • 4 participants</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Live
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4 bg-muted/20">
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Main Presenter View */}
              <div className="col-span-2 lg:col-span-1 relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  poster="/placeholder.svg"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="bg-black/50 px-3 py-1 rounded-full text-sm">
                    Ms. Smith (Tutor) - Presenting
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary">
                    <Monitor className="h-4 w-4 mr-1" />
                    Share Screen
                  </Button>
                </div>
              </div>

              {/* Participant Videos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {participants.slice(1).map((participant) => (
                  <div key={participant.id} className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    {participant.videoEnabled ? (
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        poster="/placeholder.svg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                            {participant.name.charAt(0)}
                          </div>
                          <p className="text-sm text-muted-foreground">{participant.name}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="bg-black/50 px-2 py-1 rounded text-xs flex items-center gap-1">
                        {participant.name}
                        {!participant.audioEnabled && <MicOff className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="border-t bg-card p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isVideoEnabled ? "default" : "destructive"}
                size="lg"
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              >
                {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={isAudioEnabled ? "default" : "destructive"}
                size="lg"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              >
                {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button variant="outline" size="lg">
                <Monitor className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="destructive" size="lg" onClick={leaveCall}>
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 border-l bg-card flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Class Chat</h3>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${
                        msg.role === "admin" ? "text-primary" :
                        msg.role === "tutor" ? "text-secondary" :
                        "text-foreground"
                      }`}>
                        {msg.sender}
                      </span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-muted-foreground">{msg.message}</p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;