import React, { useState } from "react";

const CreateState = () => {
  const [stateType, setStateType] = useState("Domestic"); // Default to Domestic
  const [formData, setFormData] = useState({
    countryName: "India",
    stateName: "",
  });

  const [filterType, setFilterType] = useState("All");

  // 🧩 Dummy Data
  const dummyStates = [
    { id: 1, type: "Domestic", country: "India", state: "Maharashtra" },
    { id: 2, type: "Domestic", country: "India", state: "Delhi" },
    { id: 3, type: "Domestic", country: "India", state: "Rajasthan" },
    { id: 4, type: "International", country: "USA", state: "California" },
    { id: 5, type: "International", country: "France", state: "Île-de-France" },
    { id: 6, type: "International", country: "Japan", state: "Tokyo" },
  ];

  // ✅ Handle Checkbox Change
  const handleCheckboxChange = (type) => {
    setStateType(type);
    setFormData({
      countryName: type === "Domestic" ? "India" : "",
      stateName: "",
    });
  };

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      stateType,
      ...formData,
    });

    alert("State saved successfully ✅");
  };

  // ✅ Filter Data
  const filteredData =
    filterType === "All"
      ? dummyStates
      : dummyStates.filter((d) => d.type === filterType);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create State</h2>

      {/* ✅ Type Checkboxes */}
      <div className="flex gap-6 mb-6 justify-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={stateType === "Domestic"}
            onChange={() => handleCheckboxChange("Domestic")}
          />
          Domestic
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={stateType === "International"}
            onChange={() => handleCheckboxChange("International")}
          />
          International
        </label>
      </div>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        {stateType === "Domestic" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">
                Country Name
              </label>
              <input
                type="text"
                name="countryName"
                value="India"
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                State Name
              </label>
              <input
                type="text"
                name="stateName"
                value={formData.stateName}
                onChange={handleInputChange}
                placeholder="Enter state name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </>
        )}

        {stateType === "International" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">
                Country Name
              </label>
              <input
                type="text"
                name="countryName"
                value={formData.countryName}
                onChange={handleInputChange}
                placeholder="Enter country name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                State Name
              </label>
              <input
                type="text"
                name="stateName"
                value={formData.stateName}
                onChange={handleInputChange}
                placeholder="Enter state name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Save State
        </button>
      </form>

      {/* ✅ Table Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">State List</h3>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("All")}
              className={`px-4 py-1 rounded-md border ${
                filterType === "All"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("Domestic")}
              className={`px-4 py-1 rounded-md border ${
                filterType === "Domestic"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Domestic
            </button>
            <button
              onClick={() => setFilterType("International")}
              className={`px-4 py-1 rounded-md border ${
                filterType === "International"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              International
            </button>
          </div>
        </div>

        {/* ✅ Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">#</th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Type
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Country
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((d, index) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {d.type}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {d.country}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {d.state}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 py-4 border border-gray-200"
                  >
                    No states found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateState;
