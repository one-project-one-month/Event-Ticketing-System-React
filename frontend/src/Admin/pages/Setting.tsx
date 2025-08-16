import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { AdminDataByCodeData } from "@/Admin/DataTypes/Admin";
import { getAuthToken } from "../utils/authTokenUtils";
import { Button } from "@/User/components/ui/button";
import { Input } from "@/User/components/ui/input";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import avatar from "@/Admin/data/Icons/avatar.jpg";

import {
  getAdminDataByCode,
  updateAdminData,
  updateAdminProfileImage,
} from "@/services/AdminServices";
import { AxiosError } from "axios";
interface JwtPayload {
  sub: string;
  unique_name: string;
}

const Setting = () => {
  const [adminData, setAdminData] = useState<AdminDataByCodeData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
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

        const res = await getAdminDataByCode(adminCode);

        if (res.isSuccess && res.data?.admin) {
          console.log("Admin data: ", res);
          setAdminData(res.data.admin);
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!adminData) return;

    try {
      setError(null);

      const detailsRes = await updateAdminData({
        adminCode: adminData.adminCode,
        fullName: adminData.fullName,
        phoneNo: adminData.phoneNo,
      });

      console.log(detailsRes);
      if (detailsRes.isError) throw new Error(detailsRes.message);

      const payload = {
        AdminCode: adminData.adminCode,
        FullName: adminData.fullName,
        Phone: adminData.phoneNo,
        ProfileImage: selectedImage,
      };

      if (selectedImage) {
        const imgRes = await updateAdminProfileImage(payload);
        if (imgRes?.isError) throw new Error(imgRes?.message);
      }

      showSuccessToast();
      setIsEditing(false);
    } catch (err) {
      const error = err as AxiosError | Error;
      setError(error.message);
    }
  };
  const showSuccessToast = () => {
    toast.success("Profile updated successfully!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (error) {
    return (
      <div className="mx-[210px] max-w-lg p-6">
        <div className="rounded-lg bg-red-100 p-4 text-red-500">
          <img
            src={`${baseURL}/${adminData?.profileImage}` || avatar}
            alt="profile image"
            className="h-20 w-32 rounded-md border object-cover"
          />
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

      <div className="mt-4 flex w-[800px] flex-col rounded-lg bg-[#F8F8FF] px-18 py-15 shadow-md">
        <div className="flex items-center justify-between gap-5">
          <div className="mr-10 flex flex-row">
            <div className="relative size-25 overflow-hidden rounded-full border-2 border-gray-200">
              <img
                src={`${baseURL.replace(/\/$/, "")}/${adminData?.profileImage}`}
                alt="Profile"
                className="size-full object-cover"
              />

              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-10 bottom-10 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-8 flex flex-col">
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-[#43319A]">
                  {adminData.fullName}
                </h2>
              </div>
              <div className="ml-4">
                <p className="text-[16px] font-semibold text-[#43319A]">
                  #{adminData.adminCode}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="mt-10 ml-20 flex gap-5">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="bg-[#FC9B51] text-[#030812] hover:bg-[#43319A] hover:text-white"
                >
                  Save Changes
                </Button>
              </div>
            )}
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

        <div className="mb-4 flex items-center">
          <div className="mr-40">
            <label className="block text-xl font-semibold text-[#030812]">
              Username
            </label>
            <p
              className={`mt-1 w-[240px] rounded-[3px] border-none ${isEditing ? "bg-[#C0C0C0]" : ""} p-2 text-xl text-[#030812]`}
            >
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
                value={adminData.fullName}
                onChange={(e) =>
                  setAdminData({ ...adminData, fullName: e.target.value })
                }
                className="mt-1 rounded-[5px] border-[#43319A] p-3 text-xl font-semibold text-[#030812]"
              />
            ) : (
              <p className="mt-1 border-none text-xl text-[#030812]">
                {adminData.fullName}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <div className="mr-5">
            <label className="block text-xl font-semibold text-[#030812]">
              Email
            </label>
            <p
              className={`mt-1 w-[240px] rounded-[3px] border-none ${isEditing ? "bg-[#C0C0C0]" : ""} p-2 text-xl text-[#030812]`}
            >
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
                value={adminData.phoneNo}
                onChange={(e) =>
                  setAdminData({ ...adminData, phoneNo: e.target.value })
                }
                className="mt-1 rounded-[5px] border-[#43319A] p-3 text-xl font-semibold text-[#030812]"
              />
            ) : (
              <p className="mt-1 border-none text-xl text-[#030812]">
                {adminData.phoneNo}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="text-[#030812]">
        <div className="mt-8 mb-2.5 text-3xl font-medium">Password</div>
        <div>
          Update your password to enhance security and protect your account.
        </div>
        <Button
          className="mt-8 rounded-2xl bg-[#FC9B51] text-[#030812] hover:text-white *:hover:bg-[#43319A]"
          onClick={() => navigate(`/${adminData.adminCode}/change-password`)}
        >
          Change Password
        </Button>
        <div>
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            onClick={() => navigate(`/${adminData.adminCode}/delete`)}
          >
            <div className="mt-8 font-semibold text-[#FF4D4D]">
              Delete Account
            </div>
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Setting;
