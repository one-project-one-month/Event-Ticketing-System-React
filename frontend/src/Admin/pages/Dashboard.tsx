import AdminTotalCard from "../components/pages/dashboard/AdminTotalCard";

const Dashboard = () => {
  return (
    <section className="figtreef max-h-[22rem] w-[79vw]">
      {/* Summery Total Cards */}
      <div className="flex flex-row gap-5">
        {/* Cards */}
        <div className="grid flex-1 grid-cols-2 gap-5">
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
        <div className="w-[30rem] bg-black"></div>
      </div>
      {/* Ticket Sale Comparison */}
      <div></div>
    </section>
  );
};

export default Dashboard;
