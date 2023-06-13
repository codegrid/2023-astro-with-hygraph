export const fetchAccount = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("api respond");
      resolve({ name: "cancer" })
    }, 500);
  });
};
