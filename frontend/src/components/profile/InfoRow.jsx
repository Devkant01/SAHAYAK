import React from "react";

function InfoRow({
    icon: Icon,
    label,
    value,
    badge,
    badgeColor = "green"
}) {
    return (
        <div className="flex items-start gap-4 p-5 hover:bg-teal-50 transition-colors">
            {Icon && (
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                </div>
            )}

            <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500">
                    {label}
                </p>

                <p className="font-medium text-slate-800 break-words">
                    {value}
                </p>
            </div>

            {badge && (
                <span
                    className={`text-xs px-2 py-1 rounded-full font-medium
                    ${badgeColor === "green"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {badge}
                </span>
            )}
        </div>
    );
}

export default InfoRow;