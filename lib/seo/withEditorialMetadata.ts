import type { Metadata } from 'next';

export function withEditorialMetadata(
    wordpressMetadata: Metadata,
    title: string,
    description: string,
): Metadata {
    return {
        ...wordpressMetadata,
        title,
        description,
        openGraph: {
            ...wordpressMetadata.openGraph,
            title,
            description,
        },
        twitter: {
            ...wordpressMetadata.twitter,
            title,
            description,
        },
    };
}
