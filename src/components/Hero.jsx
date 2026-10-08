import { useEffect, useRef } from 'react';
import { IMG } from '../data/images';
import { Magnetic } from './ui';
import { canAnimate } from '../hooks';

const HEADLINE = ['Learn.', 'Practice.', 'Grow.', 'Explore.'];

export default function Hero() {
  const ref = useRef(null);

  // Gentle scroll parallax (tablet/desktop only). Drives the CSS `translate` property
  // so it never clashes with entrance animations that use `transform`.
  useEffect(() => {
    if (!canAnimate() || window.innerWidth < 768) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (ref.current) ref.current.style.setProperty('--sy', Math.min(window.scrollY, 800));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="blob blob-yellow" aria-hidden="true" />
      <div className="blob blob-pink" aria-hidden="true" />
      <div className="blob blob-blue" aria-hidden="true" />
      <span className="dot dot-1" aria-hidden="true" />
      <span className="dot dot-2" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow rise" style={{ '--i': 0 }}>Education for every child</p>
          <h1>
            {HEADLINE.map((w, i) => (
              <span key={w} className={`rise word word-${i}`} style={{ '--i': i + 1 }}>
                {w}{' '}
              </span>
            ))}
          </h1>
          <p className="lead rise" style={{ '--i': 5 }}>
            Shiksha Saathi brings accessible learning resources, practice, quizzes, skills and
            educational opportunities together for students in Classes 1–10, because education
            should be accessible to every child.
          </p>
          <div className="btn-row rise" style={{ '--i': 6 }}>
            <Magnetic>
              <a href="#classes" className="btn btn-primary">Start Learning</a>
            </Magnetic>
            <Magnetic>
              <a href="#opportunities" className="btn btn-secondary">Explore Opportunities</a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-shape" aria-hidden="true" />
          <div className="hero-ring" aria-hidden="true" />

          <div className="hero-photo img-reveal">
            <img
              src={IMG.hero}
              alt="Smiling Indian school students learning together"
              width="640"
              height="640"
              fetchPriority="high"
            />
          </div>

          <div className="hero-mini img-reveal-late">
            <img
              src={IMG.reading}
              alt="A student absorbed in a book"
              width="240"
              height="240"
            />
          </div>

          <span className="chip chip-1 float" aria-hidden="true">📚 Learn</span>
          <span className="chip chip-2 float f2" aria-hidden="true">✏️ Practice</span>
          <span className="chip chip-3 float f3" aria-hidden="true">⭐ Improve</span>
          <span className="chip chip-4 float f4" aria-hidden="true">🌍 Explore</span>
        </div>
      </div>
    </section>
  );
}