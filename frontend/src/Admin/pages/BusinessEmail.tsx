import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import {
  type HistoryColumn,
  HistoryTable,
} from "@/Admin/components/pages/HistoryTable.tsx";
import type { BusinessEmailData } from "@/Admin/DataTypes/BusinessEmail.ts";

export const BusinessEmail = () => {
  const businessEmailColumns = [
    { key: "fullName", label: "Full Name" },
    { key: "phone", label: "Mobile No." },
    { key: "email", label: "Email" },
  ] satisfies HistoryColumn<BusinessEmailData>[];

  const businessEmailSample: BusinessEmailData[] = [
    {
      businessEmailId: "1",
      businessEmailCode: "BE001",
      fullName: "Aung Myat Min",
      phone: "09123456789",
      email: "aungmyatmin@example.com",
      createdby: "admin",
      createdat: "2025-08-10",
    },
    {
      businessEmailId: "2",
      businessEmailCode: "BE002",
      fullName: "John Smith",
      phone: "09876543210",
      email: "johnsmith@example.com",
      createdby: "admin",
      createdat: "2025-08-09",
    },
    {
      businessEmailId: "3",
      businessEmailCode: "BE003",
      fullName: "Jane Doe",
      phone: "09911223344",
      email: "janedoe@example.com",
      createdby: "admin",
      createdat: "2025-08-08",
    },
  ];

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
        <AdminTitle>Business Email</AdminTitle>
        <HistoryTable
          data={businessEmailSample}
          columns={businessEmailColumns}
          dataCodeName={`businessEmailCode`}
        />
      </div>
    </section>
  );
};
