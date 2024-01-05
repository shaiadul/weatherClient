"use client";
import { useEffect, useState } from "react";
import { Package } from "@/types/package";

interface TableThreeProps {}

const TableThree: React.FC<TableThreeProps> = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10; // Set your desired page size
  const [filteredData, setFilteredData] = useState<Package[]>([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
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
        // Assuming your packageData is an array of packages
        setFilteredData(data?.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const applyFilters = () => {
    // Customize this logic based on your data structure
    const filteredResult = weatherData?.data.filter((item: any) => {
      return (
        item.end_year.includes(filters.endYear) &&
        item.topic.includes(filters.topic) &&
        item.sector.includes(filters.sector) &&
        item.region.includes(filters.region) &&
        item.pestle.includes(filters.pestle) &&
        item.source.includes(filters.source) &&
        item.country.includes(filters.country)
      );
    });

    setFilteredData(filteredResult || []);
  };

  const filteredAndPagedData = filteredData?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Your other components */}
      <div className="max-w-full overflow-x-auto">
        <div className="flex space-x-4 mb-4">
          {/* Example filter dropdown, repeat for other filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Year
            </label>
            <select
              className="mt-1 p-2 border border-none outline-none rounded-md w-30 bg-body"
              onChange={(e) => handleFilterChange("endYear", e.target.value)}
            >
              <option value="">All</option>
              {Array.from(
                new Set(weatherData?.data.map((item: any) => item.end_year))
              ).map((year: any) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Topic
            </label>
            <select
              className="mt-1 p-2 border border-none outline-none rounded-md w-34 bg-body"
              onChange={(e) => handleFilterChange("topic", e.target.value)}
            >
              <option value="">All</option>
              {Array.from(
                new Set(weatherData?.data.map((item: any) => item.topic))
              ).map((top: any) => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sector
            </label>
            <select
              className="mt-1 p-2 border border-none outline-none rounded-md w-34 bg-body"
              onChange={(e) => handleFilterChange("sector", e.target.value)}
            >
              <option value="">All</option>
              {Array.from(
                new Set(weatherData?.data.map((item: any) => item.sector))
              ).map((sec: any) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
            </label>
            <select
              className="mt-1 p-2 border border-none outline-none rounded-md w-34 bg-body"
              onChange={(e) => handleFilterChange("country", e.target.value)}
            >
              <option value="">All</option>
              {Array.from(
                new Set(weatherData?.data.map((item: any) => item.country))
              ).map((country: any) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Region
            </label>
            <select
              className="mt-1 p-2 border border-none outline-none rounded-md w-34 bg-body"
              onChange={(e) => handleFilterChange("region", e.target.value)}
            >
              <option value="">All</option>
              {Array.from(
                new Set(weatherData?.data.map((item: any) => item.region))
              ).map((reg: any) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pestle
            </label>
            <select
              className="mt-1 p-2 border border-none outline-none rounded-md w-34 bg-body"
              onChange={(e) => handleFilterChange("pestle", e.target.value)}
            >
              <option value="">All</option>
              {Array.from(
                new Set(weatherData?.data.map((item: any) => item.pestle))
              ).map((pest: any) => (
                <option key={pest} value={pest}>
                  {pest}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source
            </label>
            <select
              className="mt-1 p-2 border border-none outline-none rounded-md w-34 bg-body"
              onChange={(e) => handleFilterChange("source", e.target.value)}
            >
              <option value="">All</option>
              {Array.from(
                new Set(weatherData?.data.map((item: any) => item.source))
              ).map((source: any) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md bg-black"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm leading-4 text-gray-500 dark:text-gray-400 border-b-2 rounded-md">
              <th className="px-2.5 py-3.5 text-left">E-Year</th>
              <th className="px-2.5 py-3.5 text-left">Added</th>
              <th className="px-2.5 py-3.5 text-left">Topic</th>
              <th className="px-2.5 py-3.5 text-left">Sector</th>
              <th className="px-2.5 py-3.5 text-left">Country</th>
              <th className="px-2.5 py-3.5 text-left">Region</th>
              <th className="px-2.5 py-3.5 text-left">Pestle</th>
              <th className="px-2.5 py-3.5 text-left">Source</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium leading-4 text-gray-500 dark:text-gray-400">
            {filteredAndPagedData?.map((item: any, index) => (
              <tr key={item?._id}>
                <td className="px-2.5 py-3.5">{item?.end_year}</td>
                <td className="px-2.5 py-3.5">{item?.added}</td>
                <td className="px-2.5 py-3.5">{item?.topic}</td>
                <td className="px-2.5 py-3.5">{item?.sector}</td>
                <td className="px-2.5 py-3.5">{item?.country}</td>
                <td className="px-2.5 py-3.5">{item?.region}</td>
                <td className="px-2.5 py-3.5">{item?.pestle}</td>
                <td className="px-2.5 py-3.5">{item?.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-5 mt-10 flex justify-between items-center">
          <button
            className="bg-black px-3 text-bodydark1 rounded-md hover:bg-opacity-70 duration-500"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>
            Page <strong>{currentPage + 1}</strong>
          </span>
          <button
            className="bg-black px-3 text-bodydark1 rounded-md hover:bg-opacity-70 duration-500"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={(currentPage + 1) * pageSize >= filteredData?.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableThree;
