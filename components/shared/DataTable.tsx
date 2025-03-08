export default function DataTable({ data }: { data: any[] }) {
    return (
      <table className="w-full border-collapse border border-gray-400 mt-4">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Test Name</th>
            <th className="border border-gray-300 px-4 py-2">Temperature</th>
            <th className="border border-gray-300 px-4 py-2">Speed</th>
            <th className="border border-gray-300 px-4 py-2">Altitude</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center border border-gray-300">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.test_name}</td>
              <td className="px-4 py-2">{item.temperature}°C</td>
              <td className="px-4 py-2">{item.speed} km/h</td>
              <td className="px-4 py-2">{item.altitude} m</td>
              <td className="px-4 py-2">{item.passed ? "Passed" : "Failed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  