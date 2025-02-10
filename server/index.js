const express = require("express");
const cors = require("cors");

const app = express();
const mainRoute = require('./routes/routes')
app.use(cors());
app.use(express.json());

app.use("/api", mainRoute);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
