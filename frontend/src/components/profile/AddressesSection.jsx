import React, { useState } from "react";
import AddressCard from "./AddressCard";
import ProfileSection from "./ProfileSection";
import { Edit } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RefreshToken } from "../../utils/RefreshToken";

function AddressesSection({
    user
}) {
    const defaultAddress = useSelector((state) => state.user.credentials?.defaultAddress);
    const [updateAddresses, setUpdateAddresses] = useState(false);
    if (updateAddresses) {
        return (
            <ProfileSection title="Add Address">
                <div className="w-full min-h-fit p-5">
                    <AddressForm onCancel={() => setUpdateAddresses(false)} />
                </div>
            </ProfileSection>
        );
    }

    return (
        <ProfileSection title="Addresses" Icon={<Edit size={18} className=" hover:scale-110 cursor-pointer" onClick={() => setUpdateAddresses(!updateAddresses)} />}>

            <div className="p-5 grid gap-4">
                {user.addresses.length == 0 ? (
                    <p className="text-sm text-slate-500">No addresses found. Please add an address.</p>
                ) : (
                    user.addresses.map((address, index) => (
                        <AddressCard
                            key={index}
                            address={address}
                            isDefault={defaultAddress === address._id}
                        />
                    ))
                )}
            </div>
        </ProfileSection>
    );
}

function AddressForm({ onCancel }) {
    const [address, setAddress] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        isDefault: false
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const Navigate = useNavigate();
    const AccessToken = useSelector((state) => state.user.accessToken);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e, retried = false) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put("/user/add-address", address, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${AccessToken}`,
                }
            });
            console.log(res.data);
            alert("Address added successfully!");
            if (onCancel) onCancel();
            Navigate(0);
        } catch (err) {
            if (err.response?.status === 401 && !retried) {
                console.log("Access token expired, refreshing...");
                const res = await RefreshToken(err);
                handleSubmit(e, true);
            } else {
                console.log(err);
                alert("Failed to add address. Please try again.");
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" w-full h-full min-h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Add new address</h2>
                    <p className="mt-1 text-sm text-slate-500">Create a new saved address for the profile.</p>
                </div>

                {onCancel ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                ) : null}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
                {[
                    ["label", "Address label", "Home, Office, etc."],
                    ["street", "Street address", "123 Main St"],
                    ["city", "City", "Patna"],
                    ["state", "State", "Bihar"],
                    ["country", "Country", "India"],
                    ["zip", "ZIP / Postal code", "800001"],
                ].map(([name, label, placeholder]) => (
                    <label key={name} className="grid gap-2">
                        <span className="text-sm font-medium text-slate-700">{label}</span>
                        <input
                            name={name}
                            value={address[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
                        />
                    </label>
                ))}
            </div>

            <label className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                    type="checkbox"
                    name="isDefault"
                    checked={address.isDefault}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-slate-700">Set as default address</span>
            </label>

            <div className="mt-6 flex items-center justify-end gap-3">
                {onCancel ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl cursor-pointer border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Back
                    </button>
                ) : null}
                <button
                    type="submit"
                    className="rounded-xl cursor-pointer bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
                >
                    {loading ? "Adding..." : "Add Address"}
                </button>
            </div>
        </form>
    );
}

export default AddressesSection;