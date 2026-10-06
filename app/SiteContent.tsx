'use client';

import { useEffect, useState } from 'react';
import { urlFor } from '../lib/sanity';
import { fallback } from '../lib/fallback';
import ScrollReveal from './ScrollReveal';

type SiteData = {
  settings?: any;
  stats?: any[];
  caseStudies?: any[];
  managedPages?: any[];
  capabilities?: any[];
};

type SiteContentProps = {
  initialData: SiteData | null;
  liveEnabled: boolean;
};

export default function SiteContent({ initialData, liveEnabled }: SiteContentProps) {
  const [data, setData] = useState<SiteData | null>(initialData);
  const [refreshError, setRefreshError] = useState(false);

  useEffect(() => {
    if (!liveEnabled) return;

    let active = true;
    let controller: AbortController | null = null;

    const refreshData = async () => {
      controller?.abort();
      controller = new AbortController();

      try {
        const response = await fetch('/api/site-data', {
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Live content request failed with status ${response.status}`);
        }

        const freshData = (await response.json()) as SiteData;
        if (active) {
          setData(freshData);
          setRefreshError(false);
        }
      } catch (error) {
        if (active && !(error instanceof DOMException && error.name === 'AbortError')) {
          console.error('Could not refresh portfolio content from Sanity.', error);
          setRefreshError(true);
        }
      }
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') void refreshData();
    };

    void refreshData();
    const intervalId = window.setInterval(refreshWhenVisible, 15_000);
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      active = false;
      controller?.abort();
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, [liveEnabled]);

  const settings = data?.settings ?? fallback.settings;
  const stats = data?.stats?.length ? data.stats : fallback.stats;
  const caseStudies = data?.caseStudies?.length ? data.caseStudies : fallback.caseStudies;
  const managedPages = data?.managedPages?.length ? data.managedPages : fallback.managedPages;
  const capabilities = data?.capabilities?.length ? data.capabilities : fallback.capabilities;
  const avatarSrc = settings?.profilePhoto
    ? urlFor(settings.profilePhoto).width(128).height(128).url()
    : '/profile.jpg';

  return (
    <main className="wrap">
      <div className="eyebrow reveal">
        <span className="dot" />
        {settings.availableBadge}
      </div>

      {refreshError && (
        <p className="live-status" role="status">
          Live content could not be refreshed. Showing the latest available content.
        </p>
      )}

      <div className="header reveal">
        <img className="avatar" src={avatarSrc} alt={settings.name} />
        <div>
          <h1>{settings.name}</h1>
          <p className="role">{settings.title}</p>
          <p className="bio">{settings.bio}</p>
        </div>
      </div>

      <div className="stats-row">
        {stats.map((stat, index) => (
          <div className="stat reveal" key={stat._id ?? `${stat.label}-${index}`} style={{ transitionDelay: `${index * 90}ms` }}>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-value ${stat.highlighted ? 'accent' : ''}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <section className="section reveal">
        <div className="section-label">CASE STUDIES</div>
        <h2 className="section-title">Pages Set Up &amp; Optimized</h2>
        {caseStudies.map((study, index) => (
          <div className="card reveal" key={study._id ?? `${study.clientName}-${index}`} style={{ transitionDelay: `${index * 120}ms` }}>
            <div className="card-top">
              <div className="card-meta">
                {study.clientName} · {study.clientCategory}
              </div>
              <div className="card-badge">{study.statusBadge}</div>
            </div>
            <div className="card-headline">{study.headline}</div>
            <p className="card-desc">{study.description}</p>
            <div className="metrics-row">
              {study.metrics?.map((metric, metricIndex) => (
                <div key={metric._key ?? `${metric.label}-${metricIndex}`}>
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-value">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section reveal">
        <div className="section-label">PAGES I MANAGE</div>
        <h2 className="section-title">Live on Facebook</h2>
        <div className="list-card">
          {managedPages.map((managedPage, index) => (
            <div className="list-row reveal" key={managedPage._id ?? `${managedPage.pageName}-${index}`} style={{ transitionDelay: `${index * 110}ms` }}>
              <strong>{managedPage.pageName}</strong>
              <a href={`https://${managedPage.pageUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">
                {managedPage.pageUrl}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <div className="section-label">CAPABILITIES</div>
        <h2 className="section-title">Full Meta Ads Stack</h2>
        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <div className="capability-item reveal" key={capability._id ?? `${capability.name}-${index}`} style={{ transitionDelay: `${index * 90}ms` }}>
              {capability.name}
            </div>
          ))}
        </div>
      </section>

      <div className="cta reveal">
        <p>{settings.contactPrompt}</p>
        <a href={settings.contactUrl} target="_blank" rel="noreferrer">
          {settings.contactUrl?.replace(/^https?:\/\//, '')}
        </a>
      </div>

      <div className="footer reveal">{settings.footerText}</div>
      <ScrollReveal />
    </main>
  );
}
