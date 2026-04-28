import { Product } from "../types";

export const mockProducts: Product[] = [
  // ── Одежда ──
  {
    id: 1,
    title: "Добок TUSAH EVO UNIFORM",
    price: 3999,
    category: "clothing",
    image: "/dobok evo.png",
    description: "Официальный добок для соревнований по стандарту WT. Лёгкая дышащая ткань, усиленные швы, идеальная посадка для динамичных движений.",
    rating: { rate: 4.8, count: 134 },
    badge: "Хит",
  },

  {
    id: 2,
    title: "Добок TUSAH EZ FIT LITE UNIFORM",
    price: 1000,
    category: "clothing",
    image: "/dobok ez fit.png",
    description: "Удобный добок для ежедневных тренировок. Хлопок с полиэстером, не сковывает движений, легко стирается.",
    rating: { rate: 4.5, count: 89 },
  },

  {
    id: 3,
    title: "Добок STARTER",
    price: 600,
    category: "clothing",
    image: "/starter 600.png",
    description: "Удобный добок для ежедневных тренировок. Для самых маленьких спортсменов.",
    rating: { rate: 4.3, count: 56 },
  },

  {
    id: 4,
    title: "Добок STARTER",
    price: 650,
    category: "clothing",
    image: "/starter 650.png",
    description: "Удобный детский добок для ежедневных тренировок.",
    rating: { rate: 4.4, count: 56 },
  },

  // ── Обувь ──
  {
    id: 4,
    title: "Степки TUSAH CLASSIC SHOES",
    price: 750,
    category: "shoes",
    image: "/classic.png",
    description: "Классические степки с нескользящей подошвой и усиленным носком. Обеспечивают сцепление на доянге и защиту пальцев.",
    rating: { rate: 4.7, count: 203 },
    badge: "Топ",
  },

  {
    id: 5,
    title: "Степки EZ-FIT SHOES",
    price: 699,
    category: "shoes",
    image: "/stepki.png",
    description: "Профессиональные степки с нескользящей подошвой и усиленным носком.",
    rating: { rate: 4.9, count: 312 },
    badge: "Новинка",
  },

  // ── Пояса ──
  
  {
    id: 6,
    title: "Набор поясов Geup (10 шт.)",
    price: 2990,
            category: "belts",
    image: "",
    description: "Полный комплект поясов от белого до красно-чёрного. Хлопок премиум, стойкий краситель, для детей и взрослых.",
    rating: { rate: 4.7, count: 98 },
  },

  {
    id: 7,
    title: "Пояс цветной одиночный",
    price: 390,
    category: "belts",
    image: "",
    description: "Одиночный цветной пояс на выбор: белый, жёлтый, зелёный, синий, красный. Стандартная ширина 4 см.",
    rating: { rate: 4.4, count: 201 },
  },

  // ── Защита ──
  {
    id: 8,
    title: "Накладки на ноги",
    price: 580,
    category: "protection",
    image: "/nogi.png",
    description: "Накладки на ноги. Совместимы со всеми системами WT. Размеры S/M/L/XL.",
    rating: { rate: 4.8, count: 67 },
  },

  {
    id: 9,
    title: "Накладки на руки",
    price: 500,
    category: "protection",
    image: "/ruki.png",
    description: "Накладки на руки. Совместимы со всеми системами WT. Размеры S/M/L/XL.",
    rating: { rate: 4.6, count: 143 },
  },

  {
    id: 10,
    title: "Защитный шлем",
    price: 800,
    category: "protection",
    image: "/shlem.png",
    description: "Защитный шлем. Плотный пенополиуретан, регулируемые ремни, вентиляция.",
    rating: { rate: 4.7, count: 88 },
  },

{
    id: 11,
    title: "Красный защитный шлем",
    price: 800,
    category: "protection",
    image: "/shlem krasnii.png",
    description: "Красный защитный шлем. Плотный пенополиуретан, регулируемые ремни, вентиляция.",
    rating: { rate: 4.7, count: 88 },
  },

  {
    id: 12,
    title: "Перчатки",
    price: 400,
    category: "protection",
    image: "/manusi.png",
    description: "Перчатки для защиты рук. Плотный материал, удобное облегание, для тренировок и соревнований.",
    rating: { rate: 4.7, count: 88 },
  },

  {
    id: 13,
    title: "Футы тренировочные",
    price: 500,
    category: "protection",
    image: "/futi.png",
    description: "Футы тренировочные. Плотный материал, удобное облегание, для тренировок и соревнований.",
    rating: { rate: 4.7, count: 88 },
  },

    {
    id: 14,
    title: "Протектор",
    price: 900,
    category: "protection",
    image: "/vesta.png",
    description: "Протектор. Плотный материал, удобное облегание, для тренировок и соревнований.",
    rating: { rate: 4.7, count: 88 },
  },
  // ── Тренировочная экипировка ──
  {
    id: 15,
    title: "Лапа изогнутая пара",
    price: 2490,
    category: "equipment",
    image: "",
    description: "Профессиональные лапы для отработки ударов. Кожзам, толщина 5 см, усиленный захват, для тренеров и партнёров.",
    rating: { rate: 4.8, count: 176 },
    badge: "Хит",
  },
  {
    id: 16,
    title: "Макивара напольная",
    price: 7900,
    category: "equipment",
    image: "",
    description: "Напольный тренажёр для ударной техники. Регулируемая высота 120–180 см, устойчивое основание, сменная поверхность.",
    rating: { rate: 4.5, count: 54 },
  },
  {
    id: 17,
    title: "Скакалка скоростная",
    price: 990,
    category: "equipment",
    image: "",
    description: "Скоростная скакалка для развития координации и выносливости. Шариковые подшипники, регулируемая длина.",
    rating: { rate: 4.3, count: 231 },
  },
];

export const CATEGORIES = [
  { id: "all",        label: "Все товары" },
  { id: "clothing",   label: "Одежда" },
  { id: "shoes",      label: "Обувь" },
  { id: "belts",      label: "Пояса" },
  { id: "protection", label: "Защита" },
  { id: "equipment",  label: "Тренировочная экипировка" },
] as const;
