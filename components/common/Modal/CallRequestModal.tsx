'use client';

import CustomButton from '@/lib/ui/common/Button';
import { CloseModalBtnIcon } from '@/lib/ui/icons/CloseModalBtnIcon';
import { ConfigProvider, Modal } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

export default function CallRequestModal() {
  const [open, setOpen] = useState(true);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: '#00000000',
            boxShadow: 'none',
          },
        },
      }}
    >
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        onCancel={() => setOpen(false)}
        maskClosable={true}
        width="100vw"
        centered
        style={{ top: 0, left: 0, margin: 0, padding: 0 }}
        styles={{
          mask: {
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          },
          content: {
            display: 'block',
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
        }}
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="py-[28px] px-6 lg:py-[38px] lg:px-9 bg-[#284B63] rounded-[16px] lg:rounded-[32px] w-full max-w-[360px] lg:max-w-[618px] text-[#F6F6F6]">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-[20px]/[28px] lg:text-[24px]/[32px]">
                Заказать звонок
              </h2>
              <button onClick={() => setOpen(false)}>
                <CloseModalBtnIcon className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-[10px]"
            >
              <label className="font-semibold text-[16px]/[24px] lg:text-[18px]/[28px]">
                Фамилия и имя
              </label>
              <input
                className="w-full mt-[10px] lg:mt-3 mb-[14px] lg:mb-4 py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px]"
                type="text"
                placeholder="Иван Иванов"
              />
              <label className="font-semibold text-[16px]/[24px] lg:text-[18px]/[28px]">
                Номер телефона
              </label>
              <input
                type="text"
                placeholder="+79999999999"
                className="w-full mt-[10px] lg:mt-3 mb-[12px] lg:mb-[14px] py-2 px-4 lg:py-[10px] font-normal text-[14px]/[20px] lg:text-[16px]/[24px] bg-[#F6F6F633] rounded-[16px]"
              />
              <p className="font-semibold text-[12px]/[16px] lg:text-[14px]/[20px] text-[#F6F6F699]">
                При нажатии кнопки &quot;Отправить&quot;, я подтверждаю, что
                ознакомлен с условиями и согласен на{' '}
                <Link href="#" className="underline text-[#F6F6F6] ">
                  обработку моих персональных данных
                </Link>
                .
              </p>
              <CustomButton
                variant="default"
                className="p-3 lg:p-[18px] mt-8 lg:mt-9 lg:text-[20px]/[28px]"
                style={{
                  width: '100%',
                }}
              >
                Оставить заявку
              </CustomButton>
            </form>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
