import {
    Briefcase,
    Phone,
    Shield,
    Star,
} from "lucide-react";

import InfoCard from "../InfoCard";

function ProfessionalSection({ user }) {
    if (user.role !== "worker")
        return null;

    return (
        <section className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">
                Professional Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                <InfoCard
                    icon={Briefcase}
                    label="Category"
                    value={user.category}
                />

                <InfoCard
                    icon={Shield}
                    label="Status"
                    value={user.status}
                />

                <InfoCard
                    icon={Phone}
                    label="Alternate Mobile"
                    value={
                        user.alternateMobile
                            ?.number
                    }
                    verified={
                        user.alternateMobile
                            ?.isVerified
                    }
                />

                <InfoCard
                    icon={Shield}
                    label="Aadhaar"
                    value={
                        user.aadhar?.number
                    }
                    verified={
                        user.aadhar
                            ?.isVerified
                    }
                />

                <InfoCard
                    icon={Star}
                    label="Average Rating"
                    value={
                        user.rating?.average
                    }
                />

                <InfoCard
                    icon={Star}
                    label="Total Reviews"
                    value={
                        user.rating?.count
                    }
                />
            </div>
        </section>
    );
}

export default ProfessionalSection;