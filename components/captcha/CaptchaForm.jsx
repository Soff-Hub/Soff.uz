import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "./ServerActions"
import { useEffect, useRef, useState } from "react"

const CaptchaForm = () => {
  const recaptchaRef = useRef(null)
  const [isVerified, setIsverified] = useState(false)

  async function handleCaptchaSubmission(token) {
    // Server function to verify captcha
    await verifyCaptcha(token)
    console.log('token', token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false))
  }


  useEffect(() => {
    console.log('captcha ishladi', isVerified);
  }, [isVerified])

  return (
        <div>
          <ReCAPTCHA
            // sitekey="6LeDdJooAAAAABNp0snlQFYPgPnuFLo4LWRc9GUD"
            sitekey="6LcSmp4oAAAAAMfGMAwdUB5kQXrRlPLkrVKBp-zI"
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />
          <button type="submit" disabled={!isVerified}>
            Submit feedback
          </button>
        </div>
    )
}
export default CaptchaForm