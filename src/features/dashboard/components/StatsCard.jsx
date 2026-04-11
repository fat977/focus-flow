function StatsCard({ title, value, icon, color }) {
  return (
    <div
      className={`bg-(--grey-0)  p-6 rounded-2xl shadow-xl border border-(--grey-100) hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-(--grey-700) mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-(--grey-700)">{value}</h3>
        </div>

        <div className={`${color} p-3 rounded-xl`}>{icon}</div>
      </div>
    </div>
  );
}

export default StatsCard;
