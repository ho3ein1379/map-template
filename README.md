# 🗺️ React Leaflet Map Starter

یک پروژه پایه برای کار با نقشه‌های تعاملی با استفاده از React، TypeScript، Tailwind CSS و Leaflet.js

![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6?logo=typescript)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38bdf8?logo=tailwindcss)

## ✨ ویژگی‌ها

- 🗺️ نقشه تعاملی با Leaflet.js
- 📍 انتخاب موقعیت با کلیک روی نقشه
- 🎯 Marker قابل جابجایی
- 🔍 کنترل سطح زوم (محدود شده بین 10 تا 25)
- 📊 نمایش مختصات جغرافیایی (Latitude & Longitude)
- 🏙️ دکمه‌های سریع برای شهرهای مختلف
- 🎨 رابط کاربری زیبا با Tailwind CSS
- ⚡ Fast Refresh با Vite
- 🔒 Type-safe با TypeScript

## 🛠️ تکنولوژی‌های استفاده شده

- **React 18** - کتابخانه UI
- **TypeScript** - Type Safety
- **Vite** - Build Tool سریع
- **Tailwind CSS** - Framework استایل‌دهی
- **Leaflet.js** - کتابخانه نقشه
- **React Leaflet** - React wrapper برای Leaflet
- **React Router DOM** - مدیریت روت‌ها

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18 یا بالاتر
- pnpm (یا npm/yarn)

### مراحل نصب

```bash
# کلون کردن پروژه
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# نصب پکیج‌ها
pnpm install

# اجرای پروژه در حالت Development
pnpm dev
```

پروژه روی `http://localhost:5173` اجرا خواهد شد.

## 📦 دستورات مفید

```bash
# اجرای پروژه در حالت توسعه
pnpm dev

# ساخت نسخه Production
pnpm build

# پیش‌نمایش نسخه Production
pnpm preview

# نصب Tailwind CSS (در صورت نیاز)
pnpm exec tailwindcss init -p
```

## 🗂️ ساختار پروژه

```
├── src/
│   ├── component/
│   │   └── mudole/
│   │       └── card/
│   │           └── MapCard.tsx      # کامپوننت نقشه
│   ├── pages/
│   │   └── Map.tsx                  # صفحه اصلی
│   ├── App.tsx                      # کامپوننت اصلی و روت‌ها
│   ├── main.tsx                     # Entry point
│   └── index.css                    # استایل‌های Tailwind
├── public/
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 🎯 استفاده

### استفاده از MapCard

```tsx
import MapCard from "./component/mudole/card/MapCard";

function App() {
  return (
    <div className="container mx-auto p-4">
      <MapCard 
        lat={35.6892}      // مختصات پیش‌فرض
        lng={51.3890}
        zoom={12}
        height="600px"
      />
    </div>
  );
}
```

### Props کامپوننت MapCard

| Prop | Type | Default | توضیحات |
|------|------|---------|---------|
| `lat` | `number` | `35.6892` | عرض جغرافیایی |
| `lng` | `number` | `51.3890` | طول جغرافیایی |
| `zoom` | `number` | `12` | سطح زوم اولیه |
| `height` | `string` | `500px` | ارتفاع نقشه |

## 🌟 ویژگی‌های اضافه شده

- محدودیت زوم بین 10 تا 25
- دکمه‌های سریع برای شهرهای ایران (تهران، مشهد، اصفهان، شیراز، تبریز)
- به‌روزرسانی خودکار مختصات با کلیک روی نقشه
- نمایش Popup با اطلاعات موقعیت
- Input های دستی برای تغییر مختصات

## 🤝 مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. یک Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add amazing feature'`)
4. به Branch خود Push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 📧 ارتباط

برای سوالات و پیشنهادات، Issue باز کنید یا به من پیام دهید.

---

**ساخته شده با ❤️ برای جامعه توسعه‌دهندگان ایرانی**
