import React from "react";
import {
    MapPin
} from "lucide-react";
import { HasValue } from "../../utils/hasValue";
import ProfileSection from "./ProfileSection";

function AddressCard({ address }) {
    if (!HasValue(address)) return null;

    return (
        <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
                <MapPin
                    className="text-blue-600 mt-1"
                    size={20}
                />

                <div className="flex-1">
                    {address.label && (
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">
                                {address.label}
                            </h4>

                            {address.isDefault && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    Default
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-x-1 gap-y-1 text-sm text-slate-600">
                        {address.street && (
                            <p>{address.street},</p>
                        )}

                        {address.city && (
                            <p>{address.city}, </p>
                        )}

                        {address.state && (
                            <p>{address.state}, </p>
                        )}

                        {address.country && (
                            <p>{address.country}</p>
                        )}

                        {address.zip && (
                            <p>({address.zip})</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressCard;