import { verifyCaptcha } from './ServerActions';
import { useRef, useState } from 'react';

const CaptchaForm = () => {
    const recaptchaRef = useRef(null);
    const [isVerified, setIsverified] = useState(false);

    async function handleCaptchaSubmission(token) {
        // Server function to verify captcha
        await verifyCaptcha(token);
        console
            .log('token', token)
            .then(() => setIsverified(true))
            .catch(() => setIsverified(false));
    }


    return (
        <div>
            <form action="?" method="POST">
                <div className="g-recaptcha" data-sitekey="6LdCLZ8oAAAAAMLPzS3Fwm2FBvOHBTXSTXbQq4xt"></div>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};
export default CaptchaForm;
