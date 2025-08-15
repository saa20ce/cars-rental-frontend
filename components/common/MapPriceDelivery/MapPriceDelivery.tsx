'use client';

export default function MapPriceDelivery() {
    return (
        <div className="mb-8 lg:mb-9 rounded-[24px] lg:rounded-32px overflow-hidden">
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A06132803174b5b9ae0ebc976b505060bfe6d698d1f26b11a506bf8486ebed62c&width=100%25&height=400&lang=ru_RU&scroll=true"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
            ></iframe>
        </div>
    );
}
