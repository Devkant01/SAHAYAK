import { Search, MapPin } from "lucide-react";

const PopularTags = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Painting",
    "Carpentry",
];

function SearchServices() {
    return (
        <section className="relative z-10 mx-auto -mt-12 max-w-5xl px-4 sm:px-6 lg:-mt-20 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                        <Search className="h-5 w-5 text-slate-400" />

                        <input
                            type="text"
                            placeholder="What service do you need?"
                            className="w-full outline-none"
                        />
                    </div>

                    <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 lg:max-w-xs">
                        <MapPin className="h-5 w-5 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full outline-none"
                        />
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-white hover:bg-teal-700">
                        <Search className="h-4 w-4" />
                        Search
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-slate-500">
                        Popular:
                    </span>

                    {PopularTags.map((tag) => (
                        <button
                            key={tag}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SearchServices;