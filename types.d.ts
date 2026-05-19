import type { Children } from "@/components/rich-text/serialize";

export type Product = {
  id: number;
  product_name: string;
  product_image: {
    id: number;
    alt: string;
    caption: string;
    updatedAt: string; // ISO date string
    createdAt: string; // ISO date string
    url: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
  };
  product_price_bosnia: {
    bosnia_standart_price: number;
    bosnia_sale_price: number | null;
    bosnia_shipping_price: number;
    currency: string;
  };
  product_price_macedonia: {
    macedonia_standart_price: number;
    macedonia_sale_price: number | null;
    currency: string;
  };
  product_price_serbia: {
    serbia_standart_price: number;
    serbia_sale_price: number | null;
    currency: string;
  };
  product_price_europe: {
    europe_standart_price: number;
    europe_sale_price: number | null;
    currency: string;
  };
  product_price_america: {
    america_standart_price: number;
    america_sale_price: number | null;
    currency: string;
  };
  product_description: Array<{
    children: Array<{
      text: string;
    }>;
  }>;
  product_type: string;
  updatedAt: string; // ISO date string
  createdAt: string; // ISO date string
};
export type AllProducts = {
  docs: Product[];
};
export type MenuItem = {
  id: string;
  url: string;
  title: string;
};

export type Menu = {
  id: number;
  menu_items: MenuItem[];
  updatedAt: string;
  createdAt: string | null;
  globalType: string;
};

export type CheckoutTranslations = {
  page_title: string;
  customer_info: string;
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  place_order: string;
  order_summary: string;
  subtotal: string;
  shipping: string;
  total: string;
  customer_note: string;
};
// A type to represent the content for the hero section (titles)
type HeroTitle = {
  type: "h1" | "h2" | "h3" | "h5" | "h6"; // The type of the header
  children: string[]; // Array of text/content in the header
};

// A type for each question-answer pair in the question_array
type QuestionAnswer = {
  id: string; // Unique identifier for each question-answer pair
  question: string; // The question itself
  answer: string; // The answer related to the question
};

// A type for each study result in the studies_array
type Study = {
  id: string; // Unique identifier for each study result
  study: string; // The description of the study
};

// A type for the presentation section, which contains paragraph data
type PresentationParagraph = {
  type: "h2" | "h3" | "h4" | "p"; // The type of the content (e.g., header or paragraph)
  children: string[]; // The content of the paragraph or header
};
// A type to represent the content for the hero section (titles)
type HeroTitle = {
  type: "h1" | "h2" | "h3" | "h5" | "h6"; // The type of the header
  children: string[]; // Array of text/content in the header
};

// A type for each question-answer pair in the question_array
type QuestionAnswer = {
  id: string; // Unique identifier for each question-answer pair
  question: string; // The question itself
  answer: string; // The answer related to the question
};

// A type for each study result in the studies_array
type Study = {
  id: string; // Unique identifier for each study result
  study: string; // The description of the study
};

// A type for the presentation section, which contains paragraph data
type PresentationParagraph = {
  type: "h2" | "h3" | "h4" | "p"; // The type of the content (e.g., header or paragraph)
  children: string[]; // The content of the paragraph or header
};

// A type to represent the structure of products (if it needs to be defined)
type Product = {
  id: string; // Unique product identifier
  name: string; // Name of the product
  description: string; // Product description
  price: number; // Price of the product
  // Add more properties as necessary
};

// A type for the recipe section (if needed in the future)
type Recipe = {
  id: string; // Unique recipe identifier
  name: string; // Recipe name
  ingredients: string[]; // List of ingredients
  instructions: string[]; // Recipe instructions
  // Add more properties as necessary
};

// Main page data type representing the structure of the home page
type HomePageData = {
  id: number; // Unique identifier for the page
  hero_title: HeroTitle[]; // Array of hero titles (e.g., h1, h2, etc.)
  second_section_title: HeroTitle[]; // Array of second section titles (could be h3, h5)
  question_array: QuestionAnswer[]; // Array of question-answer pairs
  third_section_title: HeroTitle[]; // Array of third section titles
  studies_array: Study[]; // Array of study results
  presentation_paragraph: PresentationParagraph[]; // Array of presentation paragraphs
  presentation_products: Product[] | null; // Array of product objects (null if no products available)
  recipe_section_paragraph: Recipe[] | null; // Array of recipe objects (null if no recipe section)
  testimonial_section_title: null | string; // Testimonial section title (string if available, otherwise null)
  updatedAt: string; // Date when the page was last updated
  createdAt: null | string; // Creation date (could be null)
  globalType: "home_page"; // Type of the page (in this case, a home page)
};
export type CmsPicture = {
  id: number;
  alt: string;
  caption: null | string;
  updatedAt: string;
  createdAt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
};

export type Ingredient = {
  id: string;
  ingredient_name: string;
  ingredient_description: Children | null;
  ingredient_picture: CmsPicture;
};
export type Faq = {
  id: string;
  question: string;
  answer: string;
};
export type Faqs = {
  id: string;
  faq_array: Faq[];
  updatedAt: string | null;
  createdAt: string | null;
  globalType: string;
};
export type OrderObjectType = {
  id?: number;
  customer_name: string;
  customer: number | null;
  order_total: string;
  order_date: null | string;
  order_status: "processing" | "completed" | "canceled" | "shipped";
  pageMeta: {
    customer_name: string;
    customer_last_name: string;
    customer_email: string;
    customer_phone_number: string;
    customer_country: string;
    customer_city: string;
    customer_address: string;
    customer_note: string | null;
  };
  orderMeta: {
    line_items: {
      line_items: string;
      quantity: number;
    }[];
  };
};
export type ContactInfoType = {
  id: number;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
};
