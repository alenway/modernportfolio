import express from "express";
import axios from "axios"; // You'll need to install this: npm install axios

const app = express();

// set static folder
app.use(express.static("public"));

// parse url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a proxy route to handle the HTMX request
app.get("/api/todos", async (req, res) => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todo" });
    }
});

app.listen(3000, () => {
    console.log(`server listening on port 3000`);
});
