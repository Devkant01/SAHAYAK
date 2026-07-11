import React from "react";
import {
    Briefcase,
    Phone,
    Shield,
    Star
} from "lucide-react";
import InfoRow from "./InfoRow";
import { HasValue } from "../../utils/hasValue";

function WorkerDetailsCard({ user }) {
    if (user.role !== "worker")
        return null;

    const Fields = [
        {
            label: "Category",
            value: user.category,
            icon: Briefcase
        },
        {
            label: "Status",
            value: user.status,
            icon: Shield
        },
        {
            label: "Alternate Mobile",
            value:
                user.alternateMobile?.number,
            icon: Phone
        },
        {
            label: "Aadhaar Number",
            value: user.aadhar?.number,
            icon: Shield
        }
    ];

    const VisibleFields = Fields.filter(
        item => HasValue(item.value)
    );

    const ShowRating =
        user.rating?.average > 0 &&
        user.rating?.count > 0;

    if (
        VisibleFields.length === 0 &&
        !ShowRating
    )
        return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b">
                <h2 className="font-semibold text-lg">
                    Professional Details
                </h2>
            </div>

            {VisibleFields.map(field => (
                <InfoRow
                    key={field.label}
                    {...field}
                />
            ))}

            {ShowRating && (
                <div className="border-t p-5">
                    <div className="flex items-center gap-3">
                        <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={22}
                        />

                        <div>
                            <p className="font-semibold">
                                {
                                    user.rating
                                        .average
                                }
                            </p>

                            <p className="text-sm text-slate-500">
                                {
                                    user.rating
                                        .count
                                }{" "}
                                Reviews
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkerDetailsCard;