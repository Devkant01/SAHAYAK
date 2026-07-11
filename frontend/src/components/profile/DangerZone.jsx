import React from "react";
import {
    Trash2,
    LogOut
} from "lucide-react";
import Button from "../Button.jsx";

function DangerZone({
    onDelete,
    onLogout
}) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-red-200">
                <h2 className="font-semibold text-red-600">
                    Danger Zone
                </h2>
            </div>

            <div className="p-5">
                <p className="text-sm text-slate-600 mb-5">
                    Deleting your account is
                    permanent and cannot be
                    undone.
                </p>

                <div className="flex flex-col md:flex-row gap-3">
                    <Button
                        variant="ghost"
                        onClick={
                            onLogout
                        }
                        className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-3"
                    >
                        <LogOut
                            size={18}
                        />
                        Logout
                    </Button>

                    <Button
                        onClick={
                            onDelete
                        }
                        variant="danger"
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 rounded-xl py-3"
                    >
                        <Trash2
                            size={18}
                        />
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DangerZone;