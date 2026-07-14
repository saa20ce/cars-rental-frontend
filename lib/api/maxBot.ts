type MaxBotField = {
    label: string;
    value?: unknown;
};

type MaxBotNotification = {
    title: string;
    fields: MaxBotField[];
};

const DEFAULT_MAX_BOT_API_URL = 'https://platform-api2.max.ru/messages';
const MAX_MESSAGE_LIMIT = 4000;

const getTrimmedEnv = (name: string) => process.env[name]?.trim();

const stringifyValue = (value: unknown) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    return JSON.stringify(value);
};

const trimMessage = (message: string) => {
    if (message.length <= MAX_MESSAGE_LIMIT) return message;

    return `${message.slice(0, MAX_MESSAGE_LIMIT - 3)}...`;
};

const buildMessageText = ({ title, fields }: MaxBotNotification) => {
    const lines = [
        `Новая заявка: ${title}`,
        `Время: ${new Date().toLocaleString('ru-RU', {
            timeZone: 'Asia/Novosibirsk',
        })}`,
        '',
        ...fields
            .map(({ label, value }) => {
                const stringValue = stringifyValue(value);

                if (!stringValue) return null;

                return `${label}: ${stringValue}`;
            })
            .filter((line): line is string => Boolean(line)),
    ];

    return trimMessage(lines.join('\n'));
};

const getMaxBotUrl = () => {
    const chatId = getTrimmedEnv('MAX_BOT_CHAT_ID');
    const userId = getTrimmedEnv('MAX_BOT_USER_ID');

    if (!chatId && !userId) return null;

    const apiUrl = getTrimmedEnv('MAX_BOT_API_URL') ?? DEFAULT_MAX_BOT_API_URL;
    const url = new URL(apiUrl);

    if (chatId) {
        url.searchParams.set('chat_id', chatId);
    } else if (userId) {
        url.searchParams.set('user_id', userId);
    }

    return url;
};

export const sendMaxBotNotification = async (
    notification: MaxBotNotification,
) => {
    try {
        const token = getTrimmedEnv('MAX_BOT_TOKEN');
        const url = getMaxBotUrl();

        if (!token || !url) return;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: buildMessageText(notification),
                notify: true,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');

            throw new Error(
                `MAX bot request failed with status ${response.status}${errorText ? `: ${errorText}` : ''}`,
            );
        }
    } catch (error) {
        console.error('MAX bot notification error:', error);
    }
};
