import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { VerificationCodeData } from "@/Admin/DataTypes/VerificationCode.ts";
import { getVerificationCodeByCode } from "@/services/VerificationCodeService.ts";

export default function VerificationCodeDetailPage() {
  const { verificationCode } = useParams<{ verificationCode: string }>();
  const navigate = useNavigate();
  const [verification, setVerification] = useState<VerificationCodeData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVerification = async () => {
      if (!verificationCode) {
        setError("Invalid verification code.");
        setLoading(false);
        return;
      }

      try {
        const res = await getVerificationCodeByCode(verificationCode);
        if (res.isSuccess && res.data?.verificationCode) {
          setVerification(res.data.verificationCode);
        } else {
          setError(res.message || "Verification code not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching verification code.");
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, [verificationCode]);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (error)
    return (
      <div className="p-6 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 h-12 w-32 rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
        >
          Back
        </button>
      </div>
    );

  if (!verification) return <div>Verification Not Found!</div>;

  const formattedCreatedAt = new Date(
    verification.createdat,
  ).toLocaleDateString("en-GB");
  const formattedExpiredTime = new Date(
    verification.expiredTime,
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="w-[60rem] rounded-lg bg-white p-12 shadow">
        <h1 className="mb-6 text-2xl font-semibold">Verification History Detail</h1>

        <div className="grid grid-cols-[auto_17rem] gap-y-7">
          {/* Email, Verification Code */}
          <div>
            <p className="mb-3 text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{verification.email}</p>
          </div>
          <div>
            <p className="mb-3 text-sm text-gray-500">Verification Code</p>
            <p className="font-medium text-gray-900">
              {verification.verificationCode}
            </p>
          </div>

          {/* Created Date, Expired Time */}
          <div>
            <p className="mb-3 text-sm text-gray-500">Create Date</p>
            <p className="font-medium text-gray-900">{formattedCreatedAt}</p>
          </div>
          <div>
            <p className="mb-3 text-sm text-gray-500">Expired Time</p>
            <p className="font-medium text-gray-900">{formattedExpiredTime}</p>
          </div>

          {/* Status */}
          <div>
            <p className="mb-3 text-sm text-gray-500">Status</p>
            <p className="font-medium text-gray-900">
              {verification.isused ? "✅" : "❌"}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
