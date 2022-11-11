import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, average } = props

  const calcuateAverage = () => {
    return average.length === 0 ? 0 : average.reduce((acc, _) => acc + _) / average.length
  }

  return (
    <>
      <h1>statistics</h1>
      {average.length > 0 ?
        <>
          <table>
            <tr>
              <StatisticsLine text="good" value={good} />
            </tr>
            <tr>
              <StatisticsLine text="neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticsLine text="bad" value={bad} />
            </tr>
            <tr>
              <td>average</td>
              <td>{calcuateAverage()}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{good + neutral + bad}</td>
            </tr>
          </table>
        </>
      : <p>No feedback given</p>}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState([])

  

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
      <Statistics good={good} neutral={neutral} bad={bad} average={average} />
    </div>
  )
}

export default App
