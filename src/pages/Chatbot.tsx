import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BookCheck, SendHorizonal, User, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm CareerBot, your AI career guidance assistant. I can help answer your questions about career paths after 10th grade, education options, entrance exams, and job opportunities. What would you like to know?",
    sender: "bot",
    timestamp: new Date()
  }
];

const sampleQuestions = [
  "What are the different streams available after 10th?",
  "Tell me about engineering career paths and entrance exams",
  "What are the career options in medical field?",
  "Explain commerce stream career opportunities and scope",
  "What are the best courses in arts/humanities stream?",
  "Tell me about vocational courses after 10th"
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-brand-blue-700">
          Ask CareerBot
        </h1>
        <p className="mt-2 text-muted-foreground">
          Get answers to your questions about career paths, courses, exams, and more
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 py-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[85%] rounded-lg px-4 py-3 shadow-sm",
                        message.sender === "user" 
                          ? "bg-brand-blue-500 text-white rounded-tr-none"
                          : "bg-muted rounded-tl-none"
                      )}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <div 
                          className={cn(
                            "rounded-full p-1 flex-shrink-0",
                            message.sender === "user" 
                              ? "bg-brand-blue-400" 
                              : "bg-brand-orange-100"
                          )}
                        >
                          {message.sender === "user" ? (
                            <User className="h-3 w-3 text-white" />
                          ) : (
                            <BookCheck className="h-3 w-3 text-brand-orange-500" />
                          )}
                        </div>
                        <div className="text-xs opacity-80">
                          {message.sender === "user" ? "You" : "CareerBot"}
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-3 shadow-sm rounded-tl-none max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-brand-orange-100 p-1">
                          <BookCheck className="h-3 w-3 text-brand-orange-500" />
                        </div>
                        <div className="text-xs text-muted-foreground">CareerBot is typing</div>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your question here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-brand-blue-500 hover:bg-brand-blue-600 px-4"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-brand-orange-400" />
                <h3 className="font-medium">Quick Questions</h3>
              </div>
              <div className="space-y-2">
                {sampleQuestions.map((question, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-2 font-normal text-muted-foreground hover:text-foreground"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-brand-orange-400" />
                <h3 className="font-medium">Tips for Better Answers</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5 flex-shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Be specific about your interests and academic background</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5 flex-shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Ask one question at a time for clearer responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5 flex-shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Try the assessment for personalized career recommendations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const getBotResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase();
  
  if (normalizedInput.includes("different streams") || normalizedInput.includes("streams available")) {
    return "After 10th standard, you have four main streams:\n\n1. Science Stream:\n   • PCM (Physics, Chemistry, Math)\n   • PCB (Physics, Chemistry, Biology)\n   Key careers: Engineering, Medical, Research\n\n2. Commerce Stream:\n   • Subjects: Accounts, Business, Economics\n   Key careers: CA, Banking, Management\n\n3. Arts/Humanities:\n   • Subjects: History, Geography, Literature\n   Key careers: Law, Media, Teaching\n\n4. Vocational Education:\n   • Various skill-based courses\n   • ITI and Diploma programs\n\nWhich stream would you like to know more about?";
  }

  if (normalizedInput.includes("engineering")) {
    return "Engineering career paths after 10th:\n\n1. Preparation Path:\n   • Take PCM in 11th-12th\n   • Prepare for JEE Main/Advanced\n   • State level entrance exams\n\n2. B.Tech/BE Branches:\n   • Computer Science: ₹4-40 LPA\n   • Mechanical: ₹3-30 LPA\n   • Electronics: ₹3.5-35 LPA\n   • Civil: ₹3-25 LPA\n\n3. Alternative Paths:\n   • Diploma after 10th (3 years)\n   • Direct admission through management quota\n\n4. Required Skills:\n   • Strong mathematics\n   • Problem-solving ability\n   • Technical aptitude\n\nWould you like specific information about any branch?";
  }

  if (normalizedInput.includes("medical")) {
    return "Medical career paths after 10th:\n\n1. Main Path (MBBS):\n   • Take PCB in 11th-12th\n   • Clear NEET-UG entrance\n   • 5.5 years duration (including internship)\n   • Starting salary: ₹6-12 LPA\n\n2. Alternative Medical Courses:\n   • BDS (Dentistry): 5 years\n   • BAMS (Ayurveda): 5.5 years\n   • BHMS (Homeopathy): 5.5 years\n   • B.Pharm (Pharmacy): 4 years\n\n3. Paramedical Courses:\n   • Nursing (4 years)\n   • Lab Technology (3-4 years)\n   • Physiotherapy (4.5 years)\n\nWould you like details about any specific medical course?";
  }

  if (normalizedInput.includes("commerce")) {
    return "Commerce career opportunities:\n\n1. Professional Courses:\n   • CA: 3 levels, 4-5 years\n   • CS: 3 levels, 3-4 years\n   • CMA: 3 levels, 3-4 years\n\n2. Degree Programs:\n   • B.Com: 3 years\n   • BBA: 3 years\n   • Economics: 3 years\n\n3. Career Paths & Salaries:\n   • Investment Banking: ₹10-25 LPA\n   • Chartered Accountant: ₹8-15 LPA\n   • Financial Analyst: ₹6-12 LPA\n   • Business Consultant: ₹7-15 LPA\n\n4. Skills Required:\n   • Analytical thinking\n   • Financial acumen\n   • Communication\n\nWould you like more details about any specific career?";
  }

  if (normalizedInput.includes("arts") || normalizedInput.includes("humanities")) {
    return "Arts/Humanities courses and careers:\n\n1. Popular Courses:\n   • BA in Psychology\n   • BA in English\n   • BA in Economics\n   • Mass Communication\n   • Fashion Design\n   • Law (integrated programs)\n\n2. Career Opportunities:\n   • Content Writer: ₹3-12 LPA\n   • Teacher: ₹3-10 LPA\n   • Psychologist: ₹4-15 LPA\n   • Journalist: ₹3-15 LPA\n   • Lawyer: ₹5-30 LPA\n\n3. Required Skills:\n   • Communication\n   • Critical thinking\n   • Creativity\n   • Research ability\n\nWould you like specific information about any course?";
  }

  if (normalizedInput.includes("vocational")) {
    return "Vocational courses after 10th:\n\n1. ITI Courses (1-2 years):\n   • Electrician\n   • Mechanic\n   • Plumber\n   • Welder\n   Starting salary: ₹1.8-3 LPA\n\n2. Diploma Programs (3 years):\n   • Mechanical Engineering\n   • Civil Engineering\n   • Electronics\n   Starting salary: ₹2.5-4 LPA\n\n3. Other Vocational Courses:\n   • Animation & VFX\n   • Hotel Management\n   • Fashion Design\n   • Beauty & Wellness\n\n4. Benefits:\n   • Practical skills\n   • Quick employment\n   • Industry connections\n\nNeed more details about any specific course?";
  }

  return "I'm here to help guide you through various career paths after 10th grade. You can ask me about:\n\n- Different streams (Science, Commerce, Arts)\n- Diploma courses\n- Vocational training\n- Specific career fields\n- Entrance exams\n- Job opportunities\n\nFeel free to ask any specific questions!";
};

export default Chatbot;
