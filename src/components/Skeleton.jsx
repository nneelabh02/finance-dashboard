export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-200 rounded-2xl" />
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64 bg-slate-200 rounded-2xl" />
        <div className="h-64 bg-slate-200 rounded-2xl" />
      </div>

      {/* Table */}
      <div className="h-64 bg-slate-200 rounded-2xl" />
    </div>
  );
}