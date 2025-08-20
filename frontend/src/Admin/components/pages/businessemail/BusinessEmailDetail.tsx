import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { BusinessEmailData } from "@/Admin/DataTypes/BusinessEmail.ts";
import { getBusinessEmailByCode } from "@/services/BusinessEmailService.ts";

export default function BusinessEmailDetailPage() {
  const { bEmailCode } = useParams<{ bEmailCode: string }>();
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState<BusinessEmailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      if (!bEmailCode) {
        setError("Invalid business email code.");
        setLoading(false);
        return;
      }

      try {
        const res = await getBusinessEmailByCode(bEmailCode);
        if (res.isSuccess && res.data) {
          setEmailData(res.data.businessEmail);
        } else {
          setError(res.message || "Business email not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching business email.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [bEmailCode]);

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

  if (!emailData) return <div>Business Email Not Found!</div>;

  const formattedCreatedAt = new Date(emailData.createdat).toLocaleString("en-GB");

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="w-[60rem] rounded-lg bg-white p-12 shadow">
        <h1 className="mb-6 text-2xl font-semibold">Business Email Detail</h1>

        <div className="grid grid-cols-[auto_17rem] gap-y-7">
          {/* Full Name, Email */}
          <div>
            <p className="mb-3 text-sm text-gray-500">Full Name</p>
            <p className="font-medium text-gray-900">{emailData.fullName}</p>
          </div>
          <div>
            <p className="mb-3 text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{emailData.email}</p>
          </div>

          {/* Mobile No, Created Date */}
          <div>
            <p className="mb-3 text-sm text-gray-500">Mobile No.</p>
            <p className="font-medium text-gray-900">{emailData.phone}</p>
          </div>
          <div>
            <p className="mb-3 text-sm text-gray-500">Created Date</p>
            <p className="font-medium text-gray-900">{formattedCreatedAt}</p>
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
