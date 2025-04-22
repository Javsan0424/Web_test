import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/calculate", (req:any, res:any) => {
  const { num1, num2, op } = req.body;

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  let result: number;

  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        return res.status(400).json({ error: "Cannot divide by zero" });
      }
      result = a / b;
      break;
    default:
      return res.status(400).json({ error: "Invalid operator" });
  }

  const operation = `${a} ${op} ${b} = ${result}`;
  res.json({ operation });
});

app.listen(PORT, () => {
  console.log(`Calculator API running on http://localhost:${PORT}`);
});
