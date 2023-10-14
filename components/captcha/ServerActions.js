// "use server";

import axios from "axios";

console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY);
export async function verifyCaptcha(token) {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=6LcAKJ8oAAAAAEJ_p0Mlq8dW0YHuDvWkTaIcrnI8&response=${token}`
  );
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
