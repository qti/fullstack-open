import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState([])

  const calcuateAverage = () => {
    return average.length === 0 ? 0 : average.reduce((acc, _) => acc + _) / average.length
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => {
        setAverage(average.concat(1))
        setGood(good + 1)
      }}>good</button>
      <button onClick={() => {
        setAverage(average.concat(0))
        setNeutral(neutral + 1)
      }}>neutral</button>
      <button onClick={() => {
        setAverage(average.concat(-1))
        setBad(bad + 1)
      }}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {calcuateAverage()}</p>
      <p>all {good + neutral + bad}</p>
    </div>
  )
}

export default App
