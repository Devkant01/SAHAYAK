import { Briefcase, UserRound } from "lucide-react";

function RoleSelector({
    title,
    subtitle,
    onSelect,
    // loginLink = "/login",
}) {
    const HandleSelect = (role) => {
        onSelect(role);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-teal-50 to-white">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Sahayak
                    </h1>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center">
                    <h2 className="text-center text-5xl font-bold text-slate-900">
                        Welcome to Sahayak
                    </h2>

                    <p className="mt-4 text-lg text-slate-600">
                        Which describes you best?
                    </p>

                    <div className="mt-12 flex flex-col gap-6 md:flex-row">
                        <button
                            onClick={() =>
                                HandleSelect(
                                    "client"
                                )
                            }
                            className="group w-72 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-teal-300 hover:shadow-xl"
                        >
                            <div className="flex h-56 items-center justify-center rounded-2xl bg-linear-to-br from-green-100 to-teal-100">
                                <Briefcase className="h-20 w-20 text-slate-800" />
                            </div>

                            <h3 className="mt-6 text-3xl font-semibold text-slate-900 text-nowrap">
                                Service Seeker →
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Post tasks and hire professionals
                            </p>
                        </button>

                        <button
                            onClick={() =>
                                HandleSelect(
                                    "worker"
                                )
                            }
                            className="group w-72 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-teal-300 hover:shadow-xl"
                        >
                            <div className="flex h-56 items-center justify-center rounded-2xl bg-linear-to-br from-green-100 to-lime-100">
                                <UserRound className="h-20 w-20 text-slate-800" />
                            </div>

                            <h3 className="mt-6 text-3xl font-semibold text-slate-900 text-nowrap">
                                Service Provider →
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Find work and earn
                                money
                            </p>
                        </button>
                    </div>

                    {/* <p className="mt-14 text-base text-slate-700">
                        Already have an account?{" "}
                        <a
                            href={loginLink}
                            className="font-medium text-teal-700 hover:underline"
                        >
                            Log In
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    );
}

export default RoleSelector;