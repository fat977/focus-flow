export default function FilterGroup({ title, children }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-(--text-muted)">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
