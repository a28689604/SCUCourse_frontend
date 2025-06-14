import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CourseStatistic = ({ data }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "12px 16px",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <p
            style={{ margin: 0, color: "#1e293b", fontWeight: "600" }}
          >{`分數區間: ${label}`}</p>
          <p style={{ margin: "4px 0 0 0", color: "#3b82f6" }}>
            {`人數: ${payload[0].value}人`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barCategoryGap="20%"
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e2e8f0"
          vertical={false}
          horizontalPoints={[]}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 12,
            fill: "#64748b",
            fontWeight: "500",
          }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          width={40}
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 12,
            fill: "#64748b",
            fontWeight: "500",
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            fill: "rgba(59, 130, 246, 0.1)",
            radius: 4,
          }}
        />
        <Bar
          dataKey="人數"
          fill="url(#colorGradient)"
          radius={[4, 4, 0, 0]}
          maxBarSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CourseStatistic;
