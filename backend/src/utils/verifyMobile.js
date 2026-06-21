const { client } = require("../config/twilio");
const { twilioAccountSid, twilioAuthToken, twilioServiceSid } = require("../config/config");

const SendOtp = async (phone) => {
    try {
        const response = await client.verify.v2
            .services(twilioServiceSid)
            .verifications.create({
                to: phone,
                channel: "sms"
            });

        return response;
    } catch (err) {
        throw err;
    }
};

const VerifyOtp = async (phone, otp) => {
    try {
        const response = await client.verify.v2
            .services(twilioServiceSid)
            .verificationChecks.create({
                to: phone,
                code: otp
            });

        return response.status === "approved";
    } catch (err) {
        throw err;
    }
};

module.exports = {
    SendOtp,
    VerifyOtp
};