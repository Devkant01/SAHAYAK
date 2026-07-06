import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileActions from "../components/profile/ProfileActions";
import PersonalSection from "../components/profile/PersonalSection";
import ProfessionalSection from "../components/profile/ProfessionalSection";
import AddressSection from "../components/profile/AddressSection";

function Profile() {
  const [user, setUser] = useState(null);
  const { accessToken } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchUser() {
      const res = await axios.get("/user/get-profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setUser(res.data.user);
      console.log(res.data);
    }

    fetchUser();
  }, [accessToken]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">

        <ProfileHeader user={user} />

        <ProfileActions />

        <PersonalSection user={user} />

        <ProfessionalSection user={user} />

        <AddressSection user={user} />

      </div>
    </div>
  );
}

export default Profile;