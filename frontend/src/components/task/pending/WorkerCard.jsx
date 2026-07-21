import { useState } from "react";
import {
    BadgeCheck,
    BriefcaseBusiness,
    MapPin,
    Phone,
    Star,
} from "lucide-react";
import axios from "../../../config/axios";

export default function WorkerCard({
    worker,
    taskId,
    refetch,
}) {

    const [loading, setLoading] = useState(false);
    const [contactLoading, setContactLoading] = useState(false);

    async function HandleHire() {

        try {

            setLoading(true);

            await axios.post(`/tasks/${taskId}/hire`, {
                workerId: worker._id,
            });

            refetch();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }

    async function HandleGetContact() {

        try {

            setContactLoading(true);

            await axios.get(
                `/workers/${worker._id}/contact`
            );

        } catch (err) {
            console.log(err);
        } finally {
            setContactLoading(false);
        }

    }

    return (

        <article
            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-teal-300
                hover:shadow-2xl
            "
        >

            <div className="relative">

                <img
                    src={worker.image}
                    alt={worker.name}
                    className="h-64 w-full object-cover"
                />

                {
                    worker.verified && (

                        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white shadow">

                            <BadgeCheck size={14} />

                            Verified

                        </div>

                    )
                }

                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow">

                    <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                    />

                    {worker.rating}

                </div>

            </div>

            <div className="space-y-5 p-6">

                <div>

                    <h3 className="text-xl font-bold text-slate-900">
                        {worker.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {worker.specialization}
                    </p>

                </div>

                <div className="grid grid-cols-3 gap-4 rounded-2xl bg-slate-50 p-4 text-center">

                    <div>

                        <p className="text-lg font-bold text-slate-900">
                            {worker.experience}
                        </p>

                        <p className="text-xs text-slate-500">
                            Years
                        </p>

                    </div>

                    <div>

                        <p className="text-lg font-bold text-slate-900">
                            {worker.completedJobs}
                        </p>

                        <p className="text-xs text-slate-500">
                            Jobs
                        </p>

                    </div>

                    <div>

                        <p className="text-lg font-bold text-slate-900">
                            {worker.distance} km
                        </p>

                        <p className="text-xs text-slate-500">
                            Away
                        </p>

                    </div>

                </div>

                <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                    {worker.bio}
                </p>

                <div className="flex flex-wrap gap-2">

                    {
                        worker.skills?.map((skill) => (

                            <span
                                key={skill}
                                className="
                                    rounded-full
                                    bg-teal-50
                                    px-3
                                    py-1
                                    text-xs
                                    font-medium
                                    text-teal-700
                                "
                            >
                                {skill}
                            </span>

                        ))
                    }

                </div>

                <div className="flex items-center justify-between border-t pt-5 text-sm text-slate-500">

                    <div className="flex items-center gap-2">

                        <BriefcaseBusiness
                            size={16}
                        />

                        Professional

                    </div>

                    <div className="flex items-center gap-2">

                        <MapPin
                            size={16}
                        />

                        {worker.distance} km

                    </div>

                </div>

                <div className="flex gap-3 pt-2">

                    <button
                        onClick={HandleGetContact}
                        disabled={contactLoading}
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-teal-600
                            py-3
                            font-semibold
                            text-teal-700
                            transition
                            hover:bg-teal-50
                        "
                    >

                        <Phone size={18} />

                        {
                            contactLoading
                                ? "Loading..."
                                : "Get Contact"
                        }

                    </button>

                    <button
                        onClick={HandleHire}
                        disabled={loading}
                        className="
                            flex-1
                            rounded-xl
                            bg-teal-600
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-teal-700
                        "
                    >

                        {
                            loading
                                ? "Hiring..."
                                : "Hire Worker"
                        }

                    </button>

                </div>

            </div>

        </article>

    );

}