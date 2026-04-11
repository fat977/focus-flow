import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-sm font-bold"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="var(--grey-500)"
        className="text-xs"
      >
        {`Projects: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="var(--grey-900)"
        className="text-xs font-semibold"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const ProjectAnalytics = ({ data, totalProjects, rawStats }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const COLORS = [
    "var(--success-600)",
    "var(--warning-600)",
    "var(--danger-600)",
  ];

  const calculatePerc = (val) =>
    totalProjects > 0 ? (val / totalProjects) * 100 : 0;

  return (
    <div className="w-full bg-(--grey-50) rounded-xl shadow-sm p-6 border border-(--grey-200)">
      <h1 className="text-xl font-bold text-(--text-main) mb-6">
        Project Progress Analytics
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* PieChart */}
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Details & Progress Bars */}
        <div className="w-full md:w-1/2 space-y-5">
          <div>
            <h2 className="text-sm font-medium text-(--grey-500) uppercase tracking-wider">
              Total Projects
            </h2>
            <p className="text-4xl font-black text-(--grey-900)">
              {totalProjects}
            </p>
          </div>

          <div className="space-y-4">
            <ProgressBar
              label="Completed"
              count={rawStats?.completedBoards}
              percent={calculatePerc(rawStats?.completedBoards)}
              color="bg-[var(--success-600)]"
            />
            <ProgressBar
              label="In Progress"
              count={rawStats?.inProgressBoards}
              percent={calculatePerc(rawStats?.inProgressBoards)}
              color="bg-[var(--warning-600)]"
            />
            <ProgressBar
              label="Not Started"
              count={rawStats?.todoBoards}
              percent={calculatePerc(rawStats?.todoBoards)}
              color="bg-[var(--danger-600)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ label, count, percent, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm font-medium">
      <span className="text-(--grey-600)">
        {label}: {count || 0}
      </span>
      <span className="text-(--grey-400)">{percent.toFixed(0)}%</span>
    </div>
    <div className="w-full bg-(--grey-200) h-2 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default ProjectAnalytics;
