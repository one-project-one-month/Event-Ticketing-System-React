import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/User/components/ui/button";
import { DeleteAdmin } from "@/services/AdminServices";
import { useParams } from "react-router-dom";

export default function DeleteAccountPage() {
  const navigate = useNavigate();
  const { adminCode } = useParams<{ adminCode: string }>();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!adminCode) {
        alert("No admin code found. Please log in again.");
        return;
      }

      const payload = { adminCode, password };
      const response = await DeleteAdmin(payload);

      if (response?.isSuccess) {
        sessionStorage.clear();
        navigate("/admin/login");
      } else {
        alert(response?.message || "Failed to delete account.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8DFEC]">
      <div className="w-full max-w-md space-y-5 rounded-lg bg-gradient-to-b from-[#3F2B96] to-[#A8C0FF] p-8 shadow-md">
        <h2 className="text-left text-2xl font-medium text-white">
          Delete Account?
        </h2>
        <div className="rounded-lg bg-[#1C1D20CC] p-4 text-white">
          <h1>Are you sure you want to delete your account?</h1>
          <p className="mt-2 text-sm">
            This action will log you out immediately and permanently remove your
            access to the admin panel. You will not be able to log in again, and
            all your data will be permanently erased.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="flex items-center justify-end space-x-4">
            <Button onClick={() => navigate(-1)} variant="ghost" size="lg">
              Cancel
            </Button>
            <Button
              size="lg"
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
