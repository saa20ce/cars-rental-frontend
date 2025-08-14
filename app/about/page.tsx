import ContactCard from '@/components/common/Cards/ConactCard';
import { WhyUs } from '@/components/common/Cards/WhyUs';
import Breadcrumbs from '@/components/common/Header/Breadcrumbs';
import { fetchBreadcrumbs } from '@/lib/api/fetchBreadcrumbs';
import { fetchWPMetadata } from '@/lib/api/fetchWPMetadata';
import CustomButton from '@/lib/ui/common/Button';
import { ArrowRight } from '@/lib/ui/icons/ArrowRight';
import { AutorealIcon } from '@/lib/ui/icons/AutorealIcon';
import { EuroOilIcon } from '@/lib/ui/icons/EuroOilIcon';
import { GardenIcon } from '@/lib/ui/icons/GardenIcon';
import { GazOilIcon } from '@/lib/ui/icons/GazOilIcon';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata() {
    return await fetchWPMetadata('/about');
}

export default async function AboutPage() {
    const breadcrumbs = await fetchBreadcrumbs('/about');
    return (
        <>
            <Breadcrumbs crumbs={breadcrumbs} />
            <section className="flex flex-col-reverse lg:flex-row gap-6  pb-[42px] lg:pb-[68px]  border-b border-[#284B63B2]">
                <div className="relative lg:w-1/2 rounded-[20px] overflow-hidden min-h-[82px] flex justify-center items-center">
                    <div className="lg:absolute top-5 left-5 z-[2] flex gap-8 lg:gap-[32px] text-center">
                        <dl className="bg-[#F6F6F60D] lg:bg-[#142632AD] rounded-full flex flex-col justify-center items-center  min-w-[82px] lg:min-w-[86px] aspect-square">
                            <dt className="text-[16px]/[24px] lg:text-[18px]/[28px] font-bold">
                                5 лет+
                            </dt>
                            <dd className="text-[14px]/[20px] font-medium">
                                на рынке
                            </dd>
                        </dl>
                        <dl className="bg-[#F6F6F60D] lg:bg-[#142632AD] rounded-full flex flex-col justify-center items-center min-w-[82px] lg:min-w-[86px] aspect-square">
                            <dt className="text-[16px]/[24px] lg:text-[18px]/[28px] font-bold">
                                70+
                            </dt>
                            <dd className="text-[14px]/[20px] font-medium">
                                авто
                            </dd>
                        </dl>
                        <dl className="bg-[#F6F6F60D] lg:bg-[#142632AD] rounded-full flex flex-col justify-center items-center min-w-[82px] lg:min-w-[86px] aspect-square">
                            <dt className="text-[16px]/[24px] lg:text-[18px]/[28px] font-bold">
                                5000
                            </dt>
                            <dd className="text-[14px]/[20px] font-medium">
                                клиентов
                            </dd>
                        </dl>
                    </div>
                    <Image
                        fill
                        alt="Фотография офиса Рентасиб"
                        src={'/images/rentasibAbout.webp'}
                        className="contain hidden lg:block"
                    />
                </div>

                <article className="lg:w-1/2 text-[14px]/[20px] lg:text-[16px]/[24px] font-normal pt-6 lg:py-[42px]">
                    <h1 className="text-[24px]/[32px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        О компании «Рентасиб»
                    </h1>
                    <p className=" mb-2 lg:mb-3">
                        Рентасиб – это компания, которая уже более 5 лет
                        предоставляет качественные услуги по аренде автомобилей
                        в Новосибирске.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Мы гордимся своим обновляемым автопарком, который всегда
                        находится в отличном состоянии и готов предоставить вам
                        максимальный комфорт во время поездки.
                    </p>
                    <p className="mb-8 lg:mb-9">
                        В Рентасиб мы гарантируем прозрачный договор и честные
                        цены, а также дополнительные услуги, такие как доставка
                        авто и аренда детского кресла или бокса для автомобиля.
                    </p>
                    <CustomButton
                        variant="default"
                        className="font-medium py-[9px] lg:py-2 sm:px-4 w-full sm:w-auto bg-[#3C6E71] rounded-[16px]"
                    >
                        <Link
                            href={'/cars'}
                            className="text-[16px]/[26px] lg:text-[18px]/[30px]"
                        >
                            Перейти в каталог
                        </Link>
                        <ArrowRight className="w-[14px] h-[24] lg:h-[28px] lg:w-[16px] ml-[10px] lg:ml-3" />
                    </CustomButton>
                </article>
            </section>

            <section className="pt-8 pb-[42px] lg:py-[39px] flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-12">
                <h2 className="text-[18x]/[28px] lg:text-[24px]/[32px] font-normal text-[#F6F6F699]">
                    Сотруничество с компаниями:
                </h2>

                <div className="flex items-center justify-center gap-6 lg:gap-10">
                    <EuroOilIcon className="w-[61px] h-[53px] md:w-auto md:h-auto" />
                    <AutorealIcon className="w-[62px] h-[33px] md:w-auto md:h-auto" />
                    <GazOilIcon className="w-[95px] h-[29px] md:w-auto md:h-auto" />
                    <GardenIcon className="w-[70px] h-[37px] md:w-auto md:h-auto" />
                </div>
            </section>

            <section className="py-[42px] lg:py-[68px] relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F6F6F60D] ">
                <div className="max-w-[1260px] px-[16px] xl:px-0 flex flex-col lg:flex-row mx-auto gap-8 lg:gap-6 items-stretch">
                    <article className="lg:w-1/2 flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-normal ">
                        <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                            Качество и клиентоориентированность
                        </h2>
                        <ul className="text-[14px]/[20 px] lg:text-[16px]/[24px] font-medium lg:text-normal space-y-2 lg:space-y-3 list-disc ml-4">
                            <li>
                                Мы всегда стремимся предоставлять нашим клиентам
                                гарантию качества наших услуг.
                            </li>
                            <li>
                                Мы понимаем, что важно четко и понятно прописать
                                все условия аренды в договоре, поэтому у нас
                                всегда прозрачный договор, который четко
                                описывает правила и условия аренды.
                            </li>
                            <li>
                                Мы также обеспечиваем осмотр и техническое
                                обслуживание автомобилей, чтобы гарантировать
                                безопасность и комфорт наших клиентов.
                            </li>
                            <li>
                                Мы гордимся нашими отзывами и стараемся
                                поддерживать репутацию надежного и
                                профессионального автопроката в Новосибирске.
                            </li>
                        </ul>
                    </article>
                    <div className="relative aspect-[3/2] lg:aspect-auto flex-1 lg:w-1/2 w-full mx-auto max-w-[618px] rounded-[20px] overflow-hidden min-h-[82px]">
                        <Image
                            fill
                            alt="Рукопожатие, символизирующее сотрудничество"
                            src={'/images/handshake.webp'}
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <WhyUs />

            <section className="flex flex-col-reverse lg:flex-row gap-6 py-[42px] lg:py-[68px] border-t border-b border-[#284B63B2] items-stretch">
                <div className="relative w-full aspect-[3/2] mx-auto lg:aspect-auto lg:w-1/2 max-w-[618px] rounded-[20px] overflow-hidden flex-1">
                    <Image
                        fill
                        alt="Девушка заключившая договор"
                        src="/images/women.webp"
                        className="object-cover"
                    />
                </div>
                <article className="lg:w-1/2 flex-1 text-[14px]/[20px] lg:text-[16px]/[24px] font-medium lg:font-normal">
                    <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                        Преимущества аренды авто в Рентасиб
                    </h2>
                    <p className=" mb-2 lg:mb-3">
                        Аренда автомобиля в нашем автопарке – это отличный выбор
                        для тех, кто ценит комфорт и свободу передвижения. Наша
                        компания предлагает только новые автомобили, что
                        гарантирует безопасность и удобство во время поездки.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        При этом мы стараемся держать наши цены приемлемыми для
                        всех клиентов, не снижая качество предоставляемых услуг.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Прозрачный договор, который мы заключаем с клиентами,
                        позволяет избежать недоразумений и неожиданных
                        дополнительных расходов.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Кроме того, мы готовы предоставить круглосуточную
                        поддержку в случае возникновения каких-либо проблем на
                        дороге.
                    </p>
                    <p className="mb-2 lg:mb-3">
                        Мы также работаем с иностранными клиентами, что
                        позволяет им чувствовать себя уверенно в новом городе.
                    </p>
                    <p>
                        И в случае поломки автомобиля мы готовы предоставить
                        подменный автомобиль, чтобы не испортить ваш отпуск или
                        деловую поездку.
                    </p>
                </article>
            </section>

            <ContactCard
                children={
                    <>
                        <h2 className="text-[20px]/[28px] lg:text-[30px]/[36px] font-bold mb-5 lg:mb-6">
                            Наши контакты:
                        </h2>
                        <ul className="text-[14px]/[20px] lg:text-[18px]/[28px] font-medium space-y-[10px] lg:space-y-3 list-disc ml-4">
                            <li>
                                Позвоните (номер на сайте) для консультации.
                            </li>
                            <li>Напишите на почту – ответ в течение часа.</li>
                            <li>
                                Оставьте заявку на аренду через форму на сайте.
                            </li>
                        </ul>
                    </>
                }
            />
        </>
    );
}
