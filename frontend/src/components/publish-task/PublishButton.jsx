import { ArrowRight } from "lucide-react";
import Button from "../Button";

export default function PublishButton({
    Loading,
    OnClick
}) {
    return (
        <Button
            disabled={Loading}
            onClick={OnClick}
            className="
                w-full
                py-4
                rounded-2xl
                text-white
                flex
                justify-center
                items-center
                gap-1
                bg-teal-600
                hover:bg-teal-700
                transition-all
                uppercase font-bold
            "
        >
            {
                Loading
                    ? "Publishing..."
                    : (
                        <>
                            Publish Task
                            <ArrowRight />
                        </>
                    )
            }
        </Button>
    );
}