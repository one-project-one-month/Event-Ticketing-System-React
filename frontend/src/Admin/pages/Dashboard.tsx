import AdminTotalCard from "@/Admin/components/pages/dashboard/AdminTotalCard";
import { BestSellingChart } from "@/Admin/components/pages/dashboard/BestSellingChart.tsx";
import TicketSaleChart from "@/Admin/components/pages/dashboard/TicketSaleChart.tsx";
import { type DashboardResponseModel } from "@/Admin/DataTypes/Dashboard.ts";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/services/DashboardServices.ts";

const Dashboard = () => {
  const [dashboardData, setDashboardData] =
    useState<DashboardResponseModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getDashboardData();
        if (res.isSuccess && res.data) {
          setDashboardData(res.data);
        } else {
          setError("Failed to load dashboard data.");
          setDashboardData(null);
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="figtreef max-h-[22rem] w-[79vw]">
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && dashboardData && (
        <>
          <div className="flex h-full flex-row gap-5">
            <div className="grid h-full flex-1 grid-cols-2 gap-5">
              <AdminTotalCard
                iconPath={`/icons/PurpleEventNote.svg`}
                title={"Total Event"}
                count={dashboardData.totalEvent.totalCount}
                status={dashboardData.totalEvent.difference}
              />
              <AdminTotalCard
                iconPath={`/icons/PurpleBuilding.svg`}
                title={"Total Venue"}
                count={dashboardData.totalVenue.totalCount}
                status={dashboardData.totalVenue.difference}
              />
              <AdminTotalCard
                iconPath={`/icons/PurpleAdmin.svg`}
                title={"Total Admin"}
                count={dashboardData.totalAdmin.totalCount}
                status={dashboardData.totalAdmin.difference}
              />
              <AdminTotalCard
                iconPath={`/icons/PurpleGroup.svg`}
                title={"Business Owner"}
                count={dashboardData.totalBO.totalCount}
                status={dashboardData.totalBO.difference}
              />
            </div>

            <div className="h-full w-[30rem]">
              <BestSellingChart chartData={dashboardData} />
            </div>
          </div>

          <div className={`mt-6 w-full`}>
            <TicketSaleChart />
          </div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
