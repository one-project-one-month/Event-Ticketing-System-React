import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { AdminData } from "@/Admin/DataTypes/Admin";
import { getAuthToken } from "../utils/authTokenUtils";
import { Button } from "@/User/components/ui/button";
import { Input } from "@/User/components/ui/input";
import {
  getAdminData,
  updateAdminData,
  updateAdminProfileImage,
} from "@/services/AdminServices"; // <-- added
import { AxiosError } from "axios";

interface JwtPayload {
  sub: string;
  unique_name: string;
}

const Setting = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [form, setForm] = useState({
    adminCode: "",
    fullName: "",
    phoneNo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { token } = getAuthToken();
        if (!token) throw new Error("No authentication token found");

        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        const adminCode = decoded.sub;

        const res = await getAdminData(adminCode);

        if (res.isSuccess && res.data?.admin) {
          setAdminData(res.data.admin);
          setForm({
            adminCode: res.data.admin.adminCode,
            fullName: res.data.admin.fullName,
            phoneNo: res.data.admin.phoneNo,
          });
        }
      } catch (err) {
        const error = err as AxiosError | Error;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setAdminData((prev) => (prev ? { ...prev, [name]: value } : null));
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!adminData) return;

    try {
      setError(null);
      setSuccess(false);

      const detailsRes = await updateAdminData({
        adminCode: form.adminCode,
        fullName: form.fullName,
        phoneNo: form.phoneNo,
      });

      if (!detailsRes.isSuccess) throw new Error(detailsRes.message);

      const payload = {
        AdminCode: adminData.adminCode,
        FullName: adminData.fullName,
        Phone: adminData.phoneNo,
        ProfileImage: selectedImage,
      };

      if (selectedImage) {
        const imgRes = await updateAdminProfileImage(payload);
        if (!imgRes?.isSuccess) throw new Error(imgRes?.message);
      }

      setSuccess(true);
      setIsEditing(false);
    } catch (err) {
      const error = err as AxiosError | Error;
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="mx-[210px] max-w-lg p-6">
        <div className="rounded-lg bg-red-100 p-4 text-red-500">
          Error loading profile: {error}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-[210px] max-w-lg p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="mx-[210px] max-w-lg p-6">
        <div className="rounded-lg bg-gray-100 p-4 text-gray-500">
          No profile data available
        </div>
      </div>
    );
  }

  return (
    <div className="mx-[210px] max-w-lg p-6">
      <h1 className="text-left text-3xl text-[#030812]">My Account</h1>

      {success && (
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">
          Profile updated successfully!
        </div>
      )}

      <div className="mt-4 flex w-[700px] flex-col rounded-lg bg-[#F8F8FF] px-28 py-5 shadow-md">
        <div className="flex items-center justify-between gap-5">
          <div className="mr-10 flex flex-row">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200">
              <img
                src={adminData.profileImageUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 pt-7">
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              )}
              <h2 className="text-2xl font-bold text-[#43319A]">
                {adminData.fullName}
              </h2>
            </div>
          </div>

          {!isEditing && (
            <div className="pt-8">
              <Button
                className="rounded-[4px] bg-[#FC9B51] p-6 text-xl text-[#030812] hover:bg-[#43319A] hover:text-white"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        <hr className="my-6 border-t border-gray-300" />

        <div className="mb-4 flex items-center justify-between">
          <div>
            <label className="block text-xl font-semibold text-[#030812]">
              Username
            </label>
            <p className="mt-1 border-none text-xl text-[#030812]">
              {adminData.username || "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-xl font-semibold text-[#030812]">
              Full Name
            </label>
            {isEditing ? (
              <Input
                name="fullName"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="mt-1 text-xl font-semibold text-[#030812]"
              />
            ) : (
              <p className="mt-1 border-none text-xl text-[#030812]">
                {adminData.fullName}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <label className="block text-xl font-semibold text-[#030812]">
              Email
            </label>
            <p className="mt-1 border-none text-xl text-[#030812]">
              {adminData.email}
            </p>
          </div>
          <div className="ml-[140px]">
            <label className="text-xl font-semibold text-[#030812]">
              Phone Number
            </label>
            {isEditing ? (
              <Input
                name="phoneNo"
                value={form.phoneNo}
                onChange={(e) => setForm({ ...form, phoneNo: e.target.value })}
                className="mt-1"
              />
            ) : (
              <p className="mt-1 border-none text-xl text-[#030812]">
                {adminData.phoneNo}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
