'use client';

import { useState } from 'react';
import CallRequestModal from './CallRequestModal';
import CustomButton from '@/lib/ui/common/Button';
import { PhoneIcon, PhoneIconDefault } from '@/lib/ui/icons';

export default function ModalTrigger({
  isHeader = false,
  className = ''
}: {
  isHeader?: boolean;
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CustomButton
        variant="outlined"
        icon={<PhoneIconDefault />}
        className={className}
        style={isHeader ? { height: 40, width: 169 } : {}}
        onClick={() => setIsOpen(true)}
      >
        Заказать звонок
      </CustomButton>
      {isHeader && (
        <button onClick={() => setIsOpen(true)} className="xl:hidden">
          <PhoneIcon />
        </button>
      )}

      <CallRequestModal isOpen={isOpen} setIsOpenAction={setIsOpen} />
    </>
  );
}

