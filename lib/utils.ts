/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import moment from 'moment';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: any[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type:string) => z.object({
  email :z.string().email(),
  password :z.string().min(5),
  firstName : type ==='SignIn'? z.string().optional() : z.string().min(5),
  lastName : type ==='SignIn'? z.string().optional() : z.string().min(5),
})


export const formatDateToDisplay = (dateString : string) => {
  const date = new Date(dateString);
  
  const options :any = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  
  return date.toLocaleDateString('en-GB', options).replace(',', '').replace(/(\d{2}) (\w{3}) (\d{4})/, '$1-$2-$3');
}
export const calculateInterest = (formData : any) => {

  const { amount, startDate, endDate, rate } = formData;

  // Calculate Time
  const a = moment(endDate);
  const b = moment(startDate);


  let years = a.diff(b, 'year');
  b.add(years, 'years');
  let months = a.diff(b, 'months');
  b.add(months, 'months');
  let days = a.diff(b, 'days');

  // Calculate Interest
  let interTable = "";
  let tempAmount = amount;
  let totalInter = 0;

  // Calculate interest for years
  for (let i = 0; i < years; i++) {
    const inter = (tempAmount / 100) * rate;
    totalInter += inter;
    tempAmount += inter;
    interTable += `${i + 1} Year: ${inter.toFixed(2)} and Amount: ${tempAmount.toFixed(2)}\n`;
  }

  // Calculate interest for months
  const monRate = rate / 12;
  
  for (let i = 0; i < months; i++) {
    const inter = (tempAmount / 100) * monRate;
    totalInter += inter;
    interTable += `${years} Year and ${i + 1} Month: ${inter.toFixed(2)} and Amount: ${tempAmount.toFixed(2)}\n`;
  }

  // Calculate interest for days
  const dateRate = ((rate / 12) / moment(endDate).daysInMonth()).toFixed(2);
  for (let i = 0; i < days; i++) {
    const inter = (tempAmount / 100) * parseFloat(dateRate);
    totalInter += inter;
  }

  interTable += `${years} Year and ${months} Month and ${days} Day: ${totalInter.toFixed(2)} and Amount: ${tempAmount.toFixed(2)}\n`;


  return {
    interTable,
    totalInterest: totalInter,
    totalAmount: tempAmount,
    time: `${years} years ${months} months ${days} days`,
  };

}

export const convertNumberToMoney = (money?:Number) =>{
  var moneyValue = money || 0
  const returnMoney = (moneyValue).toLocaleString('en-IN',  {
          maximumFractionDigits: 0,style: 'currency',
          currency: 'INR',
        });
  return returnMoney;
}


interface MetalsPrices {
  goldPrice: number;
  silverPrice: number;
  timestamp: string;
}

export const fetchMetalsPricesOld = async (): Promise<MetalsPrices> => {

  const API_KEY = process.env.APISED_API_KEY; 
  let BASE_URL = process.env.APISED_API_KEY_URL || ''; 

  try {
    
    const response = await axios.get(BASE_URL, {
      params: {
        metals: 'XAU,XAG',  // Fetch gold -XAU, silver - XAG
        base_currency: 'INR',  
        currencies: 'INR',
        weight_unit: 'gram',  
      },
      headers: {
        'x-api-key': API_KEY,
      }
    });

    const { data } = response.data;  // Update based on the actual API response structure
 
    const timestamp = data.timestamp;  

    const goldPrice = data.metal_prices.XAU.price; 
    const silverPrice = data.metal_prices.XAG.price; 

    return { goldPrice, silverPrice, timestamp };  

  } catch (error) {
    console.error('Error fetching metals prices:', error);

    const timestamp = "1";  

    const goldPrice = 1; 
    const silverPrice = 1; 

    return { goldPrice, silverPrice, timestamp }; 
    throw new Error('Failed to fetch data from APISed API');
  }
};

export const fetchMetalsPrices = async (): Promise<MetalsPrices> => {

  let BASE_URL = 'https://data-asg.goldprice.org/dbXRates/INR'; 

  try {
    
    const response = await axios.get(BASE_URL,{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Accept': 'application/json',
      }});

    const data = response.data;  // Update based on the actual API response structure
    
    const timestamp = data.tsj;  
    
    // API Information
    // https://gist.github.com/surferxo3/8b4eafe499f7fa52eacb6cc187d0a49a
    // const OZ_TO_GRAM = 31.1035;
    // const GRAM_TO_KG = 1000;
    // const TOLA_TO_GRAM = 11.66;

    // // Gold purity factors for different carats
    // const PURITY_24K = 1.00; // 100% pure gold
    // const PURITY_22K = 0.9167; // 91.67% pure gold
    // const PURITY_21K = 0.8750; // 87.5% pure gold
    // const PURITY_18K = 0.7500; // 75% pure gold

    var xauPriceOZtoGM = (data.items[0].xauPrice/31.1035); 
    var xagPriceOZtoGM = (data.items[0].xagPrice/31.1035); 


    const goldPrice = xauPriceOZtoGM; 
    const silverPrice = xagPriceOZtoGM; 
    
    return { goldPrice, silverPrice, timestamp };  

  } catch (error) {
    console.error('Error fetching metals prices:', error);

    const timestamp = "1";  

    const goldPrice = 1; 
    const silverPrice = 1; 

    return { goldPrice, silverPrice, timestamp }; 
    throw new Error('Failed to fetch data from APISed API');
  }
};