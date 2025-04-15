
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

// Sample FAQ data for quick questions
const sampleQuestions = [
  "What are my options after 10th grade?",
  "Which stream should I choose - Science, Commerce, or Arts?",
  "What are the best career options in medical field?",
  "How can I prepare for engineering entrance exams?",
  "What skills do I need for a career in IT?",
  "What diploma courses are available after 10th?",
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
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate bot response with delay
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

// Function to generate bot responses based on user input
const getBotResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase();
  
  // After 10th options
  if (normalizedInput.includes("after 10th") || normalizedInput.includes("options after 10th") || normalizedInput.includes("after 10")) {
    return "After completing 10th grade, you have several options:\n\n1. Higher Secondary Education (11th & 12th):\n   - Science Stream (PCM/PCB)\n   - Commerce Stream\n   - Arts/Humanities Stream\n\n2. Diploma Courses:\n   - Polytechnic diploma in engineering (3 years)\n   - Other diploma programs in various fields\n\n3. ITI Courses:\n   - 1-2 year vocational training programs\n\n4. Vocational Courses:\n   - Certificate programs in various skills\n\nThe best choice depends on your interests, strengths, and long-term career goals. Would you like more specific information about any of these paths?";
  }
  
  // Stream selection advice
  if (normalizedInput.includes("which stream") || normalizedInput.includes("science or commerce") || normalizedInput.includes("commerce or arts") || normalizedInput.includes("choose stream")) {
    return "Choosing between Science, Commerce, and Arts streams depends on your interests and career goals:\n\nScience: Ideal if you enjoy subjects like Physics, Chemistry, Biology, or Mathematics and are interested in careers in engineering, medicine, research, or technology.\n\nCommerce: Great if you have an interest in business, economics, accounting, or finance and want to pursue careers in management, banking, entrepreneurship, etc.\n\nArts/Humanities: Excellent if you enjoy subjects like history, languages, psychology, or sociology and are interested in careers in law, journalism, teaching, social work, etc.\n\nWould you like me to help you evaluate which stream might suit you best based on your interests?";
  }
  
  // Medical career guidance
  if (normalizedInput.includes("medical") || normalizedInput.includes("doctor") || normalizedInput.includes("mbbs") || normalizedInput.includes("healthcare")) {
    return "Career options in the medical field after 10th include:\n\n1. After 10th: Choose Science stream with Biology (PCB) in 11th-12th\n\n2. After 12th: \n   - MBBS (through NEET exam)\n   - BDS (Dentistry)\n   - BAMS (Ayurveda)\n   - BHMS (Homeopathy)\n   - B.Pharm (Pharmacy)\n   - BSc Nursing\n   - Allied health sciences (Physiotherapy, Lab Technology, etc.)\n\n3. Skills needed: Strong aptitude in biology and chemistry, good memory, compassion, and the ability to handle pressure.\n\nWould you like more specific information about entrance exams, preparation, or any specific medical profession?";
  }
  
  // Engineering career guidance
  if (normalizedInput.includes("engineering") || normalizedInput.includes("engineer") || normalizedInput.includes("b.tech") || normalizedInput.includes("jee")) {
    return "For pursuing engineering, your path would typically be:\n\n1. After 10th: Choose Science stream with Mathematics (PCM) in 11th-12th\n\n2. Preparation for entrance exams:\n   - JEE Main and Advanced for IITs/NITs\n   - State-level engineering entrance exams\n\n3. Engineering options after 12th:\n   - B.Tech/BE (4 years)\n   - Diploma in Engineering (3 years, also directly after 10th)\n\n4. Popular branches: Computer Science, Mechanical, Electrical, Civil, Electronics, etc.\n\n5. Key skills: Strong mathematical ability, analytical thinking, problem-solving, and creativity.\n\nWould you like specific information about entrance exam preparation or particular engineering branches?";
  }
  
  // IT career guidance
  if (normalizedInput.includes("it") || normalizedInput.includes("software") || normalizedInput.includes("coding") || normalizedInput.includes("programmer") || normalizedInput.includes("computer")) {
    return "For a career in IT and software, the skills you would need include:\n\n1. Technical Skills:\n   - Programming languages (Python, Java, C++, JavaScript, etc.)\n   - Database management\n   - Web development\n   - Mobile app development\n   - Cloud computing\n   - Cybersecurity knowledge\n\n2. Soft Skills:\n   - Problem-solving abilities\n   - Logical thinking\n   - Continuous learning aptitude\n   - Teamwork and communication\n\n3. Education path options:\n   - Science (PCM) in 11th-12th → B.Tech in Computer Science\n   - Direct diploma in Computer Science after 10th\n   - BCA after 12th (any stream)\n\n4. Alternative learning paths include coding bootcamps and online certifications.\n\nWould you like to know more about specific IT career paths or educational options?";
  }
  
  // Diploma courses
  if (normalizedInput.includes("diploma") || normalizedInput.includes("polytechnic")) {
    return "Diploma courses available after 10th include:\n\n1. Engineering Diplomas (3 years):\n   - Mechanical Engineering\n   - Civil Engineering\n   - Electrical Engineering\n   - Computer Science & Engineering\n   - Electronics & Communication\n\n2. Other Technical Diplomas:\n   - Pharmacy (D.Pharm)\n   - Hotel Management\n   - Fashion Design\n   - Interior Design\n   - Agriculture\n\n3. Advantages of diplomas:\n   - Shorter duration compared to degrees\n   - More practical/hands-on approach\n   - Direct entry to second year B.Tech after diploma\n   - Earlier entry into the job market\n\nWould you like more information about admission processes or any specific diploma program?";
  }
  
  // Commerce or business related
  if (normalizedInput.includes("commerce") || normalizedInput.includes("business") || normalizedInput.includes("ca") || normalizedInput.includes("accounting") || normalizedInput.includes("mba")) {
    return "Following a commerce path after 10th:\n\n1. 11th-12th: Commerce stream with subjects like Accountancy, Business Studies, Economics, and Mathematics\n\n2. After 12th options:\n   - B.Com (Bachelor of Commerce)\n   - BBA (Bachelor of Business Administration)\n   - Chartered Accountancy (CA)\n   - Cost & Management Accountancy (CMA)\n   - Company Secretary (CS)\n   - Bachelor's in Economics or Statistics\n\n3. Higher studies: MBA, M.Com, specialized masters\n\n4. Career options: Accounting, finance, investment banking, marketing, entrepreneurship, consulting, etc.\n\nWould you like specific details about any of these courses or professions?";
  }
  
  // Arts and humanities
  if (normalizedInput.includes("arts") || normalizedInput.includes("humanities") || normalizedInput.includes("ba ") || normalizedInput.includes("literature") || normalizedInput.includes("history")) {
    return "The Arts/Humanities path after 10th offers diverse opportunities:\n\n1. 11th-12th: Arts stream with subjects like History, Political Science, Geography, Psychology, Sociology, Languages, etc.\n\n2. After 12th options:\n   - BA in various subjects (English, History, Psychology, etc.)\n   - BFA (Fine Arts)\n   - BDesign (Design)\n   - BJournalism & Mass Communication\n   - Bachelor's in Hotel Management\n   - Law (integrated BA LLB)\n   - Bachelor's in Social Work\n\n3. Career paths: Teaching, journalism, content creation, law, civil services, psychology, design, social work, hospitality, and many more.\n\nWould you like me to elaborate on specific career opportunities in the arts field?";
  }
  
  // Default response for other questions
  return "Thank you for your question. I'm here to provide guidance on various career paths after 10th grade. For more specific information about educational options, entrance exams, or career opportunities, feel free to ask detailed questions.\n\nYou can also explore our career paths section on the website for comprehensive information about different fields, or take our career assessment to get personalized recommendations based on your interests and aptitude.";
};

export default Chatbot;
