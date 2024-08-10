const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const { rootRouter } = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(PORT);