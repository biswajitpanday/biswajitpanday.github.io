"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { 
  FaEnvelope, 
  FaMapMarkedAlt, 
  FaPhoneAlt, 
  FaSkype,
  FaPaperPlane,
  FaRocket,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+880 1681642502",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-300",
    hoverColor: "hover:bg-blue-500/30 hover:border-blue-400"
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "biswajitmailid@gmail.com",
    color: "from-emerald-500/20 to-emerald-600/20",
    borderColor: "border-emerald-500/50",
    textColor: "text-emerald-300",
    hoverColor: "hover:bg-emerald-500/30 hover:border-emerald-400"
  },
  {
    icon: <FaSkype />,
    title: "Skype",
    description: "biswajit_panday",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-300",
    hoverColor: "hover:bg-purple-500/30 hover:border-purple-400"
  },
  {
    icon: <FaMapMarkedAlt />,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // PageClip form submission using environment variable
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
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone || 'Not provided',
          message: data.message,
          subject: `New contact form submission from ${data.firstName} ${data.lastName}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
        reset();
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
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
              Touch
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg xl:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Let&apos;s discuss your next project and bring your vision to life together
          </motion.p>

          {/* Contact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <div className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
              <div className="flex items-center gap-3">
                <FaRocket className="text-secondary-default text-xl group-hover:animate-pulse" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    24h
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Response Time
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
              <div className="flex items-center gap-3">
                <FaUsers className="text-secondary-default text-xl group-hover:animate-pulse" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    100+
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Happy Clients
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col xl:flex-row gap-8"
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="xl:w-[54%] order-2 xl:order-none"
          >
            <div className="bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-8 rounded border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
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
                  {submitStatus === 'success' ? (
                    <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
                  ) : (
                    <FaExclamationTriangle className="text-red-400 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitMessage}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">First Name *</label>
                    <Input 
                      {...register("firstName")}
                      type="text" 
                      placeholder="Enter your first name"
                      className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300 ${
                        errors.firstName ? 'border-red-500/50' : ''
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Last Name *</label>
                    <Input 
                      {...register("lastName")}
                      type="text" 
                      placeholder="Enter your last name"
                      className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300 ${
                        errors.lastName ? 'border-red-500/50' : ''
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-xs">{errors.lastName.message}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email Address *</label>
                    <Input 
                      {...register("email")}
                      type="email" 
                      placeholder="your.email@example.com"
                      className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300 ${
                        errors.email ? 'border-red-500/50' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Phone Number</label>
                    <Input 
                      {...register("phone")}
                      type="tel" 
                      placeholder="Enter your phone number"
                      className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300 ${
                        errors.phone ? 'border-red-500/50' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs">{errors.phone.message}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.4 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-white/80">Message *</label>
                  <Textarea
                    {...register("message")}
                    className={`h-[150px] w-full bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Tell me about your project, goals, and how I can help you achieve them..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs">{errors.message.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.4 }}
                >
                  <Button 
                    type="submit"
                    size="lg" 
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-primary font-semibold px-8 py-3 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0"
          >
            <div className="w-full max-w-md">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
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
                        <div className="text-xl xl:text-2xl">{item.icon}</div>
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
