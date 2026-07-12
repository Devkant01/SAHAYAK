import { Search, Plus, Zap, Wrench, Snowflake, BrushCleaning } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../Button";

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
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 via-teal-400 to-teal-800 p-6 md:p-10 text-white">

            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl">

                <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
                    Need help with something today?
                </h1>

                <p className="mt-4 text-white/80 text-sm md:text-base">
                    Find trusted helpers near you or post a task and get applications from skilled Sahayaks.
                </p>

                <div className="mt-8 flex flex-col md:flex-row gap-3">

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

                <div className="mt-8 flex flex-wrap gap-3">

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

                </div>

            </div>

        </section>
    );
}