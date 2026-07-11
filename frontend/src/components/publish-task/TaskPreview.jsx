import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import PublishButton from "./PublishButton";


export default function TaskPreview({
    TaskData,
    Loading,
    HandleSubmit
}) {
    const user = useSelector((state) => state.user);
    console.log("TaskData in TaskPreview:", TaskData); // Debugging line to check TaskData
    return (
        <div className="sticky h-fit top-28">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                <div className="bg-teal-600 text-white text-xl p-5 flex justify-between font-bold uppercase">
                    <span>Live Preview</span>
                    <Eye />
                </div>

                <div className="p-6">
                    {
                        TaskData.attachments.length > 0 && (
                            <div className="relative mb-4">
                                <img
                                    src={URL.createObjectURL(TaskData.attachments[0])}
                                    alt="Task Preview"
                                    className="
                    w-full
                    h-56
                    object-cover
                    rounded-xl
                "
                                />

                                {
                                    TaskData.attachments.length > 1 && (
                                        <div
                                            className="
                            absolute
                            bottom-3
                            right-3
                            bg-black/70
                            text-white
                            text-sm
                            px-3
                            py-1
                            rounded-full
                        "
                                        >
                                            +{TaskData.attachments.length - 1} more
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        TaskData.attachments.length === 0 && (
                            <div
                                className="
                h-56
                mb-4
                rounded-xl
                bg-gray-100
                flex
                items-center
                justify-center
                text-gray-400
            "
                            >
                                No Images Uploaded
                            </div>
                        )
                    }

                    <p className="text-lg text-teal-600 mt-2 font-semibold">
                        {
                            TaskData.category ||
                            "Select Category"
                        }
                    </p>

                    <h3 className="font-bold text-2xl mt-2">
                        {
                            TaskData.title ||
                            "Your Task Title Here"
                        }
                    </h3>


                    <p className="text-gray-600 mt-2">
                        {
                            TaskData.description ||
                            "Task description will appear here..."
                        }
                    </p>

                </div>

                <div className="bg-gray-100 p-6 flex justify-between items-center">
                    <span className="text-gray-500">
                        Published By: {user?.credentials?.name || "Anonymous"}
                    </span>
                </div>

            </div>
            <div className=" w-full pt-6">
                <PublishButton
                    Loading={Loading}
                    OnClick={HandleSubmit}
                />
            </div>

        </div>
    );
}