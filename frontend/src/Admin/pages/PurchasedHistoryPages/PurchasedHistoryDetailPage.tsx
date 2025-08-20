import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TransactionDetailData } from "@/Admin/DataTypes/PurchasedHistory.ts";
import { getTransactionDetailByCode } from "@/services/PurchasedHistoryService.ts";

export default function PurchasedHistoryDetailPage() {
  const { transactionCode } = useParams<{ transactionCode: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<TransactionDetailData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!transactionCode) {
        setError("Invalid transaction code.");
        setLoading(false);
        return;
      }

      try {
        const res = await getTransactionDetailByCode(transactionCode);
        if (res.isSuccess && res.data) {
          setTransaction(res.data.transactionDetail);
        } else {
          setError(res.message || "Transaction not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching transaction detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionCode]);

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

  if (!transaction) return <div>Transaction Not Found!</div>;

  return (
  <div className="flex min-h-screen items-center justify-center bg-transparent">
    <div className="w-[60rem] rounded-lg bg-white p-12 shadow">
      <h1 className="mb-6 text-2xl font-semibold">Purchased History Detail</h1>

      <div className="grid grid-cols-[auto_17rem] gap-y-7">
        {/* Email, Event Name */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-900">{transaction.email}</p>
        </div>
        <div>
          <p className="mb-3 text-sm text-gray-500">Event Name</p>
          <p className="font-medium text-gray-900">{transaction.eventName}</p>
        </div>

        {/* Event Code, Event Status */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Event Code</p>
          <p className="font-medium text-gray-900">{transaction.eventCode}</p>
        </div>
        <div>
          <p className="mb-3 text-sm text-gray-500">Event Status</p>
          <p className="font-medium text-gray-900">{transaction.eventStatus}</p>
        </div>

        {/* Ticket Type, Ticket Price */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Ticket Type</p>
          <p className="font-medium text-gray-900">
            {transaction.ticketTypeName}
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm text-gray-500">Ticket Price</p>
          <p className="font-medium text-gray-900">{transaction.ticketPrice}</p>
        </div>

        {/* Payment Type, Transaction Date */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Payment Type</p>
          <p className="font-medium text-gray-900">{transaction.paymentType}</p>
        </div>
        <div>
          <p className="mb-3 text-sm text-gray-500">Transaction Date</p>
          <p className="font-medium text-gray-900">
            {new Date(transaction.transactionDate).toLocaleString("en-GB")}
          </p>
        </div>

        {/* Active, QR */}
        <div>
          <p className="mb-3 text-sm text-gray-500">Active</p>
          <p className="font-medium text-gray-900">
            {transaction.isActive ? "✅" : "❌"}
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm text-gray-500">QR</p>
          <p className="font-medium text-gray-900">{transaction.qty}</p>
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
