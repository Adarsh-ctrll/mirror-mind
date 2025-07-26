"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useMemo } from "react";

// Maps moods to numerical values for charting.
const moodToValue: { [key: string]: number } = {
  joy: 5,
  calm: 4,
  neutral: 3,
  anxious: 2,
  sadness: 1,
  anger: 0
};

// Maps numerical values back to moods for the Y-axis labels.
const valueToMood = ["anger", "sadness", "anxious", "neutral", "calm", "joy"];

export default function MoodChart({ data }: { data: any[] }) {
  // Memoizes chart data to prevent recalculation on every render.
  const chartData = useMemo(() => {
    return data
      .slice(0, 7)
      .reverse()
      .map((entry) => ({
        date: new Date(entry.createdAt.seconds * 1000).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric" }
        ),
        moodValue: moodToValue[entry.mood] ?? 3, // Default to neutral if mood is undefined
        mood: entry.mood
      }));
  }, [data]);

  return (
    <div
      className="bg-parchment/10 p-4 rounded-lg border border-yellow-700/20"
      style={{ fontFamily: "sans-serif" }}
    >
      <h3 className="font-lumos text-xl text-parchment mb-4 text-center">
        Your Recent Mood Spellwork
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis
            dataKey="date"
            stroke="#FBF5E6"
            tick={{ fill: "#FBF5E6" }}
          />
          <YAxis
            stroke="#FBF5E6"
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tickFormatter={(value) => valueToMood[value]}
            tick={{ fill: "#FBF5E6" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0c0a09",
              border: "1px solid #F5EEDC"
            }}
            labelStyle={{ color: "#FFD700" }}
            formatter={(value, name, props) => [
              `${props.payload.mood}`,
              "Mood"
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="moodValue"
            name="Mood"
            stroke="#FFD700"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
