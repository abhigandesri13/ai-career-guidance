
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Search, ArrowRight, ArrowLeft, BookOpen, BookCheck, GraduationCap, Code, Briefcase, Heart, Palette, Calculator, Trophy, Lightbulb } from "lucide-react";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<any[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: answer }));
  };

  const goToNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    // Simple scoring mechanism to match answers to career categories
    const scores: Record<string, number> = {
      science: 0,
      engineering: 0,
      medical: 0,
      commerce: 0,
      arts: 0,
      design: 0,
      technical: 0,
      vocational: 0,
    };

    // Map answers to categories and calculate scores
    Object.entries(answers).forEach(([questionIdx, answer]) => {
      const question = questions[parseInt(questionIdx)];
      const categories = question.categoryMapping[answer];
      
      if (categories) {
        categories.forEach((category: string) => {
          scores[category] = (scores[category] || 0) + 1;
        });
      }
    });

    // Sort categories by score and get top matches
    const sortedResults = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0)
      .slice(0, 3)
      .map(([category, _]) => careerRecommendations[category]);

    setResults(sortedResults);
    setHasCompleted(true);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults([]);
    setHasCompleted(false);
  };

  // Render intro content
  if (currentStep === 0 && !answers[0]) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-blue-700">
            Find Your Ideal Career Path
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Answer a few questions about your interests and preferences to discover career paths that might suit you.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-brand-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">Career Path Assessment</h2>
            <p className="text-center text-muted-foreground mb-6">
              This assessment contains {questions.length - 1} questions about your interests, preferences, and aptitudes. 
              Your answers will help us recommend suitable career paths for you to explore.
            </p>
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-brand-blue-500 hover:bg-brand-blue-600"
                onClick={() => handleAnswer('started')}
              >
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted/40 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">How It Works</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5">
                <ArrowRight className="h-4 w-4" />
              </div>
              <span>Answer questions about your interests and preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5">
                <ArrowRight className="h-4 w-4" />
              </div>
              <span>Our system analyzes your responses to identify potential career matches</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1 mt-0.5">
                <ArrowRight className="h-4 w-4" />
              </div>
              <span>Receive personalized career path recommendations with detailed information</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // Render results
  if (hasCompleted) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-brand-blue-700">
            Your Career Path Recommendations
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Based on your responses, here are some career paths that might be a good fit for you.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {results.map((result, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/4 bg-brand-blue-100 flex items-center justify-center p-6">
                  <result.icon className="h-16 w-16 text-brand-blue-500" />
                </div>
                <CardContent className="p-6 md:w-3/4">
                  <h2 className="text-2xl font-semibold text-brand-blue-600 mb-2">{result.title}</h2>
                  <p className="text-muted-foreground mb-4">{result.description}</p>
                  <div>
                    <h3 className="font-medium mb-2">Recommended Paths:</h3>
                    <ul className="space-y-1 text-sm">
                      {result.pathOptions.map((option: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="rounded-full bg-brand-blue-100 text-brand-blue-500 p-1">
                            <ArrowRight className="h-3 w-3" />
                          </div>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" size="sm">
                      <a href={result.learnMoreLink}>Learn More</a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={resetAssessment}
          >
            Retake Assessment
          </Button>
          <Button
            className="bg-brand-blue-500 hover:bg-brand-blue-600"
            asChild
          >
            <a href="/career-paths">Explore All Career Paths</a>
          </Button>
        </div>
      </div>
    );
  }

  // Render questions
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / (questions.length - 1)) * 100;

  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <span>Question {currentStep} of {questions.length - 1}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">{currentQuestion.question}</h2>
          <RadioGroup value={answers[currentStep]} onValueChange={handleAnswer}>
            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <div key={idx} className="flex items-start space-x-2 border rounded-md p-4 hover:bg-muted/50">
                  <RadioGroupItem value={option} id={`option-${idx}`} className="mt-1" />
                  <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep <= 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          className="bg-brand-blue-500 hover:bg-brand-blue-600"
          onClick={goToNextStep}
          disabled={!answers[currentStep]}
        >
          {currentStep < questions.length - 1 ? 'Next' : 'See Results'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Assessment questions with category mapping for scoring
const questions = [
  {
    question: "Introduction",
    options: ["started"],
    categoryMapping: { started: [] }
  },
  {
    question: "Which subjects do you enjoy the most in school?",
    options: [
      "Mathematics and Physics",
      "Biology and Chemistry",
      "Business Studies and Economics",
      "Languages and Literature",
      "Art and Design",
      "Computer Science and IT",
      "Physical Education and Sports"
    ],
    categoryMapping: {
      "Mathematics and Physics": ["science", "engineering", "technical"],
      "Biology and Chemistry": ["science", "medical"],
      "Business Studies and Economics": ["commerce"],
      "Languages and Literature": ["arts"],
      "Art and Design": ["arts", "design"],
      "Computer Science and IT": ["engineering", "technical"],
      "Physical Education and Sports": ["vocational"]
    }
  },
  {
    question: "How do you prefer to learn new things?",
    options: [
      "Through reading and research",
      "Through practical activities and hands-on experience",
      "Through solving problems and puzzles",
      "Through discussions and debates",
      "Through creative expression",
      "Through analyzing data and statistics"
    ],
    categoryMapping: {
      "Through reading and research": ["arts", "medical", "science"],
      "Through practical activities and hands-on experience": ["vocational", "engineering", "medical"],
      "Through solving problems and puzzles": ["engineering", "technical", "science"],
      "Through discussions and debates": ["arts", "commerce"],
      "Through creative expression": ["arts", "design"],
      "Through analyzing data and statistics": ["commerce", "science", "technical"]
    }
  },
  {
    question: "Which of these activities would you enjoy doing in your free time?",
    options: [
      "Building or fixing things",
      "Reading and writing",
      "Drawing, painting, or other creative work",
      "Playing sports or outdoor activities",
      "Solving puzzles or playing strategy games",
      "Helping or advising others",
      "Working with computers or technology"
    ],
    categoryMapping: {
      "Building or fixing things": ["engineering", "vocational", "technical"],
      "Reading and writing": ["arts"],
      "Drawing, painting, or other creative work": ["arts", "design"],
      "Playing sports or outdoor activities": ["vocational"],
      "Solving puzzles or playing strategy games": ["engineering", "technical", "science"],
      "Helping or advising others": ["medical", "commerce", "arts"],
      "Working with computers or technology": ["engineering", "technical"]
    }
  },
  {
    question: "Which of these work environments appeals to you the most?",
    options: [
      "A laboratory or research facility",
      "An office or business environment",
      "A creative studio or workshop",
      "A hospital or healthcare setting",
      "Outdoors or in nature",
      "A classroom or educational setting",
      "Working with technology"
    ],
    categoryMapping: {
      "A laboratory or research facility": ["science", "medical", "engineering"],
      "An office or business environment": ["commerce"],
      "A creative studio or workshop": ["arts", "design", "vocational"],
      "A hospital or healthcare setting": ["medical"],
      "Outdoors or in nature": ["vocational", "science"],
      "A classroom or educational setting": ["arts"],
      "Working with technology": ["engineering", "technical"]
    }
  },
  {
    question: "What kind of problems do you enjoy solving?",
    options: [
      "Mathematical or logical problems",
      "People's physical health issues",
      "Business or financial challenges",
      "Creative or design challenges",
      "Social or interpersonal problems",
      "Technical or mechanical issues",
      "Organizational or planning problems"
    ],
    categoryMapping: {
      "Mathematical or logical problems": ["science", "engineering", "technical"],
      "People's physical health issues": ["medical"],
      "Business or financial challenges": ["commerce"],
      "Creative or design challenges": ["arts", "design"],
      "Social or interpersonal problems": ["arts"],
      "Technical or mechanical issues": ["engineering", "vocational", "technical"],
      "Organizational or planning problems": ["commerce"]
    }
  },
  {
    question: "How important is high earning potential in your career choice?",
    options: [
      "Extremely important - I want a high-paying career",
      "Very important, but I also value other aspects",
      "Somewhat important, but not my primary concern",
      "Not very important - I prioritize passion over pay",
      "Not important at all - I'm focused on fulfillment"
    ],
    categoryMapping: {
      "Extremely important - I want a high-paying career": ["engineering", "medical", "commerce"],
      "Very important, but I also value other aspects": ["engineering", "medical", "commerce", "technical"],
      "Somewhat important, but not my primary concern": ["science", "arts", "vocational", "technical"],
      "Not very important - I prioritize passion over pay": ["arts", "design", "vocational"],
      "Not important at all - I'm focused on fulfillment": ["arts", "vocational"]
    }
  },
  {
    question: "How much time are you willing to invest in education after 10th?",
    options: [
      "1-2 years (Vocational/Certificate courses)",
      "3-4 years (Bachelor's degree)",
      "5-6 years (Bachelor's + Master's)",
      "7+ years (Medical/Doctoral studies)",
      "I prefer on-the-job training over formal education"
    ],
    categoryMapping: {
      "1-2 years (Vocational/Certificate courses)": ["vocational", "technical"],
      "3-4 years (Bachelor's degree)": ["arts", "commerce", "engineering", "technical"],
      "5-6 years (Bachelor's + Master's)": ["arts", "commerce", "engineering", "science"],
      "7+ years (Medical/Doctoral studies)": ["medical", "science"],
      "I prefer on-the-job training over formal education": ["vocational"]
    }
  },
  {
    question: "What kind of impact would you like to make through your career?",
    options: [
      "Technical innovations or scientific discoveries",
      "Improving people's health and wellbeing",
      "Contributing to business and economic growth",
      "Creating art or cultural contributions",
      "Teaching or sharing knowledge",
      "Providing essential services or trades",
      "Solving social or environmental problems"
    ],
    categoryMapping: {
      "Technical innovations or scientific discoveries": ["engineering", "science", "technical"],
      "Improving people's health and wellbeing": ["medical"],
      "Contributing to business and economic growth": ["commerce"],
      "Creating art or cultural contributions": ["arts", "design"],
      "Teaching or sharing knowledge": ["arts", "science"],
      "Providing essential services or trades": ["vocational"],
      "Solving social or environmental problems": ["arts", "science"]
    }
  },
  {
    question: "How do you handle pressure and deadlines?",
    options: [
      "I thrive under pressure and tight deadlines",
      "I can handle pressure well with proper planning",
      "I manage okay but prefer a moderate pace",
      "I prefer relaxed environments with flexible deadlines",
      "I find pressure and strict deadlines very stressful"
    ],
    categoryMapping: {
      "I thrive under pressure and tight deadlines": ["medical", "engineering", "commerce"],
      "I can handle pressure well with proper planning": ["engineering", "commerce", "technical", "science"],
      "I manage okay but prefer a moderate pace": ["arts", "science", "vocational"],
      "I prefer relaxed environments with flexible deadlines": ["arts", "design", "vocational"],
      "I find pressure and strict deadlines very stressful": ["arts", "vocational"]
    }
  }
];

// Career categories with recommendations
const careerRecommendations = {
  science: {
    title: "Science & Research",
    description: "You have an analytical mind with a strong aptitude for understanding scientific concepts and solving complex problems. Science and research fields would be well-suited for your interests.",
    icon: Lightbulb,
    pathOptions: [
      "Science stream (PCM/PCB) in 11th-12th",
      "BSc in Physics, Chemistry, or Mathematics",
      "Bachelor's in Scientific Research",
      "Career in Research & Development",
      "Data Science & Analytics"
    ],
    learnMoreLink: "/career-paths/science"
  },
  engineering: {
    title: "Engineering & Technology",
    description: "You show strong problem-solving skills and interest in how things work. Engineering fields would leverage your technical aptitude and creative problem-solving abilities.",
    icon: Code,
    pathOptions: [
      "Science stream (PCM) in 11th-12th",
      "Diploma in Engineering after 10th",
      "B.Tech or BE in various engineering disciplines",
      "Software Development & Programming",
      "Product Design & Development"
    ],
    learnMoreLink: "/career-paths/engineering"
  },
  medical: {
    title: "Medical & Healthcare",
    description: "You demonstrate interest in helping others and understanding biological systems. Medical and healthcare fields would be a good match for your compassionate nature and scientific interest.",
    icon: Heart,
    pathOptions: [
      "Science stream (PCB) in 11th-12th",
      "MBBS, BDS, BAMS, or other medical degrees",
      "B.Pharm or D.Pharm in Pharmacy",
      "BSc in Nursing or Allied Health Sciences",
      "Medical Research & Biotechnology"
    ],
    learnMoreLink: "/career-paths/medical"
  },
  commerce: {
    title: "Business & Commerce",
    description: "You show aptitude for understanding financial and business concepts. A career in business, finance, or commerce would suit your analytical and practical mindset.",
    icon: Briefcase,
    pathOptions: [
      "Commerce stream in 11th-12th",
      "BCom, BBA, or related business degrees",
      "Chartered Accountancy, Cost Accounting",
      "MBA or other management programs",
      "Banking, Finance, and Investment"
    ],
    learnMoreLink: "/career-paths/commerce"
  },
  arts: {
    title: "Arts & Humanities",
    description: "You display strong communication skills and interest in human behavior and society. Arts and humanities fields would suit your expressive and analytical abilities.",
    icon: BookOpen,
    pathOptions: [
      "Arts/Humanities stream in 11th-12th",
      "BA in various subjects like Literature, History, Psychology",
      "Law (BA LLB or LLB after graduation)",
      "Mass Communication & Journalism",
      "Education, Social Work, and Public Service"
    ],
    learnMoreLink: "/career-paths/arts"
  },
  design: {
    title: "Creative Arts & Design",
    description: "You have a natural creative flair and visual thinking abilities. A career in design or creative fields would allow you to express your artistic talents.",
    icon: Palette,
    pathOptions: [
      "Arts stream in 11th-12th",
      "Bachelor's in Design (Fashion, Graphic, Interior)",
      "Architecture (after PCM in 12th)",
      "Animation & Multimedia",
      "User Interface & User Experience Design"
    ],
    learnMoreLink: "/career-paths/arts-design"
  },
  technical: {
    title: "Technical & IT Fields",
    description: "You show strong logical thinking and interest in technology. A career in IT, computer science, or other technical fields would suit your analytical abilities.",
    icon: Calculator,
    pathOptions: [
      "Science stream (PCM) or Computer Science in 11th-12th",
      "BCA, BSc IT, or B.Tech in Computer Science",
      "Diploma in Computer Applications",
      "Web Development & Software Engineering",
      "Artificial Intelligence & Machine Learning"
    ],
    learnMoreLink: "/career-paths/technical"
  },
  vocational: {
    title: "Vocational & Skill-Based Careers",
    description: "You have a practical approach and prefer hands-on learning. Vocational and skill-based careers would allow you to use your practical abilities.",
    icon: Trophy,
    pathOptions: [
      "ITI courses after 10th in various trades",
      "Diploma programs in specialized fields",
      "Vocational training in hospitality, beauty, etc.",
      "Entrepreneurship and small business",
      "Sports coaching and physical education"
    ],
    learnMoreLink: "/career-paths/vocational"
  }
};

export default Assessment;
