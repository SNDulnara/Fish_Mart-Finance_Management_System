const fishSalesData = [
  {
    sale_id: 1,
    customer_id: 101,
    fish_id: 1,
    quantity_kg: 5,
    sale_price: 2500,
    sale_type: "retail",
    sale_date: "2023-01-15T08:30:00Z"
  },
  {
    sale_id: 2,
    customer_id: 102,
    fish_id: 2,
    quantity_kg: 10,
    sale_price: 4500,
    sale_type: "wholesale",
    sale_date: "2023-01-16T09:15:00Z"
  },
  {
    sale_id: 3,
    customer_id: 103,
    fish_id: 1,
    quantity_kg: 3,
    sale_price: 1500,
    sale_type: "retail",
    sale_date: "2023-02-01T10:45:00Z"
  },
  {
    sale_id: 4,
    customer_id: 104,
    fish_id: 3,
    quantity_kg: 8,
    sale_price: 3200,
    sale_type: "wholesale",
    sale_date: "2023-02-15T11:30:00Z"
  },
  {
    sale_id: 5,
    customer_id: 105,
    fish_id: 2,
    quantity_kg: 4,
    sale_price: 1800,
    sale_type: "retail",
    sale_date: "2023-03-01T13:20:00Z"
  },
  {
    sale_id: 6,
    customer_id: 106,
    fish_id: 4,
    quantity_kg: 15,
    sale_price: 6000,
    sale_type: "wholesale",
    sale_date: "2023-03-15T14:10:00Z"
  },
  {
    sale_id: 7,
    customer_id: 107,
    fish_id: 3,
    quantity_kg: 6,
    sale_price: 2400,
    sale_type: "retail",
    sale_date: "2023-04-01T15:45:00Z"
  },
  {
    sale_id: 8,
    customer_id: 108,
    fish_id: 1,
    quantity_kg: 12,
    sale_price: 6000,
    sale_type: "wholesale",
    sale_date: "2023-04-15T16:30:00Z"
  },
  {
    sale_id: 9,
    customer_id: 109,
    fish_id: 4,
    quantity_kg: 2,
    sale_price: 800,
    sale_type: "retail",
    sale_date: "2023-05-01T09:15:00Z"
  },
  {
    sale_id: 10,
    customer_id: 110,
    fish_id: 2,
    quantity_kg: 20,
    sale_price: 9000,
    sale_type: "wholesale",
    sale_date: "2023-05-15T10:00:00Z"
  },
  {
    sale_id: 11,
    customer_id: 111,
    fish_id: 1,
    quantity_kg: 7,
    sale_price: 3500,
    sale_type: "retail",
    sale_date: "2023-06-01T11:45:00Z"
  },
  {
    sale_id: 12,
    customer_id: 112,
    fish_id: 3,
    quantity_kg: 9,
    sale_price: 3600,
    sale_type: "wholesale",
    sale_date: "2023-06-15T12:30:00Z"
  },
  {
    sale_id: 13,
    customer_id: 113,
    fish_id: 4,
    quantity_kg: 3,
    sale_price: 1200,
    sale_type: "retail",
    sale_date: "2023-07-01T14:15:00Z"
  },
  {
    sale_id: 14,
    customer_id: 114,
    fish_id: 2,
    quantity_kg: 18,
    sale_price: 8100,
    sale_type: "wholesale",
    sale_date: "2023-07-15T15:00:00Z"
  },
  {
    sale_id: 15,
    customer_id: 115,
    fish_id: 1,
    quantity_kg: 4,
    sale_price: 2000,
    sale_type: "retail",
    sale_date: "2023-08-01T16:45:00Z"
  },
  {
    sale_id: 16,
    customer_id: 116,
    fish_id: 3,
    quantity_kg: 11,
    sale_price: 4400,
    sale_type: "wholesale",
    sale_date: "2023-08-15T08:30:00Z"
  },
  {
    sale_id: 17,
    customer_id: 117,
    fish_id: 4,
    quantity_kg: 5,
    sale_price: 2000,
    sale_type: "retail",
    sale_date: "2023-09-01T09:15:00Z"
  },
  {
    sale_id: 18,
    customer_id: 118,
    fish_id: 2,
    quantity_kg: 16,
    sale_price: 7200,
    sale_type: "wholesale",
    sale_date: "2023-09-15T10:00:00Z"
  },
  {
    sale_id: 19,
    customer_id: 119,
    fish_id: 1,
    quantity_kg: 6,
    sale_price: 3000,
    sale_type: "retail",
    sale_date: "2023-10-01T11:45:00Z"
  },
  {
    sale_id: 20,
    customer_id: 120,
    fish_id: 3,
    quantity_kg: 13,
    sale_price: 5200,
    sale_type: "wholesale",
    sale_date: "2023-10-15T12:30:00Z"
  },
  {
    sale_id: 21,
    customer_id: 121,
    fish_id: 4,
    quantity_kg: 4,
    sale_price: 1600,
    sale_type: "retail",
    sale_date: "2023-11-01T14:15:00Z"
  },
  {
    sale_id: 22,
    customer_id: 122,
    fish_id: 2,
    quantity_kg: 19,
    sale_price: 8550,
    sale_type: "wholesale",
    sale_date: "2023-11-15T15:00:00Z"
  },
  {
    sale_id: 23,
    customer_id: 123,
    fish_id: 1,
    quantity_kg: 5,
    sale_price: 2500,
    sale_type: "retail",
    sale_date: "2023-12-01T16:45:00Z"
  },
  {
    sale_id: 24,
    customer_id: 124,
    fish_id: 3,
    quantity_kg: 10,
    sale_price: 4000,
    sale_type: "wholesale",
    sale_date: "2023-12-15T08:30:00Z"
  },
  {
    sale_id: 25,
    customer_id: 125,
    fish_id: 4,
    quantity_kg: 3,
    sale_price: 1200,
    sale_type: "retail",
    sale_date: "2024-01-01T09:15:00Z"
  },
  {
    sale_id: 26,
    customer_id: 126,
    fish_id: 2,
    quantity_kg: 17,
    sale_price: 7650,
    sale_type: "wholesale",
    sale_date: "2024-01-15T10:00:00Z"
  },
  {
    sale_id: 27,
    customer_id: 127,
    fish_id: 1,
    quantity_kg: 6,
    sale_price: 3000,
    sale_type: "retail",
    sale_date: "2024-02-01T11:45:00Z"
  },
  {
    sale_id: 28,
    customer_id: 128,
    fish_id: 3,
    quantity_kg: 12,
    sale_price: 4800,
    sale_type: "wholesale",
    sale_date: "2024-02-15T12:30:00Z"
  },
  {
    sale_id: 29,
    customer_id: 129,
    fish_id: 4,
    quantity_kg: 4,
    sale_price: 1600,
    sale_type: "retail",
    sale_date: "2024-03-01T14:15:00Z"
  },
  {
    sale_id: 30,
    customer_id: 130,
    fish_id: 2,
    quantity_kg: 20,
    sale_price: 9000,
    sale_type: "wholesale",
    sale_date: "2024-03-15T15:00:00Z"
  },
  {
    sale_id: 31,
    customer_id: 131,
    fish_id: 1,
    quantity_kg: 8,
    sale_price: 4000,
    sale_type: "retail",
    sale_date: "2025-01-15T09:30:00Z"
  },
  {
    sale_id: 32,
    customer_id: 132,
    fish_id: 2,
    quantity_kg: 15,
    sale_price: 6750,
    sale_type: "wholesale",
    sale_date: "2025-02-01T10:15:00Z"
  },
  {
    sale_id: 33,
    customer_id: 133,
    fish_id: 3,
    quantity_kg: 6,
    sale_price: 2400,
    sale_type: "retail",
    sale_date: "2025-03-15T11:45:00Z"
  },
  {
    sale_id: 34,
    customer_id: 134,
    fish_id: 4,
    quantity_kg: 12,
    sale_price: 4800,
    sale_type: "wholesale",
    sale_date: "2025-04-01T13:20:00Z"
  },
  {
    sale_id: 35,
    customer_id: 135,
    fish_id: 1,
    quantity_kg: 4,
    sale_price: 2000,
    sale_type: "retail",
    sale_date: "2025-05-15T14:10:00Z"
  },
  {
    sale_id: 36,
    customer_id: 136,
    fish_id: 2,
    quantity_kg: 20,
    sale_price: 9000,
    sale_type: "wholesale",
    sale_date: "2025-06-01T15:45:00Z"
  },
  {
    sale_id: 37,
    customer_id: 137,
    fish_id: 3,
    quantity_kg: 7,
    sale_price: 2800,
    sale_type: "retail",
    sale_date: "2025-07-15T09:30:00Z"
  },
  {
    sale_id: 38,
    customer_id: 138,
    fish_id: 4,
    quantity_kg: 18,
    sale_price: 7200,
    sale_type: "wholesale",
    sale_date: "2025-08-01T10:15:00Z"
  },
  {
    sale_id: 39,
    customer_id: 139,
    fish_id: 1,
    quantity_kg: 5,
    sale_price: 2500,
    sale_type: "retail",
    sale_date: "2025-09-15T11:45:00Z"
  },
  {
    sale_id: 40,
    customer_id: 140,
    fish_id: 2,
    quantity_kg: 16,
    sale_price: 7200,
    sale_type: "wholesale",
    sale_date: "2025-10-01T13:20:00Z"
  }
];

module.exports = { fishSalesData };
