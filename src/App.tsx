import { useState, type FormEvent } from 'react';
import {
  ArrowRight, Building2, CalendarDays, CheckCircle2, Clock3, Diamond,
  FileText, Heart, Home, Mail, MapPin, Menu, MessageCircle, Package,
  Phone, ShieldCheck, Sparkles, Footprints, Users, X, Grid2X2, Send,
} from 'lucide-react';

// Service groups also provide the quote form's service options.
const serviceGroups = [
  {
    name: 'Kotiin',
    text: 'Puhtaampi koti juuri silloin, kun sitä tarvitset.',
    icon: Home,
    pos: '12%',
    items: ['Kotisiivous', 'Suursiivous', 'Ikkunanpesu', 'Remonttisiivous'],
  },
  {
    name: 'Yrityksille ja taloyhtiöille',
    text: 'Siistit ja viihtyisät tilat työntekijöille, asiakkaille ja asukkaille.',
    icon: Building2,
    pos: '28%',
    items: ['Yrityssiivous', 'Porrassiivous'],
  },
  {
    name: 'Lattioiden hoito',
    text: 'Perusteellisempaa puhdistusta ja suojaa lattioille.',
    icon: Sparkles,
    pos: '88%',
    items: ['Lattioiden peruspesu', 'Lattioiden vahaus'],
  },
];

const reviews = [
  ['“Todella huolellista ja ystävällistä palvelua. Koti on aina ihanan puhdas ja raikas siivouksen jälkeen. Voin lämpimästi suositella!”', 'Laura K.', 'Turku', 'LK'],
  ['“Luotettava ja joustava palvelu. Muuttosiivous sujui täydellisesti ja kommunikointi oli alusta loppuun selkeää. Ehdottomasti jatkoon!”', 'Mikko S.', 'Lieto', 'MS'],
  ['“Ikkunanpesu onnistui erinomaisesti – jälki on upea! Lisäksi asiakaspalvelu oli todella ystävällistä ja nopeaa.”', 'Katri R.', 'Turku', 'KR'],
];

function LeafMark() {
  return <img className="brand-mark" src="/assets/cleaning-character.svg" alt="" width="80" height="59" aria-hidden="true" />;
}

function Logo() {
  return <a href="#alku" className="logo" aria-label="Siivous Tähkäpää etusivu">
    <LeafMark />
    <span><strong>Siivous<br/>Tähkäpää</strong><small>PUHTAAMPAA ARKEA</small></span>
  </a>;
}

function WhatsAppLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <a className={className} href="https://wa.me/35845312782" target="_blank" rel="noreferrer">
    <MessageCircle size={19}/>{children}
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <div className="container header-inner">
      <Logo />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Avaa valikko" aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Päänavigaatio">
        <a href="#palvelut" onClick={() => setOpen(false)}>Palvelut</a>
        <a href="#meista" onClick={() => setOpen(false)}>Tietoa meistä</a>
        <a href="#tarjous" onClick={() => setOpen(false)}>Hinta-arvio</a>
        <a href="#prosessi" onClick={() => setOpen(false)}>Usein kysytyt</a>
        <a href="#yhteys" onClick={() => setOpen(false)}>Yhteystiedot</a>
      </nav>
      <a href="#tarjous" className="button header-cta">Pyydä tarjous</a>
    </div>
  </header>;
}

type QuoteData = { service: string; area: string; location: string; frequency: string; date: string; contact: string };
const submitQuote = async (data: QuoteData) => { console.info('Tarjouspyyntö valmis API-kytkentää varten:', data); await new Promise(r => setTimeout(r, 450)); };

function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.currentTarget);
    await submitQuote(Object.fromEntries(fd) as QuoteData);
    setLoading(false); setSent(true);
  }
  return <form className="quote-form" onSubmit={submit}>
    <h2>Täytä tiedot</h2>
    <p>Saat selkeän tarjouksen nopeasti ja ilman sitoumuksia.</p>
    <div className="form-grid">
      <label>Palvelun tyyppi<select name="service" required defaultValue=""><option value="" disabled>Valitse palvelu</option>{serviceGroups.flatMap(group => group.items).map(service => <option key={service}>{service}</option>)}</select></label>
      <label>Pinta-ala (m²)<input name="area" type="number" min="1" placeholder="Esim. 60" required /></label>
      <label>Sijainti<input name="location" placeholder="Turku" required /></label>
      <label>Kuinka usein?<select name="frequency" required defaultValue=""><option value="" disabled>Valitse</option><option>Kertaluonteinen</option><option>Viikoittain</option><option>Joka toinen viikko</option><option>Kuukausittain</option></select></label>
      <label>Toivottu ajankohta<input name="date" type="datetime-local" required /></label>
      <label>Yhteystiedot<input name="contact" placeholder="Nimi, puhelin tai sähköposti" required /></label>
    </div>
    <button className="button form-submit" disabled={loading || sent}>{sent ? 'Kiitos! Palaamme pian.' : loading ? 'Lähetetään…' : <>Lähetä tarjouspyyntö <ArrowRight size={17}/></>}</button>
    <small>Vastaamme yleensä saman päivän aikana.</small>
  </form>;
}

function Hero() {
  return <section id="alku" className="hero">
    <div className="botanical botanical-left" aria-hidden="true">❧</div>
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">PUHTAAMPAA ARKEA – LÄHELLÄ SINUA</span>
        <h1>Huolellista siivousta<br/>koteihin ja yrityksille<br/>Turun seudulla</h1>
        <p>Luotettavaa, joustavaa ja henkilökohtaista siivouspalvelua Turussa, Liedossa ja lähialueilla. Pieni paikallinen yritys, iso sydän – ja aina puhtaampi lopputulos.</p>
        <div className="hero-actions"><a className="button" href="#tarjous">Pyydä tarjous <ArrowRight size={17}/></a><WhatsAppLink className="button secondary">Avaa WhatsApp</WhatsAppLink></div>
        <div className="trust-row"><span><MapPin/>Paikallinen yritys</span><span><CalendarDays/>Joustavat ajat</span><span><ShieldCheck/>Luotettava palvelu</span><span><Send/>Nopea vastaus</span></div>
      </div>
      <div className="hero-visual">
        <img src="/assets/hero-cleaner.png" alt="Ammattisiivooja valoisassa pohjoismaisessa kodissa" />
        <span className="script-note hero-note">Puhtaampia<br/>hetkiä arkeen ♡</span>
      </div>
    </div>
  </section>;
}

function QuoteSection() {
  return <section id="tarjous" className="quote-section">
    <div className="container quote-layout">
      <div className="quote-intro">
        <span className="eyebrow">PYYDÄ TARJOUS</span>
        <h2>Pyydä tarjous siivouspalvelusta</h2>
        <p>Kerro meille tarpeesi, niin saat nopeasti selkeän ja sitoumuksettoman tarjouksen. Vastaamme yleensä saman päivän aikana.</p>
        <div className="quote-points">
          <div><Clock3/><span><strong>Nopea vastaus</strong><small>Saat tarjouksen yleensä saman päivän aikana.</small></span></div>
          <div><Heart/><span><strong>Räätälöity ratkaisu</strong><small>Suunnittelemme palvelun tarpeidesi mukaan.</small></span></div>
          <div><Users/><span><strong>Luotettava paikallinen toimija</strong><small>Turkulainen yritys lähellä sinua.</small></span></div>
        </div>
      </div>
      <QuoteForm />
    </div>
  </section>;
}

function Services() {
  return (
    <section id="palvelut" className="section services service-groups" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">PALVELUMME</span>
            <h2 id="services-heading">Siivousta koteihin, yrityksille ja taloyhtiöille</h2>
          </div>
        </div>
        <div className="service-grid">
          {serviceGroups.map(({ name, text, icon: Icon, pos, items }) => (
            <a className="service-card" href="#tarjous" key={name} style={{ '--pos': pos } as React.CSSProperties} aria-label={`${name} – pyydä tarjous`}>
              <div className="service-photo" aria-hidden="true" />
              <div className="service-body">
                <Icon size={29} aria-hidden="true" />
                <h3>{name}</h3>
                <p>{text}</p>
                <ul className="service-list">
                  {items.map(item => <li key={item}><CheckCircle2 size={15} aria-hidden="true" /><span>{item}</span></li>)}
                </ul>
                <span className="service-cta">Pyydä tarjous <ArrowRight size={18} aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [[Diamond,'Huolellinen työnjälki','Siisti lopputulos on meille itsestäänselvyys.'],[MessageCircle,'Selkeä viestintä','Pidämme sinut ajan tasalla ja vastaamme nopeasti.'],[Heart,'Joustava palvelu','Räätälöimme siivouksen elämäsi mukaan.'],[Users,'Paikallinen ja helposti tavoitettava','Turussa, Liedossa ja lähialueilla. Lähellä asiakasta, aina.']];
  return <section id="meista" className="benefits"><div className="container"><span className="eyebrow">MIKSI ASIAKKAAT VALITSEVAT MEIDÄT?</span><h2>Pieni yritys, suuret lupaukset</h2><div className="benefit-grid">{items.map(([I,t,d])=>{const Icon=I as typeof Diamond;return <div className="benefit" key={t as string}><span className="icon-circle"><Icon/></span><div><h3>{t as string}</h3><p>{d as string}</p></div></div>})}</div></div><span className="script-note benefits-note">Luotettavaa<br/>siivouspalvelua<br/>lähelläsi ♡</span></section>;
}

function Process() {
  const steps = [[FileText,'1. Kerro tarpeesi','Täytä lyhyt lomake tai ota yhteyttä WhatsAppilla. Kerro, millaista siivousta tarvitset.'],[Mail,'2. Saat tarjouksen','Saat meiltä selkeän hinta-arvion nopeasti, yleensä saman päivän aikana.'],[CalendarDays,'3. Sovitaan siivous','Sovitaan sinulle sopiva ajankohta ja me hoidamme loput. Sinä voit keskittyä tärkeämpään.']];
  return <section id="prosessi" className="section process"><div className="container"><span className="eyebrow">NÄIN HOMMA TOIMII</span><h2>Helppoa, nopeasti ja vaivattomasti</h2><div className="steps">{steps.map(([I,t,d],i)=>{const Icon=I as typeof FileText;return <div className="step-wrap" key={t as string}><div className="step"><span className="step-icon"><Icon/></span><div><h3>{t as string}</h3><p>{d as string}</p></div></div>{i<2&&<ArrowRight className="step-arrow"/>}</div>})}</div></div><span className="script-note process-note">Näin<br/>helppoa se on!<br/>♡</span></section>;
}

function Reviews() {
  return <section className="reviews section"><div className="container"><div className="section-head"><div><span className="eyebrow">ASIAKKAIDEN KOKEMUKSIA</span><h2>Mitä asiakkaamme sanovat?</h2></div><a href="#yhteys">Katso lisää arvosteluja <ArrowRight size={15}/></a></div><div className="review-grid">{reviews.map(([q,n,c,initials])=><article className="review" key={n}><div className="stars">★★★★★</div><p>{q}</p><div className="reviewer"><span>{initials}</span><div><strong>{n}</strong><small>{c}</small></div></div></article>)}</div></div></section>;
}

function ContactBand() {
  return <section id="yhteys" className="contact-band"><div className="container contact-inner"><span className="script-note band-note">Sama<br/>puhtaampi<br/>Turku ♡</span><div><h2>Palvelemme: Turku, Lieto ja lähialueet</h2><div className="contact-links"><a href="tel:+35845312782"><Phone/>045 631 2782</a><WhatsAppLink>Avaa WhatsApp</WhatsAppLink><a href="mailto:info@siivoustahkapaa.fi"><Mail/>info@siivoustahkapaa.fi</a></div></div><div className="location"><MapPin/><strong>Turku<br/>Lieto<br/>Ja lähialueet</strong></div></div></section>;
}

function Footer() {
  return <><section className="final-cta"><div className="container"><div><h2>Tarvitsetko luotettavan siivouskumppanin?</h2><p>Pyydä maksuton tarjous jo tänään – saat vastauksen nopeasti.</p></div><a className="button" href="#tarjous">Pyydä maksuton tarjous <ArrowRight size={17}/></a></div></section>
  <footer><div className="container footer-grid"><Logo/><div><strong>Pikalinkit</strong><a href="#palvelut">Palvelut</a><a href="#meista">Tietoa meistä</a><a href="#prosessi">Usein kysytyt</a><a href="#yhteys">Yhteystiedot</a></div><div><strong>Yhteystiedot</strong><a href="tel:+35845312782">☎ 045 631 2782</a><a href="https://wa.me/35845312782">◉ Avaa WhatsApp</a><a href="mailto:info@siivoustahkapaa.fi">✉ info@siivoustahkapaa.fi</a><span>● Turku, Lieto ja lähialueet</span></div><div className="footer-promise"><LeafMark/><p>Paikallista siivouspalvelua<br/>jo vuodesta 2010.</p></div></div><div className="container footer-bottom"><span>© 2026 Siivous Tähkäpää. Kaikki oikeudet pidätetään.</span><span>Tietosuoja　 Esteet　 Verkkosivut: paikallinen kumppani</span></div></footer></>;
}

export default function App() {
  return <><Header/><main><Hero/><QuoteSection/><Services/><Benefits/><Process/><Reviews/><ContactBand/><Footer/></main><WhatsAppLink className="floating-whatsapp"><span className="sr-only">Avaa WhatsApp</span></WhatsAppLink></>;
}
