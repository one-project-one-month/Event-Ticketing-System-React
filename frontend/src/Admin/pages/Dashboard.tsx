import {
  type DashboardResponseModel,
  TTCountType,
} from "@/Admin/DataTypes/DataTypes.ts";
import AdminTotalCard from "@/Admin/components/pages/dashboard/AdminTotalCard";
import { BestSellingChart } from "@/Admin/components/pages/dashboard/BestSellingChart.tsx";
import TicketSaleChart from "@/Admin/components/pages/dashboard/TicketSaleChart.tsx";

const Dashboard = () => {
  // --- Mock Data ---
  const mockDashboardData: DashboardResponseModel = {
    TotalEvent: { TotalCount: 12, Difference: 2 },
    TotalVenue: { TotalCount: 5, Difference: 1 },
    TotalAdmin: { TotalCount: 8, Difference: 0 },
    TotalBO: { TotalCount: 25, Difference: -3 },
    TicketSales: [
      { Month: "Jan", TotalCount: 1200 },
      { Month: "Feb", TotalCount: 1500 },
    ],
    TicketCounts: [
      {
        Type: TTCountType.Week,
        TTCounts: [
          { Label: "Standard", TotalCount: 200, color: "#2DD4BF" },
          { Label: "VIP", TotalCount: 150, color: "#FB7185" },
          { Label: "VVIP", TotalCount: 80, color: "#A78BFA" },
        ],
      },
      {
        Type: TTCountType.Month,
        TTCounts: [
          { Label: "Standard", TotalCount: 850, color: "#2DD4BF" },
          { Label: "VIP", TotalCount: 620, color: "#FB7185" },
          { Label: "VVIP", TotalCount: 350, color: "#A78BFA" },
          { Label: "Early Bird", TotalCount: 400, color: "#FDBA74" }, // orange-300
        ],
      },
    ],
  };
  return (
    <section className="figtreef max-h-[22rem] w-[79vw]">
      {/* Summery Total Cards */}
      <div className="flex h-full flex-row gap-5">
        {/* Cards */}
        <div className="grid h-full flex-1 grid-cols-2 gap-5">
          <AdminTotalCard
            iconPath={`/icons/PurpleEventNote.svg`}
            title={"Total Event"}
            count={3500}
            status={7.45}
          />
          <AdminTotalCard
            iconPath={`/icons/PurpleBuilding.svg`}
            title={"Total Venue"}
            count={500}
            status={-4.56}
          />
          <AdminTotalCard
            iconPath={`/icons/PurpleAdmin.svg`}
            title={"Total Admin"}
            count={10}
            status={0}
          />
          <AdminTotalCard
            iconPath={`/icons/PurpleGroup.svg`}
            title={"Business Owner"}
            count={2000}
            status={2.55}
          />
        </div>
        {/* Chart */}
        <div className="h-full w-[30rem]">
          <BestSellingChart chartData={mockDashboardData} />
        </div>
      </div>
      {/* Ticket Sale Comparison */}
      <div className={`mt-6 w-full`}>
        <TicketSaleChart />
      </div>
    </section>
  );
};

export default Dashboard;
