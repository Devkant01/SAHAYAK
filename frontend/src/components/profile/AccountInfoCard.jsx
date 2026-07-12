import React from "react";
import {
    CalendarDays,
    UserCog
} from "lucide-react";
import ProfileSection from "./ProfileSection";

function AccountInfoCard({
    user
}) {
    return (
        <ProfileSection title="Account Information">

            <div className="">
                <div className="p-4 flex items-center justify-between hover:bg-teal-50">
                    <span>
                        Account Type
                    </span>

                    <span className="font-medium capitalize">
                        {user.role}
                    </span>
                </div>

                {user.createdAt && (
                    <div className="flex p-4 items-center justify-between hover:bg-teal-50">
                        <span>
                            Member Since
                        </span>

                        <span>
                            {new Date(
                                user.createdAt
                            ).toLocaleDateString()}
                        </span>
                    </div>
                )}

                {user.updatedAt && (
                    <div className="flex p-4 items-center justify-between hover:bg-teal-50">
                        <span>
                            Last Updated
                        </span>

                        <span>
                            {new Date(
                                user.updatedAt
                            ).toLocaleDateString()}
                        </span>
                    </div>
                )}
            </div>
        </ProfileSection>
    );
}

export default AccountInfoCard;