import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

const Designation = () => {
  const [formData, setFormData] = useState({
    designation: "",
    companyId: "",
    departmentId: "",
  });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [filters, setFilters] = useState({
    companyId: "",
    departmentId: "",
  });

  // ✅ Fetch companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch("http://localhost:4000/company/all");
      const data = await res.json();
      setCompanies(data.companies || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // ✅ Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:4000/department/department");
      const data = await res.json();
      console.log("Departments:", data);
      setDepartments(data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // ✅ Fetch designations and map with company & department
  const fetchDesignations = async () => {
    try {
      const res = await fetch("http://localhost:4000/designation");
      const data = await res.json();

      const mappedData = data.map((desig) => {
        // Handle both populated and non-populated data
        const companyObj =
          typeof desig.company === "object"
            ? desig.company
            : companies.find((c) => c._id === desig.company);

        const departmentObj =
          typeof desig.dep === "object"
            ? desig.dep
            : departments.find(
                (d) => d._id === desig.dep || d.dep === desig.dep
              );

        return {
          _id: desig._id,
          designation: desig.designation || "",
          companyId: companyObj?._id || desig.company || "",
          companyName: companyObj?.companyName || "N/A",
          departmentId: departmentObj?._id || "",
          departmentName:
            departmentObj?.dep ||
            (typeof desig.dep === "string" ? desig.dep : "N/A"),
        };
      });

      setDesignations(mappedData);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  // ✅ Initial Fetch
  useEffect(() => {
    fetchCompanies();
    fetchDepartments();
  }, []);

  // ✅ Once both companies & departments loaded, fetch designations
  useEffect(() => {
    if (companies.length > 0 && departments.length > 0) {
      fetchDesignations();
    }
  }, [companies, departments]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add Designation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.designation || !formData.companyId || !formData.departmentId) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/designation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designation: formData.designation,
          company: formData.companyId,
          dep: formData.departmentId,
        }),
      });

      if (!res.ok) throw new Error("Failed to add designation");

      const savedData = await res.json();

      const companyObj = companies.find((c) => c._id === formData.companyId);
      const departmentObj = departments.find(
        (d) => d._id === formData.departmentId
      );

      const newEntry = {
        _id: savedData._id || Date.now(),
        designation: savedData.designation,
        companyName: companyObj?.companyName || "",
        companyId: companyObj?._id || "",
        departmentName: departmentObj?.dep || "",
        departmentId: departmentObj?._id || "",
      };

      setDesignations((prev) => [newEntry, ...prev]);
      setFormData({ designation: "", companyId: "", departmentId: "" });
    } catch (error) {
      console.error("Error adding designation:", error);
      alert("Failed to add designation");
    }
  };

  // ✅ Delete Designation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this designation?"))
      return;

    try {
      const res = await fetch(`http://localhost:4000/designation/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete designation");
        return;
      }

      setDesignations((prev) => prev.filter((d) => d._id !== id));
      alert("Designation deleted successfully");
    } catch (error) {
      console.error("Error deleting designation:", error);
      alert("Failed to delete designation");
    }
  };

  // ✅ Apply filters
  const filteredDesignations = designations.filter((d) => {
    return (
      (!filters.companyId || d.companyId === filters.companyId) &&
      (!filters.departmentId || d.departmentId === filters.departmentId)
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Designation Management</h2>

      {/* Add Designation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid grid-cols-3 gap-4">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.dep}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Add Designation
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter by Company
          </label>
          <select
            name="companyId"
            value={filters.companyId}
            onChange={handleFilterChange}
            className="border rounded-lg p-2 mt-1"
          >
            <option value="">All Companies</option>
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter by Department
          </label>
          <select
            name="departmentId"
            value={filters.departmentId}
            onChange={handleFilterChange}
            className="border rounded-lg p-2 mt-1"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.dep}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Designations Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Designation
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Company
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Department
              </th>
              <th className="p-3 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDesignations.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-3 text-center text-gray-500 italic"
                >
                  No designations found
                </td>
              </tr>
            ) : (
              filteredDesignations.map((d) => (
                <tr key={d._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-800">
                    {d.designation}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    {d.companyName}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    {d.departmentName}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="px-2 py-2 rounded-full bg-red-200 hover:bg-red-300"
                      title="Delete"
                    >
                      <MdDelete className="text-red-500 text-md" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Designation;
