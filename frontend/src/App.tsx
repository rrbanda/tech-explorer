// Enterprise-Grade Responsive App.tsx - Citi Bank Inspired
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Bot, 
  User, 
  Star, 
  BarChart3, 
  Route, 
  Tags, 
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Target,
  ArrowRight,
  Check,
  Clock,
  Award,
  Menu,
  X,
  ChevronDown,
  Building2,
  Globe,
  Settings
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [context, setContext] = useState<any>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickActions = [
    { 
      id: 'migrate', 
      title: 'Platform Migration', 
      subtitle: 'PCF to Modern Containers',
      icon: ArrowRight,
      prompt: 'I need to migrate our applications from PCF to a modern container platform',
      category: 'Migration'
    },
    { 
      id: 'container', 
      title: 'Application Containerization', 
      subtitle: 'Docker & Kubernetes',
      icon: Shield,
      prompt: 'I want to containerize our existing applications',
      category: 'Modernization'
    },
    { 
      id: 'cloud', 
      title: 'Cloud-Native Development', 
      subtitle: 'Microservices Architecture',
      icon: Sparkles,
      prompt: 'I need to develop cloud-native applications',
      category: 'Development'
    },
    { 
      id: 'test', 
      title: 'Testing & QA Environment', 
      subtitle: 'Automated Testing Platforms',
      icon: Target,
      prompt: 'I need a comprehensive testing environment for our applications',
      category: 'Quality Assurance'
    },
    { 
      id: 'micro', 
      title: 'Microservices Architecture', 
      subtitle: 'Service Mesh & API Gateway',
      icon: Zap,
      prompt: 'I want to build and manage microservices architecture',
      category: 'Architecture'
    },
    { 
      id: 'ai', 
      title: 'AI/ML Integration', 
      subtitle: 'Machine Learning Platforms',
      icon: TrendingUp,
      prompt: 'I need to integrate AI/ML capabilities into our applications',
      category: 'Innovation'
    },
  ];

  const addMessage = (type: 'user' | 'ai', content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const findTechnologySolutions = async (userMessage: string) => {
    setIsTyping(true);
    // Reduced delay for better UX while keeping visual feedback
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let response = "Based on your requirements, I've found relevant technology solutions from our catalog. Here are the recommendations:";
    
    if (userMessage.toLowerCase().includes('migrate') && userMessage.toLowerCase().includes('pcf')) {
      response = "For PCF migration, I found these proven solutions: **ECS** (Enterprise Container Service) for production-grade workloads, and **Dolly** migration tool for automated, low-risk migration with rollback capabilities. Both have established success records for enterprise migrations.";
      setContext(prev => ({ ...prev, useCase: 'Platform Migration', sector: 'Enterprise', priority: 'High' }));
      setCurrentStep(3);
    } else if (userMessage.toLowerCase().includes('container')) {
      response = "For containerization, our catalog includes: **Cloud@cx Andromeda** for cost-effective container deployment, **ECS** for enterprise-grade Kubernetes, and comprehensive containerization patterns. These solutions provide security compliance and operational excellence.";
      setContext(prev => ({ ...prev, useCase: 'Containerization', approach: 'Enterprise-Grade' }));
      setCurrentStep(2);
    } else if (userMessage.toLowerCase().includes('cloud')) {
      response = "For cloud-native development, I recommend: **Innovation Lab** for rapid prototyping, **ECS** for microservices deployment, and our cloud-native development patterns. These enable modern architectures with proper service mesh and API management.";
      setContext(prev => ({ ...prev, useCase: 'Cloud-Native', pattern: 'Microservices' }));
      setCurrentStep(3);
    } else if (userMessage.toLowerCase().includes('test')) {
      response = "For testing environments, our catalog offers comprehensive testing platforms with automated testing capabilities, CI/CD integration, and quality assurance tools designed for enterprise workflows.";
      setContext(prev => ({ ...prev, useCase: 'Testing & QA', priority: 'Standard' }));
      setCurrentStep(2);
    } else if (userMessage.toLowerCase().includes('ai') || userMessage.toLowerCase().includes('machine learning')) {
      response = "For AI/ML integration, **Innovation Lab** provides rapid prototyping capabilities and experimentation environments. Our catalog includes platforms for data processing, model development, and AI application deployment.";
      setContext(prev => ({ ...prev, useCase: 'AI/ML Integration', approach: 'Innovation' }));
      setCurrentStep(2);
    }
    
    setIsTyping(false);
    addMessage('ai', response);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    addMessage('user', userMessage);
    await findTechnologySolutions(userMessage);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  const steps = [
    { id: 1, title: 'Requirements Collection', description: 'Understanding your needs', icon: Target },
    { id: 2, title: 'Technology Matching', description: 'Finding suitable solutions', icon: Sparkles },
    { id: 3, title: 'Solution Analysis', description: 'Exploring recommendations', icon: Shield },
    { id: 4, title: 'Implementation Guidance', description: 'Deployment information ready', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Enterprise Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                                  <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-slate-800">Tech Explorer</h1>
                  <p className="text-xs text-slate-600">Technology Catalog & Discovery Tool</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Solutions</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Analytics</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Support</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <nav className="space-y-4">
                  <a href="#" className="block text-slate-600 hover:text-blue-600 transition-colors font-medium">Solutions</a>
                  <a href="#" className="block text-slate-600 hover:text-blue-600 transition-colors font-medium">Analytics</a>
                  <a href="#" className="block text-slate-600 hover:text-blue-600 transition-colors font-medium">Support</a>
                </nav>
                
                {/* Mobile Progress Tracker */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Discovery Progress</h3>
                  <div className="space-y-3">
                    {steps.map((step) => {
                      const isCompleted = currentStep > step.id;
                      const isActive = currentStep === step.id;
                      
                      return (
                        <div
                          key={step.id}
                          className={`flex items-center p-3 rounded-lg ${
                            isCompleted 
                              ? 'bg-green-50 border border-green-200' 
                              : isActive 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isActive 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-slate-400 text-white'
                          }`}>
                            {isCompleted ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <step.icon className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className={`font-medium text-sm ${
                              isCompleted ? 'text-green-800' : isActive ? 'text-blue-800' : 'text-slate-600'
                            }`}>
                              {step.title}
                            </div>
                            <div className="text-xs text-slate-500">{step.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 min-h-[calc(100vh-8rem)]">
          {/* Main Chat Panel */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Technology Discovery Assistant
                    </h2>
                    <p className="text-blue-100 text-sm">
                      Interactive solution finder and guide
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="p-4 sm:p-6">
                <div className="h-64 sm:h-72 lg:h-80 overflow-y-auto mb-4 space-y-4 custom-scrollbar">
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        Welcome to Technology Discovery
                      </h3>
                      <p className="text-slate-600 max-w-md mx-auto">
                        Describe your technology requirements and I'll help you find the best solutions from our comprehensive technology catalog.
                      </p>
                    </motion.div>
                  )}
                  
                  <AnimatePresence mode="popLayout">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' ? 'bg-blue-600 ml-3' : 'bg-slate-600 mr-3'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          
                          <div className={`px-4 py-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-800 border border-slate-200'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div className={`text-xs mt-2 flex items-center ${
                              message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                            }`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center bg-slate-100 px-4 py-3 rounded-2xl border border-slate-200">
                        <div className="flex space-x-1 mr-3">
                          <motion.div 
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <span className="text-slate-600 text-sm">Searching catalog...</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Describe your technology needs (e.g., 'PCF migration', 'containerization', 'cloud-native development')..."
                      className="w-full p-3 pr-16 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none text-slate-800 placeholder-slate-500 text-sm"
                      rows={2}
                    />
                    
                    <div className="absolute right-2 bottom-2 flex gap-1">
                      <button
                        onClick={() => toast.success('Voice input feature available in next release', {
                          icon: '🎤',
                          style: { background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0' }
                        })}
                        className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors border border-slate-300"
                      >
                        <Mic className="w-4 h-4 text-slate-600" />
                      </button>
                      
                      <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Send className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  Technology Solution Categories
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.id}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="group p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all duration-200 text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 group-hover:bg-blue-700 rounded-lg flex items-center justify-center mr-3 transition-colors flex-shrink-0">
                          <action.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 group-hover:text-blue-800 transition-colors text-sm">
                            {action.title}
                          </h4>
                          <p className="text-xs text-slate-600 group-hover:text-blue-600 transition-colors mt-1">
                            {action.subtitle}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-slate-200 group-hover:bg-blue-200 text-xs font-medium text-slate-700 group-hover:text-blue-700 rounded transition-colors">
                            {action.category}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-6 hidden lg:block">
            {/* Progress Tracker */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Route className="w-5 h-5 text-blue-600 mr-2" />
                Discovery Progress
              </h3>
              
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isCompleted = currentStep > step.id;
                  const isActive = currentStep === step.id;
                  
                  return (
                    <motion.div
                      key={step.id}
                      className={`p-3 rounded-lg border ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : isActive 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-slate-50 border-slate-200'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isActive 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-400 text-white'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <step.icon className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm ${
                            isCompleted ? 'text-green-800' : isActive ? 'text-blue-800' : 'text-slate-600'
                          }`}>
                            {step.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {step.description}
                          </div>
                        </div>
                      </div>
                      {isActive && (
                        <div className="ml-11 mt-2">
                          <div className="w-full bg-slate-200 rounded-full h-1">
                            <motion.div 
                              className="bg-blue-500 h-1 rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "60%" }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Context Summary */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Tags className="w-5 h-5 text-blue-600 mr-2" />
                Search Context
              </h3>
              
              {Object.keys(context).length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-sm">
                    Your search preferences will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(context).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      className="flex justify-between items-center p-2 bg-slate-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-slate-600 font-medium text-sm capitalize">{key}:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                        {value as string}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Platform Stats */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                Platform Metrics
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Enterprise Solutions', value: '12+', icon: Shield },
                  { label: 'Business Sectors', value: '4', icon: Building2 },
                  { label: 'Implementation Patterns', value: '15+', icon: Target },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{stat.label}</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Enterprise Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#334155',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#059669',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;