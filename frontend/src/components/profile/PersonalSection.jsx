import {
    Mail,
    Phone,
    Calendar,
    User as UserIcon,
} from "lucide-react";

import InfoCard from "../InfoCard";

function PersonalSection({ user }) {
    return (
        <section className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">
                Personal Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                <InfoCard
                    icon={UserIcon}
                    label="Name"
                    value={user.name}
                />

                <InfoCard
                    icon={Mail}
                    label="Email"
                    value={user.mail?.id}
                    verified={
                        user.mail?.isVerified
                    }
                />

                <InfoCard
                    icon={Phone}
                    label="Mobile"
                    value={
                        user.mobile?.number
                    }
                    verified={
                        user.mobile?.isVerified
                    }
                />

                <InfoCard
                    icon={Calendar}
                    label="Date of Birth"
                    value={
                        user.dateOfBirth
                            ? new Date(
                                user.dateOfBirth
                            ).toLocaleDateString()
                            : null
                    }
                />

                <InfoCard
                    icon={UserIcon}
                    label="Gender"
                    value={user.gender}
                />
            </div>
        </section>
    );
}

export default PersonalSection;