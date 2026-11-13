import { useCallback, useState } from 'react'
import { Header } from './components/Header'
import { Intro } from './components/Intro'
import { ScrollProgress } from './components/ScrollProgress'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Specialties } from './sections/Specialties'
import { Stack } from './sections/Stack'

export default function App() {
  const [ready, setReady] = useState(false)
  const onIntroDone = useCallback(() => setReady(true), [])

  return (
    <div className="grain">
      <Intro onDone={onIntroDone} />
      <ScrollProgress />
      <Header />
      <main>
        <Hero ready={ready} />
        <About />
        <Projects />
        <Specialties />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
