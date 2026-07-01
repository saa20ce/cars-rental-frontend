export type NewsDetail = {
    content: { rendered: string };
    title: { rendered: string };
    date: string;
};

export type WPPost = {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: [
            {
                source_url: string;
            },
        ];
    };
};

export type WPPostDetails = WPPost & NewsDetail;
