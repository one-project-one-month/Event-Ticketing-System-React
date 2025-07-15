import { CarouselSlide } from "@/User/components/Home/CarouselSlide";
import HomeEventList from "@/User/components/Home/HomeEventList";
import HomeVenueList from "@/User/components/Home/HomeVenueList";
import TotalCountContainer from "@/User/components/Home/TotalCountContainer";

const Home = () => {
  return (
    <div>
      {/* Carousel Slide */}
      <div className="mb-20">
        <CarouselSlide />
      </div>
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
