import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// scraper.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import { sleep } from './utils.js';

export async function scrape(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const data = [];

    // Add your scraping logic here
    // For example, let's say you want to scrape all the links on the page
    $('a').each((index, element) => {
      data.push($(element).attr('href'));
    });

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function scrapeWithDelay(url, delay) {
  try {
    await sleep(delay);
    return await scrape(url);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// utils.js
export function isArray(arr) {
  return Array.isArray(arr);
}

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

export function isString(str) {
  return typeof str === 'string';

}

export function isNumber(num) {
  return typeof num === 'number';
}

export function isBoolean(bool) {
  return typeof bool === 'boolean';
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

export function isString(str) {
  return typeof str === 'string';
}

export function isNumber(num) {
  return typeof num === 'number';
}

export function isBoolean(bool) {
  return typeof bool === 'boolean';
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}