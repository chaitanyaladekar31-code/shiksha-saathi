const COLS = [
  ['Navigate', ['Home', 'Learn', 'Practice', 'Opportunities', 'About']],
  ['Learning', ['E-Library', 'Coding', 'English', 'Digital Skills']],
  ['Opportunities', ['Scholarships', 'Government Schemes', 'Free Courses', 'Career Guidance']],
  ['Support', ['Help Centre', 'Contact', 'Privacy', 'Terms']],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="brand" aria-label="Shiksha Saathi home">
            <span className="brand-mark" aria-hidden="true">श</span>
            <span className="brand-text">Shiksha <b>Saathi</b></span>
          </a>
          <p>Learn. Practice. Grow. Explore. Education for every child, Classes 1–10.</p>
          <div className="social">
            {['Instagram', 'YouTube', 'X'].map((s) => (
              <a key={s} href="#home" aria-label={`${s} (coming soon)`}>{s}</a>
            ))}
          </div>
        </div>
        {COLS.map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h3>{title}</h3>
            <ul>
              {links.map((l) => (
                <li key={l}><a href="#home">{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} Shiksha Saathi. All rights reserved.
      </div>
    </footer>
  );
}