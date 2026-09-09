This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

pm2 starting

```bash
pm2 list
#
pm2 start npm -- start
#
pm2 stop <id|name>
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

### WordPress cache

WordPress GET requests use the Next.js Data Cache for 24 hours, including in
development. The minimum TTL for cached WordPress/Django reads is 86400 seconds,
including per-request overrides and environment settings. Set
`WP_CACHE_REVALIDATE_SECONDS` to increase the interval or
`WP_CACHE_DISABLED=true` to temporarily bypass the data cache, then restart the
server. Car prices and WordPress options use this interval too; published edits
may remain stale until revalidation completes after the interval expires.

Media has a separate 30-day cache (`WP_MEDIA_CACHE_REVALIDATE_SECONDS`). Form
submissions are not cached. An explicit `cache: 'no-store'` or `revalidate: 0`
on a WordPress request bypasses caching. Production Docker builds retain their
per-build cache key; development uses a stable key across server restarts.
Browser hard refreshes or DevTools with caching disabled can still bypass the
Next.js development cache.

### Принудительное обновление кэша

Укажите случайный серверный `CACHE_REFRESH_SECRET` (не менее 32 случайных байт)
в `.env.production` и пересоздайте контейнер. Не используйте префикс `NEXT_PUBLIC_`.
Ключ не хранится в Git и не передаётся в URL.

Для локального dev-контейнера:

```powershell
docker compose -f docker-compose.dev.yml exec -T frontend-dev node scripts/refresh-cache.mjs
```

Для production после сборки нового образа и настройки секрета:

```sh
docker compose exec -T frontend node scripts/refresh-cache.mjs
```

Команда отправляет защищённый POST `/api/cache/refresh` с `action: "invalidate"`,
дожидается сброса, затем получает все страницы списка авто через `action: "inventory"`.
После этого загружает главную, каталог и страницу каждого авто, по две одновременно.
Это прогревает реальные запросы страниц: карточки, цены, опции, таксономии,
похожие авто, SEO и хлебные крошки. Остальные страницы обновляются при посещении.
Ошибки загрузки страниц выводятся в консоль и дают ненулевой код завершения.
Запускайте одну команду обновления за раз.

Отправка форм, ответы с ошибками и управляющий API не кэшируются. Уже загруженные
данные в браузере или внешнем CDN серверная команда не удаляет: обновите страницу,
а при наличии отдельного CDN выполните его очистку. Оригиналы фото и их
оптимизированные варианты отдельно не прогреваются этой командой.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

✅ Тест CI из ветки test.
