type JsonLdProps = {
    data: unknown;
    id?: string;
};

function serializeJsonLd(data: unknown) {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function JsonLd({ data, id }: JsonLdProps) {
    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
    );
}
