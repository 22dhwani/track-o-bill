import React from 'react';

interface GroupCardProps {
    title: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ title }) => {
    const sampleExpenses = [
        { name: 'Samosa', amount: '₹60', user: 'Ansh' },
        { name: 'Cold Drinks', amount: '₹120', user: 'Aarhan' },
        { name: 'Ice Cream', amount: '₹100', user: 'Ansh' },
    ];

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="space-y-2">
                {sampleExpenses.map((expense, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row justify-between items-center sm:p-2 bg-purple-50 rounded-md"
                    >
                        <div className="mb-2 sm:mb-0">
                            <p className="font-medium text-sm sm:text-base">{expense.name}</p>
                            <p className="text-xs text-gray-500">{expense.user}</p>
                        </div>
                        <span className="bg-pink-200 text-pink-600 px-2 py-1 rounded-full text-xs sm:text-sm">
                            {expense.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupCard;
