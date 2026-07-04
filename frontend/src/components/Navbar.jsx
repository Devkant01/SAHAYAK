import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, Bell, UserCircle } from "lucide-react";
import Button from "./Button";

const NavLinks = [
    { label: "Home", href: "#" },
    { label: "Categories", href: "#categories" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Become a Provider", href: "#cta" },
];

const ClientLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Publish Task", href: "/publish-task" },
];

const WorkerLinks = [
    { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const location = useLocation(); //to get current path for active link styling
    const navigate = useNavigate(); //to programmatically navigate after logout
    const dispatch = useDispatch(); //to dispatch logout action

    const currentPath = location.pathname;

    const user = useSelector(
        (state) => state.user
    );

    const NavItems = user.isAuthenticated
        ? user.userRole === "client"
            ? ClientLinks
            : WorkerLinks
        : NavLinks;

    async function HandleLogout() {
        try {
            const response = await axios.post(
                "/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log("Logout failed", err);
        } finally {
            dispatch(logout());
        }
        navigate("/");
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

                <Link
                    to="/"
                    className="flex items-center gap-2"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                        <Sparkles className="h-5 w-5" />
                    </span>

                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Sahayak
                    </span>
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
                    {NavItems.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                className={`text-sm font-semibold transition-colors hover:text-teal-700 ${currentPath === link.href
                                    ? "text-teal-700"
                                    : "text-slate-600"
                                    }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 md:flex">
                    {!user.isAuthenticated ? (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button>
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button className="rounded-full p-2 transition hover:bg-slate-100">
                                <Bell className="h-5 w-5" />
                            </button>

                            <Link
                                to="/profile"
                                className="flex items-center gap-2"
                            >
                                <span className="font-medium text-slate-700">
                                    {user.credentials?.name}
                                </span>
                                    <img src={user.credentials?.image || `https://api.dicebear.com/9.x/personas/svg?seed=${user.credentials?.name}`} className="h-8 w-8 text-slate-700 rounded-2xl" />
                            
                            </Link>

                            
                        </>
                    )}
                </div>

                <button
                    onClick={() =>
                        setOpen((prev) => !prev)
                    }
                    className="rounded-lg p-2 md:hidden"
                >
                    {open ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </nav>

            {open && (
                <div className="border-t border-slate-200 bg-white md:hidden">
                    <ul className="flex flex-col gap-1 px-4 py-3">
                        {NavItems.map((link) => (
                            <li key={link.label}>
                                <Link
                                    to={link.href}
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                    className={`block rounded-lg px-3 py-2 hover:bg-slate-100 ${currentPath === link.href
                                        ? "text-teal-700"
                                        : "text-slate-700"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-3">

                        {!user.isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Login
                                    </Button>
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >
                                    <Button className="w-full">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="px-2 py-2">
                                    <p className="font-semibold">
                                        {
                                            user.credentials
                                                ?.name
                                        }
                                    </p>

                                    <p className="text-sm capitalize text-slate-500">
                                        {
                                            user.userRole
                                        }
                                    </p>
                                </div>

                                <Link
                                    to="/profile"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Profile
                                    </Button>
                                </Link>

                                
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}