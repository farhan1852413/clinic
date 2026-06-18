'use client';

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import EditableImage from "@/app/components/EditableImage";
import { apiUrl } from "@/lib/api";

// ─── Data ────────────────────────────────────────────────────────────────────
const values = [
  {
    title: "Excellence",
    description: "We maintain the highest standards in dental care, utilizing state-of-the-art technology and advanced techniques.",
  },
  {
    title: "Luxury Experience",
    description: "Every detail of your visit is crafted to provide an unparalleled level of comfort and sophistication.",
  },
  {
    title: "Patient-Focused",
    description: "Your unique needs and desires are at the center of our personalized treatment approach.",
  },
  {
    title: "Innovation",
    description: "We continuously invest in the latest dental technologies to ensure optimal treatment outcomes.",
  },
];

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Lead Cosmetic Dentist",
    description: "With over 15 years of experience in cosmetic dentistry, Dr. Mitchell leads our team with expertise in smile transformations.",
    image: "/assets/images/team/dr-mitchell.jpg",
    credentials: "DDS, AAACD",
  },
  {
    name: "Dr. James Chen",
    role: "Implant Specialist",
    description: "A renowned expert in dental implants and reconstructive dentistry with numerous international certifications.",
    image: "/assets/images/team/dr-chen.jpg",
    credentials: "DMD, PhD",
  },
  {
    name: "Dr. Emily Parker",
    role: "Orthodontist",
    description: "Specializing in creating beautiful smiles through innovative orthodontic treatments and Invisalign.",
    image: "/assets/images/team/dr-parker.jpg",
    credentials: "DDS, MS",
  },
];

const facilityImages = [
  { src: "/assets/images/facility-1.jpg", alt: "Reception Area" },
  { src: "/assets/images/facility-2.jpg", alt: "Treatment Room" },
  { src: "/assets/images/facility-3.jpg", alt: "Advanced Equipment" },
  { src: "/assets/images/facility-4.jpg", alt: "Consultation Room" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <EditableImage
            src="/assets/images/about-hero.jpg"
            alt="WhitePearl Dental Clinic"
            fill
            className="object-cover"
            priority
            label="Change Hero Image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-8 max-w-3xl"
          >
            Excellence in
            <span className="block text-primary-gold">Dental Care.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-white/80 text-lg max-w-md leading-relaxed"
          >
            At WhitePearl, we combine artistry with advanced dentistry to deliver exceptional care in a luxurious environment.
          </motion.p>
        </motion.div>
      </section>

      {/* ── LEGACY / HISTORY ────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">Since 2008</p>
              <h2 className="font-heading text-4xl lg:text-5xl text-black mb-6 leading-tight">
                Our Legacy of
                <br />
                <span className="italic">Excellence</span>
              </h2>
              <div className="w-12 h-[2px] bg-primary-gold mb-8" />
              <div className="space-y-6">
                <p className="font-body text-black/70 text-lg leading-relaxed">
                  Founded in 2008, WhitePearl Dental Clinic has established itself as Beverly Hills&apos; premier destination for luxury dental care. Our journey began with a vision to transform the dental experience into something extraordinary.
                </p>
                <p className="font-body text-black/70 text-lg leading-relaxed">
                  Over the years, we&apos;ve consistently invested in cutting-edge technology and assembled a team of world-class professionals, setting new standards in dental excellence.
                </p>
                <p className="font-body text-black/70 text-lg leading-relaxed">
                  Today, we&apos;re proud to be recognized as a leader in cosmetic and restorative dentistry, serving clients who expect nothing but the best.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="relative h-[600px]"
            >
              <div className="absolute -top-4 -right-4 w-full h-full border border-primary-gold/30 rounded-lg z-0" />
              <div className="relative h-full rounded-lg overflow-hidden z-10">
                <EditableImage
                  src="/assets/images/clinic-exterior.jpg"
                  alt="WhitePearl Dental Clinic Exterior"
                  fill
                  className="object-cover"
                  label="Change Image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
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
            className="mb-16 text-center"
          >
            <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">What We Stand For</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-white">
              Our Core <span className="italic text-primary-gold">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group bg-white/[0.03] border border-white/10 hover:border-primary-gold/40 rounded-xl p-8 text-center transition-all duration-500"
              >
                <div className="w-10 h-[1px] bg-primary-gold/60 mx-auto mb-6" />
                <h3 className="font-heading text-xl text-white mb-4">{value.title}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">The Specialists</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-black">
              Meet Our Expert <span className="italic">Team</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-xl overflow-hidden border border-black/5 hover:border-primary-gold/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <EditableImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    label="Change Photo"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 font-ui text-[10px] tracking-[0.2em] uppercase bg-primary-gold text-black px-3 py-1 rounded-full">
                    {member.credentials}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-xl text-black mb-1">{member.name}</h3>
                  <p className="font-ui text-primary-gold text-xs tracking-[0.15em] uppercase mb-4">{member.role}</p>
                  <p className="font-body text-black/60 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITY ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">Designed For Comfort</p>
              <h2 className="font-heading text-4xl lg:text-5xl text-black mb-6 leading-tight">
                State-of-the-Art
                <br />
                <span className="italic">Facility</span>
              </h2>
              <div className="w-12 h-[2px] bg-primary-gold mb-8" />
              <div className="space-y-6 mb-10">
                <p className="font-body text-black/70 text-lg leading-relaxed">
                  Our clinic is equipped with the latest dental technology and designed to provide a comfortable, luxurious experience. From our elegant reception area to our advanced treatment rooms, every space is crafted with your comfort in mind.
                </p>
                <p className="font-body text-black/70 text-lg leading-relaxed">
                  We maintain the highest standards of sterilization and safety, ensuring a pristine environment for every procedure.
                </p>
              </div>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 font-ui text-xs tracking-[0.2em] uppercase text-black border-b border-primary-gold pb-1 transition-all duration-300 hover:text-primary-gold"
              >
                View Our Gallery
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {facilityImages.map((img) => (
                <div key={img.alt} className="relative h-48 rounded-lg overflow-hidden">
                  <EditableImage src={img.src} alt={img.alt} fill className="object-cover" label="Change Image" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src="/assets/images/about-hero.jpg"
            alt="CTA Background"
            fill
            className="object-cover opacity-20"
            label="Change Background"
          />
        </div>
        <div className="absolute inset-6 border border-primary-gold/20 rounded-2xl pointer-events-none z-10" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-primary-gold to-transparent z-10" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-t from-primary-gold to-transparent z-10" />

        <div className="relative z-20 max-w-3xl mx-auto px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-6"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-heading text-4xl lg:text-6xl text-white mb-6 leading-tight"
          >
            Experience the
            <span className="block text-primary-gold italic">WhitePearl Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-white/60 text-lg mb-10 leading-relaxed"
          >
            Join us for a consultation and discover why we&apos;re Beverly Hills&apos; premier choice for luxury dental care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/appointment"
              className="group inline-flex items-center gap-3 bg-primary-gold text-black font-ui text-xs tracking-[0.25em] uppercase px-12 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-105"
            >
              Schedule Your Visit
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}