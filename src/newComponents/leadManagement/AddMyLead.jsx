// import React, { useState, useEffect } from "react";
// import { Plus, AlertCircle, Eye, Edit2, X } from "lucide-react";
// import Modal from "../UserManagement/Modal.jsx";

// // 🧩 Dropdown Options
// const leadSources = [
//   "Cold Call", "Website", "Referral", "LinkedIn", "Trade Show",
//   "Email Campaign", "Social Media", "Event", "Organic Search", "Paid Ads",
// ];
// const leadTypes = ["International", "Domestic"];
// const tripTypes = ["Solo", "Group", "Family", "Couple", "Honeymoon"];
// const leadStatuses = ["Hot", "Warm", "Cold", "Converted", "Lost"];

// // 🧩 Input Field Component
// const InputField = ({ name, type = "text", placeholder, required, value, error, onChange }) => (
//   <div className="h-[4.5rem]">
//     <label className="block text-xs font-medium text-gray-700 mb-0.5">
//       {name.charAt(0).toUpperCase() + name.slice(1)} {required && <span className="text-red-500">*</span>}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
//         error ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
//       }`}
//       autoComplete="off"
//     />
//     {error && (
//       <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//         <AlertCircle className="w-3 h-3" /> {error}
//       </p>
//     )}
//   </div>
// );

// // 🧩 Select Field Component
// const SelectField = ({ name, options, required, value, error, onChange }) => (
//   <div className="h-[4.5rem]">
//     <label className="block text-xs font-medium text-gray-700 mb-0.5">
//       {name.charAt(0).toUpperCase() + name.slice(1)} {required && <span className="text-red-500">*</span>}
//     </label>
//     <select
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       className={`w-full px-3 py-1.5 border rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
//         error ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
//       }`}
//     >
//       <option value="">Select {name}</option>
//       {options.map((opt) => (
//         <option key={opt}>{opt}</option>
//       ))}
//     </select>
//     {error && (
//       <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//         <AlertCircle className="w-3 h-3" /> {error}
//       </p>
//     )}
//   </div>
// );

// // 🧩 Add/Edit Lead Form Component
// const LeadForm = ({ initialData, onSubmit, onClose }) => {
//   const [formData, setFormData] = useState(initialData);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const validate = (data) => {
//     const newErrors = {};
//     if (!data.name) newErrors.name = "Name is required";
//     if (!data.phone) newErrors.phone = "Phone is required";
//     if (!data.departureCity) newErrors.departureCity = "Departure City is required";
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate(formData);
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     setIsSubmitting(true);
//     setApiError("");

//     try {
//       await onSubmit(formData);
//       setSubmitSuccess(true);
//       setTimeout(() => {
//         setSubmitSuccess(false);
//         onClose();
//       }, 1500);
//     } catch (err) {
//       setApiError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3" noValidate>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <InputField name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
//         <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
//         <InputField name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} />
//         <InputField name="whatsAppNo" value={formData.whatsAppNo} onChange={handleChange} error={errors.whatsAppNo} />
//         <InputField name="departureCity" value={formData.departureCity} onChange={handleChange} required error={errors.departureCity} />
//         <InputField name="destination" value={formData.destination} onChange={handleChange} error={errors.destination} />
//         <InputField name="expectedTravelDate" type="date" value={formData.expectedTravelDate} onChange={handleChange} error={errors.expectedTravelDate} />
//         <InputField name="noOfDays" type="number" value={formData.noOfDays} onChange={handleChange} error={errors.noOfDays} />
//         <InputField name="placesToCover" value={formData.placesToCover} onChange={handleChange} error={errors.placesToCover} />
//         <InputField name="noOfPerson" type="number" value={formData.noOfPerson} onChange={handleChange} error={errors.noOfPerson} />
//         <InputField name="noOfChild" type="number" value={formData.noOfChild} onChange={handleChange} error={errors.noOfChild} />
//         <InputField name="childAge" value={formData.childAge} onChange={handleChange} error={errors.childAge} />
//         <SelectField name="leadSource" options={leadSources} value={formData.leadSource} onChange={handleChange} error={errors.leadSource} />
//         <SelectField name="leadType" options={leadTypes} value={formData.leadType} onChange={handleChange} error={errors.leadType} />
//         <SelectField name="tripType" options={tripTypes} value={formData.tripType} onChange={handleChange} error={errors.tripType} />
//         <InputField name="company" value={formData.company} onChange={handleChange} error={errors.company} />
//         <SelectField name="leadStatus" options={leadStatuses} value={formData.leadStatus} onChange={handleChange} error={errors.leadStatus} />
//         <InputField name="value" type="number" value={formData.value} onChange={handleChange} error={errors.value} />
//       </div>

//       <div className="mt-2">
//         <label className="block text-xs font-medium text-gray-700 mb-0.5">Notes</label>
//         <textarea
//           name="notes"
//           value={formData.notes}
//           onChange={handleChange}
//           rows="3"
//           placeholder="Add any notes or remarks about this lead..."
//           className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//         ></textarea>
//       </div>

//       <div className="mt-3 flex gap-2">
//         <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
//           {isSubmitting ? "Saving..." : "Save Lead"}
//         </button>
//         <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
//           Cancel
//         </button>
//       </div>
//       {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
//       {submitSuccess && <p className="text-green-600 mt-2">Lead saved successfully!</p>}
//     </form>
//   );
// };

// // 🧩 Main Component
// const EmployeeLeads = () => {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [viewLead, setViewLead] = useState(null);
//   const [editLead, setEditLead] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   const employeeId = localStorage.getItem("userId");

//   const fetchLeads = async () => {
//     setLoading(true);
//     setError("");

//     if (!employeeId) {
//       setError("Employee ID not found");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:4000/employeelead/employee/${employeeId}`);
//       if (!res.ok) throw new Error(`Server Error: ${res.status}`);
//       const data = await res.json();
//       const filteredLeads = (data.leads || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
//       setLeads(filteredLeads);
//     } catch (err) {
//       setError(err.message || "Failed to fetch leads");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const handleView = (lead) => setViewLead(lead);
//   const handleEdit = (lead) => setEditLead(lead);

//   const closeModal = () => {
//     setViewLead(null);
//     setEditLead(null);
//     setIsAddModalOpen(false);
//   };

//   const handleAddLead = async (data) => {
//     const res = await fetch("http://localhost:4000/employeelead", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...data, employeeId }),
//     });
//     if (!res.ok) throw new Error("Failed to create lead");
//     await fetchLeads();
//   };

//   const handleUpdateLead = async (data) => {
//     if (!editLead) return;
//     const res = await fetch(`http://localhost:4000/employeelead/${editLead._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to update lead");
//     await fetchLeads();
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={() => setIsAddModalOpen(true)}
//         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
//       >
//         <Plus className="w-4 h-4" /> Add Lead
//       </button>

//       <div className="mt-6 overflow-x-auto">
//         {loading ? (
//           <p>Loading leads...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : leads.length === 0 ? (
//           <p>No leads found.</p>
//         ) : (
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Email</th>
//                 <th className="px-4 py-2 border">Phone</th>
//                 <th className="px-4 py-2 border">Departure</th>
//                 <th className="px-4 py-2 border">Destination</th>
//                 <th className="px-4 py-2 border">Travel Date</th>
//                 <th className="px-4 py-2 border text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-2 border">{lead.name}</td>
//                   <td className="px-4 py-2 border">{lead.email}</td>
//                   <td className="px-4 py-2 border">{lead.phone}</td>
//                   <td className="px-4 py-2 border">{lead.departureCity}</td>
//                   <td className="px-4 py-2 border">{lead.destination}</td>
//                   <td className="px-4 py-2 border">{formatDate(lead.expectedTravelDate)}</td>
//                   <td className="px-4 py-2 border text-center">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handleView(lead)}
//                         className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
//                         title="View Lead"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(lead)}
//                         className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
//                         title="Edit Lead"
//                       >
//                         <Edit2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Add/Edit Modal */}
//       {(isAddModalOpen || editLead) && (
//         <Modal isOpen={true} onClose={closeModal} size="large">
//           <div className="flex flex-col h-full max-h-[95vh]">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h2 className="text-lg font-bold text-gray-900">
//                 {editLead ? "Edit Lead" : "Add New Lead"}
//               </h2>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4">
//               <LeadForm
//                 initialData={editLead || {
//                   name: "", email: "", phone: "", whatsAppNo: "",
//                   departureCity: "", destination: "", expectedTravelDate: "",
//                   noOfDays: "", placesToCover: "", noOfPerson: "",
//                   noOfChild: "", childAge: "", leadSource: "",
//                   leadType: "", tripType: "", company: "",
//                   leadStatus: "Hot", value: "", notes: "",
//                 }}
//                 onSubmit={editLead ? handleUpdateLead : handleAddLead}
//                 onClose={closeModal}
//               />
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* View Lead Modal */}
//       {viewLead && (
//         <div
//           className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
//             >
//               <X size={18} />
//             </button>

//             <h2 className="text-lg font-semibold mb-4 text-center">Lead Details</h2>

//             <div className="space-y-3">
//               <div><strong className="block text-gray-700">Name:</strong> <span className="text-gray-800">{viewLead.name || "-"}</span></div>
//               <div><strong className="block text-gray-700">Email:</strong> <span className="text-gray-800">{viewLead.email || "-"}</span></div>
//               <div><strong className="block text-gray-700">Phone:</strong> <span className="text-gray-800">{viewLead.phone || "-"}</span></div>
//               <div><strong className="block text-gray-700">Departure City:</strong> <span className="text-gray-800">{viewLead.departureCity || "-"}</span></div>
//               <div><strong className="block text-gray-700">Destination:</strong> <span className="text-gray-800">{viewLead.destination || "-"}</span></div>
//               <div><strong className="block text-gray-700">Expected Travel Date:</strong> <span className="text-gray-800">{formatDate(viewLead.expectedTravelDate)}</span></div>
//               <div><strong className="block text-gray-700">Lead Source:</strong> <span className="text-gray-800">{viewLead.leadSource || "-"}</span></div>
//               <div><strong className="block text-gray-700">Lead Status:</strong> <span className="text-gray-800">{viewLead.leadStatus || "-"}</span></div>
//               <div><strong className="block text-gray-700">Notes:</strong> <span className="text-gray-800">{viewLead.notes || "-"}</span></div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeLeads;




import React, { useState, useEffect } from "react";
import { Plus, AlertCircle, Eye, Edit2, X } from "lucide-react";

// 🧩 Dropdown Options
const leadSources = [
  "Cold Call", "Website", "Referral", "LinkedIn", "Trade Show",
  "Email Campaign", "Social Media", "Event", "Organic Search", "Paid Ads",
];
const leadTypes = ["International", "Domestic"];
const tripTypes = ["Solo", "Group", "Family", "Couple", "Honeymoon"];
const leadStatuses = ["Hot", "Warm", "Cold", "Converted", "Lost"];

// 🧩 Input Field Component
const InputField = ({ name, type = "text", placeholder, required, value, error, onChange }) => (
  <div className="h-[4.5rem]">
    <label className="block text-xs font-medium text-gray-700 mb-0.5">
      {name.charAt(0).toUpperCase() + name.slice(1)} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
        error ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
      }`}
      autoComplete="off"
    />
    {error && (
      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {error}
      </p>
    )}
  </div>
);

// 🧩 Select Field Component
const SelectField = ({ name, options, required, value, error, onChange }) => (
  <div className="h-[4.5rem]">
    <label className="block text-xs font-medium text-gray-700 mb-0.5">
      {name.charAt(0).toUpperCase() + name.slice(1)} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className={`w-full px-3 py-1.5 border rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
        error ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <option value="">Select {name}</option>
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    {error && (
      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {error}
      </p>
    )}
  </div>
);

// 🧩 Modal Component (Simple)
const Modal = ({ isOpen, onClose, size = "large", children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className={`bg-white rounded-lg shadow-lg ${size === 'large' ? 'w-full max-w-4xl' : 'w-full max-w-md'} max-h-[95vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// 🧩 Add/Edit Lead Form Component
const LeadForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const validate = (data) => {
    const newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.phone) newErrors.phone = "Phone is required";
    if (!data.departureCity) newErrors.departureCity = "Departure City is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      await onSubmit(formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
        <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <InputField name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} />
        <InputField name="whatsAppNo" value={formData.whatsAppNo} onChange={handleChange} error={errors.whatsAppNo} />
        <InputField name="departureCity" value={formData.departureCity} onChange={handleChange} required error={errors.departureCity} />
        <InputField name="destination" value={formData.destination} onChange={handleChange} error={errors.destination} />
        <InputField name="expectedTravelDate" type="date" value={formData.expectedTravelDate} onChange={handleChange} error={errors.expectedTravelDate} />
        <InputField name="noOfDays" type="number" value={formData.noOfDays} onChange={handleChange} error={errors.noOfDays} />
        <InputField name="placesToCover" value={formData.placesToCover} onChange={handleChange} error={errors.placesToCover} />
        <InputField name="noOfPerson" type="number" value={formData.noOfPerson} onChange={handleChange} error={errors.noOfPerson} />
        <InputField name="noOfChild" type="number" value={formData.noOfChild} onChange={handleChange} error={errors.noOfChild} />
        <InputField name="childAge" value={formData.childAge} onChange={handleChange} error={errors.childAge} />
        <SelectField name="leadSource" options={leadSources} value={formData.leadSource} onChange={handleChange} error={errors.leadSource} />
        <SelectField name="leadType" options={leadTypes} value={formData.leadType} onChange={handleChange} error={errors.leadType} />
        <SelectField name="tripType" options={tripTypes} value={formData.tripType} onChange={handleChange} error={errors.tripType} />
        <InputField name="company" value={formData.company} onChange={handleChange} error={errors.company} />
        <SelectField name="leadStatus" options={leadStatuses} value={formData.leadStatus} onChange={handleChange} error={errors.leadStatus} />
        <InputField name="value" type="number" value={formData.value} onChange={handleChange} error={errors.value} />
      </div>

      <div className="mt-2">
        <label className="block text-xs font-medium text-gray-700 mb-0.5">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Add any notes or remarks about this lead..."
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div className="mt-3 flex gap-2">
        <button type="button" onClick={(e) => handleSubmit(e)} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          {isSubmitting ? "Saving..." : "Save Lead"}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
      {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
      {submitSuccess && <p className="text-green-600 mt-2">Lead saved successfully!</p>}
    </div>
  );
};

// 🧩 Main Component
const EmployeeLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewLead, setViewLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const employeeId = localStorage.getItem("userId");

  const fetchLeads = async () => {
    setLoading(true);
    setError("");

    if (!employeeId) {
      setError("Employee ID not found");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/employeelead/employee/${employeeId}`);
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      const data = await res.json();
      const filteredLeads = (data.leads || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLeads(filteredLeads);
    } catch (err) {
      setError(err.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleView = (lead) => setViewLead(lead);
  const handleEdit = (lead) => setEditLead(lead);

  const closeModal = () => {
    setViewLead(null);
    setEditLead(null);
    setIsAddModalOpen(false);
  };

  const handleAddLead = async (data) => {
    const res = await fetch("http://localhost:4000/employeelead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, employeeId }),
    });
    if (!res.ok) throw new Error("Failed to create lead");
    await fetchLeads();
  };

  const handleUpdateLead = async (data) => {
    if (!editLead) return;
    const res = await fetch(`http://localhost:4000/employeelead/${editLead._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update lead");
    await fetchLeads();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        <Plus className="w-4 h-4" /> Add Lead
      </button>

      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <p>Loading leads...</p>
        ) : error ? (
          <p className="text-gray-600">Please Enter Leads</p>
        ) : leads.length === 0 ? (
          <p className="text-gray-600">Please Enter Leads</p>
        ) : (
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Departure</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Travel Date</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 border">{lead.name}</td>
                  <td className="px-4 py-2 border">{lead.email}</td>
                  <td className="px-4 py-2 border">{lead.phone}</td>
                  <td className="px-4 py-2 border">{lead.departureCity}</td>
                  <td className="px-4 py-2 border">{lead.destination}</td>
                  <td className="px-4 py-2 border">{formatDate(lead.expectedTravelDate)}</td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleView(lead)}
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                        title="View Lead"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(lead)}
                        className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                        title="Edit Lead"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || editLead) && (
        <Modal isOpen={true} onClose={closeModal} size="large">
          <div className="flex flex-col h-full max-h-[95vh]">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">
                {editLead ? "Edit Lead" : "Add New Lead"}
              </h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <LeadForm
                initialData={editLead || {
                  name: "", email: "", phone: "", whatsAppNo: "",
                  departureCity: "", destination: "", expectedTravelDate: "",
                  noOfDays: "", placesToCover: "", noOfPerson: "",
                  noOfChild: "", childAge: "", leadSource: "",
                  leadType: "", tripType: "", company: "",
                  leadStatus: "Hot", value: "", notes: "",
                }}
                onSubmit={editLead ? handleUpdateLead : handleAddLead}
                onClose={closeModal}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* View Lead Modal */}
      {viewLead && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">Lead Details</h2>

            <div className="space-y-3">
              <div><strong className="block text-gray-700">Name:</strong> <span className="text-gray-800">{viewLead.name || "-"}</span></div>
              <div><strong className="block text-gray-700">Email:</strong> <span className="text-gray-800">{viewLead.email || "-"}</span></div>
              <div><strong className="block text-gray-700">Phone:</strong> <span className="text-gray-800">{viewLead.phone || "-"}</span></div>
              <div><strong className="block text-gray-700">Departure City:</strong> <span className="text-gray-800">{viewLead.departureCity || "-"}</span></div>
              <div><strong className="block text-gray-700">Destination:</strong> <span className="text-gray-800">{viewLead.destination || "-"}</span></div>
              <div><strong className="block text-gray-700">Expected Travel Date:</strong> <span className="text-gray-800">{formatDate(viewLead.expectedTravelDate)}</span></div>
              <div><strong className="block text-gray-700">Lead Source:</strong> <span className="text-gray-800">{viewLead.leadSource || "-"}</span></div>
              <div><strong className="block text-gray-700">Lead Status:</strong> <span className="text-gray-800">{viewLead.leadStatus || "-"}</span></div>
              <div><strong className="block text-gray-700">Notes:</strong> <span className="text-gray-800">{viewLead.notes || "-"}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeads;