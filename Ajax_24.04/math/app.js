const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());



app.all("/math", (req, res) => {
  let x, y;

  if (req.method === "GET") 
  {
    x = parseInt(req.query.x);
    y = parseInt(req.query.y);
} 

    else if (req.method === "POST") 
    {
    x = parseInt(req.body.x);
    y = parseInt(req.body.y);
}


  if (isNaN(x) || isNaN(y)) 
  {
    return res.status(400).send("Invalid input");
  }


  const result = 
  {
    sum: x + y,
    difference: x - y,
    product: x * y,
    quotient: x / y,
  };
  res.json(result);
});

app.use(express.static("client"));

app.listen(PORT, () => 
{
  console.log(`Server running on http://localhost:${PORT}`);
});
