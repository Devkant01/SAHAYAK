import {
    Sparkles,
    Mail,
    Phone,
    MessageCircle,
    Send,
} from "lucide-react";

const Columns = [
    {
        title: "Platform",
        links: [
            "Home",
            "Categories",
            "How It Works",
            "Become a Provider",
        ],
    },
    {
        title: "Support",
        links: [
            "Help Center",
            "Contact Us",
            "FAQs",
        ],
    },
    {
        title: "Legal",
        links: [
            "Privacy Policy",
            "Terms of Service",
        ],
    },
];

const Socials = [
    Mail,
    Phone,
    MessageCircle,
    Send,
];

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-10 lg:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                                <Sparkles className="h-5 w-5" />
                            </div>

                            <span className="text-xl font-semibold">
                                Sahayak
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-slate-500">
                            Find trusted professionals for every task.
                        </p>
                    </div>

                    {Columns.map((col) => (
                        <div key={col.title}>
                            <h3 className="font-semibold">
                                {col.title}
                            </h3>

                            <ul className="mt-4 space-y-3">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-slate-500"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-between">
                    <p className="text-sm text-slate-500">
                        © 2026 Sahayak. All rights reserved.
                    </p>

                    <div className="flex gap-3">
                        {Socials.map((Icon, index) => (
                            <button
                                key={index}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200"
                            >
                                <Icon className="h-4 w-4" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;