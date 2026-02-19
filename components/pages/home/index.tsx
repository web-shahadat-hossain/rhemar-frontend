// import BrandStory from "./BrandStory";
import FeaturedProducts from "./FeaturedProducts";
import Hero from "./Hero";
// import LifestyleBanner from "./LifestyleBanner";
// import WhyChoose from "./WhyChoose";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-primary">
      <main>
        <Hero />
        {/* <div id="story">
          <BrandStory />
        </div> */}
        <div id="best-sellers">
          <FeaturedProducts />
        </div>
        {/* <LifestyleBanner />
        <WhyChoose /> */}
      </main>
    </div>
  );
}
