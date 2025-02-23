"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt, FaSkype } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+880 1681642502",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "biswajitmailid@gmail.com",
  },
  {
    icon: <FaSkype />,
    title: "Skype",
    description: "biswajit_panday",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description: "Dhaka, Bangladesh",
  },
];

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-secondary-default">
                Let&quot;s work together
              </h3>
              <p className="text-white/60">
                Whether you need scalable solutions, high-performance
                applications, or cutting-edge digital experiences, I’m here to
                help bring your vision to life. Let’s collaborate, innovate, and
                create something impactful together.
              </p>
              <p className="text-white/60">
                Get in touch—I&quot;d love to hear about your project!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" placeholder="Firstname" />
                <Input type="text" placeholder="Lastname" />
                <Input type="text" placeholder="Email Address" />
                <Input type="text" placeholder="Phone Number" />
              </div>
              <Textarea
                  className="h-[150px] w-full"
                  placeholder="Type your message here"
                />
                <Button size="sm" variant="outline" className="max-w-40 custom-button" disabled>
                  Send Message
                </Button>
            </form>
          </div>

          <div className="flex-1 flex items-center xl::justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
                {info.map((item, index) => {
                    return <li key={index} className="flex items-center gap-6">
                        <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-secondary-default rounded-md flex items-center justify-center">
                            <div className="text-[28px]">{item.icon}</div>
                        </div>
                        <div>
                            <p className="text-white/60">{item.title}</p>
                            <h3 className="text-xl">{item.description}</h3>
                        </div>
                    </li>
                })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
