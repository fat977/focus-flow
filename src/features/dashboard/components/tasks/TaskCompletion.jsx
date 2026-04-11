import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const TaskCompletion = ({ data, tasksStat,totalTasks }) => {
  const COLORS = {
    Completed: ["#00C49F", "#008a6f"], 
    "In Progress": ["#FFBB28", "#d49200"],
    "Not Started": ["#FF8042", "#cc5216"],
  };

  return (
    <div className="w-full h-full bg-(--grey-50) rounded-xl shadow-sm p-6 border border-(--grey-200)">
      <h1 className="text-xl font-bold text-(--text-main) mb-6">
       Task Completion
      </h1>
      <div className="flex flex-col items-center gap-8">
        {/* PieChart */}
        <div className="w-full md:w-1/2 h-50">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* هنا بنعرف التدرجات اللونية (Gradients) */}
              <defs>
                {data.map((entry, index) => (
                  <linearGradient
                    key={`grad-${index}`}
                    id={`colorGradient${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS[entry.name][0]}
                      stopOpacity={1}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS[entry.name][1]}
                      stopOpacity={1}
                    />
                  </linearGradient>
                ))}
              </defs>

              <Pie
                data={data}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#colorGradient${index})`} // نستخدم الـ ID اللي عرفناه في الـ defs
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2  items-center">
            <span>Completed</span>
            {(tasksStat?.completedTasks/totalTasks)*100}%
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>In Progress</span>
            {(tasksStat?.inProgressTasks / totalTasks)*100}%
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>Not Started</span>
            {(tasksStat?.notStartedTasks/totalTasks)*100}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletion;
