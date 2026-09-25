# Agri Field Monitoring

Тестове завдання: веб-застосунок для управління сільськогосподарськими полями, відображення GeoJSON-полів на Leaflet-карті та роботи з моніторинговими точками.

## Функціональність

- інтерактивна Leaflet-карта на OpenStreetMap;
- 4 mock-поля у GeoJSON-подібному форматі;
- перемикання активного поля зі списку або кліком на полі;
- візуальне виділення активного поля;
- базова інформація про поле: назва, культура, площа;
- додавання моніторингової точки тільки в межах активного поля;
- координати WGS 84 + MGRS, який обчислюється на frontend;
- типи: проба ґрунту, шкідники, хвороби рослин, інше;
- опціональний опис і автоматична дата створення;
- різні маркери залежно від типу;
- видалення точок;
- глобальний список усіх доданих точок з пошуком за описом, фільтрацією за типом і сортуванням за датою;
- адаптивний layout для desktop/tablet;
- базова error boundary та повідомлення для некоректного кліку поза активним полем;
- unit tests для геометричної перевірки і селекторів.

## Технології

- React 18 + TypeScript (strict)
- Vite
- React Leaflet + Leaflet
- Zustand
- Tailwind CSS
- `mgrs` для перетворення WGS 84 -> MGRS
- Vitest

## Запуск

Потрібен Node.js 20.19+ (відповідно до обраної версії Vite).

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Tests:

```bash
npm run test
```

## Архітектурні рішення

Проєкт розділено за відповідальністю:

- `data/` — статичні mock-дані полів;
- `domain/` — доменні моделі та чисті селектори;
- `services/` — геометрія і конвертація координат;
- `store/` — глобальний Zustand state і actions;
- `hooks/` — зв'язування state з derived data;
- `components/fields/` — UI роботи з полями;
- `components/map/` — Leaflet-specific компоненти;
- `components/points/` — створення, фільтрація та відображення точок;
- `components/ui/` — повторно використовувані UI primitives.

### Чому Zustand

Для цього масштабу Zustand дає простий передбачуваний store без boilerplate Redux. В store зберігається тільки глобальний application state: активне поле і створені точки. Локальний UI state — draft координат, повідомлення, значення форми і фільтри — залишається локальним у компонентах.

### SOLID

**S — Single Responsibility**

Карта відповідає за відображення і map interactions, форма — за введення даних, store — за state transitions, `geometryService` — за перевірку координат, `coordinateService` — за MGRS/форматування.

**O — Open/Closed**

Типи точок описані централізовано в `POINT_TYPE_OPTIONS`. Новий тип можна додати в одному місці без переписування map/list/form логіки.

**L — Liskov Substitution**

Компоненти працюють через стабільні domain types і callback contracts; конкретний UI-компонент можна замінити сумісною реалізацією без зміни очікуваної поведінки батьківського коду.

**I — Interface Segregation**

Props-інтерфейси вузькі: компоненти отримують тільки дані та callback-и, які реально використовують.

**D — Dependency Inversion**

UI не містить алгоритмів геометрії або MGRS-конвертації. Він залежить від маленьких сервісних функцій/контрактів, тому ці деталі можна замінити або тестувати окремо.

## Важливі рішення

### 1. Жодних array index як React key

Усі списки використовують стабільні доменні id/value:

- `field.properties.id` для полів;
- `point.id` через `crypto.randomUUID()` для точок;
- `option.value` для типів точок.

### 2. Перевірка, що точка всередині поля

Перед відкриттям форми клік перевіряється чистою функцією `isPositionInsideField` через ray-casting алгоритм. Це не залежить від Leaflet, тому логіку легко тестувати.

### 3. Координати

Leaflet працює з `[lat, lng]`, а GeoJSON і бібліотека `mgrs` очікують `[lng, lat]`. Перетворення відбувається тільки у відповідних boundary-функціях, щоб не змішувати формати в UI.

### 4. Derived data не зберігається в store

Відфільтрований список точок не дублюється у Zustand. Він обчислюється через чистий selector `selectVisiblePoints`, що зменшує ризик розсинхронізації state.

### 5. Mock backend

Backend навмисно відсутній. Дані живуть у пам'яті згідно з вимогами завдання. Перезавантаження сторінки очищає створені точки.

## Обґрунтовані припущення

- GeoJSON тестових полів — Polygon, MultiPolygon не потрібен для цього scope.
- Клік по неактивному полі вибирає його, але не створює точку. Для створення користувач робить окремий клік всередині вже активного поля.
- MGRS генерується з точністю `5`, тобто приблизно до 1 метра.
- Панель управління показує всі створені точки; активне поле впливає на додавання точки та відображення точок на карті.
- Видалення відбувається одразу, без confirmation modal, бо вимога підтвердження не задана.

## Що б я додала з більшим часом

- persistence через API або IndexedDB;
- optimistic mutations + server error states;
- confirmation/undo для видалення;
- editing monitoring points;
- accessibility audit і keyboard-first map alternatives;
- lazy loading / clustering для великої кількості точок;
- support MultiPolygon і GeoJSON FeatureCollection;
- integration/e2e tests з React Testing Library + Playwright/Cypress;
- schema validation для API/mock payloads;
- custom map tiles/offline strategy для production agri use cases.

## Як презентувати рішення за 30 хв

1. **5–7 хв — demo:** вибір поля, додавання валідної точки, MGRS, різні типи маркерів, фільтр/пошук/сортування, видалення, приклад кліку поза полем.
2. **10–15 хв — code tour:** `models.ts` -> store -> services -> map -> form -> selector/list.
3. **10–15 хв — рішення:** пояснити Zustand, локальний vs глобальний state, point-in-polygon, GeoJSON `[lng, lat]` vs Leaflet `[lat, lng]`, stable keys, derived state.
4. **Q&A:** згадати trade-offs і секцію "Що б я додала з більшим часом".
# agri-monitor
