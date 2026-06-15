import { useEffect, useRef } from 'react';
import { Lenis as LenisType } from 'lenis';

export function useSmoothScroll() {
  const lenisRef = useRef<LenisType | null>(null);

  useEffect(() => {
    const Lenis = (window as any).Lenis;
    
    if (!Lenis) {
      console.warn('Lenis not loaded, using native scroll');
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if available
    const gsap = (window as any).gsap;
    if (gsap && gsap.core) {
      gsap.registerPlugin({
        name: 'LenisSync',
        init: () => {
          gsap.ticker.add((time: number) => {
            lenis.raf(time * 1000);
          });
        },
      });
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

export function useScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString());
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
