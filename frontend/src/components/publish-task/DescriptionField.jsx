export default function DescriptionField({
    Value,
    OnChange
}) {
    return (
        <div>
            <div className="flex justify-between mb-2">

                <label className="block mb-2 font-bold uppercase">
                    Description
                </label>

                <span className="text-sm text-gray-500">
                    {Value.length}/500
                </span>

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