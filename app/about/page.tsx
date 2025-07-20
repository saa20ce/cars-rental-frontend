import { WhyUs } from '@/components/common/Cards/WhyUs';
import YandexMap from '@/components/common/YandexMap';
import { ArrowRight } from '@/lib/ui/icons/ArrowRight';
import { AutorealIcon } from '@/lib/ui/icons/AutorealIcon';
import { EmailIcon } from '@/lib/ui/icons/EmailIcon';
import { EuroOilIcon } from '@/lib/ui/icons/EuroOilIcon';
import { GardenIcon } from '@/lib/ui/icons/GardenIcon';
import { GazOilIcon } from '@/lib/ui/icons/GazOilIcon';
import { MarkerIcon } from '@/lib/ui/icons/MarkerIcon';
import { MobileIcon } from '@/lib/ui/icons/MobileIcon';
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <>
      <section className="flex flex-col-reverse lg:flex-row gap-6  pb-[42px] lg:pb-[68px]  border-b border-[#284B63B2]">
        <div className="relative lg:w-1/2 rounded-[20px] overflow-hidden min-h-[82px] flex justify-center items-center">
          <div className="lg:absolute top-5 left-5 z-[2] flex gap-8 lg:gap-[32px] text-center">
            <div className="bg-[#F6F6F60D] lg:bg-[#142632AD] rounded-full flex flex-col justify-center items-center  min-w-[82px] lg:min-w-[86px] aspect-square">
              <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-bold">
                5 лет+
              </span>
              <span className="text-[14px]/[20px] font-medium ">на рынке</span>
            </div>
            <div className="bg-[#F6F6F60D] lg:bg-[#142632AD] rounded-full flex flex-col justify-center items-center min-w-[82px] lg:min-w-[86px] aspect-square">
              <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-bold">
                70+
              </span>
              <span className="text-[14px]/[20px] font-medium ">авто</span>
            </div>
            <div className="bg-[#F6F6F60D] lg:bg-[#142632AD] rounded-full flex flex-col justify-center items-center min-w-[82px] lg:min-w-[86px] aspect-square">
              <span className="text-[16px]/[24px] lg:text-[18px]/[28px] font-bold">
                5000
              </span>
              <span className="text-[14px]/[20px] font-medium ">клиентов</span>
            </div>
          </div>
          <Image
            fill
            alt=""
            src={'/images/rentasibAbout.jpg'}
            className="contain hidden lg:block"
          />
        </div>
        <div className="lg:w-1/2 text-[14px]/[20px] lg:text-[16px]/[24px] font-normal pt-6 lg:py-[42px]">
          <h2 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
            О компании «Рентасиб»
          </h2>
          <p className=" mb-2 lg:mb-3">
            Рентасиб – это компания, которая уже более 5 лет предоставляет
            качественные услуги по аренде автомобилей в Новосибирске.
          </p>
          <p className="mb-2 lg:mb-3">
            Мы гордимся своим обновляемым автопарком, который всегда находится в
            отличном состоянии и готов предоставить вам максимальный комфорт во
            время поездки.
          </p>
          <p className="mb-8 lg:mb-9">
            В Рентасиб мы гарантируем прозрачный договор и честные цены, а также
            дополнительные услуги, такие как доставка авто и аренда детского
            кресла или бокса для автомобиля.
          </p>
          <button className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium py-[9px] lg:py-2 sm:px-4 w-full sm:w-auto bg-[#3C6E71] rounded-[16px]">
            Перейти в каталог{' '}
            <ArrowRight className="w-[14px] h-[24] lg:h-[28px] lg:w-[16px] ml-[10px] lg:ml-4" />
          </button>
        </div>
      </section>

      <section className="pt-8 pb-[42px] lg:py-[39px] flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-12">
        <div className="flex items-center justify-center">
          <h2 className="text-[18x]/[28px] lg:text-[24px]/[32px] font-normal text-[#F6F6F699]">
            Сотруничество с компаниями:
          </h2>
        </div>

        <div className="flex items-center justify-center gap-6 lg:gap-10">
          <EuroOilIcon className="w-[61px] h-[53px] md:w-auto md:h-auto" />
          <AutorealIcon className="w-[62px] h-[33px] md:w-auto md:h-auto" />
          <GazOilIcon className="w-[95px] h-[29px] md:w-auto md:h-auto" />
          <GardenIcon className="w-[70px] h-[37px] md:w-auto md:h-auto" />
        </div>
      </section>

      <section className="py-[42px] lg:py-[68px] relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D] ">
        <div className="max-w-[1260px] px-[16px] xl:px-0 flex flex-col lg:flex-row mx-auto gap-8 lg:gap-6 items-center">
          <div className="lg:w-1/2 text-[14px]/[20px] lg:text-[16px]/[24px] font-normal ">
            <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
              Качество и клиентоориентированность
            </h2>
            <ul className="text-[14px]/[20 px] lg:text-[16px]/[24px] font-medium lg:text-normal space-y-2 lg:space-y-3 list-disc ml-4">
              <li>
                Мы всегда стремимся предоставлять нашим клиентам гарантию
                качества наших услуг.
              </li>
              <li>
                Мы понимаем, что важно четко и понятно прописать все условия
                аренды в договоре, поэтому у нас всегда прозрачный договор,
                который четко описывает правила и условия аренды.
              </li>
              <li>
                Мы также обеспечиваем осмотр и техническое обслуживание
                автомобилей, чтобы гарантировать безопасность и комфорт наших
                клиентов.
              </li>
              <li>
                Мы гордимся нашими отзывами и стараемся поддерживать репутацию
                надежного и профессионального автопроката в Новосибирске.
              </li>
            </ul>
          </div>
          <div className="relative lg:w-1/2 lg:max-h-[312px] aspect-[3/2] w-full mx-auto max-w-[618px] rounded-[20px] overflow-hidden min-h-[82px] flex justify-center items-center">
            <Image
              fill
              alt=""
              src={'/images/handshake.png'}
              className="contain "
            />
          </div>
        </div>
      </section>

      <section className="pb-[42px] lg:pb-[68px]  border-b border-[#284B63B2]">
        <WhyUs />
      </section>

      <section className="flex flex-col-reverse lg:flex-row gap-6  py-[42px] lg:py-[68px]  border-b border-[#284B63B2] items-center">
        <div className="relative w-full lg:w-1/2 max-w-[618px] rounded-[20px] aspect-[3/2] lg: aspect-[4/3] max-h-[456px] h-full overflow-hidden flex justify-center items-center">
          <Image fill alt="" src={'/images/women.png'} className="contain" />
        </div>
        <div className="lg:w-1/2 text-[14px]/[20px] lg:text-[16px]/[24px] font-medium lg:font-normal">
          <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
            Преимущества аренды авто в Рентасиб
          </h2>
          <p className=" mb-2 lg:mb-3">
            Аренда автомобиля в нашем автопарке – это отличный выбор для тех,
            кто ценит комфорт и свободу передвижения. Наша компания предлагает
            только новые автомобили, что гарантирует безопасность и удобство во
            время поездки.
          </p>
          <p className="mb-2 lg:mb-3">
            При этом мы стараемся держать наши цены приемлемыми для всех
            клиентов, не снижая качество предоставляемых услуг.
          </p>
          <p className="mb-2 lg:mb-3">
            Прозрачный договор, который мы заключаем с клиентами, позволяет
            избежать недоразумений и неожиданных дополнительных расходов.
          </p>
          <p className="mb-2 lg:mb-3">
            Кроме того, мы готовы предоставить круглосуточную поддержку в случае
            возникновения каких-либо проблем на дороге.
          </p>
          <p className="mb-2 lg:mb-3">
            Мы также работаем с иностранными клиентами, что позволяет им
            чувствовать себя уверенно в новом городе.
          </p>
          <p>
            И в случае поломки автомобиля мы готовы предоставить подменный
            автомобиль, чтобы не испортить ваш отпуск или деловую поездку.
          </p>
        </div>
      </section>

      <section className="flex lg:gap-6 pt-[42px] lg:pt-[68px]">
        <div className="w-full lg:max-w-[730px]">
          <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
            Наши контакты:
          </h2>
          <ul className="text-[16px]/[24px] lg:text-[18px]/[28px] font-medium space-y-[10px] lg:space-y-3 list-disc ml-4">
            <li>Позвоните (номер на сайте) для консультации.</li>
            <li>Напишите на почту – ответим в течение нескольких часов.</li>
            <li>Оставьте заявку на аренду авто через форму на сайте.</li>
          </ul>
          <div className="w-full text-[16px]/[24px] lg:text-[18px]/[28px] font-bold mt-8 mt-9 flex gap-4 lg:gap-5 flex-col lg:flex-row ">
            <div className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow">
              <MobileIcon className="w-9 lg:w-[48px]" />
              <span className='text-nowrap'>+ 7(913)-913-28-08</span>
            </div>
            <div className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center  lg:max-w-[230px] lg:justify-between lg:flex-col lg:gap-5 gap-3 grow">
              <EmailIcon className="w-9 lg:w-[48px]" />
              <span>rentasib54@gmail.com</span>
            </div>
            <div className="rounded-[12px] bg-[#F6F6F60D] px-6 py-5 lg:px-2 flex items-center lg:max-w-[230px] lg:justify-center lg:flex-col lg:gap-5 gap-3 grow">
              <MarkerIcon className="w-9 h-9 lg:h-[48px]" />
              <span className='text-nowrap'>Красный просп., 2/1</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex grow">
          <div className="w-full max-w-[506px] min-w-[380px] aspect-[5/3] relative">
            <a
              href="https://2gis.ru/novosibirsk/firm/70000001038917532"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full rounded-[12px] overflow-hidden shadow-lg"
            >
              <img
                src="https://static.maps.2gis.com/1.0?center=82.9256,55.0153&zoom=15&size=600,400&markers=82.9256,55.0153"
                alt="Карта"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
