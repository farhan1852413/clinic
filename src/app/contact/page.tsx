'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RiMapPin2Line, RiPhoneLine, RiMailLine, RiTimeLine, RiInstagramLine, RiFacebookLine, RiTwitterXLine } from "react-icons/ri";
import EditableImage from "@/app/components/EditableImage";
import { apiUrl } from "@/lib/api";

// ─── Data ────────────────────────────────────────────────────────────────────
const businessHours = [
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
  { day: "Friday", hours: "9:00 AM - 4:00 PM" },
  { day: "Saturday", hours: "By Appointment" },
  { day: "Sunday", hours: "Closed" },
];

const inputClass =
  "w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl font-body text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary-gold/40 focus:border-primary-gold transition-all duration-300";

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Contact() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Please try again shortly.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[55vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <EditableImage
            src="/assets/images/contact-hero.jpg"
            alt="Contact WhitePearl Dental"
            fill
            className="object-cover"
            priority
            label="Change Hero Image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        </motion.div>

        <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-primary-gold to-transparent z-10" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-6"
          >
            We&apos;d Love to Hear From You
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-8 max-w-3xl"
          >
            Get in
            <span className="block text-primary-gold italic">Touch.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-white/80 text-lg max-w-md leading-relaxed"
          >
            We&apos;re here to help with any questions you may have about our services.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-10 rounded-xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
            >
              <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">Send a Message</p>
              <h2 className="font-heading text-3xl text-black mb-2">Let&apos;s Talk</h2>
              <div className="w-12 h-[2px] bg-primary-gold mb-8" />

              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-primary-gold text-2xl">✦</span>
                  </div>
                  <h3 className="font-heading text-2xl text-black mb-3">Message Sent</h3>
                  <p className="font-body text-black/60 leading-relaxed">
                    Thank you for reaching out — our team will respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                        Full Name
                      </label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                        Email Address
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} required />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Subject
                    </label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} required>
                      <option value="">Select a subject</option>
                      <option value="appointment">Book Appointment</option>
                      <option value="consultation">Request Consultation</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group w-full inline-flex items-center justify-center gap-3 bg-primary-gold text-black font-ui text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                    {status !== "submitting" && (
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-black/5"
              >
                <h3 className="font-heading text-2xl text-black mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center flex-shrink-0">
                      <RiMapPin2Line className="text-primary-gold" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">Location</p>
                      <p className="font-body text-black/80">123 Luxury Lane, Beverly Hills, CA 90210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center flex-shrink-0">
                      <RiPhoneLine className="text-primary-gold" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">Phone</p>
                      <a href="tel:+1234567890" className="font-body text-black/80 hover:text-primary-gold transition-colors">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center flex-shrink-0">
                      <RiMailLine className="text-primary-gold" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">Email</p>
                      <a href="mailto:info@whitepearl.com" className="font-body text-black/80 hover:text-primary-gold transition-colors">
                        info@whitepearl.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-black/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <RiTimeLine className="text-primary-gold w-5 h-5" />
                  <h3 className="font-heading text-2xl text-black">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule) => (
                    <div key={schedule.day} className="flex justify-between font-ui text-sm">
                      <span className="text-black/60">{schedule.day}</span>
                      <span className="text-black">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-black/5"
              >
                <h3 className="font-heading text-2xl text-black mb-6">Connect With Us</h3>
                <div className="flex gap-4">
                  {[
                    { Icon: RiInstagramLine, href: "https://instagram.com" },
                    { Icon: RiFacebookLine, href: "https://facebook.com" },
                    { Icon: RiTwitterXLine, href: "https://twitter.com" },
                  ].map(({ Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-black transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ──────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
        <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />

        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">Visit Us</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-4">
              Find <span className="italic text-primary-gold">Us</span>
            </h2>
            <p className="font-body text-white/60 max-w-xl mx-auto">
              Located in the heart of Beverly Hills, our clinic offers convenient access and valet parking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-xl overflow-hidden border border-primary-gold/20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7153676817196!2d-118.40034168478258!3d34.0736498808061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b93cca9c7ab1%3A0xe2ce30e735620d15!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

    </main>
  );
}