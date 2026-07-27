import { WorkerCategories } from "../../constants/workerCategories";

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
                {Object.values(WorkerCategories).slice(0, 7).map(
                    category => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.label}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white">
                                    <category.icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold">
                                    {category.label}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {category.description}
                                </p>
                            </div>
                        )
                    }
                )}
                {Object.values(WorkerCategories).length > 7 && (
                    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white">
                            <span className="text-lg font-semibold">+</span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">
                            {Object.values(WorkerCategories).length - 7} More Categories
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Explore additional services and professionals.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Categories;