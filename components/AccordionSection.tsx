// AccordionSection.tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface AccordionSectionProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function AccordionSection({
  isOpen,
  children,
}: AccordionSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0, y: -10 },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className="w-full mx-auto text-left bg-[#695951] text-white">
        <div
          ref={contentRef}
          className="overflow-hidden h-0 opacity-0"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <div className="p-6 bg-[#695951] text-white shadow-md rounded-b-lg">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
