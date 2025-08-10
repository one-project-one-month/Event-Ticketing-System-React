import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import {
  type HistoryColumn,
  HistoryTable,
} from "@/Admin/components/pages/HistoryTable.tsx";
import type { VerificationCodeData } from "@/Admin/DataTypes/VerificationCode.ts";

export const VerificationHistory = () => {
  const verificationColumns = [
    { key: "email", label: "Email" },
    { key: "verificationCode", label: "Verification Code" },
    {
      key: "isused",
      label: "Status",
      align: "center",
      render: (value: boolean) => (value ? "✅" : "❌"),
    },
  ] satisfies HistoryColumn<VerificationCodeData>[];

  const verificationSample: (VerificationCodeData & {
    no: number;
    status: string;
    action: string;
  })[] = [
    {
      verificationId: "1",
      verificationCode: "VC12345",
      email: "user1@example.com",
      expiredTime: "2025-08-20T12:00:00",
      isused: false,
      createdby: "admin",
      createdat: "2025-08-10",
      deleteflag: false,
      no: 1,
      status: "Unused",
      action: "Edit | Delete",
    },
    {
      verificationId: "2",
      verificationCode: "VC12346",
      email: "user2@example.com",
      expiredTime: "2025-08-08T12:00:00",
      isused: true,
      createdby: "admin",
      createdat: "2025-08-09",
      deleteflag: false,
      no: 2,
      status: "Used",
      action: "Edit | Delete",
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
          data={verificationSample}
          columns={verificationColumns}
          dataCodeName={`verificationCode`}
          link={`/admin/history/verification/`}
        />
      </div>
    </section>
  );
};
