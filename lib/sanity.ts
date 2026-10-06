import { createClient, type SanityClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset, apiVersion } from '../sanity/env';

export const isSanityConfigured = Boolean(projectId && dataset);

// Only create a real client when a projectId is configured. This lets the
// site build and render fallback demo content before Sanity is connected.
export const client: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const liveClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null;

// A no-op chainable stub so `urlFor(x).width(w).height(h).url()` never
// crashes the build before Sanity is configured.
const noopBuilder: any = {
  width: () => noopBuilder,
  height: () => noopBuilder,
  url: () => '',
};

export function urlFor(source: any) {
  if (!client) return noopBuilder;
  return imageUrlBuilder(client).image(source);
}

export async function getSiteData(options: { live?: boolean } = {}) {
  // If no project is configured yet, return null so the page can show fallback demo content.
  const siteClient = options.live ? liveClient : client;
  if (!isSanityConfigured || !siteClient) return null;

  const query = `{
    "settings": *[_type == "siteSettings"][0],
    "stats": *[_type == "stat"] | order(order asc),
    "caseStudies": *[_type == "caseStudy" && published == true] | order(order asc),
    "managedPages": *[_type == "managedPage"] | order(order asc),
    "capabilities": *[_type == "capability"] | order(order asc)
  }`;

  try {
    if (options.live) {
      return await siteClient.fetch(query, {}, { cache: 'no-store' });
    }

    return await siteClient.fetch(query, {}, { next: { revalidate: 30 } });
  } catch (e) {
    console.error('Sanity fetch failed', e);
    return null;
  }
}
