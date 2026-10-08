import './styles/landing.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Why, Classes, Hub, Opportunities, Community, FinalCta } from './components/Sections';
import Footer from './components/Footer';
import { CursorGlow } from './components/ui';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <Why />
        <Classes />
        <Hub />
        <Opportunities />
        <Community />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}