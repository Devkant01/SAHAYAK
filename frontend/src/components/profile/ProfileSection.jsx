import { Edit } from "lucide-react";

function ProfileSection({
    title,
    Icon,
    children
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b bg-teal-50 flex items-center justify-between">
                <h2 className="font-semibold text-lg">
                    {title}
                </h2>
                {Icon && 
                    Icon
                }
            </div>

            {children}
        </div>
    );
}

export default ProfileSection;