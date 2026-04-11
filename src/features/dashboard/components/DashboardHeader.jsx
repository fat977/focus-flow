// components/dashboard/DashboardHeader.jsx
export default function DashboardHeader({ userName }) {
  const hours = new Date().getHours();
  const greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-(--text-main) tracking-tight">
        {greeting}, {userName?.split(' ')[0] || 'User'}! 👋
      </h1>
      <p className="text-(--grey-400) mt-1">
        Here's what's happening with your projects today.
      </p>
    </div>
  );
}