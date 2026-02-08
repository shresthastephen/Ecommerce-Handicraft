
import type { Product, CategoryInfo } from "../types/product";
import slide from "../assets/slide.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import buddha from "../assets/buddha.jpg";
import shiva from "../assets/shiva.jpg";
import ganesh from "../assets/ganesh.jpg";
import saraswati from "../assets/saraswati.jpg";
import laxmi from "../assets/laxmi.jpg";


export const categoryImages = {
  ganesh: {
    hero: ganesh,
    square: ganesh,
  },
  buddha: {
    hero: buddha,
    square: buddha,
  },
  shiva: {
    hero: shiva,
    square: shiva,
  },

  laxmi: {
    hero: laxmi,
    square: laxmi,
  },
 
 
  saraswati: {
    hero: saraswati,
    square: saraswati,
  }

} as const;

export const productImages = {
  ganesh: [
    ganesh
  ],
  buddha: [
    buddha
  ],
  shiva: [
    shiva
  ],
 
  laxmi: [
    laxmi
  ],
 
  saraswati: [
    saraswati
  ],
} as const;



export const categories: CategoryInfo[] = [
  {
    id: "ganesh",
    name: "Ganesh",
    description: "Lord of Beginnings and Remover of Obstacles",
    image: categoryImages.ganesh.square,
  },
  {
    id: "buddha",
    name: "Buddha",
    description: "The Enlightened One",
    image: categoryImages.buddha.square,
  },
  {
    id: "shiva",
    name: "Shiva",
    description: "The Destroyer and Transformer",
    image: categoryImages.shiva.square,
  },
  
  {
    id: "laxmi",
    name: "Laxmi",
    description: "Goddess of Wealth and Prosperity",
    image: categoryImages.laxmi.square,
  },
 
  {
    id: "saraswati",
    name: "Saraswati",
    description: "Goddess of Knowledge and Arts",
    image: categoryImages.saraswati.square,
  },
];


export const products: Product[] = [
  {
    id: "gan-001",
    name: "Shree Ganesh",
    description: "Ganesha statue with antique finish.",
    price: 2499,
    originalPrice: 3299,
    images: [...productImages.ganesh],
    category: "ganesh",
    material: "Copper",
    dimensions: "8 x 5 x 4 inches",
    weight: "1.2 kg",
    inStock: true,
    isBestSeller: true,
    isNewArrival: true,
    createdAt: "2024-01-15",
  },
  {
    id: "bud-001",
    name: "Meditating Buddha ",
    description: "Buddha in Dhyana Mudra.",
    price: 3299,
    originalPrice: 4199,
    images: [...productImages.buddha],
    category: "buddha",
    material: "Bronze",
    dimensions: "10 x 6 x 5 inches",
    weight: "2.1 kg",
    inStock: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2024-02-10",
  },
  {
    id: "shi-001",
    name: "Shiva",
    description: "Cosmic of Lord Shiva.",
    price: 6999,
    originalPrice: 8499,
    images: [...productImages.shiva],
    category: "shiva",
    material: "Bronze",
    dimensions: "14 x 12 x 6 inches",
    weight: "3.8 kg",
    inStock: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: "2024-03-01",
  },
];


export const bannerSlides = [
  {
    id: 1,
    title: "Divine Artistry",
    subtitle: "Handcrafted God Statues for Your Sacred Space",
    image: slide,
    cta: "Explore Collection",
    link: "/shops",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover Our Latest Sacred Sculptures",
    image: slide2,
    cta: "Shop New",
    link: "/shops?filter=new",
  },
  {
    id: 3,
    title: "Bronze Masterpieces",
    subtitle: "Timeless Beauty in Every Detail",
    image: slide3,
    cta: "View Collection",
    link: "/shops",
  },
];
