import { MapPin } from "lucide-react";

function AddressSection({ user }) {
    return (
        <section className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">
                Address Information
            </h2>

            {user.role === "client" ? (
                <div className="space-y-4">
                    {user.addresses?.map(
                        (address, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-slate-200 bg-white p-5"
                            >
                                <div className="mb-2 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />

                                    <span className="font-semibold">
                                        {
                                            address.label
                                        }
                                    </span>
                                </div>

                                <p>
                                    {
                                        address.street
                                    }
                                </p>

                                <p>
                                    {
                                        address.city
                                    }
                                    ,{" "}
                                    {
                                        address.state
                                    }
                                </p>

                                <p>
                                    {
                                        address.country
                                    }{" "}
                                    -{" "}
                                    {
                                        address.zip
                                    }
                                </p>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p>
                        {
                            user.address
                                ?.street
                        }
                    </p>

                    <p>
                        {
                            user.address
                                ?.city
                        }
                        ,{" "}
                        {
                            user.address
                                ?.state
                        }
                    </p>

                    <p>
                        {
                            user.address
                                ?.country
                        }{" "}
                        -{" "}
                        {
                            user.address
                                ?.zip
                        }
                    </p>
                </div>
            )}
        </section>
    );
}

export default AddressSection;