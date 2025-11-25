"use client";
import { lazy, Suspense, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useState } from "react";
import FormSection from "@/components/FormSection";
import BackgroundElements from "@/components/BackgroundElements";
import { useCountUp } from "@/hooks/useCountUp";
import { projects } from "@/data/portfolioData";

// Lazy load icons only (not hooks/utilities)
const FaEnvelope = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaEnvelope })));
const FaMapMarkedAlt = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaMapMarkedAlt })));
const FaPhoneAlt = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaPhoneAlt })));
const BsMicrosoftTeams  = lazy(() => import("react-icons/bs").then(mod => ({ default: mod.BsMicrosoftTeams })));
const FaPaperPlane = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaPaperPlane })));
const FaRocket = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaRocket })));
const FaUsers = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaUsers })));
const FaCheckCircle = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaCheckCircle })));
const FaExclamationTriangle = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaExclamationTriangle })));
const FaGlobe = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaGlobe })));
const FaCode = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaCode })));
const FaLayerGroup = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaLayerGroup })));
const FaLinkedinIn = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaLinkedinIn })));
const FaGithub = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaGithub })));
const FaTwitter = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaTwitter })));

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

// LocalStorage key for form auto-save
const FORM_STORAGE_KEY = 'contact_form_draft';

// Message character limits
const MESSAGE_LIMITS = {
  MIN: 10,
  MAX: 2000,
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
    title: "Phone & WhatsApp",
    description: "+880 1681642502",
    color: "from-secondary-default/10 to-blue-500/10",
    borderColor: "border-secondary-default/30",
    textColor: "text-secondary-default",
    hoverColor: "hover:bg-secondary-default/20 hover:border-secondary-default/50",
    testId: "contact-info-phone",
    clickable: true,
    action: () => window.open("tel:+8801681642502", "_self"),
    actionLabel: "Call or WhatsApp"
  },
  {
    icon: FaEnvelope,
    title: "Email",
    description: "biswajitmailid@gmail.com",
    color: "from-blue-500/10 to-purple-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    hoverColor: "hover:bg-blue-500/20 hover:border-blue-500/50",
    testId: "contact-info-email",
    clickable: true,
    action: () => window.open("mailto:biswajitmailid@gmail.com", "_self"),
    actionLabel: "Send Email"
  },
  {
    icon: BsMicrosoftTeams,
    title: "Microsoft Teams",
    description: "biswajitpanday@live.com",
    color: "from-purple-500/10 to-secondary-default/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    hoverColor: "hover:bg-purple-500/20 hover:border-purple-500/50",
    testId: "contact-info-teams",
    clickable: true,
    action: () => {
      // Try to open Teams app first, fallback to web version
      const teamsAppUrl = `msteams://l/chat/0/0?users=biswajitpanday@live.com`;
      const teamsWebUrl = `https://teams.microsoft.com/l/chat/0/0?users=biswajitpanday@live.com`;
      
      // Attempt to open Teams app
      window.location.href = teamsAppUrl;
      
      // Fallback to web version after a brief delay if app doesn't open
      setTimeout(() => {
        window.open(teamsWebUrl, "_blank");
      }, 1000);
    },
    actionLabel: "Start Teams Chat"
  },
  {
    icon: FaMapMarkedAlt,
    title: "Address",
    description: "Dhaka, Bangladesh",
    color: "from-emerald-500/10 to-blue-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    hoverColor: "hover:bg-emerald-500/20 hover:border-emerald-500/50",
    testId: "contact-info-address",
    clickable: true,
    action: () => window.open("https://www.google.com/maps/search/Dhaka,+Bangladesh", "_blank"),
    actionLabel: "View on Map"
  },
];

// Social media links
const socialLinks = [
  {
    icon: FaLinkedinIn,
    title: "LinkedIn",
    url: "https://linkedin.com/in/biswajitpanday",
    color: "bg-[#0077B5]/20 hover:bg-[#0077B5]/30",
    textColor: "text-[#0077B5]",
    borderColor: "border-[#0077B5]/30 hover:border-[#0077B5]/50"
  },
  {
    icon: FaGithub,
    title: "GitHub",
    url: "https://github.com/biswajitpanday",
    color: "bg-white/10 hover:bg-white/20",
    textColor: "text-white",
    borderColor: "border-white/30 hover:border-white/50"
  },
  {
    icon: FaTwitter,
    title: "Twitter",
    url: "https://twitter.com/aspect_jeevi",
    color: "bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30",
    textColor: "text-[#1DA1F2]",
    borderColor: "border-[#1DA1F2]/30 hover:border-[#1DA1F2]/50"
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

  // Honeypot field for spam prevention (bots will fill this, humans won't see it)
  const [honeypot, setHoneypot] = useState('');

  // Simple rate limiting (client-side only)
  const [attempts, setAttempts] = useState(0);
  const [lastAttempt, setLastAttempt] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Calculate real stats from portfolio data
  const totalProjects = projects.length;
  const uniqueTechnologies = new Set(projects.flatMap(p => p.stacks)).size;
  const yearsExperience = 10; // Since 2015

  // Animated counters for stats dashboard (using real data)
  const projectsCount = useCountUp({ end: totalProjects, duration: 1800 });
  const technologiesCount = useCountUp({ end: uniqueTechnologies, duration: 2000 });
  const experienceCount = useCountUp({ end: yearsExperience, duration: 1700 });

  // Load saved form data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Save form data to localStorage (debounced via useCallback)
  const saveToLocalStorage = useCallback((data: FormData) => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Clear localStorage on successful submission
  const clearLocalStorage = useCallback(() => {
    try {
      localStorage.removeItem(FORM_STORAGE_KEY);
    } catch {
      // Silently fail
    }
  }, []);

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Check if form has any data
  const hasFormData = Object.values(formData).some(value => value.trim() !== '');

  const handleInputChange = (field: keyof FormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    // Auto-save to localStorage
    saveToLocalStorage(newData);

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Reset form handler
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
    setFormErrors({});
    clearLocalStorage();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently "succeed" (bots won't know they failed)
    if (honeypot) {
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      clearLocalStorage();
      return;
    }

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
        clearLocalStorage(); // Clear saved draft on success
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
    <section
      data-testid="contact-page"
      className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8 pb-12 xl:pb-16"
    >
      {/* Background Elements - Using shared component for consistency */}
      <BackgroundElements
        floatingDots={[
          {
            size: "md",
            color: "secondary",
            animation: "ping",
            position: { top: "20%", right: "10%" },
            opacity: 60
          },
          {
            size: "sm",
            color: "blue",
            animation: "pulse",
            position: { bottom: "25%", left: "15%" },
            opacity: 40
          },
          {
            size: "sm",
            color: "secondary",
            animation: "bounce",
            position: { top: "35%", left: "8%" },
            opacity: 50
          }
        ]}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-secondary-default/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section - Left Aligned like Projects/Certifications */}
        <motion.div
          data-testid="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex-1">
            <h1 className="text-3xl xl:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-sm font-medium leading-relaxed">
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Let&apos;s collaborate and bring your{" "}
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                vision to life
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}together
              </span>
            </p>
          </div>
        </motion.div>

        {/* Stats Dashboard - Using Real Portfolio Data */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Projects */}
              <div ref={projectsCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-[#00BFFF]/20 rounded-lg">
                  <Suspense fallback={<IconFallback />}>
                    <FaCode className="text-[#00BFFF] text-xl" />
                  </Suspense>
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#0080FF] tabular-nums">
                    {projectsCount.count}+
                  </div>
                  <div className="text-xs text-white/60">Projects</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Technologies */}
              <div ref={technologiesCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Suspense fallback={<IconFallback />}>
                    <FaLayerGroup className="text-purple-400 text-xl" />
                  </Suspense>
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tabular-nums">
                    {technologiesCount.count}+
                  </div>
                  <div className="text-xs text-white/60">Technologies</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Years Experience */}
              <div ref={experienceCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Suspense fallback={<IconFallback />}>
                    <FaGlobe className="text-emerald-400 text-xl" />
                  </Suspense>
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tabular-nums">
                    {experienceCount.count}+
                  </div>
                  <div className="text-xs text-white/60">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-col xl:flex-row gap-8"
        >
          {/* Contact Form - Now appears FIRST on mobile (order-1) */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="xl:w-[54%] order-1 xl:order-none"
          >
            <div className="bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-8 rounded-lg border border-white/10">
              <motion.div
                variants={PERFORMANCE_VARIANTS.fadeInFast}
                className="mb-6"
              >
                <h1 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent mb-4">
                  Let&apos;s work together
                </h1>
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
                {/* Honeypot field - hidden from users, bots will fill it */}
                <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <FormSection
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
                      rows: 6,
                      maxLength: MESSAGE_LIMITS.MAX
                    }
                  ]}
                  onFieldChange={(fieldName, value) => handleInputChange(fieldName as keyof FormData, value)}
                >
                  {/* Character counter for message */}
                  <div className="flex justify-between items-center text-xs mb-4 -mt-4">
                    <span className={`${
                      formData.message.length < MESSAGE_LIMITS.MIN
                        ? 'text-white/40'
                        : 'text-emerald-400'
                    }`}>
                      {formData.message.length < MESSAGE_LIMITS.MIN
                        ? `${MESSAGE_LIMITS.MIN - formData.message.length} more characters needed`
                        : 'Minimum reached'
                      }
                    </span>
                    <span className={`${
                      formData.message.length > MESSAGE_LIMITS.MAX * 0.9
                        ? 'text-amber-400'
                        : 'text-white/40'
                    }`}>
                      {formData.message.length}/{MESSAGE_LIMITS.MAX}
                    </span>
                  </div>
                  {/* Form Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || isBlocked}
                      className="bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-primary font-semibold px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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

                    {/* Conditional Reset Button - only shows when form has data */}
                    {hasFormData && (
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        onClick={handleReset}
                        className="border-white/20 hover:border-white/40 hover:bg-white/5 text-white/70 hover:text-white px-6 py-3 rounded-lg transition-all duration-300"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                </FormSection>
              </form>
            </div>
          </motion.div>

          {/* Contact Information - Appears SECOND on mobile (order-2) */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="flex-1 flex items-start xl:justify-end order-2 xl:order-none"
          >
            <div className="w-full xl:max-w-md">
              <motion.h3
                variants={PERFORMANCE_VARIANTS.slideUpSync}
                className="text-2xl font-bold mb-6 text-left bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent"
              >
                Contact Information
              </motion.h3>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {info.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className={`group relative bg-gradient-to-r ${item.color} backdrop-blur-sm border ${item.borderColor} p-4 rounded ${item.hoverColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      item.clickable ? 'cursor-pointer' : ''
                    }`}
                    onClick={item.clickable ? item.action : undefined}
                    role={item.clickable ? 'button' : undefined}
                    tabIndex={item.clickable ? 0 : undefined}
                    onKeyDown={item.clickable ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.action();
                      }
                    } : undefined}
                    aria-label={item.clickable ? item.actionLabel : undefined}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 ${item.textColor} rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-xl">
                          <Suspense fallback={<IconFallback />}>
                            <item.icon />
                          </Suspense>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/60 text-sm font-medium mb-1">{item.title}</p>
                        <h4 className="text-white font-semibold text-sm truncate">{item.description}</h4>
                        {item.clickable && (
                          <p className="text-white/50 text-xs mt-1 group-hover:text-white/70 transition-colors duration-300">
                            Click to {item.actionLabel?.toLowerCase()}
                          </p>
                        )}
                      </div>
                      {item.clickable && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                          <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white/50"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-white/80">Connect on Social</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.title}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                      className={`w-12 h-12 ${social.color} border ${social.borderColor} rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
                      aria-label={`Visit ${social.title} profile`}
                    >
                      <Suspense fallback={<IconFallback />}>
                        <social.icon className={`text-xl ${social.textColor}`} />
                      </Suspense>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
