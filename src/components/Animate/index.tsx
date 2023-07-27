import { useState, useEffect, useRef } from "react";
import styles from "./animate.module.scss";

interface AnimateProps {
  children: JSX.Element;
  translate?: boolean;
  keep?: boolean;
  translateDirection?: "up" | "down" | "left" | "right";
}
function Animate({
  children,
  translate,
  keep,
  translateDirection = "down",
}: AnimateProps) {
  const [animate, setAnimate] = useState(false);
  const animatedSectionRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  const sectionTopRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          sectionTopRef.current = animatedSectionRef.current?.offsetTop || 0;
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.5 }
    );

    const animatedSection = animatedSectionRef.current;
    if (animatedSection) {
      observer.observe(animatedSection);
    }

    return () => {
      if (animatedSection) {
        observer.unobserve(animatedSection);
      }
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const animatedSection = animatedSectionRef.current;

      if (animatedSection) {
        const sectionTop = sectionTopRef.current;
        const rect = animatedSection.getBoundingClientRect();
        const animateOnScrollDown =
          rect.top < window.innerHeight && rect.bottom >= 0;
        const animateOnScrollUp = scrollTop < sectionTop;

        if (animateOnScrollDown && keep) {
          setAnimate(true);
        } else if (animateOnScrollUp && keep) {
          setAnimate(false);
        }
      }

      lastScrollTopRef.current = scrollTop;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [keep]);

  return (
    <div
      className={`${
        translate ? styles[`init-translate-${translateDirection}`] : styles.init
      } 
    ${animate && translate ? styles["animate-translate"] : ""} 
    ${animate && !translate ? styles.animate : ""}`}
      ref={animatedSectionRef}
    >
      {children}
    </div>
  );
}

export default Animate;
