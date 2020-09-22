const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//app.use(express.bodyParser());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const mountRoutes = require('./routers');

mountRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));