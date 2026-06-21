const axios = require("axios");
const { sandboxApiKey, sandboxSecretKey } = require("../config/config");

let sandBoxAccessToken = null;
let ExpiryTime = 0;

async function generateAccessToken() {
    try {
        const res = await axios.post(
            "https://api.sandbox.co.in/authenticate",
            {},
            {
                headers: {
                    "x-api-key": sandboxApiKey,
                    "x-api-secret": sandboxSecretKey,
                    "x-api-version": "1.0.0"
                }
            }
        );


        sandBoxAccessToken =
            res.data?.data?.access_token ||
            res.data?.access_token;
        console.log("7")
        ExpiryTime = Date.now() + 23 * 60 * 60 * 1000;
        return sandBoxAccessToken;
    } catch (err) {
        console.error("Error generating access token:", err.response?.data || err.message);
        throw (
            err.response?.data || {
                message: err.message
            }
        );
    }
}

async function getAccessToken() {
    if (
        sandBoxAccessToken &&
        Date.now() < ExpiryTime
    ) {
        return sandBoxAccessToken;
    }
    return await generateAccessToken();
}

async function getHeaders() {
    const token = await getAccessToken();
    return {
        Authorization: `${token}`,
        "x-api-key": sandboxApiKey,
        "x-api-version": "1.0",
        "Content-Type": "application/json"
    };
}

async function generateOtp(aadhaarNumber) {
    try {
        const headers = await getHeaders();
        const res = await axios.post(
            "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp",
            {
                "@entity":
                    "in.co.sandbox.kyc.aadhaar.okyc.otp.request",
                aadhaar_number: aadhaarNumber,
                consent: "y",
                reason: "Aadhaar Verification"
            },
            {
                headers
            }
        );
        return res.data;
    } catch (err) {
        throw (
            err.response?.data || {
                message: err.message
            }
        );
    }
}

async function verifyOtp(referenceId, otp) {
    try {
        const headers = await getHeaders();
        const res = await axios.post(
            "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify",
            {
                "@entity":
                    "in.co.sandbox.kyc.aadhaar.okyc.request",
                reference_id: referenceId,
                otp
            },
            {
                headers
            }
        );

        const data = res.data;

        if (data.data?.photo) {
            data.data.photoUrl =
                `data:image/jpeg;base64,${data.data.photo}`;
        }

        return data;
    } catch (err) {
        console.error("Error verifying OTP:", err);
        throw (
            err.response?.data || {
                message: err.message
            }
        );
    }
}

module.exports = {
    generateOtp,
    verifyOtp
};