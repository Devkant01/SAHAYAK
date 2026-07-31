import { useEffect, useState } from "react";

export default function DescriptionField({
    TaskData,
    Value,
    OnChange,
    handleAISubmit
}) {
    const [showAIButton, setShowAIButton] = useState(false);
    const [Load, setLoading] = useState(false);

    const onGenerateWithAIClick = async () => {
        if (Load || !handleAISubmit) return;
        try {
            setLoading(true);
            await handleAISubmit();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ((TaskData.attachments.length > 0 || TaskData.category.trim() !== "") && TaskData.title.trim() !== "" && TaskData.description.trim() === "") {
            setShowAIButton(true);
        } else {
            setShowAIButton(false);
        }
    }, [TaskData.attachments, TaskData.title, TaskData.category, TaskData.description]);

    return (
        <div className="relative">
            <div className="flex justify-between mb-2">

                <label className="block mb-2 font-bold uppercase">
                    Description
                </label>

                <span className="text-sm text-gray-500">
                    {Value.length}/500
                </span>

            </div>

            <div
                onClick={!Load ? onGenerateWithAIClick : undefined}
                className={`${showAIButton ? "absolute" : "hidden"
                    } right-2 top-12 flex items-center gap-1 rounded-full bg-gradient-to-r from-teal-300 to-teal-500 px-3 py-2 text-xs font-semibold text-white shadow-md transition-all ${Load
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
                    }`}
            >
                {Load ? (
                    <>
                        <svg
                            className="h-3.5 w-3.5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                opacity="0.3"
                            />
                            <path
                                d="M22 12a10 10 0 0 0-10-10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        <span>✨</span>
                        <span>Generate with AI</span>
                    </>
                )}
            </div>
            <textarea
                rows={8}
                maxLength={500}
                value={Value}
                onChange={e => OnChange(e.target.value)}
                placeholder="Describe your task..."
                className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-4
                resize-none
                outline-none
                focus:ring-1
                focus:ring-teal-200
                "
            />
        </div>
    );
}