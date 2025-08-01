import ContactCard from '@/components/common/Cards/ConactCard';
import ContactForm from '@/components/common/Form/ContactForm';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import Image from 'next/image';


export default async function ContactsPage() {
    const breadcrumbs = await fetchBreadcrumbs('/contacts');
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <ContactCard
                children={
                    <>
                        <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                            Режим работы
                        </h2>
                        <dl className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium space-y-[10px] lg:space-y-3">
                            <div className="flex text-[14px]/[20px] lg:text-[18px]/[28px] font-medium gap-2">
                                <dt>Бронирование:</dt>
                                <dd>9:00 - 22:00</dd>
                            </div>
                            <div className="flex text-[14px]/[20px] lg:text-[18px]/[28px] font-medium gap-2">
                                <dt>Офис:</dt>
                                <dd>9:00 - 22:00</dd>
                            </div>
                        </dl>
                        <p className="text-[14px]/[20px] lg:text-[18px]/[28px] font-medium mt-[10px] lg:mt-3">
                            Круглосуточная доставка автомобилей от 2000 рублей.
                        </p>
                    </>
                }
            />
            <section className="flex  gap-6 py-[42px] lg:py-[68px] border-t border-b border-[#284B63B2] items-stretch mt-[42px] lg:mt-[68px]">
                <div className="relative hidden lg:block aspect-auto w-1/2 rounded-[20px] overflow-hidden flex-1">
                    <Image
                        fill
                        alt="Рукопожатие, символизирующее сотрудничество"
                        src={'/images/handshake.webp'}
                        className="object-cover"
                    />
                </div>
                <article className="lg:w-1/2 max-w-[507px] flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-medium lg:font-normal">
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        Реквизиты:
                    </h2>
                    <h3 className='mb-[10px] sm:mb-3 text-[16px]/[24px] sm:text-[18px]/[28px] font-semibold'>
                        ООО «РЕНТАСИБ»
                    </h3>
                    <dl className='flex flex-col gap-[10px] lg:gap-3'>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>Юр. адрес:</dt>
                            <dd>РФ, 630102, г. Новосибирск, ул. Инская 3, к.18</dd>
                        </div>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>ИНН:</dt>
                            <dd>5405065213</dd>
                        </div>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>КПП:</dt>
                            <dd>540501001</dd>
                        </div>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>ОГРН:</dt>
                            <dd>1215400028238</dd>
                        </div>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>Р/счет:</dt>
                            <dd>№ 40702810013410001297</dd>
                        </div>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>Банк:</dt>
                            <dd>ФИЛИАЛ “ЦЕНТРАЛЬНЫЙ” БАНКА ВТБ (ПАО)</dd>
                        </div>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>Кор. счет:</dt>
                            <dd>30101810145250000411</dd>
                        </div>
                        <div className='flex flex-col text-[16px]/[24px] lg:text-[18px]/[28px] font-semibold gap-[6px] sm:gap-2 sm:flex-row'>
                            <dt className='text-[#F6F6F699]'>БИК:</dt>
                            <dd>044525411</dd>
                        </div>
                    </dl>
                </article>
            </section>
            
            <ContactForm />
            
        </>
    );
}
