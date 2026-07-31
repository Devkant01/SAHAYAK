const {
    GenerateTaskDescription,
} = require("../../services/aiIntegration");

async function getAIDescriptionController(req, res) {

    try {

        const { title, category } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const Result = await GenerateTaskDescription({
            Title: title,
            Category: category,
            Images: req.files || [],
        });

        return res.status(200).json({
            message: "AI Description generated successfully",
            ...Result,
        });

    } catch (err) {

        console.log("AI Error:", err);

        return res.status(500).json({
            message: "Unable to generate description.",
        });

    }
}

module.exports = {
    getAIDescriptionController,
};