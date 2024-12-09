type Props = {
  label: string;
  value: string;
  percentage: number;
};

export function StatCard({ label, value, percentage }: Props) {
  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="w-full bg-base-300 rounded-full h-2 mt-2">
        <div
          className="bg-primary h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
