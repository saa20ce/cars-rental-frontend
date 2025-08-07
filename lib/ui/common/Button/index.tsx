'use client';

import React from 'react';
import { Button, ConfigProvider, ButtonProps } from 'antd';
import type { CSSProperties, ReactNode } from 'react';

type Variant = 'outlined' | 'transparent' | 'default';

interface CustomButtonProps extends Omit<ButtonProps, 'type' | 'variant'> {
    variant?: Variant;
    icon?: ReactNode;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<
    Variant,
    Partial<ButtonProps> & { style?: CSSProperties }
> = {
    outlined: {
        type: 'default',
        ghost: true,
        style: {
            // height: 40,
            // width: 124,
        },
    },
    transparent: {
        style: {
            height: 40,
            background: 'transparent',
            border: '1px solid transparent',
            color: '#f6f6f6',
        },
    },
    default: {
        type: 'primary',
        style: {
            // height: 40,
            background: '#3c6e71',
            border: 'none',
            color: '#f6f6f6',
            // width: '100%',
            // marginTop: 20,
        },
    },
};

export default function CustomButton({
    variant = 'default',
    icon,
    children,
    style,
    className,
    type,
    loading,
    ...rest
}: CustomButtonProps) {
    const variantProps = variantStyles[variant];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        contentFontSize: 16,
                        borderRadius: 12,
                        paddingBlock: 0,
                        paddingInline: 0,
                        fontSize: 16,
                        defaultHoverColor: '#f6f6f6',
                        defaultHoverBorderColor: '#f6f6f6',
                        defaultActiveColor: '#f6f6f6',
                        defaultActiveBorderColor: '#f6f6f6',
                        fontFamily: '"lato", "lato Fallback"',
                    },
                },
            }}
        >
            <Button
                icon={icon}
                {...variantProps}
                className={className}
                style={{
                    boxShadow: 'none',
                    lineHeight: 'normal',
                    height: 'auto',
                    ...variantProps.style,
                    ...style,
                }}
                loading={loading}
                htmlType={type}
                {...rest}
            >
                {children}
            </Button>
        </ConfigProvider>
    );
}
