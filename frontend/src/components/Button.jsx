import React from 'react'

export default function Button({
    children,
    variant = "default",
    className = "",
    ...props
}) {
    const BaseStyle =
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors";

    const Variants = {
        default: "bg-teal-600 text-white hover:bg-teal-700",
        ghost: "text-slate-700 hover:bg-slate-100",
        outline:
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    };

    return (
        <button
            className={`${BaseStyle} ${Variants[variant]} ${className} cursor-pointer`}
            {...props}
        >
            {children}
        </button>
    );
}
