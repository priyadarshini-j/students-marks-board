import { useAppSelector } from "../../../hooks/redux";
import { selectStudentStats } from "../../students/studentsSlice";

function StateCards() {
    const { total, passed, failed, average } = useAppSelector(selectStudentStats);

    const cards = [
        { title: "Total Students", value: total, color: "text-gray-900" },
        { title: "Passed", value: passed, color: "text-green-600" },
        { title: "Failed", value: failed, color: "text-red-600" },
        { title: "Average", value: `${average}%`, color: "text-gray-900" },
    ];

    return (
        <div className="mx-auto my-6 grid w-full max-w-6xl grid-cols-1 gap-9  px-4 sm:grid-cols-2 sm:gap-5 sm:px-6 lg:grid-cols-4 lg:my-12">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="flex min-h-[90px] flex-col justify-center rounded-[15px] border border-[#acabab] bg-white px-5 py-3"
                >
                    <h3 className="text-base font-medium text-[#353434] sm:text-lg lg:text-[20px]">
                        {card.title}
                    </h3>

                    <h2 className={`text-2xl font-extrabold ${card.color}`}>
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default StateCards;