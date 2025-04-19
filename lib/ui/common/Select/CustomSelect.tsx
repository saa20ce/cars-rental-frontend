'use client';

import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';
import { ChevronDownIcon } from '@/lib/ui/icons';
import './styles.css'

export type CustomSelectProps = SelectProps<unknown>;

export const CustomSelect: React.FC<CustomSelectProps> = ({ ...rest }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorBgElevated: '#284152',
				},
				components: {
					Select: {
						selectorBg: '#f6f6f638',
						activeBorderColor: '#f6f6f6',
						hoverBorderColor: '#f6f6f647',
						colorBorder: '#f6f6f647',
						colorTextPlaceholder: '#f6f6f666',
						borderRadius: 12,
						fontSizeIcon: 18,
						fontFamily: '"lato", "lato Fallback"',
						colorText: '#f6f6f6',
						optionActiveBg: '#516573',
						optionPadding: '8px 16px',
						optionFontSize: 18,
						borderRadiusSM: 8,
						optionSelectedBg: '#516573',
					},
				},
			}}
		>
			<Select
				className='flex items-center lg:h-[44px!important]'
				suffixIcon={<ChevronDownIcon />}
				style={{
					width: '50%',
					height: 36,
				}}
				{...rest}
			/>
		</ConfigProvider>
	);
};