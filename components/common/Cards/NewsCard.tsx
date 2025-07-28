import Image from 'next/image';

export default function NewsCard({
    title,
    date,
    description,
    image,
}: {
    title: string;
    date: string;
    description: string;
    image: string;
}) {
    return (
        <article className="">
            <img src={image} alt={title} className="" />
            <div className="">
                <h3 className="">
                    {title}
                </h3>
                <p className="">{date}</p>
                <p className="">
                    {description}
                </p>
            </div>
        </article>
    );
}
