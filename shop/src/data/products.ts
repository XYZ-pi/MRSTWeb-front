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
    id: 5,
    title: "Степки TUSAH CLASSIC SHOES",
    price: 750,
    category: "shoes",
    image: "/classic.png",
    description: "Классические степки с нескользящей подошвой и усиленным носком. Обеспечивают сцепление на доянге и защиту пальцев.",
    rating: { rate: 4.7, count: 203 },
    badge: "Топ",
  },

  {
    id: 6,
    title: "Степки EZ-FIT SHOES",
    price: 699,
    category: "shoes",
    image: "/stepki.png",
    description: "Профессиональные степки с нескользящей подошвой и усиленным носком.",
    rating: { rate: 4.9, count: 312 },
    badge: "Новинка",
  },

  

  // ── Защита ──
  {
    id: 7,
    title: "Накладки на ноги",
    price: 580,
    category: "protection",
    image: "/nogi.png",
    description: "Накладки на ноги. Совместимы со всеми системами WT. Размеры S/M/L/XL.",
    rating: { rate: 4.8, count: 67 },
  },

  {
    id: 8,
    title: "Накладки на руки",
    price: 500,
    category: "protection",
    image: "/ruki.png",
    description: "Накладки на руки. Совместимы со всеми системами WT. Размеры S/M/L/XL.",
    rating: { rate: 4.6, count: 143 },
  },

  {
    id: 9,
    title: "Защитный шлем",
    price: 800,
    category: "protection",
    image: "/shlem.png",
    description: "Защитный шлем. Плотный пенополиуретан, регулируемые ремни, вентиляция.",
    rating: { rate: 4.7, count: 88 },
  },

{
    id: 10,
    title: "Красный защитный шлем",
    price: 800,
    category: "protection",
    image: "/shlem krasnii.png",
    description: "Красный защитный шлем. Плотный пенополиуретан, регулируемые ремни, вентиляция.",
    rating: { rate: 4.7, count: 88 },
  },

  {
    id: 11,
    title: "Перчатки",
    price: 400,
    category: "protection",
    image: "/manusi.png",
    description: "Перчатки для защиты рук. Плотный материал, удобное облегание, для тренировок и соревнований.",
    rating: { rate: 4.7, count: 88 },
  },

  {
    id: 12,
    title: "Футы тренировочные",
    price: 500,
    category: "protection",
    image: "/futi.png",
    description: "Футы тренировочные. Плотный материал, удобное облегание, для тренировок и соревнований.",
    rating: { rate: 4.7, count: 88 },
  },

    {
    id: 13,
    title: "Протектор",
    price: 900,
    category: "protection",
    image: "/vesta.png",
    description: "Протектор. Плотный материал, удобное облегание, для тренировок и соревнований.",
    rating: { rate: 4.7, count: 88 },
  },
  // ── Тренировочная экипировка ──
  {
    id: 14,
    title: "Лапа двойная",
    price: 600,
    category: "equipment",
    image: "/lapaa.png",
    description: "Профессиональные лапы для отработки ударов. Кожзам, толщина 5 см, усиленный захват, для тренеров и партнёров.",
    rating: { rate: 4.8, count: 176 },
    badge: "Хит",
  },
  {
    id: 15,
    title: "Макивара",
    price: 1250,
    category: "equipment",
    image: "/lapaaa.png",
    description: "Тренажёр для отработки ударной техники. Натуральная кожа, плотный наполнитель, регулируемая высота, для клубов и домашних тренировок.",
    rating: { rate: 4.5, count: 54 },
  },
  {
    id: 16,
    title: "Макивара маленькая",
    price: 940,
    category: "equipment",
    image: "/lapa.png",
    description: "Тренажёр для отработки ударной техники. Натуральная кожа, плотный наполнитель, регулируемая высота, для клубов и домашних тренировок.",
    rating: { rate: 4.3, count: 231 },
  },
  // ── Пояса ──
  
  {
    id: 17,
    title: "Тигр игрушка",
    price: 450,
    category: "other",
    image: "/tigr.png",
    description: "Игрушка в виде тигра. Символ силы и ловкости. Отличный подарок для юных спортсменов.",
    rating: { rate: 4.7, count: 98 },
  },

  {
    id: 18,
    title: "Медведь игрушка",
    price: 450,
    category: "other",
    image: "/medved.png",
    description: "Игрушка в виде медведя. Символ силы и выносливости. Отличный подарок для юных спортсменов.",
    rating: { rate: 4.4, count: 201 },
  },
];

export const CATEGORIES = [
  { id: "all",        label: "Все товары" },
  { id: "clothing",   label: "Одежда" },
  { id: "shoes",      label: "Обувь" },
  { id: "protection", label: "Защита" },
  { id: "equipment",  label: "Тренировочная экипировка" },
  { id: "other",      label: "Другое" },
] as const;
