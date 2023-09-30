import { useState } from 'react'
import './App.css'

import Header from "./assets/Header";
import Intro from "./assets/Intro";
import About from "./assets/About";
import Resume from "./assets/Resume";
import Proyects from "./assets/Proyects";
import Contact from "./assets/Contact";
import Footer from "./assets/Footer";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Intro />
    <About />
    <Resume />
    <section id="contact" className="Contact-Footer-container">
      <Contact />
      <Footer />
    </section>
  </>
  )
}

export default App
