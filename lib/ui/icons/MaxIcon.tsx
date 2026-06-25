import Image from 'next/image';

interface MaxIconProps {
    className?: string;
}

export const MaxIcon = ({ className = '' }: MaxIconProps) => (
    <Image
        className={`${className} h-4 w-4 shrink-0 object-contain lg:h-6 lg:w-6`}
        src="/icons/max-messenger-sign-logo.svg"
        alt="Max"
        width={24}
        height={24}
        priority
        unoptimized
    />
);
