"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaMinus, FaPaperPlane } from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import {
  trackChatbotOpen,
  trackChatbotClose,
  trackChatbotMinimize,
  trackChatbotMessage,
  trackChatbotSuggestedQuestion,
  trackChatbotError,
  trackChatbotConversation,
  trackChatbotClear
} from "@/lib/analytics";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AI_API_ENDPOINT = process.env.NEXT_PUBLIC_CHATBOT_API_URL || '';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Biswajit's AI assistant. Ask me about his projects, skills, or experience!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationStartTime, setConversationStartTime] = useState<number>(Date.now());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Send message to AI
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Track message sent
    trackChatbotMessage(messageText.trim(), messageText.trim().length);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      // Build conversation history (last 4 messages)
      const conversationHistory = messages.slice(-4).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(AI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText.trim(),
          conversationHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 429) {
          throw new Error(errorData.error || 'Too many requests. Please wait a minute.');
        }

        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(data.timestamp || new Date())
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error('Chatbot error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Sorry, I encountered an error. Please try again.';
      const errorType = err instanceof Error ? err.name : 'UnknownError';

      // Track error
      trackChatbotError(errorType, errorMessage);

      setError(errorMessage);

      // Add error message to chat
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      const chatErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${errMsg}. Please try again or contact Biswajit directly through the contact form.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, chatErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    // Track suggested question click
    trackChatbotSuggestedQuestion(question);
    sendMessage(question);
  };

  // Handle Enter key (without Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Clear conversation
  const clearConversation = () => {
    // Track conversation clear (exclude welcome message)
    const userMessagesCount = messages.filter(m => m.role === 'user').length;
    trackChatbotClear(userMessagesCount);

    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Biswajit's AI assistant. Ask me about his projects, skills, or experience!",
      timestamp: new Date()
    }]);
    setError(null);

    // Reset conversation timer
    setConversationStartTime(Date.now());
  };

  // Handle open/close/minimize with tracking
  const handleOpen = () => {
    setIsOpen(true);
    setConversationStartTime(Date.now());
    trackChatbotOpen();
  };

  const handleClose = () => {
    // Track conversation end with metrics
    const userMessagesCount = messages.filter(m => m.role === 'user').length;
    const durationSeconds = Math.floor((Date.now() - conversationStartTime) / 1000);

    if (userMessagesCount > 0) {
      trackChatbotConversation(userMessagesCount, durationSeconds);
    }

    trackChatbotClose();
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    trackChatbotMinimize();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Floating Button (when chat is closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-secondary-default to-blue-500 text-primary shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center group"
            aria-label="Open chatbot"
          >
            <FaRobot className="text-2xl group-hover:scale-110 transition-transform" />

            {/* Pulse animation ring */}
            <span className="absolute inset-0 rounded-full bg-secondary-default/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`bg-primary border border-secondary-default/20 rounded-lg shadow-2xl ${
              isMinimized ? 'w-80 h-14' : 'w-[400px] h-[600px]'
            } flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-default/20 to-blue-500/20 border-b border-secondary-default/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaRobot className="text-secondary-default text-xl" />
                <div>
                  <h3 className="font-semibold text-sm">Biswajit&apos;s AI Assistant</h3>
                  <p className="text-xs text-white/60">Online</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Minimize button */}
                <button
                  onClick={handleMinimize}
                  className="hover:bg-white/10 p-1.5 rounded transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <FaMinus className="text-sm" />
                </button>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="hover:bg-white/10 p-1.5 rounded transition-colors"
                  aria-label="Close chatbot"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-secondary-default rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-secondary-default rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-secondary-default rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span>Thinking...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions (only show at start) */}
                {messages.length <= 1 && (
                  <SuggestedQuestions onSelect={handleSuggestedQuestion} />
                )}

                {/* Error Message */}
                {error && (
                  <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="border-t border-secondary-default/20 p-4">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about Biswajit's work..."
                      className="flex-1 bg-white/5 border border-secondary-default/20 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-secondary-default/40 transition-colors max-h-24"
                      rows={1}
                      maxLength={500}
                      disabled={isLoading}
                    />

                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-secondary-default to-blue-500 text-primary p-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <FaPaperPlane className="text-sm" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-xs text-white/40">
                    <span>Press Enter to send</span>
                    <button
                      type="button"
                      onClick={clearConversation}
                      className="hover:text-secondary-default transition-colors"
                    >
                      Clear chat
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
