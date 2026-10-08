import { useEffect, useRef, useState } from 'react';
import { canAnimate, finePointer, useInView } from '../hooks';

/* Scroll-reveal wrapper. `delay` is a stagger index (each step = 90ms). */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'in' : ''} ${className}`}
      style={{ '--d': delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Subtle 3D tilt + inner image drift. Mouse only; touch/reduced-motion get hover/none. */
export function Tilt({ as: Tag = 'div', className = '', children, max = 7, ...rest }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !canAnimate()) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
      el.style.setProperty('--tx', `${(x * -10).toFixed(1)}px`);
      el.style.setProperty('--ty', `${(y * -10).toFixed(1)}px`);
    });
  };
  const onLeave = () => {
    const el = ref.current;
    ['--rx', '--ry', '--tx', '--ty'].forEach((p) => el.style.removeProperty(p));
  };

  return (
    <Tag
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Magnetic wrapper: nudges the button a few px toward the cursor. Capped so it stays clickable. */
export function Magnetic({ children }) {
  const ref = useRef(null);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current = canAnimate() && finePointer();
  }, []);

  const onMove = (e) => {
    if (!enabled.current) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
    const cap = (v) => Math.max(-8, Math.min(8, v));
    el.style.transform = `translate(${cap(dx)}px, ${cap(dy)}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span ref={ref} className="magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </span>
  );
}

/* Animated counter, starts when scrolled into view. */
export function Counter({ to, suffix = '' }) {
  const [ref, seen] = useInView(0.4);
  const [val, setVal] = useState(() => (canAnimate() ? 0 : to));

  useEffect(() => {
    if (!seen || !canAnimate()) return;

    let raf;
    const start = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* Soft glow that follows the cursor on desktop only. */
export function CursorGlow() {
  const ref = useRef(null);
  const [on] = useState(() => canAnimate() && finePointer());

  useEffect(() => {
    if (!on) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (ref.current) ref.current.style.transform = `translate(${x - 160}px, ${y - 160}px)`;
        });
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [on]);

  return on ? <div ref={ref} className="cursor-glow" aria-hidden="true" /> : null;
}