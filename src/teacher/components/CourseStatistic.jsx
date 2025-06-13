import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CourseStatistic = props => {
  return (
    <ResponsiveContainer width="99%" aspect={1.5}>
      <BarChart data={props.data}>
        <XAxis dataKey="name" />
        <YAxis width={20} />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar dataKey="人數" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CourseStatistic;
