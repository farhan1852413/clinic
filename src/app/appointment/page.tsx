'use client';

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RiCalendarLine, RiTimeLine, RiUserLine, RiPhoneLine, RiMailLine, RiFileTextLine } from "react-icons/ri";
import EditableImage from "@/app/components/EditableImage";
import { apiUrl } from "@/lib/api";

// ─── Data ────────────────────────────────────────────────────────────────────
const services = [
  { id: "cosmetic", name: "Cosmetic Dentistry" },
  { id: "implants", name: "Dental Implants" },
  { id: "orthodontic", name: "Orthodontic Treatment" },
  { id: "preventive", name: "Preventive Care" },
  { id: "restorative", name: "Restorative Dentistry" },
  { id: "emergency", name: "Emergency Care" },
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

const inputClass =
  "w-full pl-12 pr-4 py-3.5 bg-white border border-black/10 rounded-xl font-body text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary-gold/40 focus:border-primary-gold transition-all duration-300";

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Appointment() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
    isNewPatient: "yes",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch(apiUrl("/api/appointments"), {
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
      setErrorMessage("Could not reach the booking server. Please try again shortly.");
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
            src="/assets/images/booking-hero.jpg"
            alt="Book Appointment at WhitePearl Dental"
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
            Reserve Your Time
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-8 max-w-3xl"
          >
            Book Your
            <span className="block text-primary-gold italic">Visit.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-white/80 text-lg max-w-md leading-relaxed"
          >
            Begin your journey to a perfect smile with our premium dental care services.
          </motion.p>
        </motion.div>
      </section>

      {/* ── BOOKING ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-10 rounded-xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
            >
              <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
              <h2 className="font-heading text-3xl text-black mb-2">Schedule Your Appointment</h2>
              <div className="w-12 h-[2px] bg-primary-gold mb-8" />

              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-primary-gold text-2xl">✦</span>
                  </div>
                  <h3 className="font-heading text-2xl text-black mb-3">Request Received</h3>
                  <p className="font-body text-black/60 leading-relaxed">
                    Thank you — our team will reach out shortly to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-gold" />
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-gold" />
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <RiPhoneLine className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-gold" />
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Service Type
                    </label>
                    <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl font-body text-black focus:outline-none focus:ring-2 focus:ring-primary-gold/40 focus:border-primary-gold transition-all duration-300" required>
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <RiCalendarLine className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-gold" />
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="time" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <RiTimeLine className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-gold" />
                        <select id="time" name="time" value={formData.time} onChange={handleChange} className={inputClass} required>
                          <option value="">Select time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-3">
                      Are you a new patient?
                    </label>
                    <div className="flex gap-3">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, isNewPatient: opt })}
                          className={`font-ui text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-full border transition-all duration-300 ${
                            formData.isNewPatient === opt
                              ? "bg-primary-gold text-black border-primary-gold"
                              : "bg-transparent text-black/50 border-black/10 hover:border-primary-gold hover:text-primary-gold"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block font-ui text-xs tracking-[0.15em] uppercase text-black/50 mb-2">
                      Additional Notes
                    </label>
                    <div className="relative">
                      <RiFileTextLine className="absolute left-4 top-4 text-primary-gold" />
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Any specific concerns or requests..."
                      />
                    </div>
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
                    {status === "submitting" ? "Submitting..." : "Request Appointment"}
                    {status !== "submitting" && (
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Booking Information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-black/5"
              >
                <h3 className="font-heading text-2xl text-black mb-6">What to Expect</h3>
                <p className="font-body text-black/70 leading-relaxed mb-6">
                  Your journey to a perfect smile begins with a comprehensive consultation. During your visit, our expert team will:
                </p>
                <div className="space-y-3.5">
                  {[
                    "Conduct a thorough examination",
                    "Discuss your dental concerns and goals",
                    "Create a personalized treatment plan",
                    "Answer all your questions and concerns",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-2 flex-shrink-0" />
                      <span className="font-body text-black/70">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                viewport={{ once: true }}
                className="relative bg-black p-8 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "30px 30px" }}
                />
                <div className="relative">
                  <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">New Patient</p>
                  <h3 className="font-heading text-2xl text-white mb-4">Special Offer</h3>
                  <p className="font-body text-white/70 leading-relaxed mb-6">
                    First-time patients receive a complimentary consultation and comprehensive dental examination worth $350.
                  </p>
                  <div className="space-y-3.5">
                    {["Complete oral examination", "Digital X-rays as needed", "Personalized treatment plan"].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-2 flex-shrink-0" />
                        <span className="font-body text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-black/5"
              >
                <h3 className="font-heading text-2xl text-black mb-4">Insurance & Payment</h3>
                <p className="font-body text-black/70 leading-relaxed mb-4">
                  We accept most major insurance plans and offer flexible payment options to make your dental care accessible.
                </p>
                <p className="font-body text-black/70 leading-relaxed">
                  Our team will help you understand your coverage and maximize your benefits.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}