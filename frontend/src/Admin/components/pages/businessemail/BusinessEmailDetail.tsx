import type { BusinessEmailData } from "@/Admin/DataTypes/BusinessEmail.ts";

export default function BusinessEmailDetail() {
  const sampleBusinessEmail: BusinessEmailData = {
    businessEmailId: "1",
    businessEmailCode: "BE-0001",
    fullName: "Chan Lay",
    phone: "0956481265",
    email: "chanlay2121@gmail.com",
    createdby: "Admin",
    createdat: "2025-07-20",
  };

  return (
    <div className="float-end mr-10 w-[60rem] rounded-lg bg-white p-12 shadow">
      <h1 className="mb-6 text-2xl font-semibold">Business Email Detail</h1>

      <div className="grid grid-cols-[auto_17rem] gap-y-7">
        {/* Full Name */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Full Name</p>
          <p className="font-medium text-gray-900">
            {sampleBusinessEmail.fullName}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-900">
            {sampleBusinessEmail.email}
          </p>
        </div>

        {/* Mobile No */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Mobile No.</p>
          <p className="font-medium text-gray-900">
            {sampleBusinessEmail.phone}
          </p>
        </div>

        {/* Created At */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Created Date</p>
          <p className="font-medium text-gray-900">
            {sampleBusinessEmail.createdat}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          window.history.back();
        }}
        className={`float-end mt-10 h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300`}
      >
        Back
      </button>
    </div>
  );
}
