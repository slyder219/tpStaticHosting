import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, BarChart3, Braces, Check, Compass, Menu, MoveUpRight, Workflow, X, Zap } from 'lucide-react'

const services = [
  { number: '01', icon: Workflow, title: 'Operations design', text: 'Find the friction, simplify the process, and create a practical operating rhythm your team can keep.' },
  { number: '02', icon: Braces, title: 'Custom systems', text: 'Purpose-built internal tools and automations that fit the way your business actually works.' },
  { number: '03', icon: Zap, title: 'Focused builds', text: 'Lean web applications and digital products—with clear scope, fast feedback, and no unnecessary ceremony.' },
]
const work = [
  { type: 'Hospitality', title: "Sophia's Lattes", label: 'Brand & web experience', href: 'https://sophiaslattes.com', className: 'project-copper' },
  { type: 'Digital portfolio', title: 'The Showcase', label: 'Design & development', href: 'https://showcase.seanlyder.com', className: 'project-blue' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const close = () => setMenuOpen(false)
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" onClick={close}><img src="/assets/tp_circle.png" alt=""/><span>TRUEPEAK</span></a>
      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#services" onClick={close}>Services</a><a href="#approach" onClick={close}>Approach</a><a href="#work" onClick={close}>Work</a>
        <a className="nav-cta" href="mailto:hello@truepeak.us">Start a conversation <ArrowRight size={16}/></a>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <main id="top">
      <section className="hero section-shell">
        <div className="hero-copy"><div className="eyebrow"><span/> Strategy · Systems · Software</div><h1>Clarity,<br/><em>built in.</em></h1><p>TruePeak turns operational friction into focused systems, useful tools, and measurable momentum.</p><div className="hero-actions"><a className="button button-light" href="mailto:hello@truepeak.us">Let’s build something <ArrowRight size={18}/></a><a className="text-link" href="#services">Explore our work <ArrowDown size={16}/></a></div></div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="peak-lines"><i/><i/><i/><i/><i/></div><div className="signal-card"><span className="signal-dot"/><div><small>CURRENT SIGNAL</small><strong>Moving upward</strong></div><BarChart3 size={26}/></div><span className="coord coord-a">40.7128° N</span><span className="coord coord-b">74.0060° W</span></div><div className="hero-index">TP / 001</div>
      </section>
      <section className="statement section-shell"><div className="section-marker">01 / WHAT WE DO</div><div className="statement-body"><p className="big-statement">We help ambitious teams get from <span>stuck</span> to <em>moving.</em></p><p className="statement-note">Less noise. Better systems. Work that creates leverage long after we leave.</p></div></section>
      <section className="services section-shell" id="services">{services.map(({number, icon: Icon, title, text}) => <article className="service-card" key={number}><div className="service-top"><span>{number}</span><Icon size={27} strokeWidth={1.5}/></div><h2>{title}</h2><p>{text}</p><a href="mailto:hello@truepeak.us">Discuss a project <ArrowRight size={16}/></a></article>)}</section>
      <section className="approach section-shell" id="approach"><div className="approach-visual"><div className="compass"><Compass size={52} strokeWidth={1}/><span>TRUE<br/>NORTH</span></div><div className="topo topo-1"/><div className="topo topo-2"/><div className="topo topo-3"/></div><div className="approach-copy"><div className="section-marker light">02 / HOW WE WORK</div><h2>Direct by design.</h2><p>Good work starts with an honest read of where you are. We listen, map the real problem, and build the shortest credible path forward.</p><ul><li><Check size={17}/> Senior attention, start to finish</li><li><Check size={17}/> Right-sized solutions, never shelfware</li><li><Check size={17}/> Clear communication and visible progress</li></ul></div></section>
      <section className="work section-shell" id="work"><div className="work-heading"><div className="section-marker">03 / SELECTED WORK</div><h2>Proof over promises.</h2></div><div className="projects">{work.map(p => <a className={`project ${p.className}`} href={p.href} target="_blank" rel="noreferrer" key={p.title}><div className="project-noise"/><span className="project-type">{p.type}</span><div><h3>{p.title}</h3><p>{p.label}</p></div><span className="project-arrow"><MoveUpRight/></span></a>)}</div><a className="all-work" href="https://github.com/slyder219" target="_blank" rel="noreferrer">View code on GitHub <MoveUpRight size={17}/></a></section>
      <section className="contact section-shell" id="contact"><div className="contact-ring"/><div className="eyebrow dark"><span/> Your next move</div><h2>Have a problem worth<br/><em>solving?</em></h2><a href="mailto:hello@truepeak.us">hello@truepeak.us <ArrowRight/></a></section>
    </main>
    <footer className="section-shell"><div className="footer-brand"><img src="/assets/tp_circle.png" alt=""/><strong>TRUEPEAK</strong></div><p>Practical strategy. Purposeful systems.<br/>Better ways forward.</p><div className="footer-meta"><a href="mailto:hello@truepeak.us">Email</a><a href="https://github.com/slyder219" target="_blank" rel="noreferrer">GitHub</a><span>© {new Date().getFullYear()} TruePeak LLC</span></div></footer>
  </>
}
