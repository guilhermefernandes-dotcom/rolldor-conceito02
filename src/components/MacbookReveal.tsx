import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import macbookImg from "@/assets/macbook.webp";
import screenImg from "@/assets/whatsapp-screen.png";

export function MacbookReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  // Screen flips down from the lid and grows as user scrolls
  const rotateX = useTransform(scrollYProgress, [0, 1], [-35, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const height = useTransform(scrollYProgress, [0, 1], [280, 380]);
  const radius = useTransform(scrollYProgress, [0, 1], [6, 28]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 0 0 0 rgba(0,0,0,0)", "0 30px 60px -10px rgba(0,0,0,0.45)"],
  );

  // Mobile values
  const rotateXMobile = useTransform(scrollYProgress, [0, 1], [-57, 0]);
  const heightMobile = useTransform(scrollYProgress, [0, 1], [180, 200]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex w-full flex-col items-center"
      style={{ perspective: "1200px" }}
    >
      <img
        src={macbookImg}
        alt="MacBook"
        className="relative z-0 w-[300px] md:w-[700px]"
      />

      {/* Desktop screen */}
      <motion.div
        className="absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 overflow-hidden md:block"
        style={{
          width: 630,
          height,
          marginTop: 60,
          rotateX,
          y,
          borderRadius: radius,
          boxShadow: shadow,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={screenImg}
          alt="LEEVI Grupo VIP no WhatsApp"
          className="h-full w-full object-cover object-top"
        />
      </motion.div>

      {/* Mobile screen */}
      <motion.div
        className="absolute left-1/2 top-0 z-20 -translate-x-1/2 overflow-hidden md:hidden"
        style={{
          width: 272,
          height: heightMobile,
          marginTop: 25,
          rotateX: rotateXMobile,
          y: useTransform(scrollYProgress, [0, 1], [0, 200]),
          borderRadius: useTransform(scrollYProgress, [0, 1], [6, 20]),
          boxShadow: shadow,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={screenImg}
          alt="LEEVI Grupo VIP no WhatsApp"
          className="h-full w-full object-cover object-top"
        />
      </motion.div>
    </div>
  );
}
