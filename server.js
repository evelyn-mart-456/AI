const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: "https://evelyn-mart-456.github.io"
}));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

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
        console.error("ERROR:", err);

        // NEVER crash the response
        return res.json({
            summary: "Server error (check backend)",
            questions: []
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});