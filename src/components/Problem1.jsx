import { useState } from 'react'

function sumWithLoop(n) {
  let sum = 0
  for (let i = 1; i <= n; i++) sum += i
  return sum
}

function sumWithFormula(n) {
  return (n * (n + 1)) / 2
}

function sumWithRecursion(n) {
  if (n <= 0) return 0
  return n + sumWithRecursion(n - 1)
}

export default function Problem1() {
  const [n, setN] = useState(10)
  const [result, setResult] = useState(null)

  const handleCalc = () => {
    const num = parseInt(n, 10)
    if (Number.isNaN(num) || num < 1) {
      setResult('Please enter a positive integer.')
      return
    }
    if (num > 10000) {
      setResult('n is limited to 10000 to avoid stack overflow with recursion.')
      return
    }
    setResult({
      loop: sumWithLoop(num),
      formula: sumWithFormula(num),
      recursion: sumWithRecursion(num),
    })
  }

  return (
    <>
      <h2>Problem 1: Three ways to sum to n</h2>
      <p className="description">
        Given a positive integer <code>n</code>, compute <code>1 + 2 + … + n</code> using three methods.
      </p>
      <div className="problem1-wrap">
        <label htmlFor="sum-n">Enter n:</label>
        <input
          id="sum-n"
          type="number"
          min={1}
          max={10000}
          value={n}
          onChange={(e) => setN(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCalc()}
        />
        <button type="button" onClick={handleCalc}>
          Calculate
        </button>
      </div>
      <div className="results">
        {result === null ? null : typeof result === 'string' ? (
          <div className="method">{result}</div>
        ) : (
          <>
            <div className="method"><strong>1. Loop:</strong> {result.loop}</div>
            <div className="method"><strong>2. Formula (n(n+1)/2):</strong> {result.formula}</div>
            <div className="method"><strong>3. Recursion:</strong> {result.recursion}</div>
          </>
        )}
      </div>
    </>
  )
}
