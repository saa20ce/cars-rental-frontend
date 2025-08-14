import { ClockIcon } from '../ui/icons/ClockIcon';
import { DocumentCar } from '../ui/icons/DocumentCar';
import { FamilyIcon } from '../ui/icons/FamilyIcon';
import { GrayPhoneIcon } from '../ui/icons/GrayPhoneIcon';
import { HandshakeAndDocumentIcon } from '../ui/icons/HandshakeAndDocumentIcon';
import { HandshakeSvg } from '../ui/icons/HandshakeSvg';
import { KeyIcon } from '../ui/icons/KeyIcon';
import { ListIcon } from '../ui/icons/ListIcon';
import { MapIcon } from '../ui/icons/MapIcon';
import { MenIcon } from '../ui/icons/MenIcon';
import { PcIcon } from '../ui/icons/PcIcon';
import { RefuelingGunIcon } from '../ui/icons/RefuelingGunIcon';
import { SafeIcon } from '../ui/icons/SafeIcon';
import { SaleIcon } from '../ui/icons/SaleIcon';
import { SertificateIcon } from '../ui/icons/SertificateIcon';
import { SteeringWheelIcon } from '../ui/icons/SteeringWheelIcon';
import { WheelIcon } from '../ui/icons/WheelIcon';

export const additionalServicesItems = [
    {
        key: '1',
        title: 'Доставка авто по городу',
        href: '#',
        src: '/images/servicesImages/1.jpg',
    },
    {
        key: '2',
        title: 'Прокат авто с детским креслом',
        href: '#',
        src: '/images/servicesImages/2.jpg',
    },
    {
        key: '3',
        title: 'Аренда авто без водителя',
        href: '#',
        src: '/images/servicesImages/3.jpg',
    },
    {
        key: '4',
        title: 'Аренда авто с боксом на крышу',
        href: '#',
        src: '/images/servicesImages/4.jpg',
    },
    {
        key: '5',
        title: 'Аренда авто в аэропорту',
        href: '#',
        src: '/images/servicesImages/5.jpg',
    },
];

export const servicesItems = [
    {
        key: '1',
        title: 'Аренда авто для Юридических лиц',
        href: '/services/arenda-avtomobilej-dlya-biznesa',
        src: '/images/servicesImages/1.jpg',
    },
    {
        key: '2',
        title: 'Аренда кроссовера',
        href: '/services/arenda-krossoverov',
        src: '/images/servicesImages/2.jpg',
    },
    {
        key: '3',
        title: 'Аренда внедорожниква',
        href: '/services/arenda-vnedorozhnika',
        src: '/images/servicesImages/3.jpg',
    },
    {
        key: '4',
        title: 'Прокат минивэнов и микроавтобусов',
        href: '/services/prokat-minivenov-i-mikroavtobusov',
        src: '/images/servicesImages/4.jpg',
    },
    {
        key: '5',
        title: 'Аренда авто бизнес-класса',
        href: '/services/arenda-avto-biznes-klassa',
        src: '/images/servicesImages/5.jpg',
    },
    {
        key: '6',
        title: 'Аренда авто комфорт-класса',
        href: '/services/arenda-avto-komfort-klassa',
        src: '/images/servicesImages/6.jpg',
    },
    {
        key: '7',
        title: 'Аренда авто эконом-класса',
        href: '/services/arenda-avto-ekonom-klassa',
        src: '/images/servicesImages/7.jpg',
    },
    {
        key: '8',
        title: 'Аренда авто на месяц',
        href: '/services/arenda-avto-na-mesyacz',
        src: '/images/servicesImages/8.jpg',
    },
    {
        key: '9',
        title: 'Аренда авто на неделю',
        href: '/services/arenda-avto-na-nedelyu',
        src: '/images/servicesImages/9.jpg',
    },
    {
        key: '10',
        title: 'Аренда китайских авто',
        href: 'services/arenda-kitajskih-avto',
        src: '/images/servicesImages/10.jpg',
    },
    {
        key: '11',
        title: 'Аренда премиальных авто',
        href: 'services/arenda-premialnyh-avto',
        src: '/images/servicesImages/11.jpg',
    },
    {
        key: '12',
        title: 'Аренда седанов',
        href: 'services/arenda-sedanov',
        src: '/images/servicesImages/12.jpg',
    },
];

export const infoThreeCardItems = [
    {
        title: (
            <>
                Персональный <br className="hidden lg:block" /> менеджер 24/7
            </>
        ),
        icon: <MenIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: (
            <>
                Оплата по счету <br className="hidden lg:block" /> с НДС 20%
            </>
        ),
        icon: <ListIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: (
            <>
                Электронный <br className="hidden lg:block" /> документооборот
            </>
        ),
        icon: <PcIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const rentalTermsBusinessItems = [
    {
        title: 'Территория - до 1000 км от места выдачи',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Залог 3.000 рублей на 14 дней',
        icon: <SafeIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Стаж от 1 лет, возраст от 30 лет',
        icon: <MenIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Выдача и прием в нерабочие часы - 1000 ₽',
        icon: <ClockIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Увеличенный лимит пробега - до 350 км/сутки',
        icon: <WheelIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: '100% предоплата за весь срок аренды',
        icon: <ListIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Перепробег 15 рублей/км',
        icon: <SteeringWheelIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const rentalTermsEconomItems = [
    {
        title: 'Территория - до 1000 км от места выдачи',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Залог 3.000 рублей на 14 дней',
        icon: <SafeIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Стаж от 3 лет, возраст от 22 лет',
        icon: <MenIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Выдача и прием в нерабочие часы - 1000 ₽',
        icon: <ClockIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Увеличенный лимит пробега - до 400 км/сутки',
        icon: <WheelIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: '100% предоплата за весь срок аренды',
        icon: <ListIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const rentalTermsMinivanItems = [
    {
        title: 'Территория - до 1000 км от места выдачи',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Залог 3–10 тыс. на 14 дней, зависит от микроавтобуса',
        icon: <SafeIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Стаж от 3 лет, возраст от 22 лет',
        icon: <MenIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Выдача и прием в нерабочие часы - 1000 ₽',
        icon: <ClockIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Увеличенный лимит пробега - до 400 км/сутки',
        icon: <WheelIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: '100% предоплата за весь срок аренды',
        icon: <ListIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const infoArendaAvtoBusinessPageItems = [
    {
        title: '5+ лет',
        desc: 'Опыта работы в сфере аренды автомобилей в Новосибирске. За это время создали репутацию надежного партнера, которой дорожим',
        icon: <SertificateIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: '70+ автомобилей',
        desc: 'В нашем автопарке представлены модели от эконом до бизнес-класса, минивэны, внедорожники и кроссоверы.',
        icon: <DocumentCar className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Свежий автопарк',
        desc: 'Большинство автомобилей автопарка - 2023 и 2024 годов выпуска. Все авто оборудованы кондиционером и АККП.',
        icon: <KeyIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Только подготовленные автомобили',
        desc: 'Передаем клиентам всегда чистые и заправленные автомобили. Перед выдачей проводим проверку технического состояния авто.',
        icon: <HandshakeSvg className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'До 400 км',
        desc: 'Передаем клиентам всегда чистые и заправленные автомобили. Перед выдачей проводим проверку технического состояния авто.',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Быстрое оформление',
        desc: 'Оформляем договор без посещения офиса, дистанционно, за 10 минут. В наших договорах - прозрачные и понятные условия без подвохов, звездочек и примечаний мелким шрифтом.',
        icon: <HandshakeAndDocumentIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Страховка на случай ДТП',
        desc: 'Страхуем автомобили по ОСАГО и КАСКО - вам не придется беспокоится о случайных повреждениях авто и царапинах.',
        icon: <ListIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Техническая поддержка 24/7',
        desc: 'Остаемся с вами на связи в любое время дня. При поломке предоставим подменный автомобиль',
        icon: <GrayPhoneIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'НДС',
        desc: 'Работаем с юрлицам и принимаем безналичную оплату',
        icon: <DocumentCar className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const listItemsComfortPage1 = [
    {
        title: 'Выдача авто с полным баком',
        icon: <RefuelingGunIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Работаем и доставляем по городу 24/7/365',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Детское кресло бесплатно',
        icon: <FamilyIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Скидки постоянным клиентам',
        icon: <SaleIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Скидки постоянным клиентам',
        icon: <HandshakeAndDocumentIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const listItemsMonhtlyCarRentalPage1 = [
    {
        title: 'Офис в центре города',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Более 5 лет работы',
        icon: <SertificateIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: '4000+ довольных клиентов',
        icon: <FamilyIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Скидки постоянным клиентам',
        icon: <SaleIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Аренда от 1800 рублей',
        icon: <HandshakeAndDocumentIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Обновляемый автопарк из 70 автомобилей   ',
        icon: <KeyIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const listItemsMonhtlyCarRentalPage2 = [
    {
        title: 'Выдача авто с полным баком',
        icon: <RefuelingGunIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Работаем и доставляем по городу 24/7/365',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Детское кресло бесплатно',
        icon: <FamilyIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Скидки постоянным клиентам',
        icon: <SaleIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Аренда автобокса 300 руб',
        icon: <ListIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];

export const listItemsComfortPage2 = [
    {
        title: 'Офис в центре города',
        icon: <MapIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Выдача авто с полным баком',
        icon: <RefuelingGunIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: '4000+ довольных клиентов',
        icon: <FamilyIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Скидки постоянным клиентам',
        icon: <SaleIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
    {
        title: 'Аренда от 1800 рублей',
        icon: <HandshakeAndDocumentIcon className="w-9 h-8 lg:w-12 lg:h-12" />,
    },
];
