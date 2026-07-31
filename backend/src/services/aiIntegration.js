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
    "other"
]);

async function GenerateTaskDescription({
    Title,
    Category,
    Images = [],
}) {

    const Prompt = `
# Role

You are an AI assistant for **Sahayak**, a local service marketplace that connects customers with trusted service providers.

# Available Categories

Choose only one category from the following list when a category is not provided:

${Array.from(workerCategories).join(", ")}

# User Input

Task Title:
${Title}

Selected Category:
${Category || "Not Provided"}

Uploaded Images:
${Images.length > 0 ? `${Images.length} image(s) provided` : "No images provided"}

# Instructions

1. Carefully analyze every uploaded image.
2. Use the task title, selected category, and uploaded images together to understand the user's problem.
3. If a category is already selected, keep it unchanged.
4. If no category is selected, choose exactly one category from the available categories listed above.
5. Generate a natural, professional task description that a customer would realistically submit.
6. Keep the description between 40 and 80 words.
7. Mention only information that can reasonably be inferred from the provided title and images.
8. Do not invent missing details or make assumptions that are not supported by the inputs.
9. Do not use marketing language or promotional phrases.

# Output Format

Return ONLY valid JSON.

{
    "category": "<category>",
    "description": "<generated_description>"
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
    
    return JSON.parse(Response.text);
}

module.exports = {
    GenerateTaskDescription,
};