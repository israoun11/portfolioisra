import { useState } from 'react'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Scene from './three/Scene'
import SceneBoundary from './three/SceneBoundary'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Github from './sections/Github'
import Certifications from './sections/Certifications'
import CV from './sections/CV'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Explicit background layer, painted before the 3D canvas so the two
          stay correctly ordered regardless of body/viewport background
          propagation rules (see index.css). */}
      <div className="fixed inset-0 -z-20 bg-ivory" aria-hidden="true" />
      <SceneBoundary>
        <Scene />
      </SceneBoundary>
      <Loader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />
      <Nav />

      <main className={`relative transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Github />
        <Certifications />
        <CV />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
