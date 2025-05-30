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
    const baseInputClasses = `bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300 ${
      field.error ? 'border-red-500/50' : ''
    } ${field.className || ''}`;

    return (
      <div key={field.name} className="space-y-2">
        <label className="text-sm font-medium text-white/80">
          {field.label}
          {field.required && <span className="text-red-400 ml-1">*</span>}
        </label>
        
        {field.type === "textarea" ? (
          <Textarea
            className={`${baseInputClasses} resize-none`}
            style={{ height: field.rows ? `${field.rows * 24}px` : '150px' }}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
          />
        ) : (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            className={baseInputClasses}
          />
        )}
        
        {field.error && (
          <p className="text-red-400 text-xs">{field.error}</p>
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
    <div className={`space-y-6 ${className}`}>

      {/* Form Fields */}
      <div className="space-y-6">
        {fieldGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
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
        <motion.div variants={PERFORMANCE_VARIANTS.fadeInFast}>
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default FormSection; 