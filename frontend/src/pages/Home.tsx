import HeroSection from "@/components/Home/HeroSection";
import OverviewList from "@/components/Home/OverviewList";
import TotalCountContainer from "@/components/Home/TotalCountContainer";

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
