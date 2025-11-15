// import React, { useState, useEffect } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// const B2bAddCompany = () => {
//   const [formData, setFormData] = useState({
//     country: "India",
//     state: "",
//     companyName: "",
//     contactPersonName: "",
//     contactPersonNumber: "",
//     email: "",
//     whatsapp: "",
//     address: "",
//   });

//   const [companies, setCompanies] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [viewData, setViewData] = useState(null); // Modal state
//   const [states, setStates] = useState([]);

//   // Fetch states on mount
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/b2bstate/");
//         if (!res.ok) throw new Error("Failed to fetch states");
//         const data = await res.json();
//         setStates(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStates();
//   }, []);

//   // Fetch companies on mount
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/b2bcompany");
//         if (!res.ok) throw new Error("Failed to fetch companies");
//         const data = await res.json();
//         setCompanies(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     for (let key in formData) {
//       if (!formData[key]) {
//         alert(`Please fill ${key}`);
//         return;
//       }
//     }

//     try {
//       const res = await fetch("http://localhost:4000/b2bcompany", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || "Failed to add company");
//       }

//       const newCompany = await res.json();
//       setCompanies((prev) => [...prev, newCompany]);
//       alert("Company Added Successfully ✓");

//       setFormData({
//         country: "India",
//         state: "",
//         companyName: "",
//         contactPersonName: "",
//         contactPersonNumber: "",
//         email: "",
//         whatsapp: "",
//         address: "",
//       });
//     } catch (err) {
//       alert("Error adding company: " + err.message);
//     }
//   };

//   const handleDelete = async (index, id) => {
//     if (window.confirm("Are you sure to delete this company?")) {
//       try {
//         const res = await fetch(`http://localhost:4000/b2bcompany/${id}`, {
//           method: "DELETE",
//         });
//         if (!res.ok) {
//           const err = await res.text();
//           throw new Error(err || "Failed to delete company");
//         }
//         const newList = [...companies];
//         newList.splice(index, 1);
//         setCompanies(newList);
//         alert("Company deleted successfully ✓");
//       } catch (err) {
//         alert("Error deleting company: " + err.message);
//       }
//     }
//   };

//   const handleEdit = (company, index) => {
//     setEditData({ ...company, index });
//   };

//   const handleEditChange = (e) =>
//     setEditData({ ...editData, [e.target.name]: e.target.value });

//   const handleEditSave = async () => {
//     const { index, _id, ...companyData } = editData;

//     if (!_id) {
//       alert("Invalid company ID");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:4000/b2bcompany/${_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(companyData),
//       });

//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || "Failed to update company");
//       }

//       const updatedCompany = await res.json();

//       const newList = [...companies];
//       newList[index] = updatedCompany;
//       setCompanies(newList);
//       setEditData(null);
//       alert("Company updated successfully ✓");
//     } catch (err) {
//       alert("Error updating company: " + err.message);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">B2B Add Company</h2>

//       {/* ADD FORM */}
//       {!editData && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-10">
//           <div>
//             <label className="block text-sm font-medium mb-1">Country</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               readOnly
//               className="w-full border p-2 bg-gray-100 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">State</label>
//             <select
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select State</option>
//               {states.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.state}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Company Name</label>
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Contact Person Name</label>
//             <input
//               type="text"
//               name="contactPersonName"
//               value={formData.contactPersonName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Phone</label>
//             <input
//               type="number"
//               name="contactPersonNumber"
//               value={formData.contactPersonNumber}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">WhatsApp</label>
//             <input
//               type="number"
//               name="whatsapp"
//               value={formData.whatsapp}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium mb-1">Address</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               rows="3"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
//             >
//               Add Company
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TABLE LISTING COMPANIES */}
//       <div className="max-w-5xl mx-auto overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300 text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2">Company Name</th>
//               <th className="border border-gray-300 p-2">WhatsApp Number</th>
//               <th className="border border-gray-300 p-2">Phone</th>
//               <th className="border border-gray-300 p-2">Email</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {companies.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center p-4">
//                   No companies added yet.
//                 </td>
//               </tr>
//             ) : (
//               companies.map((company, index) => (
//                 <tr key={company._id || index} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 p-2">{company.companyName}</td>
//                   <td className="border border-gray-300 p-2">{company.whatsapp}</td>
//                   <td className="border border-gray-300 p-2">{company.contactPersonNumber}</td>
//                   <td className="border border-gray-300 p-2">{company.email}</td>
//                   <td className="border border-gray-300 p-2 flex space-x-2">
//                     <button
//                       onClick={() => setViewData(company)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <FaEye size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(company, index)}
//                       className="text-green-600 hover:text-green-800"
//                     >
//                       <FaEdit size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(index, company._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrash size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* EDIT FORM */}
//       {editData && (
//         <div className="max-w-5xl mx-auto mt-10 bg-gray-50 p-6 rounded shadow">
//           <h3 className="text-xl font-semibold mb-4">Edit Company</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="companyName"
//               value={editData.companyName}
//               onChange={handleEditChange}
//               className="border p-2 rounded"
//               placeholder="Company Name"
//             />
//             <input
//               type="text"
//               name="contactPersonName"
//               value={editData.contactPersonName}
//               onChange={handleEditChange}
//               className="border p-2 rounded"
//               placeholder="Contact Person Name"
//             />
//             <input
//               type="number"
//               name="contactPersonNumber"
//               value={editData.contactPersonNumber}
//               onChange={handleEditChange}
//               className="border p-2 rounded"
//               placeholder="Phone"
//             />
//             <input
//               type="email"
//               name="email"
//               value={editData.email}
//               onChange={handleEditChange}
//               className="border p-2 rounded"
//               placeholder="Email"
//             />
//             <input
//               type="number"
//               name="whatsapp"
//               value={editData.whatsapp}
//               onChange={handleEditChange}
//               className="border p-2 rounded"
//               placeholder="WhatsApp"
//             />
//             <button
//               onClick={handleEditSave}
//               className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {/* VIEW MODAL */}
//       {viewData && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
//             <h3 className="text-xl font-semibold mb-4">{viewData.companyName}</h3>

//             <ul className="space-y-2">
//               <li><strong>Country:</strong> {viewData.country}</li>
//               <li><strong>State:</strong> {viewData.state}</li>
//               <li><strong>Contact Person:</strong> {viewData.contactPersonName}</li>
//               <li><strong>Phone:</strong> {viewData.contactPersonNumber}</li>
//               <li><strong>Email:</strong> {viewData.email}</li>
//               <li><strong>WhatsApp:</strong> {viewData.whatsapp}</li>
//               <li><strong>Address:</strong> {viewData.address}</li>
//             </ul>

//             <button
//               onClick={() => setViewData(null)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default B2bAddCompany;




// import React, { useState, useEffect } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// const B2bAddCompany = () => {
//   const [formData, setFormData] = useState({
//     country: "India",
//     state: "",
//     companyName: "",
//     contactPersonName: "",
//     contactPersonNumber: "",
//     email: "",
//     whatsapp: "",
//     address: "",
//   });

//   const [companies, setCompanies] = useState([]);
//   const [editData, setEditData] = useState(null); // For Edit modal
//   const [viewData, setViewData] = useState(null); // For View modal
//   const [states, setStates] = useState([]);

//   // Fetch states on mount
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/b2bstate/");
//         if (!res.ok) throw new Error("Failed to fetch states");
//         const data = await res.json();
//         setStates(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStates();
//   }, []);

//   // Fetch companies on mount
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/b2bcompany");
//         if (!res.ok) throw new Error("Failed to fetch companies");
//         const data = await res.json();
//         setCompanies(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     for (let key in formData) {
//       if (!formData[key]) {
//         alert(`Please fill ${key}`);
//         return;
//       }
//     }

//     try {
//       const res = await fetch("http://localhost:4000/b2bcompany", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || "Failed to add company");
//       }

//       const newCompany = await res.json();
//       setCompanies((prev) => [...prev, newCompany]);
//       alert("Company Added Successfully ✓");

//       setFormData({
//         country: "India",
//         state: "",
//         companyName: "",
//         contactPersonName: "",
//         contactPersonNumber: "",
//         email: "",
//         whatsapp: "",
//         address: "",
//       });
//     } catch (err) {
//       alert("Error adding company: " + err.message);
//     }
//   };

//   const handleDelete = async (index, id) => {
//     if (window.confirm("Are you sure to delete this company?")) {
//       try {
//         const res = await fetch(`http://localhost:4000/b2bcompany/${id}`, {
//           method: "DELETE",
//         });
//         if (!res.ok) {
//           const err = await res.text();
//           throw new Error(err || "Failed to delete company");
//         }
//         const newList = [...companies];
//         newList.splice(index, 1);
//         setCompanies(newList);
//         alert("Company deleted successfully ✓");
//       } catch (err) {
//         alert("Error deleting company: " + err.message);
//       }
//     }
//   };

//   const handleEdit = (company, index) => {
//     setEditData({ ...company, index });
//   };

//   const handleEditChange = (e) =>
//     setEditData({ ...editData, [e.target.name]: e.target.value });

//   const handleEditSave = async () => {
//     const { index, _id, ...companyData } = editData;

//     if (!_id) {
//       alert("Invalid company ID");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:4000/b2bcompany/${_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(companyData),
//       });

//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || "Failed to update company");
//       }

//       const updatedCompany = await res.json();

//       const newList = [...companies];
//       newList[index] = updatedCompany;
//       setCompanies(newList);
//       setEditData(null);
//       alert("Company updated successfully ✓");
//     } catch (err) {
//       alert("Error updating company: " + err.message);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">B2B Add Company</h2>

//       {/* ADD FORM */}
//       {!editData && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-10">
//           <div>
//             <label className="block text-sm font-medium mb-1">Country</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               readOnly
//               className="w-full border p-2 bg-gray-100 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">State</label>
//             <select
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select State</option>
//               {states.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.state}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Company Name</label>
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Contact Person Name</label>
//             <input
//               type="text"
//               name="contactPersonName"
//               value={formData.contactPersonName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Phone</label>
//             <input
//               type="number"
//               name="contactPersonNumber"
//               value={formData.contactPersonNumber}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">WhatsApp</label>
//             <input
//               type="number"
//               name="whatsapp"
//               value={formData.whatsapp}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium mb-1">Address</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               rows="3"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
//             >
//               Add Company
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TABLE LISTING COMPANIES */}
//       <div className="max-w-5xl mx-auto overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300 text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2">Company Name</th>
//               <th className="border border-gray-300 p-2">WhatsApp Number</th>
//               <th className="border border-gray-300 p-2">Phone</th>
//               <th className="border border-gray-300 p-2">Email</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {companies.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center p-4">
//                   No companies added yet.
//                 </td>
//               </tr>
//             ) : (
//               companies.map((company, index) => (
//                 <tr key={company._id || index} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 p-2">{company.companyName}</td>
//                   <td className="border border-gray-300 p-2">{company.whatsapp}</td>
//                   <td className="border border-gray-300 p-2">{company.contactPersonNumber}</td>
//                   <td className="border border-gray-300 p-2">{company.email}</td>
//                   <td className="border border-gray-300 p-2 flex space-x-2">
//                     <button
//                       onClick={() => setViewData(company)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <FaEye size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(company, index)}
//                       className="text-green-600 hover:text-green-800"
//                     >
//                       <FaEdit size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(index, company._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrash size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* EDIT MODAL */}
//       {editData && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
//             <h3 className="text-xl font-semibold mb-4">Edit Company</h3>

//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium mb-1">State</label>
//                 <select
//                   name="state"
//                   value={editData.state}
//                   onChange={handleEditChange}
//                   className="w-full border p-2 rounded"
//                 >
//                   <option value="">Select State</option>
//                   {states.map((s) => (
//                     <option key={s._id} value={s._id}>
//                       {s.state}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Contact Person</label>
//                 <input
//                   type="text"
//                   name="contactPersonName"
//                   value={editData.contactPersonName}
//                   onChange={handleEditChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Phone</label>
//                 <input
//                   type="number"
//                   name="contactPersonNumber"
//                   value={editData.contactPersonNumber}
//                   onChange={handleEditChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editData.email}
//                   onChange={handleEditChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">WhatsApp</label>
//                 <input
//                   type="number"
//                   name="whatsapp"
//                   value={editData.whatsapp}
//                   onChange={handleEditChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Address</label>
//                 <textarea
//                   name="address"
//                   value={editData.address}
//                   onChange={handleEditChange}
//                   className="w-full border p-2 rounded"
//                   rows="3"
//                 />
//               </div>

//               <div className="flex space-x-2">
//                 <button
//                   onClick={handleEditSave}
//                   className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 text-lg font-semibold"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditData(null)}
//                   className="flex-1 bg-gray-400 text-white py-3 rounded hover:bg-gray-500 text-lg font-semibold"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VIEW MODAL */}
//       {viewData && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
//             <h3 className="text-xl font-semibold mb-4">{viewData.companyName}</h3>

//             <ul className="space-y-2">
//               <li><strong>Country:</strong> {viewData.country}</li>
//               <li><strong>State:</strong> {viewData.state}</li>
//               <li><strong>Contact Person:</strong> {viewData.contactPersonName}</li>
//               <li><strong>Phone:</strong> {viewData.contactPersonNumber}</li>
//               <li><strong>Email:</strong> {viewData.email}</li>
//               <li><strong>WhatsApp:</strong> {viewData.whatsapp}</li>
//               <li><strong>Address:</strong> {viewData.address}</li>
//             </ul>

//             <button
//               onClick={() => setViewData(null)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default B2bAddCompany;





import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const B2bAddCompany = () => {
  const [formData, setFormData] = useState({
    country: "India",
    state: "",
    companyName: "",
    contactPersonName: "",
    contactPersonNumber: "",
    email: "",
    whatsapp: "",
    address: "",
  });

  const [companies, setCompanies] = useState([]);
  const [editData, setEditData] = useState(null); // For Edit modal
  const [viewData, setViewData] = useState(null); // For View modal
  const [states, setStates] = useState([]);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("http://localhost:4000/b2bstate/");
        if (!res.ok) throw new Error("Failed to fetch states");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStates();
  }, []);

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:4000/b2bcompany");
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    for (let key in formData) {
      if (!formData[key]) {
        alert(`Please fill ${key}`);
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:4000/b2bcompany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to add company");
      }

      const newCompany = await res.json();
      setCompanies((prev) => [...prev, newCompany]);
      alert("Company Added Successfully ✓");

      setFormData({
        country: "India",
        state: "",
        companyName: "",
        contactPersonName: "",
        contactPersonNumber: "",
        email: "",
        whatsapp: "",
        address: "",
      });
    } catch (err) {
      alert("Error adding company: " + err.message);
    }
  };

  const handleDelete = async (index, id) => {
    if (window.confirm("Are you sure to delete this company?")) {
      try {
        const res = await fetch(`http://localhost:4000/b2bcompany/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || "Failed to delete company");
        }
        const newList = [...companies];
        newList.splice(index, 1);
        setCompanies(newList);
        alert("Company deleted successfully ✓");
      } catch (err) {
        alert("Error deleting company: " + err.message);
      }
    }
  };

  const handleEdit = (company, index) => {
    setEditData({ ...company, index });
  };

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleEditSave = async () => {
    const { index, _id, ...companyData } = editData;

    if (!_id) {
      alert("Invalid company ID");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/b2bcompany/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyData),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to update company");
      }

      const updatedCompany = await res.json();

      const newList = [...companies];
      newList[index] = updatedCompany;
      setCompanies(newList);
      setEditData(null);
      alert("Company updated successfully ✓");
    } catch (err) {
      alert("Error updating company: " + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">B2B Add Company</h2>

      {/* ADD FORM */}
      {!editData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-10">
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              readOnly
              className="w-full border p-2 bg-gray-100 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.state}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Person Name</label>
            <input
              type="text"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="number"
              name="contactPersonNumber"
              value={formData.contactPersonNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp</label>
            <input
              type="number"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows="3"
            />
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              Add Company
            </button>
          </div>
        </div>
      )}

      {/* TABLE LISTING COMPANIES */}
      <div className="max-w-5xl mx-auto overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Company Name</th>
              <th className="border border-gray-300 p-2">WhatsApp Number</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No companies added yet.
                </td>
              </tr>
            ) : (
              companies.map((company, index) => (
                <tr key={company._id || index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{company.companyName}</td>
                  <td className="border border-gray-300 p-2">{company.whatsapp}</td>
                  <td className="border border-gray-300 p-2">{company.contactPersonNumber}</td>
                  <td className="border border-gray-300 p-2">{company.email}</td>
                  <td className="border border-gray-300 p-2 flex space-x-2">
                    <button
                      onClick={() => setViewData(company)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(company, index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(index, company._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Company</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select
                  name="state"
                  value={editData.state}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={editData.contactPersonName}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="number"
                  name="contactPersonNumber"
                  value={editData.contactPersonNumber}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp</label>
                <input
                  type="number"
                  name="whatsapp"
                  value={editData.whatsapp}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={editData.address}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                  rows="3"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleEditSave}
                  className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 text-lg font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditData(null)}
                  className="flex-1 bg-gray-400 text-white py-3 rounded hover:bg-gray-500 text-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{viewData.companyName}</h3>

            <ul className="space-y-2">
              <li><strong>Country:</strong> {viewData.country}</li>
              <li><strong>State:</strong> {viewData.state}</li>
              <li><strong>Contact Person:</strong> {viewData.contactPersonName}</li>
              <li><strong>Phone:</strong> {viewData.contactPersonNumber}</li>
              <li><strong>Email:</strong> {viewData.email}</li>
              <li><strong>WhatsApp:</strong> {viewData.whatsapp}</li>
              <li><strong>Address:</strong> {viewData.address}</li>
            </ul>

            <button
              onClick={() => setViewData(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2bAddCompany;