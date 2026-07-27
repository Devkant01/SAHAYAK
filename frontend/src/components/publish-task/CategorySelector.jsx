import CategoryCard from "./CategoryCard";
import { WorkerCategories } from "../../constants/workerCategories";


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
                    Object.values(WorkerCategories).map(item => (
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