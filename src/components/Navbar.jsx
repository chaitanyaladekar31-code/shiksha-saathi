import { useEffect, useState } from 'react';
import { Magnetic } from './ui';

const LINKS = [
  ['Home', '#home'],
  ['Learn', '#classes'],
  ['Practice', '#why'],
  ['Opportunities', '#opportunities'],
  ['Resources', '#hub'],
  ['About', '#community'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  // Solid background after a little scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active link: whichever section crosses the middle band of the viewport
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = LINKS.map(([, href]) => document.getElementById(href.slice(1))).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Escape closes the menu; resizing to desktop closes it too
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 961px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand" aria-label="Shiksha Saathi home">
          <span className="brand-mark" aria-hidden="true">श</span>
          <span className="brand-text">
            Shiksha <b>Saathi</b>
          </span>
        </a>

        <nav id="primary-nav" aria-label="Primary" className={`nav-links ${open ? 'open' : ''}`}>
          <ul>
            {LINKS.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className={active === href ? 'is-active' : ''}
                  aria-current={active === href ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#cta" className="btn btn-primary nav-cta-mobile" onClick={() => setOpen(false)}>
            Get Started
          </a>
        </nav>

        <div className="nav-actions">
          <span className="nav-cta-desktop">
            <Magnetic>
              <a href="#cta" className="btn btn-primary btn-sm">Get Started</a>
            </Magnetic>
          </span>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}