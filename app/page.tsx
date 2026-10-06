import SiteContent from './SiteContent';
import { getSiteData, isSanityConfigured } from '../lib/sanity';

export default async function Home() {
  const data = await getSiteData();

  return <SiteContent initialData={data} liveEnabled={isSanityConfigured} />;
}
