// "use server";

import axios from "axios";

console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY);
export async function verifyCaptcha(token) {
  const res = await axios.post(
    // `https://www.google.com/recaptcha/api/siteverify?secret=6LeDdJooAAAAAOE5xRUfrfoeIS3bleg-0gNv_RzF&response=${token}`
    `https://www.google.com/recaptcha/api/siteverify?secret=6LcSmp4oAAAAAAzmgIZBu_JYgl7SCBcR5zbN_axL&response=${token}`
  );
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
