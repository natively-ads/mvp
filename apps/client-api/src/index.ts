import express from "express";


console.log("process.env.CLIENT_API_PORT: ", process.env.CLIENT_API_PORT);

const port = process.env.CLIENT_API_PORT || 3001;
const app = express();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
