import React from 'react'
import { twMerge } from "tailwind-merge";

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
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200",
        transparent: "bg-transparent border border-gray-200 hover:bg-slate-100",
    };

    return (
        <button
            className={`${twMerge(
                BaseStyle,
                Variants[variant],
                className
            )} cursor-pointer`}
            {...props}
        >
            {children}
        </button>
    );
}
