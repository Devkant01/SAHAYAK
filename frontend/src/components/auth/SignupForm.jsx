import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/user/userSlice";
import axios from "axios";

function SignupForm({ role }) {
    const [formData, setFormData] = useState({
        name: "",
        identifier: "",
        password: "",
    });

    const Dispatch = useDispatch();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function HandleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function HandleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const IsMobile = /^\d+$/.test(
                formData.identifier
            );

            const Payload = {
                name: formData.name,
                password: formData.password,
                role,
                ...(IsMobile
                    ? { mobile: formData.identifier }
                    : { mail: formData.identifier }),
            };

            const Response = await axios.post(
                "/auth/register",
                Payload,
                {
                    withCredentials: true,
                }
            );

            console.log(Response.data);
            Dispatch(
                setCredentials(Response.data)
            );
            Navigate("/"); //for now
        } catch (err) {
            setError(
                err?.response?.data?.error ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-teal-50 to-white">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">

                <div>
                    <Link to={"/"} className="text-3xl font-bold text-slate-900">
                        Sahayak
                    </Link>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center">

                    <h2 className="text-center text-5xl font-bold text-slate-900">
                        Create Account
                    </h2>

                    <p className="mt-4 text-lg text-slate-600">
                        Sign up as{" "}
                        <span className="font-semibold">
                            {role === "client"
                                ? "Service Seeker"
                                : "Service Provider"}
                        </span>
                    </p>

                    <form
                        onSubmit={HandleSubmit}
                        className="mt-12 w-full max-w-md"
                    >
                        <div className="rounded-2xl p-6 ">

                            <div className="space-y-5">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={HandleChange}
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Email or Mobile
                                    </label>

                                    <input
                                        type="text"
                                        name="identifier"
                                        value={formData.identifier}
                                        onChange={HandleChange}
                                        placeholder="Enter email or mobile"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={HandleChange}
                                        placeholder="Create password"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500"
                                    />
                                </div>

                                {error && (
                                    <p className="text-sm text-red-500">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
                                >
                                    {loading
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-teal-700 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignupForm;