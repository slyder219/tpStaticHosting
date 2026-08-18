import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, BarChart3, Braces, Check, Compass, Menu, MoveUpRight, PackageCheck, Workflow, X, Zap } from 'lucide-react'

const services = [
  { number: '01', icon: Workflow, title: 'Operations design', text: 'Find the friction, simplify the process, and create a practical operating rhythm your team can keep.' },
  { number: '02', icon: Braces, title: 'Custom systems', text: 'Purpose-built internal tools and automations that fit the way your business actually works.' },
  { number: '03', icon: PackageCheck, title: 'Procurement & logistics', text: 'Reliable sourcing, vendor coordination, and practical logistics support that keeps critical work moving.' },
  { number: '04', icon: Zap, title: 'Focused builds', text: 'Lean web applications and digital products—with clear scope, fast feedback, and no unnecessary ceremony.' },
]
const work = [
  { title: 'Sean Lyder', domain: 'seanlyder.com', label: 'Personal site', href: 'https://seanlyder.com' },
  { title: "Sophia's Lattes", domain: 'sophiaslattes.com', label: 'Web project', href: 'https://sophiaslattes.com' },
  { title: 'TruePeak', domain: 'truepeak.us', label: 'Company site', href: 'https://truepeak.us' },
  { title: 'Showcase', domain: 'showcase.seanlyder.com', label: 'Project collection', href: 'https://showcase.seanlyder.com' },
  { title: 'GitHub', domain: 'github.com/slyder219', label: 'Code & experiments', href: 'https://github.com/slyder219' },
]

function InquiryForm({ onSubmit, status, context = 'General inquiry', selectedService = '' }) {
  return <form className="contact-form" onSubmit={onSubmit}>
    <input type="hidden" name="inquiry_type" value={context}/>
    <input type="checkbox" name="botcheck" className="form-trap" tabIndex="-1" autoComplete="off"/>
    <div className="field-row"><label><span>Name</span><input type="text" name="name" autoComplete="name" placeholder="Your name" required/></label><label><span>Email</span><input type="email" name="email" autoComplete="email" placeholder="you@company.com" required/></label></div>
    <div className="field-row"><label><span>Company <small>Optional</small></span><input type="text" name="company" autoComplete="organization" placeholder="Company or organization"/></label><label><span>Area of interest</span><select name="service" defaultValue={selectedService}><option value="" disabled>Select one</option>{services.map(({title}) => <option key={title} value={title}>{title}</option>)}<option value="Something else">Something else</option></select></label></div>
    <label><span>How can we help?</span><textarea name="message" rows="5" placeholder={context === 'Project inquiry' ? 'What are you looking to build, improve, or launch?' : 'A quick overview of the challenge, goal, or timeline...'} required/></label>
    <div className="form-action"><button type="submit" disabled={status.state === 'sending'}>{status.state === 'sending' ? 'Sending...' : 'Send inquiry'} <ArrowRight size={18}/></button><p className={`form-status ${status.state}`} role="status" aria-live="polite">{status.message}</p></div>
  </form>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' })
  const [inquiry, setInquiry] = useState({ open: false, context: 'General inquiry', service: '' })
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const close = () => setMenuOpen(false)
  const openInquiry = (context = 'General inquiry', service = '') => {
    setFormStatus({ state: 'idle', message: '' })
    setInquiry({ open: true, context, service })
    close()
  }
  useEffect(() => {
    if (!inquiry.open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setInquiry((current) => ({ ...current, open: false }))
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', onKeyDown) }
  }, [inquiry.open])
  const submitContact = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setFormStatus({ state: 'sending', message: 'Sending your message...' })

    try {
      const formData = new FormData(form)
      formData.append('access_key', '915ab1ab-e025-4feb-86d9-aa9641f1608d')
      formData.append('subject', 'New TruePeak website inquiry')
      formData.append('from_name', 'TruePeak Website')
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await response.json()

      if (!response.ok || !data.success) throw new Error(data.message || 'Submission failed')
      form.reset()
      setFormStatus({ state: 'success', message: 'Message received. We’ll be in touch soon.' })
    } catch {
      setFormStatus({ state: 'error', message: 'Something went wrong. Please try again or email hello@truepeak.us.' })
    }
  }
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" onClick={close}><img src="/assets/tp_circle.png" alt=""/><span>TRUEPEAK</span></a>
      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#services" onClick={close}>Services</a><a href="#approach" onClick={close}>Approach</a><a href="#work" onClick={close}>Work</a>
        <a className="nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); openInquiry('Custom inquiry') }}>Start a conversation <ArrowRight size={16}/></a>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <main id="top">
      <section className="hero section-shell">
        <div className="hero-copy"><div className="eyebrow"><span/> Operations · Logistics · Systems</div><h1>Clarity,<br/><em>built in.</em></h1><p>TruePeak turns operational friction into focused systems, dependable supply and logistics, useful tools, and measurable momentum.</p><div className="hero-actions"><a className="button button-light" href="#contact" onClick={(event) => { event.preventDefault(); openInquiry('Project inquiry') }}>Let’s build something <ArrowRight size={18}/></a><a className="text-link" href="#services">Explore our work <ArrowDown size={16}/></a></div></div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="peak-lines"><i/><i/><i/><i/><i/></div><div className="signal-card"><span className="signal-dot"/><div><small>CURRENT SIGNAL</small><strong>Moving upward</strong></div><BarChart3 size={26}/></div><span className="coord coord-a">40.7128° N</span><span className="coord coord-b">74.0060° W</span></div><div className="hero-index">TP / 001</div>
      </section>
      <section className="statement section-shell"><div className="section-marker">01 / WHAT WE DO</div><div className="statement-body"><p className="big-statement">We help ambitious teams get from <span>stuck</span> to <em>moving.</em></p><p className="statement-note">Less noise. Better systems. Smarter sourcing and logistics. Work that creates leverage long after we leave.</p></div></section>
      <section className="services section-shell" id="services">{services.map(({number, icon: Icon, title, text}) => <article className="service-card" key={number}><div className="service-top"><span>{number}</span><Icon size={27} strokeWidth={1.5}/></div><h2>{title}</h2><p>{text}</p><a href="#contact" onClick={(event) => { event.preventDefault(); openInquiry('Service inquiry', title) }}>Discuss a project <ArrowRight size={16}/></a></article>)}</section>
      <section className="approach section-shell" id="approach"><div className="approach-visual"><div className="compass"><Compass size={52} strokeWidth={1}/><span>TRUE<br/>NORTH</span></div><div className="topo topo-1"/><div className="topo topo-2"/><div className="topo topo-3"/></div><div className="approach-copy"><div className="section-marker light">02 / HOW WE WORK</div><h2>Direct by design.</h2><p>Good work starts with an honest read of where you are. We listen, map the real problem, and build the shortest credible path forward.</p><ul><li><Check size={17}/> Senior attention, start to finish</li><li><Check size={17}/> Right-sized solutions, never shelfware</li><li><Check size={17}/> Clear communication and visible progress</li></ul></div></section>
      <section className="work section-shell" id="work"><div className="work-heading"><div className="section-marker">03 / LINKS & WORK</div><h2>Around the web.</h2></div><div className="work-list">{work.map((item, index) => <a className="work-item" href={item.href} target="_blank" rel="noreferrer" key={item.href}><span className="work-number">{String(index + 1).padStart(2, '0')}</span><div className="work-name"><h3>{item.title}</h3><span>{item.domain}</span></div><p>{item.label}</p><MoveUpRight size={19}/></a>)}</div></section>
      <section className="contact section-shell" id="contact">
        <div className="contact-ring"/>
        <div className="contact-intro"><div className="eyebrow dark"><span/> Your next move</div><h2>Have a problem worth<br/><em>solving?</em></h2><p>Tell us what you’re working through. A few useful details are all we need to start.</p></div>
        <InquiryForm onSubmit={submitContact} status={formStatus}/>
      </section>
    </main>
    {inquiry.open && <div className="inquiry-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setInquiry((current) => ({ ...current, open: false }))}><section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="inquiry-title"><button className="modal-close" type="button" onClick={() => setInquiry((current) => ({ ...current, open: false }))} aria-label="Close inquiry form"><X/></button><div className="eyebrow dark"><span/> {inquiry.context}</div><h2 id="inquiry-title">{inquiry.context === 'Project inquiry' ? 'Let’s build something useful.' : inquiry.service ? `Let’s talk ${inquiry.service.toLowerCase()}.` : 'Start a conversation.'}</h2><InquiryForm key={`${inquiry.context}-${inquiry.service}`} onSubmit={submitContact} status={formStatus} context={inquiry.context} selectedService={inquiry.service}/></section></div>}
    <footer className="section-shell"><div className="footer-brand"><img src="/assets/tp_circle.png" alt=""/><strong>TRUEPEAK</strong></div><p>Practical strategy. Purposeful systems.<br/>Better ways forward.</p><div className="footer-meta"><a href="#contact" onClick={(event) => { event.preventDefault(); openInquiry('Custom inquiry') }}>Contact</a><a href="https://github.com/slyder219" target="_blank" rel="noreferrer">GitHub</a><span>© {new Date().getFullYear()} TruePeak LLC</span></div></footer>
  </>
}
