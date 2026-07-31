const { GoogleGenAI } = require("@google/genai");

const Ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const workerCategories = new Set([
    "cook",
    "plumber",
    "electrician",
    "carpenter",
    "painter",
    "cleaner",
    "gardener",
    "locksmith",
    "photographer",
    "appliance-repair",
    "pest-control",
    "cctv-installer",
    "packers-movers",
    "vehicle-mechanic",
]);

async function GenerateTaskDescription({
    Title,
    Category,
    Images = [],
}) {

    const Prompt = `
You are an AI assistant for a local service marketplace called Sahayak. Generate a detailed description that a customer would naturally write while requesting a local service.

Avoid unnecessary marketing language.

Mention only things that can be inferred from the provided information -
- the title
- selected category
- uploaded images.

Task Title:
${Title}

Selected Category:
${Category || "Not Selected"}

Instructions:

1. Analyze all uploaded images carefully.
2. If category is not selected, suggest the most appropriate category.
3. Generate a professional task description.
4. Keep the description between 40 and 80 words.
5. Do not mention anything that is not visible in the images.
6. Return ONLY valid JSON.

{
    "category": "",
    "description": ""
}
`;

    const Contents = [
        {
            text: Prompt,
        },
    ];

    Images.forEach((Image) => {
        Contents.push({
            inlineData: {
                mimeType: Image.mimetype,
                data: Image.buffer.toString("base64"),
            },
        });
    });

    const Response = await Ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: Contents,
        config: {
            responseMimeType: "application/json",
        },
    });
    console.log("AI Response:", Response.text);
    if (!workerCategories.has(Response.text.category)) {
        Response.text.category = "other";
    }
    return JSON.parse(Response.text);
}

module.exports = {
    GenerateTaskDescription,
};