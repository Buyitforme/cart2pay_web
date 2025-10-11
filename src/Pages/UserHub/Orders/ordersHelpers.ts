import TextLoader from "../../../Components/TextLoader";

export const stateOptions = [
  { label: "Lagos", value: "lagos" },
  { label: "Abuja", value: "abuja" },
  { label: "Oyo", value: "oyo" },
  { label: "Rivers", value: "rivers" },
];

export const lgaOptions: Record<string, { label: string; value: string }[]> = {
  lagos: [
    { label: "Ikeja", value: "ikeja" },
    { label: "Surulere", value: "surulere" },
    { label: "Lekki", value: "lekki" },
  ],
  abuja: [
    { label: "Gwarinpa", value: "gwarinpa" },
    { label: "Maitama", value: "maitama" },
    { label: "Asokoro", value: "asokoro" },
  ],
  oyo: [
    { label: "Ibadan North", value: "ibadan-north" },
    { label: "Ibadan South", value: "ibadan-south" },
  ],
  rivers: [
    { label: "Obio-Akpor", value: "obio-akpor" },
    { label: "Port Harcourt", value: "port-harcourt" },
  ],
};

export const storeOptions = [
  { label: "Shein", value: "shein" },
  { label: "Zara", value: "zara" },
  { label: "Fashion Nova", value: "fashion-nova" },
  { label: "Asos", value: "asos" },
    { label: "Primark", value: "primark" },

];
export const sizeOptions = [
  // US Sizes
  { label: "US 0", value: "us-0" },
  { label: "US 2", value: "us-2" },
  { label: "US 4", value: "us-4" },
  { label: "US 6", value: "us-6" },
  { label: "US 8", value: "us-8" },
  { label: "US 10", value: "us-10" },
  { label: "US 12", value: "us-12" },
  { label: "US 14", value: "us-14" },
  { label: "US 16", value: "us-16" },
  { label: "US 18", value: "us-18" },

  // UK Sizes
  { label: "UK 4", value: "uk-4" },
  { label: "UK 6", value: "uk-6" },
  { label: "UK 8", value: "uk-8" },
  { label: "UK 10", value: "uk-10" },
  { label: "UK 12", value: "uk-12" },
  { label: "UK 14", value: "uk-14" },
  { label: "UK 16", value: "uk-16" },
  { label: "UK 18", value: "uk-18" },
  { label: "UK 20", value: "uk-20" },

  // General
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" },
  { label: "Other", value: "other" },
];

export const colorOptions = [
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Grey", value: "grey" },
  { label: "Beige", value: "beige" },
  { label: "Navy", value: "navy" },
  { label: "Blue", value: "blue" },
  { label: "Light Blue", value: "light-blue" },
  { label: "Red", value: "red" },
  { label: "Pink", value: "pink" },
  { label: "Green", value: "green" },
  { label: "Olive", value: "olive" },
  { label: "Yellow", value: "yellow" },
  { label: "Orange", value: "orange" },
  { label: "Brown", value: "brown" },
  { label: "Purple", value: "purple" },
  { label: "Maroon", value: "maroon" },
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
  { label: "Multicolor", value: "multicolor" },
  { label: "Other", value: "other" },
];

