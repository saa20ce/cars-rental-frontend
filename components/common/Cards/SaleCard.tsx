import React from 'react';

interface SaleCardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    link?: string;
}

export const SaleCard: React.FC<SaleCardProps> = ({
    title = 'Скидка 20%',
    description = 'При аренде кроссоверов',
}) => {
    return (
        <article className="sale-card bg-[#3c6e71] bg-[url('https://staged.rentasib.ru/wp-content/uploads/2025/04/223_rectangle.png')] bg-right bg-no-repeat bg-contain text-[#f6f6f6] rounded-3xl overflow-hidden shadow-lg px-4 pt-2 pb-3 flex flex-col">
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm mb-1">{description}</p>
                <span className="bg-[#F6EBD5] text-black px-2 py-1 rounded-xl font-extrabold relative text-sm">
                    От 3-х суток
                </span>
                <span className="bg-[#00000064] text-[#f6f6f6] px-2 py-1 rounded-xl font-semibold ml-[-11px] z-0 inline pl-[16px] rounded-l-none text-sm">
                    До 31.01
                </span>
            </div>
        </article>
    );
};
