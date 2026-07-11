import { motion } from "framer-motion";

export default function CategoryCard({
    Icon,
    Label,
    Active,
    OnClick
}) {
    return (
        <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={OnClick}
            className={`
                border border-gray-300 rounded-2xl p-5
                flex flex-col items-center gap-3 text-gray-800
                transition-all duration-300 cursor-pointer overflow-hidden

                ${Active
                    ? "bg-teal-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white"
                }
            `}
        >
            <Icon size={28} />
            <span>{Label}</span>
        </motion.button>
    );
}