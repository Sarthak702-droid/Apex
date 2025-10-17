'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CornerDownLeft, Loader2, User, Bot, Leaf } from 'lucide-react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  conversationalAgent,
  ConversationalAgentInput,
} from '@/ai/flows/conversational-agent';
import { ScrollArea } from './ui/scroll-area';

type Message = {
  role: 'user' | 'model';
  content: string;
};

type ChatbotWindowProps = {
  onClose: () => void;
};

const ChatbotWindow = ({ onClose }: ChatbotWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'Hello! How can I help you with Tel-Samriddhi today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        content: [{ text: msg.content }],
      }));

      const inputData: ConversationalAgentInput = {
        history,
        prompt: input,
      };
      
      const result = await conversationalAgent(inputData);

      const modelMessage: Message = {
        role: 'model',
        content: result.response,
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error with conversational agent:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A slight delay to allow the new message to render
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 10);
    }
  }, [messages]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-28 right-8 z-40 w-full max-w-sm"
    >
      <div className="bg-card shadow-2xl rounded-xl border flex flex-col h-[60vh]">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h3 className="font-headline text-lg">AI Assistant</h3>
          </div>
        </header>

        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'model' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="max-w-[80%] rounded-xl px-4 py-2 text-sm bg-secondary">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <footer className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="pr-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={isLoading}
              >
                <CornerDownLeft className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </footer>
      </div>
    </motion.div>
  );
};

export default ChatbotWindow;
