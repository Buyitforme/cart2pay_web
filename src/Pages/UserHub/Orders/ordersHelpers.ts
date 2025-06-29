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
  { label: "Other", value: "other" },
];

export const colorOptions = [
  { label: "Black", value: "Black" },
  { label: "White", value: "White" },
  { label: "Beige", value: "Beige" },
  { label: "Brown", value: "Brown" },
  { label: "Blue", value: "Blue" },
  { label: "Navy", value: "Navy" },
  { label: "Grey", value: "Grey" },
  { label: "Green", value: "Green" },
  { label: "Red", value: "Red" },
  { label: "Pink", value: "Pink" },
  { label: "Orange", value: "Orange" },
  { label: "Yellow", value: "Yellow" },
  { label: "Purple", value: "Purple" },
  { label: "Multicolor", value: "Multicolor" },
];

export const sizeOptions = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "EU 36", value: "EU 36" },
  { label: "EU 38", value: "EU 38" },
  { label: "EU 40", value: "EU 40" },
  { label: "EU 42", value: "EU 42" },
  { label: "US 6", value: "US 6" },
  { label: "US 8", value: "US 8" },
  { label: "US 10", value: "US 10" },
  { label: "One Size", value: "One Size" },
];


export const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));
