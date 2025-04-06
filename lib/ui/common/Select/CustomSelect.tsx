'use client';

import { ConfigProvider, Select, SelectProps } from 'antd';
import { ChevronDownIcon } from '@/lib/ui/icons';
import './styles.css'

export interface CustomSelectProps extends SelectProps<any> { }

export const CustomSelect: React.FC<CustomSelectProps> = ({ ...rest }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorBgBase: '#284152',

				},
				components: {
					Select: {
						selectorBg: '#f6f6f638',
						activeBorderColor: '#f6f6f647',
						hoverBorderColor: '#f6f6f647',
						colorBorder: '#f6f6f647',
						colorTextPlaceholder: '#f6f6f666',
						borderRadius: 10,
						fontSizeIcon: 18,
						fontFamily: '"lato", "lato Fallback"',
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