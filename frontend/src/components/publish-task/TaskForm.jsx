import TaskTitleField from "./TaskTitleField";
import CategorySelector from "./CategorySelector";
import DescriptionField from "./DescriptionField";
import AttachmentUploader from "./AttachmentUploader";

export default function TaskForm({
    TaskData,
    UpdateField
}) {
    return (
        <div className="space-y-8 bg-transparent p-8 rounded-2xl shadow-md">

            <TaskTitleField
                Value={TaskData.title}
                OnChange={value =>
                    UpdateField("title", value)
                }
            />

            <CategorySelector
                Value={TaskData.category}
                OnChange={value =>
                    UpdateField("category", value)
                }
            />

            <DescriptionField
                Value={TaskData.description}
                OnChange={value =>
                    UpdateField("description", value)
                }
            />

            <AttachmentUploader
                Files={TaskData.attachments}
                SetFiles={value =>
                    UpdateField("attachments", value)
                }
            />

        </div>
    );
}