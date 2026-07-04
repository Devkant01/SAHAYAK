import Button from "../Button";

function ProfileActions() {
    return (
        <div className="mt-6 flex flex-wrap gap-3">

            <Button>
                Edit Profile
            </Button>

            <Button variant="outline">
                Logout
            </Button>

            <Button className="bg-red-600 hover:bg-red-700">
                Delete Profile
            </Button>
        </div>
    );
}

export default ProfileActions;