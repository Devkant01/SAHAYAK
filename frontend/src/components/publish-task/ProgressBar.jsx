export default function ProgressBar({
    TaskData
}) {

    let Progress = 0;

    if (TaskData.title) Progress += 30;
    if (TaskData.category) Progress += 30;
    if (TaskData.description) Progress += 30;
    if (TaskData.attachments.length) Progress += 10;

    return (
        <div className="mb-8">

            <div className="flex justify-between mb-2">

                <span>
                    Completion
                </span>

                <span>
                    {Progress}%
                </span>

            </div>

            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">

                <div
                    className="
                        h-full
                        bg-indigo-600
                        transition-all
                        duration-500 rounded-full
                    "
                    style={{
                        width: `${Progress}%`
                    }}
                />

            </div>

        </div>
    );
}