import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Button from "./Button";
import { Link, useLocation } from "react-router-dom";

const NavLinks = [
    { label: "Home", href: "" },
    { label: "Categories", href: "categories" },
    { label: "How It Works", href: "how-it-works" },
    { label: "Become a Provider", href: "cta" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link to="home" className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                        <Sparkles className="h-5 w-5" />
                    </span>

                    <span className="text-xl font-bold tracking-tight text-slate-900 ">
                        Sahayak
                    </span>
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
                    {NavLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`text-sm font-semibold transition-colors hover:text-teal-700 ${currentPath === `/${link.href}` ? "text-teal-700" : "text-slate-600"}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 md:flex ">
                    <Button variant="ghost" className="font-semibold">
                        Login
                    </Button>

                    <Button className="font-semibold">
                        Sign Up
                    </Button>
                </div>

                <button
                    onClick={() => setOpen((prev) => !prev)}
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
                        {NavLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`block rounded-lg px-3 py-2 hover:bg-slate-100 ${currentPath === `/${link.href}` ? "text-teal-700" : "text-slate-700"}`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-3">
                        <Button variant="outline">
                            Login
                        </Button>

                        <Button>
                            Sign Up
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}