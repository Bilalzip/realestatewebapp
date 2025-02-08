"use client";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import useToken from "@/hooks/useToken";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePic?: string;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UpdateUserResponse {
  status: number;
  message: string;
  data?: User;
  error?: any;
}

interface ProfileResponse {
  status: number;
  message?: string;
  user?: User;
}

const UserAccount = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token] = useToken();
  const [profilePic, setProfilePic] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      fetchUserDetails(token);
    }
  }, [token]);

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await axios.post<ProfileResponse>("/api/users/profile", { token });
      if (response.data.user) {
        setUser(response.data.user);
        setProfilePic(response.data.user.profilePic || "");
      } else {
        toast.error("Invalid user data received!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Session expired! Please log in again.");
    }
  };
  
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "realstate");

    try {
      const response = await axios.post<{secure_url: string}>(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Failed to upload image!");
      console.error(error);
      return null;
    }
  };

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl && user) {
      setProfilePic(imageUrl);
      setUser({ ...user, profilePic: imageUrl });

      try {
        await axios.post<UpdateUserResponse>("/api/users/update", { 
          token, 
          user: { profilePic: imageUrl } 
        });
        toast.success("Profile picture updated!");
        fetchUserDetails(token);
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Failed to update profile picture!");
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (!token || !user) return;

    try {
      setUpdating(true);
      const response = await axios.post<UpdateUserResponse>("/api/users/update", { token, user });
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <label htmlFor="profile-pic-upload" className="relative cursor-pointer">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-md" />
          ) : (
            <FaUserCircle size={96} className="text-gray-500" />
          )}
          <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full">
            <FaCamera className="text-white" />
          </div>
        </label>
        <input type="file" id="profile-pic-upload" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
      </div>

      {/* User Information */}
      <h2 className="text-center text-2xl font-bold mt-4">{user?.name || "User"}</h2>
      <p className="text-center text-gray-600 flex items-center justify-center gap-2 mt-2">
        <FaEnvelope /> {user?.email || "Email not provided"}
      </p>

      {/* Update User Info */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input 
          type="text" 
          value={user?.name || ""} 
          onChange={(e) => user && setUser({ ...user, name: e.target.value })} 
          className="mt-1 block w-full p-2 border rounded-lg" 
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Username</label>
        <input 
          type="text" 
          value={user?.username || ""} 
          onChange={(e) => user && setUser({ ...user, username: e.target.value })} 
          className="mt-1 block w-full p-2 border rounded-lg" 
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
        <input 
          type="email" 
          value={user?.email || ""} 
          onChange={(e) => user && setUser({ ...user, email: e.target.value })} 
          className="mt-1 block w-full p-2 border rounded-lg" 
        />

        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg mt-6" 
          onClick={handleUpdateProfile} 
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </div>
      <button onClick={handleLogout} className="flex items-center justify-center text-white text-lg font-semibold bg-red-600 hover:bg-red-700 p-3 rounded-lg mt-6 w-full">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default UserAccount;
