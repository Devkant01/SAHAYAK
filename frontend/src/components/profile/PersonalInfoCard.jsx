import React from "react";
import {
    Mail,
    Phone,
    Calendar,
    User
} from "lucide-react";
import InfoRow from "./InfoRow";
import { HasValue } from "../../utils/hasValue";
import ProfileSection from "./ProfileSection";

function PersonalInfoCard({ user }) {
    const Fields = [
        {
            label: "Email",
            value: user.mail?.id,
            icon: Mail,
            badge: user.mail?.isVerified
                ? "Verified"
                : "",
            badgeColor: user.mail?.isVerified
                ? "green"
                : "red"
        },
        {
            label: "Mobile",
            value: user.mobile?.number,
            icon: Phone,
            badge: user.mobile?.isVerified
                ? "Verified"
                : "",
            badgeColor: user.mobile?.isVerified
                ? "green"
                : "red"
        },
        {
            label: "Date Of Birth",
            value: user.dateOfBirth
                ? new Date(
                    user.dateOfBirth
                ).toLocaleDateString()
                : null,
            icon: Calendar
        },
        {
            label: "Gender",
            value: user.gender,
            icon: User
        }
    ];

    const VisibleFields = Fields.filter(
        item => HasValue(item.value)
    );

    if (VisibleFields.length === 0)
        return null;

    return (
        <ProfileSection title="Personal Information">

            {VisibleFields.map(field => (
                <InfoRow
                    key={field.label}
                    {...field}
                />
            ))}
        </ProfileSection>
    );
}

export default PersonalInfoCard;