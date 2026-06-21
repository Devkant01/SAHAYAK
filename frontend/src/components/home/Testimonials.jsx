import { Star } from "lucide-react";

const TestimonialsList = [
    {
        name: "Priya Sharma",
        role: "Homeowner",
        image: "/images/avatar-1.png",
        text: "I needed an electrician urgently and found a verified professional within minutes.",
    },
    {
        name: "Rajesh Kumar",
        role: "Service Provider",
        image: "/images/avatar-2.png",
        text: "Sahayak has given me a steady stream of work and flexible opportunities.",
    },
    {
        name: "Anil Mehta",
        role: "Customer",
        image: "/images/avatar-3.png",
        text: "Booked a cleaning service and was highly satisfied with the quality.",
    },
];

function Testimonials() {
    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-20">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">
                        What Our Users Say
                    </h2>

                    <p className="mt-3 text-lg text-slate-600">
                        Real stories from seekers and providers.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {TestimonialsList.map((item) => (
                        <div
                            key={item.name}
                            className="rounded-2xl border border-slate-200 bg-white p-6"
                        >
                            <div className="flex gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-current"
                                    />
                                ))}
                            </div>

                            <p className="mt-4 text-slate-600">
                                "{item.text}"
                            </p>

                            <div className="mt-6 flex items-center gap-3 border-t pt-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-11 w-11 rounded-full object-cover"
                                />

                                <div>
                                    <p className="font-semibold">
                                        {item.name}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;