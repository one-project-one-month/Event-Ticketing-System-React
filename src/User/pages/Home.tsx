import { useEffect, useState } from "react";
import HeroSection from "@/User/components/Home/HeroSection";
import OverviewList from "@/User/components/Home/OverviewList";
import TotalCountContainer from "@/User/components/Home/TotalCountContainer";
import { getHome } from "@/services/HomeService"; // your getHome function
import type { HomeResponseData } from "@/User/DataTypes/Home";

const Home = () => {
  const [homeData, setHomeData] = useState<HomeResponseData["data"] | null>(null);

  useEffect(() => {
    getHome().then((res) => {
      if (res.isSuccess) {
        setHomeData(res.data);
      }
    });
  }, []);

  return (
    <div>
      <HeroSection />

      <div className="h-[45rem] w-screen"></div>

      {/* Event List */}
      {homeData && (
        <OverviewList
          title="Event"
          viewLink="/events"
          fetchLink="#"
          type="E"
          response={homeData}
        />
      )}

      {/* Total Details */}
      {homeData && (
        <TotalCountContainer
          counts={[
            { count: homeData.homeStatus.completedEvents, label: "Completed Events" },
            { count: homeData.homeStatus.activeEvents, label: "Active Events" },
            { count: homeData.homeStatus.totalVenues, label: "Venues" },
            { count: homeData.homeStatus.ticketsSoldPercentage, label: "Tickets Sold", format: "percent" },
          ]}
        />
      )}

      {/* Venue List */}
      {homeData && (
        <OverviewList
          title="Venue"
          viewLink="/venue"
          fetchLink="#"
          type="V"
          response={homeData}
        />
      )}
    </div>
  );
};

export default Home;
