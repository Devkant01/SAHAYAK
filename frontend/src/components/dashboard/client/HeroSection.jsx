import { Search, Plus, Zap, Wrench, Snowflake, BrushCleaning, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../Button";

export default function HeroSection() {
    const Services = [
        {
            Icon: Zap,
            Name: "Electrician"
        },
        {
            Icon: Wrench,
            Name: "Plumber"
        },
        {
            Icon: Snowflake,
            Name: "AC Repair"
        },
        {
            Icon: BrushCleaning,
            Name: "Cleaner"
        }
    ];

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 p-6 md:p-10 text-white">

            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

            <div className="flex w-full justify-between items-center">
                <div className="relative z-10 max-w-3xl">
                    <div className="w-fit inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">

                        <UserRound className="h-4 w-4" />

                        Client Dashboard

                    </div>
                    <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">
                        Need help with something today?
                    </h1>

                    <p className="mt-4 text-white/80 text-sm md:text-base">
                        Find trusted helpers near you or post a task and get applications from skilled Sahayaks.
                    </p>

                    <div className="mt-4 flex flex-col md:flex-row gap-3">

                        <div className="flex items-center flex-1 bg-white rounded-lg px-4 py-3 text-gray-700">
                            <Search size={20} className="text-teal-800 " />
                            <input
                                type="text"
                                placeholder="Search services..."
                                className="ml-3 w-full outline-none bg-transparent indent-1 accent-teal-800 text-teal-700"
                            />
                        </div>

                        <Button className="flex items-center justify-center gap-2 bg-white  hover:bg-white/90 transition rounded-2xl px-5 py-3 font-semibold">
                            <Link
                                to="/publish-task"
                                className="inline-flex items-center text-lg justify-center text-teal-400 font-semibold"
                            >
                                <Plus size={20} className="" />
                                Post Task
                            </Link>
                        </Button>

                    </div>

                    {/* <div className="mt-4 flex flex-wrap gap-3">

                    {Services.map((Service) => (
                        <Button
                            key={Service.Name}
                            variant="transparent"
                            className="flex items-center gap-2 rounded-full backdrop-blur-md px-4 py-2 font-medium hover:bg-white/20 transition"
                        >
                            <Service.Icon size={18} />
                            {Service.Name}
                        </Button>
                    ))}

                </div> */}

                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 h-fit w-fit backdrop-blur">
                    <p className="text-sm text-teal-100">
                        Get Things Done
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                        Find trusted helpers with ease.
                    </h3>
                </div>
            </div>

        </section>
    );
}