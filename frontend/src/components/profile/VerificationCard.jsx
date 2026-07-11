import React from "react";
import {
    BadgeCheck,
    CircleAlert
} from "lucide-react";
import { HasValue } from "../../utils/hasValue";
import ProfileSection from "./ProfileSection";

function VerificationCard({ user }) {
    const Items = [
        {
            label: "Email Verification",
            value: user.mail?.isVerified
        },
        {
            label: "Mobile Verification",
            value: user.mobile?.isVerified
        },
        {
            label: "Alternate Mobile Verification",
            value:
                user.alternateMobile?.isVerified
        },
        {
            label: "Aadhaar Verification",
            value: user.aadhar?.isVerified
        }
    ].filter(
        item =>
            item.value !== undefined &&
            item.value !== null
    );

    if (!HasValue(Items))
        return null;

    return (
        <ProfileSection title="Verification Status">

            <div className="p-5 space-y-4">
                {Items.map(item => (
                    <div
                        key={item.label}
                        className="flex justify-between items-center"
                    >
                        <span>
                            {item.label}
                        </span>

                        {item.value ? (
                            <div className="flex items-center gap-2 text-green-600">
                                <BadgeCheck
                                    size={18}
                                />
                                Verified
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-red-600">
                                <CircleAlert
                                    size={18}
                                />
                                Not Verified
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ProfileSection>

    );
}

export default VerificationCard;