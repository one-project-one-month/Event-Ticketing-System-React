import type { VerificationCodeData } from "@/Admin/DataTypes/VerificationCode.ts";

export default function VerificationCodeDetail() {
  // sample data
  const sampleVerification: VerificationCodeData = {
    verificationId: "1",
    verificationCode: "123456",
    email: "chanlay2121@gmail.com",
    expiredTime: "2025-07-20T00:00:00",
    isused: true,
    createdby: "Admin",
    createdat: "2025-07-20",
    deleteflag: false,
  };

  // Format date and time nicely
  const formattedCreatedAt = new Date(
    sampleVerification.createdat,
  ).toLocaleDateString("en-GB");
  const formattedExpiredTime = new Date(
    sampleVerification.expiredTime,
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="float-end mr-10 w-[60rem] rounded-lg bg-white p-12 shadow">
      <h1 className="mb-6 text-2xl font-semibold">Verification History</h1>

      <div className="grid grid-cols-[auto_17rem] gap-y-7">
        {/* Email */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-900">
            {sampleVerification.email}
          </p>
        </div>

        {/* Verification Code */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Verification Code</p>
          <p className="font-medium text-gray-900">
            {sampleVerification.verificationCode}
          </p>
        </div>

        {/* Created Date */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Create Date</p>
          <p className="font-medium text-gray-900">{formattedCreatedAt}</p>
        </div>

        {/* Expired Time */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Expired Time</p>
          <p className="font-medium text-gray-900">{formattedExpiredTime}</p>
        </div>

        {/* Status */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Status</p>
          <p className="text-xl font-medium text-gray-900">
            {sampleVerification.isused ? "✅" : "❌"}
          </p>
        </div>
      </div>

      <button
        onClick={() => window.history.back()}
        className="float-end h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
      >
        Back
      </button>
    </div>
  );
}
