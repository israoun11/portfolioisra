import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { GithubDashboard } from './components/github/GithubDashboard';
import { AiAssistant } from './components/ai/AiAssistant';
import { DevTerminal } from './components/terminal/DevTerminal';

function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <GithubDashboard />
        <Certificates />
        <AiAssistant />
        <DevTerminal />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;