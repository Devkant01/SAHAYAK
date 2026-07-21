import {
    Camera,
    CircleCheckBig,
    Clock3,
    Hammer,
    MapPin,
} from "lucide-react";

export default function ProgressUpdates({
    updates = [],
}) {

    return (

        <section className="rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="border-b border-slate-200 px-7 py-6">

                <h2 className="text-2xl font-bold text-slate-900">
                    Live Updates
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Track every activity shared by your worker.
                </p>

            </div>

            <div className="p-7">

                {
                    updates.length === 0 ? (

                        <div className="flex h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300">

                            <Clock3
                                size={42}
                                className="text-slate-300"
                            />

                            <p className="mt-5 text-slate-500">
                                No updates yet.
                            </p>

                        </div>

                    ) : (

                        <div className="relative">

                            <div className="absolute bottom-0 left-6 top-0 w-px bg-slate-200" />

                            <div className="space-y-8">

                                {
                                    updates.map((update, index) => (

                                        <UpdateCard
                                            key={index}
                                            update={update}
                                        />

                                    ))
                                }

                            </div>

                        </div>

                    )
                }

            </div>

        </section>

    );

}

function UpdateCard({
    update,
}) {

    return (

        <div className="relative flex gap-5">

            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">

                <UpdateIcon
                    type={update.type}
                />

            </div>

            <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-teal-200 hover:bg-white hover:shadow-md">

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <h3 className="font-semibold text-slate-900">

                            {update.title}

                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">

                            {update.message}

                        </p>

                    </div>

                    <span className="whitespace-nowrap text-xs text-slate-400">

                        {update.time}

                    </span>

                </div>

                {
                    update.image && (

                        <img
                            src={update.image}
                            alt={update.title}
                            className="mt-5 h-52 w-full rounded-xl object-cover"
                        />

                    )
                }

            </div>

        </div>

    );

}

function UpdateIcon({
    type,
}) {

    switch (type) {

        case "arrival":
            return <MapPin size={20} />;

        case "progress":
            return <Hammer size={20} />;

        case "photo":
            return <Camera size={20} />;

        case "completed":
            return <CircleCheckBig size={20} />;

        default:
            return <Clock3 size={20} />;

    }

}