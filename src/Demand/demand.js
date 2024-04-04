export const genDemand = () => {
  return {
    day: 1,
    time: "",
    productA: Math.round(Math.random() * 10) + 1,
    productB: Math.round(Math.random() * 10) + 1,
    productC: Math.round(Math.random() * 10) + 1,
    productD: Math.round(Math.random() * 10) + 1,
    promotion: Math.floor(Math.random() * 8) + 1,
    gender: Math.floor(Math.random() * 2) + 1,
    age: Math.floor(Math.random() * 60) + 1,
    location: Math.floor(Math.random() * 30) + 1,
  };
};
