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