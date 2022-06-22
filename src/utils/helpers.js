import { COMPANY_INITIALS } from "./company_details";

export const formatDate = (value) => {
  return value?.slice(1, 11);
};

export const generateInvoice = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  return `${COMPANY_INITIALS}/${today}/${Math.floor(Math.random() * 100 + 1)}`;
};

export const numberWithCommas = (x) => {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
