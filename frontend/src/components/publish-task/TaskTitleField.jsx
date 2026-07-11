export default function TaskTitleField({
    Value,
    OnChange
}) {
    return (
        <div>
            <label className="block mb-2 font-bold uppercase">
                Task Title
            </label>

            <input
                type="text"
                value={Value}
                onChange={e => OnChange(e.target.value)}
                placeholder="Fix leaking pipe in bathroom"
                className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    p-4
                    outline-none
                    focus:ring-1
                    focus:ring-teal-200
                "
            />
        </div>
    );
}