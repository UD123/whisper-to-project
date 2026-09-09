# План: структура сайта (Product / Docs / Billing) + настоящий логотип JAKA

## 1. Логотипы JAKA и Dobot (Ecosystem)
- **JAKA**: официальный логотип с профиля JAKA (b2bindustry.net) — красный wordmark JAKA®, 1000×1000 JPG. Обрезать белые поля, векторизовать в чистый SVG (potrace) → заменить самодельный `src/assets/logos/jaka.svg`.
- **Dobot**: официальный SVG с Wikimedia Commons (горизонтальный wordmark, синий #0047BA, viewBox 292×108) — уже скачан. Обрезать лишнее, положить в `src/assets/logos/dobot.svg` вместо текущего.
- Оба уже подключены в `BrandLogo.tsx` — grayscale → цвет при hover сохранится автоматически.
- Проверить рендер в секции 04 Ecosystem.

## 2. Переключатель разделов в шапке
Сейчас: кнопка «Developer Docs» выглядит одинаково на всех страницах, а название не совпадает с разделом («Documentation»).

- Переименовать кнопку в **«Docs»** (EN) — совпадает с разделом, короче для шапки.
- Слева, рядом с логотипом RobotAI, добавить переключатель разделов: **Product · Docs** (segmented control):
  - активный раздел подсвечен (тёмная плашка, как primary-кнопки);
  - на главной активен «Product», на /guide — «Docs»;
  - Navbar получает prop `section: "product" | "docs"`; /guide передаёт "docs", главная — "product".
- Клик по логотипу продолжает вести на главную; «Product» — дополнительный явный путь назад.

## 3. Раздел Billing — заглушка
- Новый маршрут `/billing`: минимальная страница в том же стиле — заголовок «Billing», короткий текст «Раздел в разработке / Coming soon», кнопка назад.
- «Billing» появляется третьим пунктом переключателя разделов (с пометкой «soon» в mono-label).
- Когда будут требования — наполним реальным контентом.

## 4. Технические детали
- Файлы: `src/components/site/Navbar.tsx` (переключатель, активное состояние, переименование кнопки), `src/routes/guide.tsx` и `src/routes/index.tsx` (prop section), `src/i18n/dictionaries.ts` (Docs → en/zh), новый `src/routes/billing.tsx`.
- Активное состояние через TanStack Router (`Link` + `activeProps`), а не ручное сравнение путей.
- Китайская локализация: Docs → 文档, Billing → 账单.

## 5. Проверка
- `bun run build`, затем Playwright: /, /guide, /billing — активный раздел подсвечен, переходы работают, логотип JAKA читаемый, нет ошибок консоли.
