import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle";
import HistoryTable from "@/Admin/components/pages/HistoryTable.tsx";

const PurchasedHistory = () => {
  return (
    <section className={`mx-auto w-[70rem]`}>
      {/* Search Bar */}
      <ToolBar
        addNewPath={``}
        onExport={() => {}}
        onSearch={() => {}}
        hideAddNew={true}
      />

      {/*  Data Table and Title */}
      <div className={`mt-5`}>
        <AdminTitle>Purchased History</AdminTitle>
        <HistoryTable />
      </div>
    </section>
  );
};

export default PurchasedHistory;
