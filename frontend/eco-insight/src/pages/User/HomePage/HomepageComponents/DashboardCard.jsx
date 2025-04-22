import React from 'react';

export default function DashboardCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <div className="flex-1">{children}</div>
    </div>
  );
}