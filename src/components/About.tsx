import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Factory } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;
    if (!section || !reveal) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: reveal,
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.about-image',
        { autoAlpha: 0, scale: 0.97, y: 26 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F7F9FC] py-24 md:py-32">
      <div className="absolute left-0 top-16 h-64 w-64 rounded-full bg-[#0B3D78]/12 blur-[90px]" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#0B3D78]/10 blur-[110px]" />
      <div className="absolute inset-0 opacity-[0.42] iso-grid" />

      <div ref={revealRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-18">
          <div className="about-image relative min-h-[420px] overflow-hidden rounded-[8px] border border-[#0B3D78]/10 bg-white shadow-[0_28px_80px_rgba(11,61,120,0.14)]">
            <img
              src="/images/manufacturing.png"
              alt="FasLift elevator safety manufacturing"
              className="h-full min-h-[420px] w-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D78]/58 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 flex items-center gap-3 border border-white/20 bg-white/12 px-4 py-3 backdrop-blur-md">
              
            </div>
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#0B3D78] via-[#0B3D78] to-transparent" />
          </div>

          <div>
            <div className="about-reveal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0B3D78]" />
              <span className="font-['JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0B3D78]/55">
                Who We Are
              </span>
            </div>

            <h2 className="about-reveal mb-7 max-w-3xl font-['Inter',sans-serif] font-black leading-[1.02] text-[#0B3D78]">
              <span className="block text-[clamp(2.25rem,5vw,4.7rem)]">Precision Manufacturing</span>
              <span className="block text-[clamp(2.25rem,5vw,4.7rem)] text-[#0B3D78]">for Elevator Safety</span>
            </h2>

            <div className="space-y-5 text-[15.5px] leading-8 text-[#0B3D78]/72 md:text-base">
              <p className="about-reveal">
At FAS LIST, we specialize in providing high-quality Speed Governor solutions designed to improve road safety, vehicle control, and fleet management. Our mission is to deliver reliable and advanced speed limiting systems that help businesses and drivers maintain safe driving standards while complying with transportation regulations.

We work with trusted technology and durable equipment to ensure performance, accuracy, and long-term reliability. Whether for commercial vehicles, transport companies, or private fleets, FAS LIST is committed to offering professional service, technical support, and innovative solutions tailored to our customers’ needs.

With a strong focus on safety, quality, and customer satisfaction, FAS LIST continues to build trusted relationships with clients looking for dependable Speed Governor systems.              </p>
             
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            <div className="about-reveal bg-[#0B3D78] p-7 text-white shadow-[0_22px_60px_rgba(11,61,120,0.18)]">
              <Eye className="mb-5 h-7 w-7 text-white/80" />
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Our Vision</h3>
              <p className="text-sm leading-7 text-white/72">
                To become a global leader in elevator safety technology by continuously developing innovative solutions that redefine reliability, protection, and engineering precision.
              </p>
            </div>
            <div className="about-reveal border border-[#0B3D78]/10 bg-white p-7 shadow-[0_16px_50px_rgba(11,61,120,0.08)]">
              <Factory className="mb-5 h-7 w-7 text-[#0B3D78]" />
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#0B3D78]">Our Mission</h3>
              <p className="text-sm leading-7 text-[#0B3D78]/70">
                To manufacture world-class elevator safety systems that protect lives, improve performance, and support the future of modern vertical transportation.
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}
