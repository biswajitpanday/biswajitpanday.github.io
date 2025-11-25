"use client";

import { motion } from "framer-motion";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const SUGGESTED_QUESTIONS = [
  "Tell me about SpireWiz",
  "What's your cloud experience?",
  "Have you worked with AI?",
  "What's your current role?",
  "How can I contact you?"
];

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 pb-3 border-b border-secondary-default/10">
      <p id="suggested-questions-label" className="text-xs text-white/60 mb-2">Suggested questions:</p>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-labelledby="suggested-questions-label"
      >
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <motion.button
            key={question}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(question)}
            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-secondary-default/20 border border-secondary-default/20 hover:border-secondary-default/40 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`Ask: ${question}`}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
