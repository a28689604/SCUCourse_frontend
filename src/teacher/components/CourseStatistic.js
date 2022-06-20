import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CourseStatistic = (props) => {
  return (
    <ResponsiveContainer width="95%" height={400}>
      <BarChart data={props.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar dataKey="人數" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CourseStatistic;
