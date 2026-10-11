import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import World from './components/World'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <a className="skip" href="#skills">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <World />
        <About />
        <Contact />
      </main>
    </>
  )
}
