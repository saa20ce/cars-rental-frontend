import { useState } from 'react';

type Tab = {
    key: string;
    label: string;
    children: React.ReactNode;
};

interface SimpleTabsProps {
    tabs: Tab[];
}

export const SimpleTabs = ({ tabs }: SimpleTabsProps) => {
    const [activeKey, setActiveKey] = useState(tabs[0].key);

    return (
        <div className="w-full ">
            <div className="text-[16px]/[24px] xl:text-[18px]/[28px] lg:font-semibold font-medium flex lg:justify-between gap-1 xl:gap-2 mb-4 relative lg:rounded-[20px] lg:border-2 lg:border-[#F6F6F633] lg:p-4">
                {tabs.map((tab) => {
                    const isActive = activeKey === tab.key;

                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveKey(tab.key)}
                            className={`relative px-3 lg:px-4 xl:px-[26px] h-10 lg:h-11 rounded-[12px] lg:rounded-[16px] transition-all duration-200
                                ${
                                    isActive
                                        ? 'bg-[#3C6E71] text-[#f6f6f6]'
                                        : 'bg-transparent text-[#f6f6f6]/60 hover:text-[#f6f6f6] hover:bg-[#f6f6f638]'
                                }
                            `}
                        >
                            {tab.label}
                            {isActive && (
                                <div className="absolute left-0 bottom-0 h-[2px] w-full bg-transparent" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="transition-all duration-300 ease-in-out opacity-100">
                {tabs.map((tab) =>
                    tab.key === activeKey ? (
                        <div key={tab.key} className="animate-expand">
                            {tab.children}
                        </div>
                    ) : null,
                )}
            </div>
        </div>
    );
};
