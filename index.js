const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const routes = require('./config/routes');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(routes);

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
