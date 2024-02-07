import { type EventType } from "@prisma/client";

export default function BarChart({
  analyticsData,
}: {
  analyticsData: Record<EventType, number>;
}) {
  return (
    <>
      {Object.entries(analyticsData).map(([key, value]) => (
        <p key={key} className="text-base">
          {key}: {value}
        </p>
      ))}
    </>
  );
}
