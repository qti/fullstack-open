const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Content = ({ parts }) => (
    <>
      {parts.map(part => <Part key={part.name} part={part.name} exercise={part.exercises}/>)}
    </>
)

const Part = ({ part, exercise }) => (
  <>
    <p>
      {part} {exercise}
    </p>
  </>
)

const Total = ({ parts }) => (
  <>
    <p>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course} />
//       <Content
//         parts={{ part1, part2, part3 }}
//         exercises={{ exercises1, exercises2, exercises3 }}/>
//       <Total exercises={{ exercises1, exercises2, exercises3 }} />
//     </div>
//   )
// }

export default App
