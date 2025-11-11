import React, { useEffect, useState } from "react";

const CreateDestination = () => {
  const [destinationType, setDestinationType] = useState("Domestic"); // Default to Domestic
  const [formData, setFormData] = useState({
    countryName: "India",
    state: "",
    destinationName: "",
  });

  const [statesList, setStatesList] = useState([]);
  const [filterType, setFilterType] = useState("All");

  // 🧩 Dummy State Lists (In real app, replace with API call)
  const domesticStates = [
    "Maharashtra",
    "Delhi",
    "Rajasthan",
    "Gujarat",
    "Karnataka",
  ];
  const internationalStates = [
    "California",
    "Île-de-France",
    "Tokyo",
    "Queensland",
    "Ontario",
  ];

  // 🧩 Dummy Destinations Table
  const dummyDestinations = [
    { id: 1, type: "Domestic", country: "India", state: "Maharashtra", destination: "Goa" },
    { id: 2, type: "Domestic", country: "India", state: "Delhi", destination: "Delhi City Tour" },
    { id: 3, type: "Domestic", country: "India", state: "Rajasthan", destination: "Jaipur Heritage" },
    { id: 4, type: "International", country: "USA", state: "California", destination: "Golden Gate" },
    { id: 5, type: "International", country: "France", state: "Île-de-France", destination: "Paris Tour" },
    { id: 6, type: "International", country: "Japan", state: "Tokyo", destination: "Tokyo Explorer" },
  ];

  // ✅ Load States automatically based on Type
  useEffect(() => {
    if (destinationType === "Domestic") {
      setStatesList(domesticStates);
      setFormData((prev) => ({
        ...prev,
        countryName: "India",
        state: "",
      }));
    } else {
      setStatesList(internationalStates);
      setFormData((prev) => ({
        ...prev,
        countryName: "",
        state: "",
      }));
    }
  }, [destinationType]);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Checkbox Change
  const handleCheckboxChange = (type) => {
    setDestinationType(type);
  };

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      destinationType,
      ...formData,
    });
    alert("Destination saved successfully ✅");
  };

  // ✅ Filtered Data
  const filteredData =
    filterType === "All"
      ? dummyDestinations
      : dummyDestinations.filter((d) => d.type === filterType);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Destination
      </h2>

      {/* ✅ Destination Type Selection */}
      <div className="flex gap-6 mb-6 justify-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={destinationType === "Domestic"}
            onChange={() => handleCheckboxChange("Domestic")}
          />
          Domestic
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={destinationType === "International"}
            onChange={() => handleCheckboxChange("International")}
          />
          International
        </label>
      </div>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        {/* Country */}
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
            readOnly={destinationType === "Domestic"}
            className={`w-full border border-gray-300 rounded-md p-2 ${
              destinationType === "Domestic" ? "bg-gray-100" : ""
            } focus:outline-none focus:ring-2 focus:ring-black`}
          />
        </div>

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select state</option>
            {statesList.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Destination Name
          </label>
          <input
            type="text"
            name="destinationName"
            value={formData.destinationName}
            onChange={handleInputChange}
            placeholder="Enter destination name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Save Destination
        </button>
      </form>

      {/* ✅ Table Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Destination List</h3>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {["All", "Domestic", "International"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1 rounded-md border ${
                  filterType === type
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
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
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Destination
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
                    <td className="border border-gray-200 px-4 py-2">{d.type}</td>
                    <td className="border border-gray-200 px-4 py-2">{d.country}</td>
                    <td className="border border-gray-200 px-4 py-2">{d.state}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {d.destination}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 border border-gray-200"
                  >
                    No destinations found.
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

export default CreateDestination;
