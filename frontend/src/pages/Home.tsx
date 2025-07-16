// import { CarouselSlide } from "@/components/Home/CarouselSlide";
import HeroSection from "@/components/Home/HeroSection";
import HomeEventList from "@/components/Home/HomeEventList";
import HomeVenueList from "@/components/Home/HomeVenueList";
import TotalCountContainer from "@/components/Home/TotalCountContainer";

const Home = () => {
  return (
    <div>
      {/* Carousel Slide */}
      {/* <div className="mb-20">
        <CarouselSlide />
      </div> */}
      <HeroSection />
      <div className="h-screen w-screen"></div>
      {/* Event List */}
      <HomeEventList />
      {/* Total Details */}
      <TotalCountContainer />
      {/* Venue List */}
      <HomeVenueList />
    </div>
  );
};

export default Home;
