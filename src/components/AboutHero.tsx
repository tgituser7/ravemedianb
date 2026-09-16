"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero-section ${isVisible ? "hero-visible" : ""}`}
    >
      {/* Main graphic */}
      <div className="hero-graphic">

        {/* Halftone layer */}
        <div className="halftone halftone-1" />
        <div className="halftone halftone-2" />

        {/* Orange organic shapes */}
        <div className="orange-shape orange-1" />
        <div className="orange-shape orange-2" />
        <div className="orange-shape orange-3" />

        {/* Purple overlay */}
        <div className="purple-overlay" />
      </div>

      {/* Heading cream cutout */}
      <div className="hero-heading-box">
        <h1>
          The Internet
          <br />
          Of Chains
        </h1>
      </div>

      {/* Bottom information */}
      <div className="hero-info">
        <p>
          Caldera is a network of interconnected, purpose-built
          blockchains, settling on Ethereum.
        </p>

        <div className="hero-buttons">
          <a href="#" className="explore-button">
            Explore Chains
          </a>

          <a href="#" className="call-button">
            Book A Call
          </a>
        </div>
      </div>
    </section>
  );
}