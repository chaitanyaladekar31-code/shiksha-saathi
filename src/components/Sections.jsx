import { IMG } from '../data/images';
import { Reveal, Tilt, Magnetic } from './ui';

function Heading({ eyebrow, title, children }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="lead">{children}</p>}
    </Reveal>
  );
}

/* VALUE STRIP: replaces the old numeric stats. Only real project concepts. */
const VALUES = [
  { i: '🎒', t: 'Classes 1–10', d: 'Primary to secondary', c: 'yellow' },
  { i: '🔁', t: 'Learn → Practice → Test → Improve', d: 'One simple learning loop', c: 'orange' },
  { i: '📖', t: 'Free Learning Resources', d: 'Made to be accessible', c: 'green' },
  { i: '📚', t: 'E-Library', d: 'Books and study material', c: 'blue' },
  { i: '🎓', t: 'Scholarships & Opportunities', d: 'Find what comes next', c: 'pink' },
  { i: '🛠️', t: 'Skill Development', d: 'Practical skills, early', c: 'orange' },
];

export function ValueStrip() {
  return (
    <section className="value-strip" aria-label="What Shiksha Saathi offers">
      <div className="container">
        <Reveal className="value-box">
          <ul className="value-list">
            {VALUES.map((v) => (
              <li key={v.t} className={`value-item tone-${v.c}`}>
                <span className="value-icon" aria-hidden="true">{v.i}</span>
                <div>
                  <p className="value-title">{v.t}</p>
                  <p className="value-sub">{v.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* WHY SHIKSHA SAATHI (calm hover lift; no tilt) */
const STEPS = [
  { t: 'Learn', d: 'Clear, friendly lessons and a growing library for every class.', i: '📖', c: 'orange' },
  { t: 'Practice', d: 'Short exercises that turn understanding into confidence.', i: '✏️', c: 'pink' },
  { t: 'Test', d: 'Quizzes that show what a student knows, without pressure.', i: '📝', c: 'green' },
  { t: 'Improve', d: 'Focus on weak spots and keep getting a little better each day.', i: '🌱', c: 'blue' },
];

export function Why() {
  return (
    <section id="why" className="section">
      <div className="container">
        <Heading eyebrow="Why Shiksha Saathi" title="A simple path to learning well">
          One learning loop that works for every child, at their own pace.
        </Heading>
        <div className="grid-4">
          {STEPS.map((s, n) => (
            <Reveal key={s.t} delay={n}>
              <article className={`card why-card tone-${s.c}`}>
                <span className="step-no" aria-hidden="true">0{n + 1}</span>
                <span className="card-icon" aria-hidden="true">{s.i}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CHOOSE YOUR CLASS (3D tilt) */
const CLASSES = [
  { t: 'Classes 1–2', d: 'Rhymes, shapes, first words and numbers.', c: 'yellow', i: '🧸' },
  { t: 'Classes 3–5', d: 'Reading, simple maths and curious science.', c: 'pink', i: '🎨' },
  { t: 'Classes 6–8', d: 'Deeper concepts and stronger study habits.', c: 'green', i: '🔬' },
  { t: 'Classes 9–10', d: 'Stronger foundations and career awareness.', c: 'blue', i: '🎯' },
];

export function Classes() {
  return (
    <section id="classes" className="section section-tint">
      <div className="container">
        <Heading eyebrow="Choose your class" title="Start where you are">
          Pick a class group to see what is waiting for you.
        </Heading>
        <div className="grid-4">
          {CLASSES.map((c, n) => (
            <Reveal key={c.t} delay={n}>
              <Tilt as="a" href="#hub" className={`card class-card tone-${c.c}`} max={9}>
                <span className="class-emoji" aria-hidden="true">{c.i}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <span className="arrow-link">Explore <span aria-hidden="true">→</span></span>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* LEARNING HUB (tilt + image drift) */
const HUB = [
  { t: 'E-Library', d: 'Books and study material, free to read.', img: IMG.library, alt: 'Students reading in a library', c: 'orange' },
  { t: 'Coding', d: 'First steps in logic and programming.', img: IMG.digital, alt: 'Students learning on a computer', c: 'blue' },
  { t: 'English', d: 'Reading, speaking and writing with confidence.', img: IMG.reading, alt: 'A student reading a book', c: 'pink' },
  { t: 'Digital Skills', d: 'Safe, useful skills for a connected world.', img: IMG.practice, alt: 'A student practising on a worksheet', c: 'green' },
];

export function Hub() {
  return (
    <section id="hub" className="section">
      <div className="container">
        <Heading eyebrow="Learning hub" title="Explore what you love">
          Resources built around real classrooms and real students.
        </Heading>
        <div className="grid-4">
          {HUB.map((h, n) => (
            <Reveal key={h.t} delay={n}>
              <Tilt as="article" className={`card hub-card tone-${h.c}`} max={6}>
                <div className="hub-img">
                  <img src={h.img} alt={h.alt} loading="lazy" width="400" height="300" />
                </div>
                <h3>{h.t}</h3>
                <p>{h.d}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* OPPORTUNITIES */
const OPPS = [
  ['🎓', 'Scholarships', 'Find scholarships students can apply for.'],
  ['🏛️', 'Government Schemes', 'Understand schemes in simple language.'],
  ['💻', 'Free Courses', 'Learn new things at no cost.'],
  ['🛠️', 'Skill Development', 'Build practical skills early.'],
  ['🧭', 'Career Guidance', 'Discover paths and plan the next step.'],
];

export function Opportunities() {
  return (
    <section id="opportunities" className="section section-tint">
      <div className="container opp-grid">
        <Reveal className="opp-visual">
          <div className="blob-img">
            <img src={IMG.opportunities} alt="A student looking ahead to new opportunities" loading="lazy" width="520" height="520" />
          </div>
        </Reveal>
        <div>
          <Heading eyebrow="Opportunities" title="Doors that open with knowledge">
            Learning is the first step. We also help students find what comes next.
          </Heading>
          <ul className="opp-list">
            {OPPS.map(([i, t, d], n) => (
              <Reveal as="li" key={t} delay={n}>
                <span className="opp-icon" aria-hidden="true">{i}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Magnetic>
            <a href="#cta" className="btn btn-primary">Explore Opportunities</a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* COMMUNITY (no statistics) */
export function Community() {
  return (
    <section id="community" className="section">
      <div className="container">
        <Heading eyebrow="Our community" title="Every child belongs in the classroom">
          Shiksha Saathi is built for students, teachers and families who believe a good
          education should never depend on where a child lives.
        </Heading>

        <div className="collage">
          <Reveal className="collage-main">
            <div className="img-card"><img src={IMG.courtyard} alt="A school courtyard where students gather" loading="lazy" width="800" height="520" /></div>
          </Reveal>
          <Reveal delay={1} className="collage-a">
            <div className="img-card"><img src={IMG.community} alt="Students together as a community" loading="lazy" width="400" height="300" /></div>
          </Reveal>
          <Reveal delay={2} className="collage-b">
            <div className="img-card"><img src={IMG.group} alt="A group of students learning together" loading="lazy" width="400" height="300" /></div>
          </Reveal>
          <Reveal delay={3} className="collage-c">
            <div className="img-card"><img src={IMG.teacher} alt="A teacher with her students" loading="lazy" width="400" height="300" /></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* FINAL CTA */
export function FinalCta() {
  return (
    <section id="cta" className="section">
      <div className="container">
        <Reveal className="cta-box">
          <img className="cta-img" src={IMG.happy} alt="Happy students ready to learn" loading="lazy" width="360" height="360" />
          <div>
            <h2>Your learning journey starts here.</h2>
            <p>Join Shiksha Saathi and take the first step: learn, practice and explore.</p>
            <Magnetic>
              <a href="#home" className="btn btn-light">Get Started</a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}