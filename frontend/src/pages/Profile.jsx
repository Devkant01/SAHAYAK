import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  logout
} from "../features/user/userSlice";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import VerificationCard from "../components/profile/VerificationCard";
import WorkerDetailsCard from "../components/profile/WorkerDetailsCard";
import AddressesSection from "../components/profile/AddressesSection";
import AccountInfoCard from "../components/profile/AccountInfoCard";
import DangerZone from "../components/profile/DangerZone";
import { RefreshToken } from "../utils/RefreshToken";

function Profile() {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const isAuthenticated = useSelector(
    state => state.user.isAuthenticated
  );
  let AccessToken = useSelector(
    state => state.user.accessToken
  );

  const [User, setUser] = useState(null);
  useEffect(() => {
    if (!isAuthenticated) {
      Navigate("/login", { replace: true });
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/user/get-profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${AccessToken}`
          }
        });
        console.log(response.data);
        setUser(response.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          console.log("Access token expired, refreshing...");
          const newAccessToken = await RefreshToken(err);
          AccessToken = newAccessToken;
        } else
          console.log(err);
      }
    };

    fetchUserData();
  }, [isAuthenticated, Navigate, AccessToken, Dispatch]);


  async function HandleLogout() {
    try {
      await axios.post("/auth/logout", {}, {
        withCredentials: true,
      });

      Dispatch(logout());
      setTimeout(() => {
        Navigate("/", { replace: true });
      }, 0);
    } catch (err) {
      console.log(err);
    }
  }

  async function HandleDelete() {
    const ConfirmDelete =
      window.confirm(
        "Are you sure you want to delete your account?"
      );

    if (!ConfirmDelete) return;

    try {
      await axios.delete(
        "/user/delete-account",
        {
          withCredentials: true
        }
      );

      Dispatch(logout());

      Navigate("/", {
        replace: true
      });
    } catch (err) {
      console.log(err);
    }
  }

  function HandleEditProfile() {
    Navigate("/profile/edit");
  }

  if (!User) { //useful when the user refreshes the page and the state is lost, but the user is still logged in
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>
          getting user data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <ProfileHeader
            user={User}
            onEdit={
              HandleEditProfile
            }
            onLogout={
              HandleLogout
            }
            onDelete={
              HandleDelete
            }
          />

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <PersonalInfoCard
                user={
                  User
                }
              />

              <WorkerDetailsCard
                user={
                  User
                }
              />

              <AddressesSection
                user={
                  User
                }
              />

              <DangerZone
                onLogout={
                  HandleLogout
                }
                onDelete={
                  HandleDelete
                }
              />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <VerificationCard
                user={
                  User
                }
              />

              <AccountInfoCard
                user={
                  User
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;