export const formatDate = (value) => {
  if (typeof value != undefined){
 return value.slice(1, 11);
  }
  return ""
 
};

// export const formatTime = (timeDerived) => {
//   return timeDerived.slice(-14, -9);
// };
