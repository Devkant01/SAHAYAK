import React from "react";
import AddressCard from "./AddressCard";
import ProfileSection from "./ProfileSection";

function AddressesSection({
    user
}) {
    if (
        user.role === "worker" &&
        user.address
    ) {
        return (
            <ProfileSection title="Address">

                <div className="p-5">
                    <AddressCard
                        address={
                            user.address
                        }
                    />
                </div>
            </ProfileSection>
        );
    }

    if (
        user.role === "client" &&
        user.addresses?.length > 0
    ) {
        return (
            <ProfileSection title="Addresses">

                <div className="p-5 grid gap-4">
                    {user.addresses.map(
                        (
                            address,
                            index
                        ) => (
                            <AddressCard
                                key={
                                    index
                                }
                                address={
                                    address
                                }
                            />
                        )
                    )}
                </div>
            </ProfileSection>
        );
    }

    return null;
}

export default AddressesSection;