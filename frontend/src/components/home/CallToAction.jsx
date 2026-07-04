import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function CallToAction() {
    const user = useSelector((state) => state.user);
    // const useDispatch = useDispatch();

    // handleClick = (role) => {
    return (
        <section
            id="cta"
            className="mx-auto max-w-7xl px-4 py-20"
        >
            <div className="rounded-3xl bg-linear-to-r from-teal-600 to-emerald-700 px-6 py-16 text-center">
                <h2 className="text-3xl font-semibold text-white">
                    Ready to Get Started?
                </h2>

                <p className="mt-4 text-lg text-teal-50">
                    Post your first task or join as a service provider today.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button onClick={() => handleClick(client)} className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-teal-700 cursor-pointer">
                        Post a Task
                        <ArrowRight className="h-4 w-4" />
                    </button>

                    <button onClick={() => handleClick(worker)} className="rounded-xl border border-white/40 px-6 py-3 text-white cursor-pointer">
                        Become a Provider
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CallToAction;