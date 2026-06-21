const { Worker } = require("../../models/user");
const { generateOtp, verifyOtp } = require("../../utils/verifyAadhar");

async function VerifyAadharController(req, res) {
    const { aadharNumber } = req.body;

    if (!aadharNumber) {
        return res.status(400).json({
            message: "aadharNumber is required"
        });
    }

    try {
        const existingWorker = await Worker.findOne({
            "aadhar.number": aadharNumber
        });

        if (existingWorker) {
            return res.status(409).json({
                message: "Aadhar number already exists"
            });
        }
        const otpResponse = await generateOtp(aadharNumber);
        console.log("OTP Response:", otpResponse);
        return res.status(200).json({
            message: "OTP sent successfully",
            referenceId: otpResponse.data?.reference_id || otpResponse.data?.referenceid
        });

    } catch (err) {
        console.log("Error in VerifyAadharController:", err);
        return res.status(err.status || 500).json({
            message: err.message || "Internal Server Error"
        });
    }
}

async function VerifyAadharOtpController(req, res) {
    const { referenceId, otp } = req.body;
    const workerId = req.user.objectId;
    if (!referenceId || !otp) {
        return res.status(400).json({
            message: "referenceId and otp are required"
        });
    }

    try {
        console.log("Verifying OTP with referenceId:", referenceId, "and otp:", otp);
        const verifyResponse = await verifyOtp(referenceId, otp);

        if (verifyResponse.status !== "VALID") {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        await Worker.findByIdAndUpdate(
            workerId,
            {
                $set: {
                    "aadhar.number": verifyResponse.aadharNumber,
                    "aadhar.isVerified": true
                }
            }
        );

        return res.status(200).json({
            message: "Aadhar verified successfully"
        });

    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message || "Internal Server Error"
        });
    }
}

module.exports = {
    VerifyAadharController,
    VerifyAadharOtpController
};