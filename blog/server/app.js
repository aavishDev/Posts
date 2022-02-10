const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const PORT = 5000;
const API_DELAY = 1500;

const app = express();

app.use(cors());

// delay response
app.use(function (req, res, next) {
  setTimeout(next, API_DELAY);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
