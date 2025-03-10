import React from 'react';
import {
	VkIcon,
	TelegramLogo,
	WhatsappLogo,
	DotIcon,
	LineHorizIcon,
} from '@/lib/ui/icons';

export const TopHeader: React.FC = () => {
	return (
		<div className='flex flex-col gap-1 lg:flex-row lg:justify-between'>
			<div className='text-sm font-semibold lg:text-xl'>
				Прокат авто в Новосибирске
			</div>

			<div className='flex h-full items-center justify-between lg:gap-6'>
				<div className='flex gap-3 h-full ml-[2px]'>
					<VkIcon />
					<TelegramLogo />
					<WhatsappLogo />
				</div>

				<a
					className='hidden lg:block lg:underline lg:underline-offset-4 lg:font-bold'
					href='tel:89139132808'
				>
					+7-(913)-913-28-08
				</a>

				<div className='flex items-center gap-2 text-sm lg:text-base'>
					<span>Красный пр-т., 2/1</span>
					<span className='mb-[1px] ml-1 mr-[2px]'>
						<LineHorizIcon />
					</span>
					<span className='mb-[1px] mr-[-3px]'>
						<DotIcon />
					</span>
					<span>Сейчас открыто</span>
				</div>
			</div>
		</div>
	);
};
