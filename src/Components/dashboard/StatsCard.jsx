export default function StatsCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}