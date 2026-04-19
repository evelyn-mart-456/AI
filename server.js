const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors()); // allow all origins for now (debug mode)

app.post("/generate-study", (req, res) => {
    try {
        console.log("Request received:", req.body);

        const { notes } = req.body;

        if (!notes) {
            return res.json({
                summary: "No notes provided",
                questions: []
            });
        }

        const summary = `Summary: ${notes}`;

        const questions = [
            "What is the main idea?",
            "What are the key concepts?",
            "Why is this important?"
        ];

        return res.json({ summary, questions });

    } catch (err) {
        console.error(err);
        return res.json({
            summary: "Server error",
            questions: []
        });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});