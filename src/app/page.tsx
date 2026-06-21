'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Editable Image Component ───────────────────────────────────────────────
function EditableImage({
  src,
  alt,
  fill,
  className,
  priority,
  width,
  height,
  label = "Change Image",
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  label?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImgSrc(URL.createObjectURL(file));
  };

  return (
    <div className="group relative w-full h-full">
      {fill ? (
        <Image src={imgSrc} alt={alt} fill className={className} priority={priority} />
      ) : (
        <Image src={imgSrc} alt={alt} width={width} height={height} className={className} />
      )}
      <button
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 text-primary-gold text-xs font-ui tracking-widest px-3 py-1.5 rounded-full border border-primary-gold/40 backdrop-blur-sm"
      >
        ✦ {label}
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const services = [
  {
    title: "Cosmetic Dentistry",
    description: "Porcelain veneers, bonding, and smile makeovers crafted to perfection.",
    image: "/assets/images/cosmetic.jpg",
    tag: "Most Popular",
  },
  {
    title: "Dental Implants",
    description: "Permanent, natural-looking restorations with titanium precision.",
    image: "/assets/images/implants.jpg",
    tag: "Advanced",
  },
  {
    title: "Smile Design",
    description: "Digital previews and bespoke treatment plans for your ideal smile.",
    image: "/assets/images/smile-design.jpg",
    tag: "Signature",
  },
];

const stats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "10k+", label: "Smiles Transformed" },
  { number: "50+", label: "Awards Won" },
  { number: "100%", label: "Patient Satisfaction" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Executive",
    text: "The level of care at WhitePearl is unmatched. I couldn't be happier with my results.",
    initial: "S",
  },
  {
    name: "Michael Chen",
    role: "Entrepreneur",
    text: "A truly luxurious dental experience. The team made me feel at ease throughout.",
    initial: "M",
  },
  {
    name: "Emma Davis",
    role: "Artist",
    text: "From the moment you walk in, you know you're in the best hands. Simply exceptional.",
    initial: "E",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <EditableImage
            src="/assets/images/hero-bg.jpg"
            alt="Luxury Dental Clinic"
            fill
            className="object-cover"
            priority
            label="Change Hero Image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>

        {/* Decorative gold line */}
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
            Beverly Hills · Est. 2008
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-8xl text-white leading-[1.05] mb-8 max-w-3xl"
          >
            Elevate Your
            <span className="block text-primary-gold">Smile.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-white/80 text-lg max-w-md mb-10 leading-relaxed"
>
  Where artistry meets dentistry. Discover a new standard of dental excellence in Beverly Hills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/appointment"
              className="group inline-flex items-center gap-3 bg-primary-gold text-black font-ui text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Book Your Visit
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 border border-white/40 text-white font-ui text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:border-primary-gold hover:text-primary-gold backdrop-blur-sm"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-ui text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-8 bg-gradient-to-b from-primary-gold to-transparent"
          />
        </motion.div>
      </section>

      {/* ── WELCOME ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
              <h2 className="font-heading text-4xl lg:text-5xl text-black mb-6 leading-tight">
                Welcome to<br />
                <span className="italic">WhitePearl</span>
              </h2>
              <div className="w-12 h-[2px] bg-primary-gold mb-8" />
              <p className="font-body text-black/70 text-lg mb-10 leading-relaxed">
                At WhitePearl, we believe exceptional dental care and luxury aren't mutually exclusive.
                Our state-of-the-art facility pairs cutting-edge technology with an atmosphere
                designed around your comfort.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 font-ui text-xs tracking-[0.2em] uppercase text-black border-b border-primary-gold pb-1 transition-all duration-300 hover:text-primary-gold"
              >
                Discover Our Story
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="relative h-[600px]"
            >
              {/* Gold frame accent */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-primary-gold/30 rounded-lg z-0" />
              <div className="relative h-full rounded-lg overflow-hidden z-10">
                <EditableImage
                  src="/assets/images/welcome.jpg"
                  alt="Luxury Dental Office"
                  fill
                  className="object-cover"
                  label="Change Image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">What We Offer</p>
            <div className="flex items-end justify-between">
              <h2 className="font-heading text-4xl lg:text-5xl text-black leading-tight">
                Premium<br /><span className="italic">Services</span>
              </h2>
              <Link
                href="/services"
                className="hidden md:inline-flex items-center gap-2 font-ui text-xs tracking-[0.2em] uppercase text-black/50 hover:text-primary-gold transition-colors duration-300 border-b border-black/20 hover:border-primary-gold pb-1"
              >
                View All Services →
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-xl overflow-hidden border border-black/5 hover:border-primary-gold/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <EditableImage
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    label="Change Image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 font-ui text-[10px] tracking-[0.2em] uppercase bg-primary-gold text-black px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-xl text-black mb-3">{service.title}</h3>
                  <p className="font-body text-black/60 text-sm leading-relaxed mb-6">{service.description}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 font-ui text-xs tracking-[0.2em] uppercase text-primary-gold group-hover:gap-3 transition-all duration-300"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
        <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />

        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="font-heading text-5xl lg:text-6xl text-primary-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="w-8 h-[1px] bg-primary-gold/40 mx-auto mb-3" />
                <div className="font-ui text-[10px] tracking-[0.25em] uppercase text-white/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="font-ui text-primary-gold text-xs tracking-[0.3em] uppercase mb-4">Kind Words</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-black">
              Patient <span className="italic">Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-white p-8 rounded-xl border border-black/5 hover:border-primary-gold/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group"
              >
                {/* Quote mark */}
                <div className="absolute top-6 right-8 font-heading text-7xl text-primary-gold/10 leading-none group-hover:text-primary-gold/20 transition-colors duration-300">
                  "
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary-gold text-sm">★</span>
                  ))}
                </div>
                <p className="font-body text-black/70 text-base leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center">
                    <span className="font-heading text-primary-gold text-sm">{t.initial}</span>
                  </div>
                  <div>
                    <div className="font-heading text-black text-sm">{t.name}</div>
                    <div className="font-ui text-[10px] tracking-[0.2em] uppercase text-black/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src="/assets/images/hero-bg.jpg"
            alt="CTA Background"
            fill
            className="object-cover opacity-20"
            label="Change Background"
          />
        </div>
        {/* Gold border frame */}
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
            Ready to Transform
            <span className="block text-primary-gold italic">Your  Smile?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-white/60 text-lg mb-10 leading-relaxed"
          >
            Schedule your complimentary consultation and discover the WhitePearl difference.
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
              Book Your Consultation
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}