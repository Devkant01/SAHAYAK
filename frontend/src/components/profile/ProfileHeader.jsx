import React from "react";
import {
    Star,
    Pencil,
    LogOut,
    Trash2,
    ShieldCheck
} from "lucide-react";
import Button from "../Button.jsx";

function ProfileHeader({
    user,
    onEdit,
    onLogout,
    onDelete,
    isEditing
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <img
                    src={
                        user.image ||
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user.name)
                    }
                    alt={user.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />

                <div className=" flex-1 text-center justify-center lg:text-left">
                    <div className="flex flex-wrap gap-2 justify-center align-middle lg:justify-start">
                        <h1 className="text-3xl font-bold">
                            {user.name}
                        </h1>

                        <span className="border border-teal-300 bg-teal-50 text-teal-700 px-4 py-0.5 w-fit h-fit my-auto rounded-full text-sm font-semibold">
                            {user.role}
                        </span>

                        {user.role === "worker" &&
                            user.category && (
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                    {user.category}
                                </span>
                            )}

                        {user.status && (
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${user.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {user.status}
                            </span>
                        )}
                    </div>

                    {user.role === "worker" &&
                        user.rating?.count > 0 && (
                            <div className="flex items-center gap-2 mt-3 justify-center lg:justify-start">
                                <Star
                                    className="fill-yellow-400 text-yellow-400"
                                    size={18}
                                />

                                <span className="font-semibold">
                                    {user.rating.average}
                                </span>

                                <span className="text-slate-500">
                                    ({user.rating.count} reviews)
                                </span>
                            </div>
                        )}

                    <div className="flex items-center gap-1 mt-3 justify-center lg:justify-start text-teal-700">
                        <ShieldCheck size={18} />
                        <span>
                            Trusted Member
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={onEdit}
                        className="flex items-center gap-2 px-4 py-3 text-white font-semibold"
                    >   
                        {isEditing ? <LogOut size={16} /> : <Pencil size={16} />}
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;