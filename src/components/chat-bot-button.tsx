'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';

const ChatbotButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
          >
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
              aria-label="Open AI Assistant"
            >
              <MessageSquare className="h-7 w-7 text-primary-foreground" />
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>AI Assistant (Coming Soon)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatbotButton;
