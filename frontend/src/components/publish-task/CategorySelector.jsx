import CategoryCard from "./CategoryCard";
import {
    Wrench,
    Zap,
    Hammer,
    Paintbrush,
    BrushCleaning,
    Trees,
    Briefcase
} from "lucide-react";

export const TaskCategories = [
    {
        label: "Plumber",
        icon: Wrench
    },
    {
        label: "Electrician",
        icon: Zap
    },
    {
        label: "Carpenter",
        icon: Hammer
    },
    {
        label: "Painter",
        icon: Paintbrush
    },
    {
        label: "Cleaner",
        icon: BrushCleaning
    },
    {
        label: "Gardener",
        icon: Trees
    },
    {
        label: "Other",
        icon: Briefcase
    }
];

export default function CategorySelector({
    Value,
    OnChange
}) {
    return (
        <div className="">
            <label className="block mb-2 font-bold uppercase">
                Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    TaskCategories.map(item => (
                        <CategoryCard
                            key={item.label}
                            Icon={item.icon}
                            Label={item.label}
                            Active={Value === item.label}
                            OnClick={() => OnChange(item.label)}
                        />
                    ))
                }
            </div>
        </div >
    );
}