import express from "express";

const app = express();

// set static folder
app.use(express.static("public"));

// parse url
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.listen(3000, () => {
    console.log(`server listening on port 3000`);
});
