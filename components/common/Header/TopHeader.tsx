import React from 'react';
import {
	VkIcon,
	TelegramLogo,
	WhatsappLogo,
	DotIcon,
	LineHorizIcon,
} from '@/shared/icons/';

export const TopHeader: React.FC = () => {
	return (
		<div className='flex flex-col gap-1'>
			<div className='text-sm font-semibold'>
				Прокат авто в Новосибирске
			</div>

			<div className='flex h-full items-center justify-between'>
				<div className='flex gap-3  h-full ml-[2px]'>
					<VkIcon />
					<TelegramLogo />
					<WhatsappLogo />
				</div>

				<div>
					<div className='flex items-center gap-2 text-sm'>
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
		</div>
	);
};
