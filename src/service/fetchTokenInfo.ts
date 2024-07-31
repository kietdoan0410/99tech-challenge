import axios from "axios";

interface CurrencyData {
  currency: string;
  date: string;
  price: number;
}

export const fetchTokenInfo = async () => {
  const response = await axios.get<CurrencyData[]>(
    "https://interview.switcheo.com/prices.json"
  );

  return response.data;
};

export const mockService = () =>
  new Promise((res) => setTimeout(() => res(123), 2000));
