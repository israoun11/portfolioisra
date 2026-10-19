import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import { Why, Systems } from './components/Sections'
import Mood from './components/Mood'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Why />
        
        <Mood />
        <Systems />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
