import { UploadCloud } from "lucide-react";

export default function AttachmentUploader({
    Files,
    SetFiles
}) {

    const HandleUpload = e => {
        SetFiles([
            ...Files,
            ...Array.from(e.target.files)
        ]);
    };

    return (
        <label className="border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer hover:border-teal-300">
            <UploadCloud size={40} />

            <p className="mt-3">
                Drag & Drop images or <span className="underline text-blue-700 font-semibold">Browse files</span>
            </p>

            <input
                hidden
                multiple
                type="file"
                onChange={HandleUpload}
            />
        </label>
    );
}