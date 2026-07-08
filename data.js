/* ============================================================
   data.js
   Single source of truth for every configurable option, its
   price delta, its contribution to the performance score, and
   the 3D color/material it maps to. Keeping this separate from
   the rendering and UI logic means new parts can be added here
   without touching app.js or laptop3d.js.
   ============================================================ */

const BASE_PRICE = 899;

const CONFIG_DATA = {
  chassis: [
    { id: "midnight",  label: "Midnight Navy", hex: "#16223f", swatch: "#16223f", price: 0    },
    { id: "graphite",  label: "Graphite",      hex: "#2b2f36", swatch: "#2b2f36", price: 20   },
    { id: "arctic",    label: "Arctic Silver",  hex: "#c9d3e0", swatch: "#c9d3e0", price: 40   },
    { id: "cobalt",    label: "Cobalt Blue",    hex: "#1d4ed8", swatch: "#1d4ed8", price: 60   },
  ],

  cpu: [
    { id: "core5",  label: "Core 5",  detail: "6-core · 3.8GHz",  price: 0,    perf: 30 },
    { id: "core7",  label: "Core 7",  detail: "10-core · 4.4GHz", price: 260,  perf: 55 },
    { id: "core9",  label: "Core 9",  detail: "14-core · 5.1GHz", price: 560,  perf: 80 },
    { id: "coreX",  label: "Core X Extreme", detail: "20-core · 5.6GHz", price: 940, perf: 100 },
  ],

  ram: [
    { id: "8gb",  label: "8 GB",  price: 0,   perf: 15 },
    { id: "16gb", label: "16 GB", price: 120, perf: 35 },
    { id: "32gb", label: "32 GB", price: 320, perf: 65 },
    { id: "64gb", label: "64 GB", price: 700, perf: 100 },
  ],

  storage: [
    { id: "256",  label: "256 GB SSD", price: 0,   perf: 20 },
    { id: "512",  label: "512 GB SSD", price: 90,  perf: 40 },
    { id: "1tb",  label: "1 TB SSD",   price: 190, perf: 65 },
    { id: "2tb",  label: "2 TB SSD",   price: 380, perf: 100 },
  ],

  display: [
    { id: "fhd",  label: "13.3\" FHD",      price: 0,   perf: 20 },
    { id: "2k",   label: "15.6\" 2K 120Hz", price: 150, perf: 55 },
    { id: "4k",   label: "16\" 4K OLED",    price: 340, perf: 90 },
    { id: "4kpro",label: "17\" 4K Pro OLED",price: 480, perf: 100 },
  ],

  backlight: [
    { id: "blue",   label: "Ion Blue",   hex: "#5EEBFF", price: 0  },
    { id: "violet", label: "Violet",     hex: "#8b7bff", price: 15 },
    { id: "amber",  label: "Amber",      hex: "#ffb347", price: 15 },
    { id: "white",  label: "Arctic White", hex: "#f2f6ff", price: 15 },
  ],
};

// Weighting used to blend individual "perf" scores into one 0-100 number.
const PERF_WEIGHTS = { cpu: 0.4, ram: 0.25, storage: 0.15, display: 0.2 };

function calcPerformanceScore(selection) {
  const cpu = CONFIG_DATA.cpu.find(o => o.id === selection.cpu);
  const ram = CONFIG_DATA.ram.find(o => o.id === selection.ram);
  const storage = CONFIG_DATA.storage.find(o => o.id === selection.storage);
  const display = CONFIG_DATA.display.find(o => o.id === selection.display);
  const score =
    cpu.perf * PERF_WEIGHTS.cpu +
    ram.perf * PERF_WEIGHTS.ram +
    storage.perf * PERF_WEIGHTS.storage +
    display.perf * PERF_WEIGHTS.display;
  return Math.round(score);
}

function perfTier(score) {
  if (score >= 85) return "Cinematic / studio-grade";
  if (score >= 60) return "Gaming & creative work";
  if (score >= 35) return "Multitasking & office work";
  return "Everyday tasks";
}

function calcTotalPrice(selection) {
  let total = BASE_PRICE;
  for (const group of Object.keys(selection)) {
    const opt = CONFIG_DATA[group]?.find(o => o.id === selection[group]);
    if (opt) total += opt.price;
  }
  return total;
}

function getOption(group, id) {
  return CONFIG_DATA[group].find(o => o.id === id);
}

const DEFAULT_SELECTION = {
  chassis: "midnight",
  cpu: "core7",
  ram: "16gb",
  storage: "512",
  display: "2k",
  backlight: "blue",
};
