import { ClipboardX } from "lucide-react";

export default function EmptyState({
    title,
    description,
}) {

    return (

        <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">

                <ClipboardX size={30} />

            </div>

            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            <p className="mt-3 text-slate-500">
                {description}
            </p>

        </div>

    );

}