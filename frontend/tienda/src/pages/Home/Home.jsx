import StoreHero from './sections/StoreHero/StoreHero';
import CategoryBento from './sections/CategoryBento/CategoryBento';
import NewArrivals from './sections/NewArrivals/NewArrivals';
import ArtisanSeries from './sections/ArtisanSeries/ArtisanSeries';
import BestSellers from './sections/BestSellers/BestSellers';
import CampaignBanner from './sections/CampaignBanner/CampaignBanner';
import Benefits from './sections/Benefits/Benefits';
import Testimonial from './sections/Testimonial/Testimonial';
import SocialGrid from './sections/SocialGrid/SocialGrid';
export default function Home() {
  return (
    <>
      <StoreHero />
      <CategoryBento />
      <NewArrivals />
      <ArtisanSeries />
      <BestSellers />
      <CampaignBanner />
      <Benefits />
      <Testimonial />
      <SocialGrid />
    </>
  );
}
