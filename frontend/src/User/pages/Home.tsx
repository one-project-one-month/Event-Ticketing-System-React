import { CarouselSlide } from "@/User/components/Home/CarouselSlide";
import HomeEventList from "@/User/components/Home/HomeEventList";
import HomeVenueList from "@/User/components/Home/HomeVenueList";
import TotalCountContainer from "@/User/components/Home/TotalCountContainer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="h-[90vh] w-screen"></div>
      {/* Event List */}
      <OverviewList title="Event" viewLink="/events" fetchLink="#" type="E" />
      {/* Total Details */}
      <TotalCountContainer />
      {/* Venue List */}
      <OverviewList title="Venue" viewLink="/venue" fetchLink="#" type="V" />
    </div>
  );
};

export default Home;
