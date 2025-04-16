const SummaryCard = ({ icon, title, value, change, positive }) => (
  <div className="flex items-center gap-3 bg-white shadow rounded-xl px-5 py-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
      <p className={`text-sm ${positive ? "text-green-500" : "text-red-500"}`}>
        {change} this month
      </p>
    </div>
  </div>
);

export default SummaryCard;
