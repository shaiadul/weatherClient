"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import CardDataStats from "../CardDataStats";
import TableThree from "../Tables/TableThree";
// import Map from "../Maps/TestMap";

const ECommerce: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [totalIntensity, setTotalIntensity] = useState<number>(0);
  const [totalRelevance, setTotalRelevance] = useState<number>(0);
  const [totalLikelihood, setTotalLikeLihood] = useState<number>(0);

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

  // Calculate the total intensity when weatherData changes
  useEffect(() => {
    if (weatherData && weatherData.data) {
      const intensities = weatherData.data.map((item: any) => item.intensity);
      const sumIntensity = intensities.reduce(
        (acc: number, intensity: number) => acc + intensity,
        0
      );
      setTotalIntensity(sumIntensity);
    }
  }, [weatherData]);

  // Calculate the total relevance when weatherData changes
  useEffect(() => {
    if (weatherData && weatherData.data) {
      const relevances = weatherData.data.map((item: any) => item.relevance);
      const sumRelevance = relevances.reduce(
        (acc: number, relevance: number) => acc + relevance,
        0
      );
      setTotalRelevance(sumRelevance);
    }
  }, [weatherData]);

  // Calculate the total likelihood when weatherData changes
  useEffect(() => {
    if (weatherData && weatherData.data) {
      const likelihoods = weatherData.data.map((item: any) => item.likelihood);
      const sumLikelihood = likelihoods.reduce(
        (acc: number, likelihood: number) => acc + likelihood,
        0
      );
      setTotalLikeLihood(sumLikelihood);
    }
  }, [weatherData]);

  return (
    <>
      {weatherData ? (
        <section>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardDataStats
              title="Total Intensity"
              total={`${totalIntensity}`}
              rate="0.00%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
            <CardDataStats
              title="Total Relevance"
              total={`${totalRelevance}`}
              rate="0.00%"
              levelDown
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
            <CardDataStats
              title="Total Likelihood"
              total={`${totalLikelihood}`}
              rate="0.00%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
            <CardDataStats
              title="Total Weather Data"
              total={`${weatherData?.data?.length}`}
              rate="0.00%"
              levelDown
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ChartOne />
            <ChartTwo />

            <div className="col-span-12 ">
              <TableThree />
            </div>
            <ChartThree />
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-4">
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div className="h-48 rounded-t bg-bodydark1 dark:bg-black"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-body dark:bg-black-2">
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-full h-6 rounded bg-bodydark1 dark:bg-black"></div>
              <div className="w-3/4 h-6 rounded bg-bodydark1 dark:bg-black"></div>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default ECommerce;
