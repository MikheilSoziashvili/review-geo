interface StatusBadgeProps {
    status: string;
  }
  
  export function StatusBadge({ status }: StatusBadgeProps) {
    const base = "px-2 py-0.5 text-xs rounded-full font-medium";
  
    const colorMap: Record<string, string> = {
      approved: "bg-green-100 text-green-700",
      active: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      suspended: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
  
    const statusClass = colorMap[status.toLowerCase()] || "bg-gray-100 text-gray-600";
  
    return <span className={`${base} ${statusClass}`}>{status}</span>;
  }
  