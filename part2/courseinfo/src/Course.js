const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => <p>
  {part.name} {part.exercises}
</p>;

const Content = ({ parts }) => <>
  {parts.map((part) => <Part key={part.id} part={part} />
  )}
</>;

export const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={parts.reduce((acc, { exercises }) => acc + exercises, 0)} />
    </div>
  );
};
