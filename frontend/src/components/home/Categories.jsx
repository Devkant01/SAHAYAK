import {
    Wrench,
    Zap,
    Hammer,
    PaintRoller,
    Sparkles,
    Leaf,
    MoreHorizontal,
} from "lucide-react";

const CategoriesList = [
    {
        icon: Wrench,
        name: "Plumber",
        description: "Leaks, fittings, and pipe repairs.",
    },
    {
        icon: Zap,
        name: "Electrician",
        description: "Wiring, fixtures, and safety checks.",
    },
    {
        icon: Hammer,
        name: "Carpenter",
        description: "Furniture, doors, and woodwork.",
    },
    {
        icon: PaintRoller,
        name: "Painter",
        description: "Interior and exterior painting.",
    },
    {
        icon: Sparkles,
        name: "Cleaner",
        description: "Deep cleaning and housekeeping.",
    },
    {
        icon: Leaf,
        name: "Gardener",
        description: "Lawn care and landscaping.",
    },
    {
        icon: MoreHorizontal,
        name: "Other",
        description: "Tell us what you need help with.",
    },
];

function Categories() {
    return (
        <section
            id="categories"
            className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-slate-900">
                    Popular Categories
                </h2>

                <p className="mt-3 text-lg text-slate-600">
                    Find professionals across a wide range of services.
                </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {CategoriesList.map(
                    ({ icon: Icon, name, description }) => (
                        <div
                            key={name}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white">
                                <Icon className="h-6 w-6" />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold">
                                {name}
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                {description}
                            </p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}

export default Categories;