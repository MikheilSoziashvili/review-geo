export type Business = {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  address?: string;
  heroImageUrl?: string;
  logoUrl?: string;
  about?: string;
  faqs?: { question: string; answer: string }[];
  hours?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
};

export const businesses: Business[] = [
  // --- Café ---
  {
    id: "1",
    name: "Cafe Mocha",
    category: "Café",
    city: "Tbilisi",
    rating: 4.6,
    reviewCount: 42,
    address: "789 Elm St, Tbilisi, Georgia",
    heroImageUrl: "/images/cafemocha.jpg",
    logoUrl: "/images/cafemocha-logo.png",
    about: "Cafe Mocha has been serving quality coffee since 2010 with a focus on organic ingredients.",
    faqs: [
      { question: "What are your opening hours?", answer: "8am to 8pm daily." },
      { question: "Do you offer vegan options?", answer: "Yes, we do." },
    ],
    hours: "8am - 8pm",
    contactInfo: {
      phone: "+995 555 123 456",
      email: "info@cafemocha.ge",
      website: "https://cafemocha.ge",
    },
  },
  {
    id: "2",
    name: "Bean Street Café",
    category: "Café",
    city: "Tbilisi",
    rating: 4.3,
    reviewCount: 19,
    address: "101 Coffee Ave, Tbilisi",
    heroImageUrl: "/images/beanstreet.jpg",
    logoUrl: "/images/beanstreet-logo.png",
    about: "Modern café with handcrafted beverages and a cozy reading nook.",
    faqs: [
      { question: "Do you have decaf options?", answer: "Yes, we offer several decaf drinks." },
    ],
    hours: "9am - 7pm",
    contactInfo: {
      phone: "+995 555 100 200",
      email: "contact@beanstreet.ge",
      website: "https://beanstreet.ge",
    },
  },
  {
    id: "3",
    name: "Lavazza Lounge",
    category: "Café",
    city: "Tbilisi",
    rating: 4.7,
    reviewCount: 31,
    address: "33 Java Street, Tbilisi",
    heroImageUrl: "/images/lavazza.jpg",
    logoUrl: "/images/lavazza-logo.png",
    about: "Stylish café known for Italian coffee and desserts.",
    faqs: [
      { question: "Do you have Wi-Fi?", answer: "Yes, free Wi-Fi is available." },
    ],
    hours: "10am - 10pm",
    contactInfo: {
      phone: "+995 555 404 505",
      email: "lavazza@georgia.ge",
      website: "https://lavazzalounge.ge",
    },
  },

  // --- Restaurant ---
  {
    id: "4",
    name: "Urban Bites",
    category: "Restaurant",
    city: "Tbilisi",
    rating: 4.7,
    reviewCount: 64,
    address: "567 Maple St, Tbilisi",
    heroImageUrl: "/images/urbanbites.jpg",
    logoUrl: "/images/urbanbites-logo.png",
    about: "Fusion of traditional Georgian cuisine with a modern twist.",
    faqs: [
      { question: "Do you require reservations?", answer: "Recommended during peak hours." },
    ],
    hours: "11am - 11pm",
    contactInfo: {
      phone: "+995 555 789 012",
      email: "reservations@urbanbites.ge",
      website: "https://urbanbites.ge",
    },
  },
  {
    id: "5",
    name: "Sakhli #11",
    category: "Restaurant",
    city: "Tbilisi",
    rating: 4.9,
    reviewCount: 103,
    address: "11 Freedom Sq, Tbilisi",
    heroImageUrl: "/images/sakhli11.jpg",
    logoUrl: "/images/sakhli-logo.png",
    about: "Fine-dining Georgian experience in a historical house.",
    faqs: [
      { question: "Do you offer vegetarian options?", answer: "Yes, many dishes are vegetarian-friendly." },
    ],
    hours: "12pm - 10pm",
    contactInfo: {
      phone: "+995 555 234 567",
      email: "sakhli11@restaurant.ge",
      website: "https://sakhli11.ge",
    },
  },
  {
    id: "6",
    name: "Burger House",
    category: "Restaurant",
    city: "Tbilisi",
    rating: 4.4,
    reviewCount: 48,
    address: "98 Rustaveli Ave, Tbilisi",
    heroImageUrl: "/images/burgerhouse.jpg",
    logoUrl: "/images/burgerhouse-logo.png",
    about: "American-style burgers with local flair and flavors.",
    faqs: [
      { question: "Do you deliver?", answer: "Yes, we deliver within Tbilisi." },
    ],
    hours: "10am - 10pm",
    contactInfo: {
      phone: "+995 555 888 999",
      email: "hello@burgerhouse.ge",
      website: "https://burgerhouse.ge",
    },
  },

  // --- Electronics Repair ---
  {
    id: "7",
    name: "TechFix",
    category: "Electronics Repair",
    city: "Tbilisi",
    rating: 4.2,
    reviewCount: 21,
    address: "456 Oak St, Tbilisi",
    heroImageUrl: "/images/techfix.jpg",
    logoUrl: "/images/techfix-logo.png",
    about: "Reliable repair services for phones, laptops, and tablets.",
    faqs: [
      { question: "Do you repair iPhones?", answer: "Yes, we support all iPhone models." },
    ],
    hours: "9am - 6pm",
    contactInfo: {
      phone: "+995 555 654 321",
      email: "support@techfix.ge",
      website: "https://techfix.ge",
    },
  },
  {
    id: "8",
    name: "Device Doctor",
    category: "Electronics Repair",
    city: "Tbilisi",
    rating: 4.6,
    reviewCount: 33,
    address: "16 Tech Street, Tbilisi",
    heroImageUrl: "/images/devicedoctor.jpg",
    logoUrl: "/images/devicedoctor-logo.png",
    about: "Certified specialists in hardware and software repairs.",
    faqs: [
      { question: "Do you fix gaming consoles?", answer: "Yes, we fix most major brands." },
    ],
    hours: "10am - 7pm",
    contactInfo: {
      phone: "+995 555 666 777",
      email: "doctor@devices.ge",
      website: "https://devicedoctor.ge",
    },
  },
  {
    id: "9",
    name: "Reboot Lab",
    category: "Electronics Repair",
    city: "Tbilisi",
    rating: 4.5,
    reviewCount: 27,
    address: "22 Ctrl Ln, Tbilisi",
    heroImageUrl: "/images/rebootlab.jpg",
    logoUrl: "/images/rebootlab-logo.png",
    about: "Quick and affordable repairs for everyday devices.",
    faqs: [
      { question: "Do you work on weekends?", answer: "Yes, open Saturdays." },
    ],
    hours: "10am - 5pm",
    contactInfo: {
      phone: "+995 555 101 202",
      email: "info@rebootlab.ge",
      website: "https://rebootlab.ge",
    },
  },

  // --- Grocery Store ---
  {
    id: "10",
    name: "Green Market",
    category: "Grocery Store",
    city: "Tbilisi",
    rating: 4.9,
    reviewCount: 87,
    address: "321 Pine St, Tbilisi",
    heroImageUrl: "/images/greenmarket.jpg",
    logoUrl: "/images/greenmarket-logo.png",
    about: "Fresh produce and organic groceries from local farmers.",
    faqs: [
      { question: "Do you offer delivery?", answer: "Yes, home delivery available." },
    ],
    hours: "7am - 9pm",
    contactInfo: {
      phone: "+995 555 987 654",
      email: "contact@greenmarket.ge",
      website: "https://greenmarket.ge",
    },
  },
  {
    id: "11",
    name: "Local Roots",
    category: "Grocery Store",
    city: "Tbilisi",
    rating: 4.8,
    reviewCount: 52,
    address: "47 Harvest Ln, Tbilisi",
    heroImageUrl: "/images/localroots.jpg",
    logoUrl: "/images/localroots-logo.png",
    about: "Your neighborhood store for farm-fresh foods.",
    faqs: [
      { question: "Do you sell gluten-free items?", answer: "Yes, gluten-free products available." },
    ],
    hours: "8am - 9pm",
    contactInfo: {
      phone: "+995 555 222 333",
      email: "hello@localroots.ge",
      website: "https://localroots.ge",
    },
  },
  {
    id: "12",
    name: "Bazaar Fresh",
    category: "Grocery Store",
    city: "Tbilisi",
    rating: 4.5,
    reviewCount: 39,
    address: "88 Freshway, Tbilisi",
    heroImageUrl: "/images/bazaarfresh.jpg",
    logoUrl: "/images/bazaarfresh-logo.png",
    about: "Affordable and fresh market with local specialties.",
    faqs: [
      { question: "Do you stock imported goods?", answer: "Yes, a wide variety of imported groceries." },
    ],
    hours: "7am - 8pm",
    contactInfo: {
      phone: "+995 555 919 123",
      email: "contact@bazaarfresh.ge",
      website: "https://bazaarfresh.ge",
    },
  },

  // --- Bookstore ---
  {
    id: "13",
    name: "Book Haven",
    category: "Bookstore",
    city: "Tbilisi",
    rating: 4.8,
    reviewCount: 35,
    address: "234 Cedar St, Tbilisi",
    heroImageUrl: "/images/bookhaven.jpg",
    logoUrl: "/images/bookhaven-logo.png",
    about: "Your go-to destination for new releases and classics.",
    faqs: [
      { question: "Do you host author events?", answer: "Yes, monthly readings and signings." },
    ],
    hours: "10am - 8pm",
    contactInfo: {
      phone: "+995 555 321 987",
      email: "info@bookhaven.ge",
      website: "https://bookhaven.ge",
    },
  },
  {
    id: "14",
    name: "Pageturners",
    category: "Bookstore",
    city: "Tbilisi",
    rating: 4.6,
    reviewCount: 24,
    address: "90 Read Ln, Tbilisi",
    heroImageUrl: "/images/pageturners.jpg",
    logoUrl: "/images/pageturners-logo.png",
    about: "Independent bookstore with curated book selections.",
    faqs: [
      { question: "Do you buy used books?", answer: "Yes, bring your books in for trade." },
    ],
    hours: "9am - 6pm",
    contactInfo: {
      phone: "+995 555 505 606",
      email: "hello@pageturners.ge",
      website: "https://pageturners.ge",
    },
  },
  {
    id: "15",
    name: "LitSpace",
    category: "Bookstore",
    city: "Tbilisi",
    rating: 4.4,
    reviewCount: 18,
    address: "57 Novel Way, Tbilisi",
    heroImageUrl: "/images/litspace.jpg",
    logoUrl: "/images/litspace-logo.png",
    about: "Boutique bookstore and café with literary events.",
    faqs: [
      { question: "Can I host events here?", answer: "Yes, we rent space for book clubs." },
    ],
    hours: "10am - 7pm",
    contactInfo: {
      phone: "+995 555 303 404",
      email: "events@litspace.ge",
      website: "https://litspace.ge",
    },
  },
];
