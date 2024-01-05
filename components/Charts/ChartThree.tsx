"use client";

import React, { useEffect, useState } from "react";
interface ChartThreeState {
  topicCounts: Record<string, number>;
}

const ChartThree: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [state, setState] = useState<ChartThreeState>({
    topicCounts: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://weather-kappa-five.vercel.app/api/v1/weather/information"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData && weatherData.data) {
      const topics = weatherData.data.map((item: any) => item.topic);
      const topicCountMap: Record<string, number> = {};

      topics.forEach((topic: string) => {
        topicCountMap[topic] = (topicCountMap[topic] || 0) + 1;
      });

      setState({ topicCounts: topicCountMap });
    }
  }, [weatherData]);

  const renderCustomBarChart = () => {
    const colors = ["#10B981", "#375E83", "#259AE6", "#FFA70B"];
    const labels = Object.keys(state.topicCounts);
    const data = Object.values(state.topicCounts);

    const maxValue = Math.max(...data);
    const scaleFactor = 600 / maxValue; // Scale the bars based on the maximum value

    return (
      <svg width="400" height="200">
        {data.map((value, index) => (
          <rect
            key={labels[index]}
            x={index * 80}
            y={200 - value * scaleFactor}
            width="60"
            height={value * scaleFactor}
            fill={colors[index % colors.length]}
          />
        ))}
      </svg>
    );
  };
  const getColor = (index: number): string => {
    const colors = ["#10B981", "#375E83", "#8FD0EF", "#0FADCF"];
    return colors[index % colors.length];
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Topic Analytics
          </h5>
        </div>
      </div>

      <div className="mb-5 flex justify-center mx-auto">{renderCustomBarChart()}</div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {Object.entries(state.topicCounts).map(([topic, percentage], index) => (
          <div className="w-full px-8 sm:w-1/2" key={topic}>
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-${getColor(
                  index
                )}`}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{topic}</span>
                <span>{percentage}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
