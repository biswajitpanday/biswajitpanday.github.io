"use client";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useState } from "react";
import FormSection from "@/components/FormSection";

// Lazy load icons only (not hooks/utilities)
const FaEnvelope = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaEnvelope })));
const FaMapMarkedAlt = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaMapMarkedAlt })));
const FaPhoneAlt = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaPhoneAlt })));
const FaSkype = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaSkype })));
const FaPaperPlane = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaPaperPlane })));
const FaRocket = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaRocket })));
const FaUsers = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaUsers })));
const FaCheckCircle = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaCheckCircle })));
const FaExclamationTriangle = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaExclamationTriangle })));

// Loading fallback components
const IconFallback = ({ className }: { className?: string }) => (
  <div className={`w-4 h-4 bg-secondary-default/30 rounded animate-pulse ${className}`} />
);

// RATE_LIMIT constants (to avoid importing the entire constants file)
const RATE_LIMIT = {
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 900000, // 15 minutes
  BLOCK_DURATION_MS: 3600000, // 1 hour
};

// Form validation schema (simplified to avoid zod import overhead)
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: { message: string };
  lastName?: { message: string };
  email?: { message: string };
  phone?: { message: string };
  message?: { message: string };
}

const validateForm = (data: FormData) => {
  const errors: FormErrors = {};
  
  if (!data.firstName || data.firstName.length < 2) {
    errors.firstName = { message: "First name must be at least 2 characters" };
  }
  if (!data.lastName || data.lastName.length < 2) {
    errors.lastName = { message: "Last name must be at least 2 characters" };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = { message: "Please enter a valid email address" };
  }
  if (data.phone && data.phone.length > 0 && data.phone.length < 10) {
    errors.phone = { message: "Please enter a valid phone number" };
  }
  if (!data.message || data.message.length < 10) {
    errors.message = { message: "Message must be at least 10 characters" };
  }
  
  return { errors, isValid: Object.keys(errors).length === 0 };
};

const info = [
  {
    icon: FaPhoneAlt,
    title: "Phone",
    description: "+880 1681642502",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-300",
    hoverColor: "hover:bg-blue-500/30 hover:border-blue-400"
  },
  {
    icon: FaEnvelope,
    title: "Email",
    description: "biswajitmailid@gmail.com",
    color: "from-emerald-500/20 to-emerald-600/20",
    borderColor: "border-emerald-500/50",
    textColor: "text-emerald-300",
    hoverColor: "hover:bg-emerald-500/30 hover:border-emerald-400"
  },
  {
    icon: FaSkype,
    title: "Skype",
    description: "biswajit_panday",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-300",
    hoverColor: "hover:bg-purple-500/30 hover:border-purple-400"
  },
  {
    icon: FaMapMarkedAlt,
    title: "Address",
    description: "Dhaka, Bangladesh",
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-500/50",
    textColor: "text-orange-300",
    hoverColor: "hover:bg-orange-500/30 hover:border-orange-400"
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Simple rate limiting (client-side only)
  const [attempts, setAttempts] = useState(0);
  const [lastAttempt, setLastAttempt] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side rate limiting
    const now = Date.now();
    if (now - lastAttempt < RATE_LIMIT.WINDOW_MS && attempts >= RATE_LIMIT.MAX_ATTEMPTS) {
      setIsBlocked(true);
      setSubmitStatus('error');
      setSubmitMessage('Too many attempts. Please try again later.');
      return;
    }

    // Validate form
    const { errors, isValid } = validateForm(formData);
    setFormErrors(errors);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Record attempt
      setAttempts(prev => prev + 1);
      setLastAttempt(now);

      // PageClip form submission
      const PAGECLIP_API_KEY = process.env.NEXT_PUBLIC_PAGECLIP_API_KEY;
      
      if (!PAGECLIP_API_KEY) {
        throw new Error('PageClip API key not found. Please check your environment variables.');
      }

      const response = await fetch(`https://send.pageclip.co/${PAGECLIP_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          subject: `New contact form submission from ${formData.firstName} ${formData.lastName}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setAttempts(0); // Reset on success
        setIsBlocked(false);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again or contact me directly via email.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
      <div className="absolute top-20 right-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 left-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 left-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Contact Header */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          {/* Main Heading */}
          <motion.h1
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
              Touch
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className="text-lg xl:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Let&apos;s discuss your next project and bring your vision to life together
          </motion.p>

          {/* Contact Stats */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <motion.div 
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
            >
              <div className="flex items-center gap-3">
                <Suspense fallback={<IconFallback />}>
                  <FaRocket className="text-secondary-default text-xl group-hover:animate-pulse" />
                </Suspense>
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    24h
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Response Time
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
            >
              <div className="flex items-center gap-3">
                <Suspense fallback={<IconFallback />}>
                  <FaUsers className="text-secondary-default text-xl group-hover:animate-pulse" />
                </Suspense>
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    100+
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Happy Clients
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-col xl:flex-row gap-8"
        >
          {/* Contact Form */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="xl:w-[54%] order-2 xl:order-none"
          >
            <div className="bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-8 rounded border border-secondary-default/20 hover:border-secondary-default/40 performance-card">
              <motion.div
                variants={PERFORMANCE_VARIANTS.fadeInFast}
                className="mb-6"
              >
                <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4">
                  Let&apos;s work{" "}
                  <span className="text-secondary-default">together</span>
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Ready to bring your vision to life? Tell me about your project and let&apos;s create something extraordinary together.
                </p>
              </motion.div>

              {/* Rate Limit Warning */}
              {isBlocked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded border bg-red-500/10 border-red-500/30 text-red-300 flex items-center gap-3"
                >
                  <Suspense fallback={<IconFallback />}>
                    <FaExclamationTriangle className="text-red-400 flex-shrink-0" />
                  </Suspense>
                  <div>
                    <p className="text-sm font-medium">Rate limit exceeded</p>
                    <p className="text-xs text-red-400">
                      Please try again later.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Submit Status Messages */}
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mb-6 p-4 rounded border flex items-center gap-3 ${
                    submitStatus === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  <Suspense fallback={<IconFallback />}>
                    {submitStatus === 'success' ? (
                      <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <FaExclamationTriangle className="text-red-400 flex-shrink-0" />
                    )}
                  </Suspense>
                  <p className="text-sm">{submitMessage}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormSection
                  title="Let's work together"
                  description="Ready to bring your vision to life? Tell me about your project and let's create something extraordinary together."
                  layout="grid"
                  fields={[
                    {
                      name: "firstName",
                      label: "First Name",
                      type: "text",
                      placeholder: "Enter your first name",
                      required: true,
                      value: formData.firstName,
                      error: formErrors.firstName?.message
                    },
                    {
                      name: "lastName", 
                      label: "Last Name",
                      type: "text",
                      placeholder: "Enter your last name",
                      required: true,
                      value: formData.lastName,
                      error: formErrors.lastName?.message
                    },
                    {
                      name: "email",
                      label: "Email Address",
                      type: "email", 
                      placeholder: "your.email@example.com",
                      required: true,
                      value: formData.email,
                      error: formErrors.email?.message
                    },
                    {
                      name: "phone",
                      label: "Phone Number",
                      type: "tel",
                      placeholder: "Enter your phone number",
                      required: false,
                      value: formData.phone,
                      error: formErrors.phone?.message
                    },
                    {
                      name: "message",
                      label: "Message",
                      type: "textarea",
                      placeholder: "Tell me about your project, goals, and how I can help you achieve them...",
                      required: true,
                      value: formData.message,
                      error: formErrors.message?.message,
                      rows: 6
                    }
                  ]}
                  onFieldChange={(fieldName, value) => handleInputChange(fieldName as keyof FormData, value)}
                >
                  <Button 
                    type="submit"
                    size="lg" 
                    disabled={isSubmitting || isBlocked}
                    className={`bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-primary font-semibold px-8 py-3 rounded performance-button disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Suspense fallback={<IconFallback />}>
                          <FaPaperPlane className="mr-2" />
                        </Suspense>
                        Send Message
                      </>
                    )}
                  </Button>
                </FormSection>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0"
          >
            <div className="w-full max-w-md">
              <motion.h3
                variants={PERFORMANCE_VARIANTS.slideUpSync}
                className="text-2xl font-bold text-white mb-8 text-center xl:text-left"
              >
                Contact Information
              </motion.h3>
              
              <div className="grid grid-cols-1 gap-6">
                {info.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                    className={`group relative bg-gradient-to-r ${item.color} backdrop-blur-sm border ${item.borderColor} p-4 rounded ${item.hoverColor} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 xl:w-14 xl:h-14 bg-gradient-to-br from-white/10 to-white/5 ${item.textColor} rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-xl xl:text-2xl">
                          <Suspense fallback={<IconFallback />}>
                            <item.icon />
                          </Suspense>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/60 text-sm font-medium mb-1">{item.title}</p>
                        <h4 className="text-white font-semibold text-sm xl:text-base break-all">{item.description}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
