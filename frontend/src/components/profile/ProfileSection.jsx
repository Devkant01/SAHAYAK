function ProfileSection({
    title,
    children
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b bg-teal-50">
                <h2 className="font-semibold text-lg">
                    {title}
                </h2>
            </div>

            {children}
        </div>
    );
}

export default ProfileSection;