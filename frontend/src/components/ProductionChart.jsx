import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { time: "08:00", production: 120 },
  { time: "09:00", production: 140 },
  { time: "10:00", production: 135 },
  { time: "11:00", production: 160 },
  { time: "12:00", production: 150 },
  { time: "13:00", production: 180 },
];

function ProductionChart() {

  return (
    <div className="chart-container">

      <h2>Produção em Tempo Real</h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="production"
            stroke="#3b82f6"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ProductionChart;
