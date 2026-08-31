import { getSiteData, urlFor } from '../lib/sanity';

// Fallback demo content so the site looks right even before Sanity is connected.
const fallback = {
  settings: {
    availableBadge: 'AVAILABLE FOR NEW CAMPAIGNS',
    name: 'Tauqeer Syed',
    title: 'Meta / Facebook Ads Specialist',
    bio: 'I set up, run and manage Facebook Pages and Meta ad campaigns end to end — Business Manager, creative, targeting.',
    contactPrompt: 'Have a campaign that needs to perform?',
    contactUrl: 'https://facebook.com/syed.tauqeer.98',
    footerText: 'TAUQEER SYED — META ADS SPECIALIST',
  },
  stats: [
    { label: 'PAGES MANAGED', value: '2', highlighted: false },
    { label: 'AD REACH (LATEST)', value: '22.2K', highlighted: true },
    { label: 'CONVERSATIONS', value: '8', highlighted: false },
    { label: 'COST / CONVO', value: '$0.49', highlighted: true },
  ],
  caseStudies: [
    {
      clientName: 'SKT SOFTWARE LAND',
      clientCategory: 'IT SERVICES',
      statusBadge: '16-20 JUL 2026',
      headline: '"Get more messages" campaign — 4-day test',
      description:
        'Set up and optimized the SKT Software Land page from scratch, then built the ad creative and ran a small-budget Messenger campaign to validate it before scaling spend.',
      metrics: [
        { label: 'BUDGET', value: '$3.90 / $1/day' },
        { label: 'VIEWS', value: '22,273' },
        { label: 'VIEWERS', value: '13,190' },
        { label: 'CONVOS', value: '8' },
      ],
    },
    {
      clientName: 'BRAND BUILDER PRO',
      clientCategory: 'OWN PAGE',
      statusBadge: 'ONGOING',
      headline: 'Page setup & optimization',
      description:
        'Set up and optimized Brand Builder Pro as a full working page — structure, info, and content — used as a live testbed before running paid campaigns.',
      metrics: [
        { label: 'DELIVERABLE', value: 'Full page setup' },
        { label: 'STATUS', value: 'Optimized' },
        { label: 'ROLE', value: 'Page manager' },
        { label: 'TYPE', value: 'Organic' },
      ],
    },
  ],
  managedPages: [
    { pageName: 'SKT Software Land', pageUrl: 'facebook.com/sktsoftwareland80' },
    { pageName: 'Brand Builder Pro', pageUrl: 'facebook.com/tauqeer19' },
  ],
  capabilities: [
    { name: 'Facebook Page setup & optimization' },
    { name: 'Advantage+ creative' },
    { name: 'Business Manager & asset setup' },
    { name: 'Messenger / lead-gen campaigns' },
    { name: 'Campaign structure & targeting' },
    { name: 'Budget control & pacing' },
    { name: 'Ad creative & short-form copy' },
    { name: 'Reporting & performance analysis' },
  ],
};

export default async function Home() {
  const data = await getSiteData();
  const settings = data?.settings ?? fallback.settings;
  const stats = data?.stats?.length ? data.stats : fallback.stats;
  const caseStudies = data?.caseStudies?.length ? data.caseStudies : fallback.caseStudies;
  const managedPages = data?.managedPages?.length ? data.managedPages : fallback.managedPages;
  const capabilities = data?.capabilities?.length ? data.capabilities : fallback.capabilities;

  const avatarSrc = settings?.profilePhoto ? urlFor(settings.profilePhoto).width(128).height(128).url() : '/profile.jpg';

  return (
    <main className="wrap">
      <div className="eyebrow">
        <span className="dot" />
        {settings.availableBadge}
      </div>

      <div className="header">
        <img className="avatar" src={avatarSrc} alt={settings.name} />
        <div>
          <h1>{settings.name}</h1>
          <p className="role">{settings.title}</p>
          <p className="bio">{settings.bio}</p>
        </div>
      </div>

      <div className="stats-row">
        {stats.map((s: any, i: number) => (
          <div className="stat" key={i}>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.highlighted ? 'accent' : ''}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="section-label">CASE STUDIES</div>
        <h2 className="section-title">Pages Set Up &amp; Optimized</h2>
        {caseStudies.map((c: any, i: number) => (
          <div className="card" key={i}>
            <div className="card-top">
              <div className="card-meta">
                {c.clientName} · {c.clientCategory}
              </div>
              <div className="card-badge">{c.statusBadge}</div>
            </div>
            <div className="card-headline">{c.headline}</div>
            <p className="card-desc">{c.description}</p>
            <div className="metrics-row">
              {c.metrics?.map((m: any, j: number) => (
                <div key={j}>
                  <div className="metric-label">{m.label}</div>
                  <div className="metric-value">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-label">PAGES I MANAGE</div>
        <h2 className="section-title">Live on Facebook</h2>
        <div className="list-card">
          {managedPages.map((p: any, i: number) => (
            <div className="list-row" key={i}>
              <strong>{p.pageName}</strong>
              <a href={`https://${p.pageUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">
                {p.pageUrl}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label">CAPABILITIES</div>
        <h2 className="section-title">Full Meta Ads Stack</h2>
        <div className="capability-grid">
          {capabilities.map((c: any, i: number) => (
            <div className="capability-item" key={i}>
              {c.name}
            </div>
          ))}
        </div>
      </section>

      <div className="cta">
        <p>{settings.contactPrompt}</p>
        <a href={settings.contactUrl} target="_blank" rel="noreferrer">
          {settings.contactUrl?.replace(/^https?:\/\//, '')}
        </a>
      </div>

      <div className="footer">{settings.footerText}</div>
    </main>
  );
}
