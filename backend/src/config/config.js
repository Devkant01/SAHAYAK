module.exports = {
    dbString: process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost:27017/cvinsight',
    accessJwtSecret: process.env.ACCESS_JWT_SECRET || "write_a_strong_jwt_secret_key_here",
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET || "write_a_strong_refresh_jwt_secret_key_here",
    sandboxApiKey: process.env.SANDBOX_API_KEY || "your_sandbox_api_key_here",
    sandboxSecretKey: process.env.SANDBOX_API_SECRET || "your_sandbox_secret_key_here",
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || "your_twilio_account_sid_here",
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || "your_twilio_auth_token_here",
    twilioServiceSid: process.env.TWILIO_SERVICE_SID || "your_twilio_service_sid_here",
    cloudApiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudApiSecret: process.env.CLOUDINARY_API_SECRET,
    port: process.env.PORT || 3000,
    pswSaltRounds: 13
}