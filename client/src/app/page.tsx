"use client";
import { useState } from "react";

export default function Home() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setError("");
    setResult("");

    try {
      // Client-side validation
      if (!num1 || !num2) {
        throw new Error("Please enter both numbers");
      }

      const response = await fetch("http://localhost:3001/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          num1: num1,
          num2: num2,
          op: op
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Calculation failed");
      }

      setResult(data.operation); // Show full operation string
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Calculation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Calculator</h1>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <input
            type="number"
            className="border p-2 w-24 text-center rounded"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Number"
          />

          <select
            className="border p-2 rounded"
            value={op}
            onChange={(e) => setOp(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>

          <input
            type="number"
            className="border p-2 w-24 text-center rounded"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Number"
          />
        </div>

        <div className="flex justify-center mb-4">
          <button
            className={`px-6 py-2 rounded text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } transition`}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {result && (
          <div className="text-xl font-semibold text-center p-4 bg-gray-50 rounded">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}