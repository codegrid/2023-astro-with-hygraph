export const fetchAccount = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("api respond");

      // cookieにログイン情報があったら返す
      if (
        document.cookie.includes(
          "cgdemo-2023-astro-with-hygraph"
        )
      )
        return resolve({ name: "cancer" });

      resolve(null);
    }, 500);
  });
};
