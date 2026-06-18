'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import EditableImage from "@/app/components/EditableImage";
import { apiUrl } from "@/lib/api";

// ─── Data ────────────────────────────────────────────────────────────────────
const categories = [
  { id: "all", name: "All Services" },
  { id: "cosmetic", name: "Cosmetic" },
  { id: "restorative", name: "Restorative" },
  { id: "preventive", name: "Preventive" },
  { id: "surgical", name: "Surgical" },
  { id: "orthodontic", name: "Orthodontic" },
  { id: "pediatric", name: "Pediatric" },
  { id: "periodontal", name: "Periodontal" },
  { id: "endodontic", name: "Endodontic" },
  { id: "technology", name: "Technology" },
];

const services = [
  { id: 1, title: "Porcelain Veneers", description: "Transform your smile with custom-crafted porcelain veneers, designed to perfect your teeth's appearance.", category: "cosmetic", features: ["Custom-designed for your smile", "Natural-looking results", "Stain-resistant material", "Long-lasting beauty"], image: "/assets/images/cosmetic.jpg" },
  { id: 2, title: "Professional Teeth Whitening", description: "Achieve a brighter, more radiant smile with our advanced teeth whitening treatments.", category: "cosmetic", features: ["In-office power whitening", "Take-home whitening kits", "Lasting results", "Safe and effective"], image: "/assets/images/whitening.jpg" },
  { id: 3, title: "Composite Bonding", description: "Restore chipped, cracked, or discolored teeth with natural-looking composite materials.", category: "cosmetic", features: ["Same-day results", "Minimally invasive", "Color-matched material", "Affordable solution"], image: "/assets/images/bonding.jpg" },
  { id: 4, title: "Dental Implants", description: "Restore your smile with permanent, natural-looking dental implant solutions.", category: "restorative", features: ["Titanium root replacement", "Natural-looking crown", "Permanent solution", "Preserves jaw bone"], image: "/assets/images/implants.jpg" },
  { id: 5, title: "Ceramic Crowns", description: "Protect and restore damaged teeth with custom-made ceramic crowns.", category: "restorative", features: ["Same-day CEREC crowns", "Natural appearance", "Durable material", "Perfect fit"], image: "/assets/images/crowns.jpg" },
  { id: 6, title: "Dental Bridges", description: "Fill gaps in your smile with custom-designed dental bridges.", category: "restorative", features: ["Fixed or removable options", "Natural appearance", "Restored functionality", "Long-lasting results"], image: "/assets/images/bridges.jpg" },
  { id: 7, title: "Comprehensive Check-ups", description: "Maintain optimal oral health with regular dental examinations and cleanings.", category: "preventive", features: ["Digital X-rays", "Oral cancer screening", "Periodontal evaluation", "Professional cleaning"], image: "/assets/images/checkup.jpg" },
  { id: 8, title: "Dental Sealants", description: "Protect vulnerable teeth from decay with dental sealants.", category: "preventive", features: ["Cavity prevention", "Quick application", "Long-lasting protection", "Ideal for children"], image: "/assets/images/sealants.jpg" },
  { id: 9, title: "Wisdom Teeth Removal", description: "Safe and comfortable extraction of problematic wisdom teeth.", category: "surgical", features: ["Sedation options", "Expert care", "Quick recovery", "Pain management"], image: "/assets/images/wisdom.jpg" },
  { id: 10, title: "Bone Grafting", description: "Strengthen your jaw bone for dental implants or other procedures.", category: "surgical", features: ["Advanced techniques", "Promotes healing", "Implant preparation", "Minimally invasive"], image: "/assets/images/bone-graft.jpg" },
  { id: 11, title: "Invisible Aligners", description: "Straighten your teeth discreetly with custom clear aligners.", category: "orthodontic", features: ["Nearly invisible", "Removable trays", "Custom-made", "Comfortable fit"], image: "/assets/images/aligners.jpg" },
  { id: 12, title: "Traditional Braces", description: "Achieve a perfect smile with modern orthodontic solutions.", category: "orthodontic", features: ["Multiple options available", "Regular adjustments", "Effective treatment", "Suitable for all ages"], image: "/assets/images/braces.jpg" },
  { id: 13, title: "Children's Dentistry", description: "Specialized dental care for our youngest patients in a friendly environment.", category: "pediatric", features: ["Child-friendly atmosphere", "Preventive care", "Early intervention", "Education focused"], image: "/assets/images/pediatric.jpg" },
  { id: 14, title: "Space Maintainers", description: "Preserve space for permanent teeth after premature loss of baby teeth.", category: "pediatric", features: ["Custom-fitted", "Comfortable wear", "Prevents misalignment", "Easy maintenance"], image: "/assets/images/space-maintainers.jpg" },
  { id: 15, title: "Gum Disease Treatment", description: "Comprehensive treatment for various stages of periodontal disease.", category: "periodontal", features: ["Deep cleaning", "Laser therapy", "Maintenance program", "Prevention focus"], image: "/assets/images/periodontal.jpg" },
  { id: 16, title: "Gum Grafting", description: "Restore receding gums and protect exposed root surfaces.", category: "periodontal", features: ["Natural tissue repair", "Reduced sensitivity", "Improved aesthetics", "Long-term results"], image: "/assets/images/gum-graft.jpg" },
  { id: 17, title: "Root Canal Therapy", description: "Save infected teeth with modern root canal treatment.", category: "endodontic", features: ["Painless procedure", "Tooth preservation", "Advanced techniques", "Same-day treatment"], image: "/assets/images/root-canal.jpg" },
  { id: 18, title: "Microsurgery", description: "Precision endodontic procedures using microscopic visualization.", category: "endodontic", features: ["High magnification", "Precise treatment", "Better outcomes", "Complex case handling"], image: "/assets/images/microsurgery.jpg" },
  { id: 19, title: "3D CBCT Imaging", description: "State-of-the-art imaging for precise diagnosis and treatment planning.", category: "technology", features: ["3D visualization", "Low radiation", "Detailed analysis", "Treatment planning"], image: "/assets/images/cbct.jpg" },
  { id: 20, title: "Digital Smile Design", description: "Preview your new smile with advanced digital design technology.", category: "technology", features: ["Virtual preview", "Treatment simulation", "Custom planning", "Predictable results"], image: "/assets/images/smile-design.jpg" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filteredServices =
    activeCategory === "all" ? services : services.filter((s) => s.category === activeCategory);

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <EditableImage
            src="/assets/images/smile-design.jpg"
            alt="WhitePearl Premium Services"
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
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-8 max-w-3xl"
          >
            Premium
            <span className="block text-primary-gold italic">Services.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-white/80 text-lg max-w-md leading-relaxed"
          >
            Experience world-class dental care with our comprehensive range of services, delivered with precision and luxury in mind.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CATEGORY NAV ─────────────────────────────────────────────────── */}
      <section className="py-10 bg-[#fafafa] border-b border-black/5 sticky top-0 z-30 backdrop-blur-md bg-[#fafafa]/95">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`font-ui text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary-gold text-black border-primary-gold"
                    : "bg-transparent text-black/60 border-black/10 hover:border-primary-gold hover:text-primary-gold"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 9) * 0.07 }}
                className="group relative bg-white rounded-xl overflow-hidden border border-black/5 hover:border-primary-gold/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <EditableImage
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    label="Change Image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 font-ui text-[10px] tracking-[0.2em] uppercase bg-primary-gold text-black px-3 py-1 rounded-full">
                    {categories.find((cat) => cat.id === service.category)?.name}
                  </span>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="font-heading text-xl text-black mb-3">{service.title}</h3>
                  <p className="font-body text-black/60 text-sm leading-relaxed mb-6">{service.description}</p>
                  <div className="space-y-2.5 mt-auto">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-1.5 flex-shrink-0" />
                        <span className="font-ui text-black/60 text-xs tracking-wide">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            Ready to Experience
            <span className="block text-primary-gold italic">Luxury Dental Care?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-white/60 text-lg mb-10 leading-relaxed"
          >
            Schedule your consultation today and discover the perfect treatment plan for your smile.
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