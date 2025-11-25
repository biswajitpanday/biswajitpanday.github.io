"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PERFORMANCE_VARIANTS } from "@/constants";

type FormFieldType = "text" | "email" | "tel" | "password" | "textarea";

interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  className?: string;
  rows?: number; // For textarea
  maxLength?: number; // Character limit
}

interface FormSectionProps {
  title?: string;
  description?: string;
  fields: FormField[];
  onFieldChange: (fieldName: string, value: string) => void;
  className?: string;
  children?: ReactNode;
  layout?: "single" | "grid"; // single column or 2-column grid
}

const FormSection: React.FC<FormSectionProps> = ({
  fields,
  onFieldChange,
  className = "",
  children,
  layout = "single"
}) => {
  const renderField = (field: FormField) => {
    // Softer input styling - cleaner look
    const baseInputClasses = `
      bg-[#1e1e24]
      border border-white/10
      hover:border-white/20
      text-white placeholder:text-white/30
      focus:outline-none focus:border-secondary-default/50
      focus:ring-1 focus:ring-secondary-default/20
      transition-all duration-300
      rounded-lg
      ${field.error ? 'border-red-500/40 focus:border-red-500/50 focus:ring-red-500/20' : ''}
      ${field.className || ''}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div 
        key={field.name} 
        data-testid={`form-field-${field.name}`}
        className="space-y-2"
      >
        <label 
          data-testid={`form-label-${field.name}`}
          className="text-sm font-medium text-white/80"
        >
          {field.label}
          {field.required && <span className="text-red-400 ml-1">*</span>}
        </label>
        
        {field.type === "textarea" ? (
          <Textarea
            data-testid={`form-textarea-${field.name}`}
            className={`${baseInputClasses} resize-none`}
            style={{ height: field.rows ? `${field.rows * 24}px` : '150px' }}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            maxLength={field.maxLength}
          />
        ) : (
          <Input
            data-testid={`form-input-${field.name}`}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            className={baseInputClasses}
            maxLength={field.maxLength}
          />
        )}
        
        {field.error && (
          <p 
            data-testid={`form-error-${field.name}`}
            className="text-red-400 text-xs"
          >
            {field.error}
          </p>
        )}
      </div>
    );
  };

  // Group fields for layout
  const groupFields = () => {
    if (layout === "single") {
      return fields.map(field => [field]);
    }
    
    // Grid layout - group fields into pairs
    const groups = [];
    for (let i = 0; i < fields.length; i += 2) {
      groups.push(fields.slice(i, i + 2));
    }
    return groups;
  };

  const fieldGroups = groupFields();

  return (
    <div 
      data-testid="form-section"
      className={`space-y-6 ${className}`}
    >

      {/* Form Fields */}
      <div 
        data-testid="form-fields-container"
        className="space-y-6"
      >
        {fieldGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            data-testid={`form-field-group-${groupIndex}`}
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className={
              layout === "grid" && group.length > 1
                ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                : "space-y-6"
            }
          >
            {group.map(renderField)}
          </motion.div>
        ))}
      </div>

      {/* Additional Content */}
      {children && (
        <motion.div 
          data-testid="form-additional-content"
          variants={PERFORMANCE_VARIANTS.fadeInFast}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default FormSection; 