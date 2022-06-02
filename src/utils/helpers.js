import { COMPANY_INITIALS } from "./company_details";

export const formatDate = (value) => {      
      const parsedValue = value.replace(/(^"|"$)/g, '')
      const date = new Date(parsedValue),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
};

export const generateInvoice = ()=>{
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

return `${COMPANY_INITIALS}/${today}/${Math.floor((Math.random() * 100) + 1)}`
};
