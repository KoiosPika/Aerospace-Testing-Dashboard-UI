"use client";

import { useState } from "react";

export default function TestFilter({ filters, setFilters, refetch }: any) {

    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e: any) => {
        setLocalFilters((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const applyFilters = () => {
        setFilters(localFilters);
        refetch();
      };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Filter Test Data</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <input
                    type="text"
                    name="testName"
                    placeholder="Test Name"
                    value={localFilters.testName}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    name="startDate"
                    value={localFilters.startDate}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    name="endDate"
                    value={localFilters.endDate}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="minTemperature"
                    placeholder="Min Temp"
                    value={localFilters.minTemperature}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="maxTemperature"
                    placeholder="Max Temp"
                    value={localFilters.maxTemperature}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="minSpeed"
                    placeholder="Min Speed"
                    value={localFilters.minSpeed}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="maxSpeed"
                    placeholder="Max Speed"
                    value={localFilters.maxSpeed}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="minAltitude"
                    placeholder="Min Altitude"
                    value={localFilters.minAltitude}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="maxAltitude"
                    placeholder="Max Altitude"
                    value={localFilters.maxAltitude}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <select
                    name="passed"
                    value={localFilters.passed}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="">All</option>
                    <option value="true">Passed</option>
                    <option value="false">Failed</option>
                </select>
                <select
                    name="sortBy"
                    value={localFilters.sortBy}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="timestamp">Date</option>
                    <option value="temperature">Temperature</option>
                    <option value="speed">Speed</option>
                    <option value="altitude">Altitude</option>
                </select>
                <select
                    name="order"
                    value={localFilters.order}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>
            <button
                onClick={applyFilters}
                className="mt-3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Apply Filters
            </button>
        </div>
    );
}
