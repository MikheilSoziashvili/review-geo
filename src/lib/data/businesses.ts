export type Business = {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
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
  {
    id: "1",
    name: "Cafe Mocha",
    category: "Café",
    city: "Tbilisi",
    rating: 4.6,
    reviewCount: 42,
    about:
      "Cafe Mocha has been serving quality coffee since 2010 with a focus on organic ingredients.",
    faqs: [
      { question: "What are your opening hours?", answer: "We are open from 8am to 8pm daily." },
      { question: "Do you offer vegan options?", answer: "Yes, we have a variety of vegan choices." },
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
    name: "TechFix",
    category: "Electronics Repair",
    city: "Batumi",
    rating: 4.2,
    reviewCount: 21,
    about:
      "TechFix provides reliable repair services for all your electronic devices. Our technicians are certified and experienced.",
    faqs: [
      { question: "How long does a repair take?", answer: "Typically, repairs are completed within 24 hours." },
      { question: "Do you offer on-site service?", answer: "Yes, we offer on-site services in Batumi." },
    ],
    hours: "9am - 6pm",
    contactInfo: {
      phone: "+995 555 654 321",
      email: "support@techfix.ge",
      website: "https://techfix.ge",
    },
  },
  {
    id: "3",
    name: "Green Market",
    category: "Grocery Store",
    city: "Kutaisi",
    rating: 4.9,
    reviewCount: 87,
    about:
      "Green Market is your local destination for fresh produce and organic products. We prioritize supporting local farmers.",
    faqs: [
      { question: "Do you offer home delivery?", answer: "Yes, we offer home delivery in Kutaisi." },
      { question: "Are your products locally sourced?", answer: "Absolutely, supporting local farmers is our priority." },
    ],
    hours: "7am - 9pm",
    contactInfo: {
      phone: "+995 555 987 654",
      email: "contact@greenmarket.ge",
      website: "https://greenmarket.ge",
    },
  },
  {
    id: "4",
    name: "Book Haven",
    category: "Bookstore",
    city: "Tbilisi",
    rating: 4.8,
    reviewCount: 35,
    about:
      "Book Haven offers a vast collection of books from local and international authors. We also host regular events and signings.",
    faqs: [
      { question: "Do you host book signing events?", answer: "Yes, we regularly host book signings and events." },
      { question: "Can I order online?", answer: "Yes, online orders are available on our website." },
    ],
    hours: "10am - 8pm",
    contactInfo: {
      phone: "+995 555 321 987",
      email: "info@bookhaven.ge",
      website: "https://bookhaven.ge",
    },
  },
  {
    id: "5",
    name: "FitLife Gym",
    category: "Fitness Center",
    city: "Rustavi",
    rating: 4.3,
    reviewCount: 58,
    about:
      "FitLife Gym provides state-of-the-art equipment and expert trainers to help you achieve your fitness goals.",
    faqs: [
      { question: "What are the membership fees?", answer: "Membership fees vary; please visit us for details." },
      { question: "Do you offer personal training?", answer: "Yes, personal training packages are available." },
    ],
    hours: "6am - 10pm",
    contactInfo: {
      phone: "+995 555 456 789",
      email: "support@fitlifegym.ge",
      website: "https://fitlifegym.ge",
    },
  },
  {
    id: "6",
    name: "Urban Bites",
    category: "Restaurant",
    city: "Tbilisi",
    rating: 4.7,
    reviewCount: 64,
    about:
      "Urban Bites offers a fusion of traditional Georgian cuisine with a modern twist. Enjoy fresh, locally-sourced ingredients.",
    faqs: [
      { question: "Do you offer vegetarian options?", answer: "Yes, we have several vegetarian dishes on our menu." },
      { question: "Do you require reservations?", answer: "Reservations are recommended during peak hours." },
    ],
    hours: "11am - 11pm",
    contactInfo: {
      phone: "+995 555 789 012",
      email: "reservations@urbanbites.ge",
      website: "https://urbanbites.ge",
    },
  },
];
