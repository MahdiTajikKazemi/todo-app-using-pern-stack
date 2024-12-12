const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

//psql -u postgres
