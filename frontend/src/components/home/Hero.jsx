import {
    BadgeCheck,
    ShieldCheck,
    Clock,
    Star,
    MessageSquareQuote,
    Wrench,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const TrustIndicators = [
    {
        icon: BadgeCheck,
        label: "Verified Providers",
    },
    {
        icon: ShieldCheck,
        label: "Secure Platform",
    },
    {
        icon: MessageSquareQuote,
        label: "Trusted Reviews",
    },
    {
        icon: Clock,
        label: "Fast Hiring",
    },
];

function Hero() {
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-linear-to-b from-teal-50/60 to-white"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-20">
                <div className="flex flex-col gap-6">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
                        <BadgeCheck className="h-4 w-4" />
                        Trusted by thousands across your city
                    </span>

                    <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Get Any Task Done by{" "}
                        <span className="text-teal-600">
                            Trusted Professionals
                        </span>
                    </h1>

                    <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                        From plumbing and electrical repairs to cleaning and
                        painting, find skilled professionals near you in
                        minutes.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link to="/publish-task" className="cursor-pointer">
                        <button className="rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white hover:bg-teal-700 cursor-pointer">
                            Post a Task
                            </button>
                        </Link>

                        <Link to="/login?role=worker" className="cursor-pointer">
                        <button className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer">
                            Become a Provider
                            </button>
                        </Link>
                    </div>

                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {TrustIndicators.map(({ icon: Icon, label }) => (
                            <li
                                key={label}
                                className="flex items-center gap-2"
                            >
                                <Icon className="h-5 w-5 text-teal-600" />
                                <span className="text-sm text-slate-600">
                                    {label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                        <img
                            src="/images/hero-illustration.png"
                            alt="Hero"
                            className="w-full object-cover"
                        />
                    </div>

                    <div className="absolute -left-3 top-10 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg sm:flex">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                            <Wrench className="h-5 w-5" />
                        </span>

                        <div>
                            <p className="text-sm font-semibold">
                                Plumber Available
                            </p>
                            <p className="text-xs text-slate-500">
                                Responds in ~5 min
                            </p>
                        </div>
                    </div>

                    <div className="absolute -right-3 top-1/2 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg sm:flex">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                            <Zap className="h-5 w-5" />
                        </span>

                        <div>
                            <p className="text-sm font-semibold">
                                Electrician Nearby
                            </p>
                            <p className="text-xs text-slate-500">
                                1.2 km away
                            </p>
                        </div>
                    </div>

                    <div className="absolute -bottom-4 left-12 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg sm:flex">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <Star className="h-5 w-5 fill-current" />
                        </span>

                        <div>
                            <p className="text-sm font-semibold">
                                Cleaner Rated 4.9
                            </p>
                            <p className="text-xs text-slate-500">
                                320+ reviews
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;