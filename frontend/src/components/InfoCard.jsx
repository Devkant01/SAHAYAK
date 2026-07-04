import { CheckCircle } from "lucide-react";

function InfoCard({
    icon: Icon,
    label,
    value,
    verified = false,
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-500">
                <Icon className="h-4 w-4" />

                <span className="text-sm">
                    {label}
                </span>

                {verified && (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                )}
            </div>

            <p className="mt-2 font-medium text-slate-800">
                {value || "Not Added"}
            </p>
        </div>
    );
}

export default InfoCard;