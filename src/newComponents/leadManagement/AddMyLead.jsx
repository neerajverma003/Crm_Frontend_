// import React, { useState } from "react";
// import { Plus, AlertCircle } from "lucide-react";
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
//     {error && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
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
//       {options.map((opt) => <option key={opt}>{opt}</option>)}
//     </select>
//     {error && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
//   </div>
// );

// const AddLead = ({ onLeadAdded, employeeId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "", whatsAppNo: "",
//     departureCity: "", destination: "", expectedTravelDate: "",
//     noOfDays: "", placesToCover: "", noOfPerson: "",
//     noOfChild: "", childAge: "", leadSource: "",
//     leadType: "", tripType: "", company: "",
//     leadStatus: "Hot", value: "", notes: "",
//   });

//   const [errors, setErrors] = useState({});

//   // 🧠 Validate manual form
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

//   // 🧩 Submit manual lead
//  const handleManualSubmit = async (e) => {
//   e.preventDefault();
//   const newErrors = validate(formData);
//   setErrors(newErrors);
//   if (Object.keys(newErrors).length > 0) return;

//   setIsSubmitting(true);
//   setApiError("");

//   try {
//     // Get employee ID from localStorage
//     const employeeId = localStorage.getItem("userId");
//     if (!employeeId) throw new Error("Employee ID not found");

//     // 1️⃣ Create a new Lead first
//     const leadPayload = { ...formData };
//     const leadRes = await fetch("http://localhost:4000/leads/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(leadPayload),
//     });

//     if (!leadRes.ok) throw new Error("Failed to create lead");
//     const leadData = await leadRes.json();

//     // 2️⃣ Assign the lead to the employee
//     const employeeLeadPayload = { employeeId, leadId: leadData._id };
//     const empLeadRes = await fetch("http://localhost:4000/employeelead/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(employeeLeadPayload),
//     });

//     if (!empLeadRes.ok) throw new Error("Failed to assign lead to employee");

//     // Success
//     setSubmitSuccess(true);
//     onLeadAdded?.();

//     setTimeout(() => {
//       setIsOpen(false);
//       setSubmitSuccess(false);
//       setFormData({
//         name: "", email: "", phone: "", whatsAppNo: "",
//         departureCity: "", destination: "", expectedTravelDate: "",
//         noOfDays: "", placesToCover: "", noOfPerson: "",
//         noOfChild: "", childAge: "", leadSource: "",
//         leadType: "", tripType: "", company: "",
//         leadStatus: "Hot", value: "", notes: "",
//       });
//     }, 1500);

//   } catch (err) {
//     setApiError(err.message);
//   } finally {
//     setIsSubmitting(false);
//   }
// };



//   return (
//     <>
//       {/* Open Modal */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
//       >
//         <Plus className="w-4 h-4" /> Add Lead
//       </button>

//       {/* Modal */}
//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
//         <div className="flex flex-col h-full max-h-[95vh]">
//           {/* Header */}
//           <div className="p-4 border-b flex justify-between items-center">
//             <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
//           </div>

//           {/* Body */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <form onSubmit={handleManualSubmit} className="space-y-3" noValidate>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <InputField name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
//                 <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
//                 <InputField name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} placeholder="Separate multiple numbers with commas" />
//                 <InputField name="whatsAppNo" value={formData.whatsAppNo} onChange={handleChange} error={errors.whatsAppNo} />
//                 <InputField name="departureCity" value={formData.departureCity} onChange={handleChange} required error={errors.departureCity} />
//                 <InputField name="destination" value={formData.destination} onChange={handleChange} error={errors.destination} />
//                 <InputField name="expectedTravelDate" type="date" value={formData.expectedTravelDate} onChange={handleChange} error={errors.expectedTravelDate} />
//                 <InputField name="noOfDays" type="number" value={formData.noOfDays} onChange={handleChange} error={errors.noOfDays} />
//                 <InputField name="placesToCover" value={formData.placesToCover} onChange={handleChange} error={errors.placesToCover} />
//                 <InputField name="noOfPerson" type="number" value={formData.noOfPerson} onChange={handleChange} error={errors.noOfPerson} />
//                 <InputField name="noOfChild" type="number" value={formData.noOfChild} onChange={handleChange} error={errors.noOfChild} />
//                 <InputField name="childAge" value={formData.childAge} onChange={handleChange} error={errors.childAge} />
//                 <SelectField name="leadSource" options={leadSources} value={formData.leadSource} onChange={handleChange} error={errors.leadSource} />
//                 <SelectField name="leadType" options={leadTypes} value={formData.leadType} onChange={handleChange} error={errors.leadType} />
//                 <SelectField name="tripType" options={tripTypes} value={formData.tripType} onChange={handleChange} error={errors.tripType} />
//                 <InputField name="company" value={formData.company} onChange={handleChange} error={errors.company} />
//                 <SelectField name="leadStatus" options={leadStatuses} value={formData.leadStatus} onChange={handleChange} error={errors.leadStatus} />
//                 <InputField name="value" type="number" value={formData.value} onChange={handleChange} error={errors.value} />
//               </div>
//               <div className="mt-3 flex gap-2">
//                 <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
//                   {isSubmitting ? "Saving..." : "Save Lead"}
//                 </button>
//                 <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
//                   Cancel
//                 </button>
//               </div>
//               {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
//               {submitSuccess && <p className="text-green-600 mt-2">Lead added successfully!</p>}
//             </form>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default AddLead;


// import React, { useState, useEffect } from "react";
// import { Plus, AlertCircle } from "lucide-react";
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

// const AddLead = ({ onLeadAdded, employeeId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "", whatsAppNo: "",
//     departureCity: "", destination: "", expectedTravelDate: "",
//     noOfDays: "", placesToCover: "", noOfPerson: "",
//     noOfChild: "", childAge: "", leadSource: "",
//     leadType: "", tripType: "", company: "",
//     leadStatus: "Hot", value: "", notes: "",
//   });

//   const [errors, setErrors] = useState({});

//   // 🧩 Static or dynamic data for cards
//   const [totalMyLeads, setTotalMyLeads] = useState(0);
//   const [totalAssignedLeads, setTotalAssignedLeads] = useState(0);

//   // Fetch leads for cards (optional dynamic data)
//   useEffect(() => {
//     const fetchLeadCounts = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/leads/");
//         const result = await response.json();
//         if (result.success) {
//           const allLeads = result.data || result;
//           const myId = localStorage.getItem("userId");

//           // Example logic — customize as needed
//           const myLeads = allLeads.filter(
//             (lead) => lead.createdBy === myId || lead.assignedTo === myId
//           );
//           setTotalMyLeads(myLeads.length);
//           setTotalAssignedLeads(allLeads.length);
//         }
//       } catch (err) {
//         console.error("Error fetching lead counts:", err);
//       }
//     };
//     fetchLeadCounts();
//   }, []);

//   // 🧠 Validate form
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

//   // 🧩 Submit lead
//   const handleManualSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate(formData);
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     setIsSubmitting(true);
//     setApiError("");

//     try {
//       const employeeId = localStorage.getItem("userId");
//       if (!employeeId) throw new Error("Employee ID not found");

//       // Create lead
//       const leadRes = await fetch("http://localhost:4000/leads/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!leadRes.ok) throw new Error("Failed to create lead");
//       const leadData = await leadRes.json();

//       // Assign lead
//       const empLeadRes = await fetch("http://localhost:4000/employeelead/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ employeeId, leadId: leadData._id }),
//       });
//       if (!empLeadRes.ok) throw new Error("Failed to assign lead");

//       setSubmitSuccess(true);
//       onLeadAdded?.();

//       setTimeout(() => {
//         setIsOpen(false);
//         setSubmitSuccess(false);
//         setFormData({
//           name: "", email: "", phone: "", whatsAppNo: "",
//           departureCity: "", destination: "", expectedTravelDate: "",
//           noOfDays: "", placesToCover: "", noOfPerson: "",
//           noOfChild: "", childAge: "", leadSource: "",
//           leadType: "", tripType: "", company: "",
//           leadStatus: "Hot", value: "", notes: "",
//         });
//       }, 1500);
//     } catch (err) {
//       setApiError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       {/* 🧭 Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
//           <div className="text-lg font-semibold text-black">Total My Leads</div>
//           <div className="text-3xl font-bold text-gray-900 mt-2">{totalMyLeads}</div>
//         </div>

//         <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
//           <div className="text-lg font-semibold text-black">Total Assigned Leads</div>
//           <div className="text-3xl font-bold text-gray-900 mt-2">{totalAssignedLeads}</div>
//         </div>

//         <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
//           <div className="text-lg font-semibold text-black">Static Card</div>
//           <div className="text-3xl font-bold text-gray-900 mt-2">N/A</div>
//         </div>
//       </div>

//       {/* Add Lead Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
//       >
//         <Plus className="w-4 h-4" /> Add Lead
//       </button>

//       {/* Modal */}
//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
//         <div className="flex flex-col h-full max-h-[95vh]">
//           {/* Header */}
//           <div className="p-4 border-b flex justify-between items-center">
//             <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
//           </div>

//           {/* Body */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <form onSubmit={handleManualSubmit} className="space-y-3" noValidate>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <InputField name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
//                 <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
//                 <InputField name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} />
//                 <InputField name="whatsAppNo" value={formData.whatsAppNo} onChange={handleChange} error={errors.whatsAppNo} />
//                 <InputField name="departureCity" value={formData.departureCity} onChange={handleChange} required error={errors.departureCity} />
//                 <InputField name="destination" value={formData.destination} onChange={handleChange} error={errors.destination} />
//                 <InputField name="expectedTravelDate" type="date" value={formData.expectedTravelDate} onChange={handleChange} error={errors.expectedTravelDate} />
//                 <InputField name="noOfDays" type="number" value={formData.noOfDays} onChange={handleChange} error={errors.noOfDays} />
//                 <InputField name="placesToCover" value={formData.placesToCover} onChange={handleChange} error={errors.placesToCover} />
//                 <InputField name="noOfPerson" type="number" value={formData.noOfPerson} onChange={handleChange} error={errors.noOfPerson} />
//                 <InputField name="noOfChild" type="number" value={formData.noOfChild} onChange={handleChange} error={errors.noOfChild} />
//                 <InputField name="childAge" value={formData.childAge} onChange={handleChange} error={errors.childAge} />
//                 <SelectField name="leadSource" options={leadSources} value={formData.leadSource} onChange={handleChange} error={errors.leadSource} />
//                 <SelectField name="leadType" options={leadTypes} value={formData.leadType} onChange={handleChange} error={errors.leadType} />
//                 <SelectField name="tripType" options={tripTypes} value={formData.tripType} onChange={handleChange} error={errors.tripType} />
//                 <InputField name="company" value={formData.company} onChange={handleChange} error={errors.company} />
//                 <SelectField name="leadStatus" options={leadStatuses} value={formData.leadStatus} onChange={handleChange} error={errors.leadStatus} />
//                 <InputField name="value" type="number" value={formData.value} onChange={handleChange} error={errors.value} />
//               </div>

//               <div className="mt-3 flex gap-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//                 >
//                   {isSubmitting ? "Saving..." : "Save Lead"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//               {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
//               {submitSuccess && <p className="text-green-600 mt-2">Lead added successfully!</p>}
//             </form>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default AddLead;



// import React, { useState, useEffect } from "react";
// import { Plus, AlertCircle } from "lucide-react";
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

// const AddLead = ({ onLeadAdded, employeeId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "", whatsAppNo: "",
//     departureCity: "", destination: "", expectedTravelDate: "",
//     noOfDays: "", placesToCover: "", noOfPerson: "",
//     noOfChild: "", childAge: "", leadSource: "",
//     leadType: "", tripType: "", company: "",
//     leadStatus: "Hot", value: "", notes: "", // ✅ Notes field added
//   });

//   const [errors, setErrors] = useState({});

//   // 🧩 Static or dynamic data for cards
//   const [totalMyLeads, setTotalMyLeads] = useState(0);
//   const [totalAssignedLeads, setTotalAssignedLeads] = useState(0);

//   // Fetch leads for cards (optional dynamic data)
//   useEffect(() => {
//     const fetchLeadCounts = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/leads/");
//         const result = await response.json();
//         if (result.success) {
//           const allLeads = result.data || result;
//           const myId = localStorage.getItem("userId");

//           // Example logic — customize as needed
//           const myLeads = allLeads.filter(
//             (lead) => lead.createdBy === myId || lead.assignedTo === myId
//           );
//           setTotalMyLeads(myLeads.length);
//           setTotalAssignedLeads(allLeads.length);
//         }
//       } catch (err) {
//         console.error("Error fetching lead counts:", err);
//       }
//     };
//     fetchLeadCounts();
//   }, []);

//   // 🧠 Validate form
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

// const handleManualSubmit = async (e) => {
//   e.preventDefault();

//   const newErrors = validate(formData);
//   setErrors(newErrors);
//   if (Object.keys(newErrors).length > 0) return;

//   setIsSubmitting(true);
//   setApiError("");

//   try {
//     // ✅ Get employeeId from localStorage
//     const employeeId = localStorage.getItem("userId");
//     if (!employeeId) throw new Error("Employee ID not found in localStorage");

//     // 🟩 Post form data + employeeId directly to employeelead
//     const leadRes = await fetch("http://localhost:4000/employeelead", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formData, employeeId }),
//     });

//     if (!leadRes.ok) throw new Error("Failed to create lead");

//     const leadData = await leadRes.json();
//     console.log("✅ Lead Created:", leadData);

//     // 🟧 Success handling
//     setSubmitSuccess(true);
//     onLeadAdded?.();

//     setTimeout(() => {
//       setIsOpen(false);
//       setSubmitSuccess(false);
//       setFormData({
//         name: "", email: "", phone: "", whatsAppNo: "",
//         departureCity: "", destination: "", expectedTravelDate: "",
//         noOfDays: "", placesToCover: "", noOfPerson: "",
//         noOfChild: "", childAge: "", leadSource: "",
//         leadType: "", tripType: "", company: "",
//         leadStatus: "Hot", value: "", notes: "", // ✅ Reset notes
//       });
//     }, 1500);

//   } catch (err) {
//     console.error("Lead creation failed:", err);
//     setApiError(err.message);
//   } finally {
//     setIsSubmitting(false);
//   }
// };



//   return (
//     <>
//       {/* 🧭 Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
//           <div className="text-lg font-semibold text-black">Total My Leads</div>
//           <div className="text-3xl font-bold text-gray-900 mt-2">{totalMyLeads}</div>
//         </div>

//         <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
//           <div className="text-lg font-semibold text-black">Total Assigned Leads</div>
//           <div className="text-3xl font-bold text-gray-900 mt-2">{totalAssignedLeads}</div>
//         </div>

//         <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
//           <div className="text-lg font-semibold text-black">Static Card</div>
//           <div className="text-3xl font-bold text-gray-900 mt-2">N/A</div>
//         </div>
//       </div>

//       {/* Add Lead Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
//       >
//         <Plus className="w-4 h-4" /> Add Lead
//       </button>

//       {/* Modal */}
//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
//         <div className="flex flex-col h-full max-h-[95vh]">
//           {/* Header */}
//           <div className="p-4 border-b flex justify-between items-center">
//             <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
//           </div>

//           {/* Body */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <form onSubmit={handleManualSubmit} className="space-y-3" noValidate>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <InputField name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
//                 <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
//                 <InputField name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} />
//                 <InputField name="whatsAppNo" value={formData.whatsAppNo} onChange={handleChange} error={errors.whatsAppNo} />
//                 <InputField name="departureCity" value={formData.departureCity} onChange={handleChange} required error={errors.departureCity} />
//                 <InputField name="destination" value={formData.destination} onChange={handleChange} error={errors.destination} />
//                 <InputField name="expectedTravelDate" type="date" value={formData.expectedTravelDate} onChange={handleChange} error={errors.expectedTravelDate} />
//                 <InputField name="noOfDays" type="number" value={formData.noOfDays} onChange={handleChange} error={errors.noOfDays} />
//                 <InputField name="placesToCover" value={formData.placesToCover} onChange={handleChange} error={errors.placesToCover} />
//                 <InputField name="noOfPerson" type="number" value={formData.noOfPerson} onChange={handleChange} error={errors.noOfPerson} />
//                 <InputField name="noOfChild" type="number" value={formData.noOfChild} onChange={handleChange} error={errors.noOfChild} />
//                 <InputField name="childAge" value={formData.childAge} onChange={handleChange} error={errors.childAge} />
//                 <SelectField name="leadSource" options={leadSources} value={formData.leadSource} onChange={handleChange} error={errors.leadSource} />
//                 <SelectField name="leadType" options={leadTypes} value={formData.leadType} onChange={handleChange} error={errors.leadType} />
//                 <SelectField name="tripType" options={tripTypes} value={formData.tripType} onChange={handleChange} error={errors.tripType} />
//                 <InputField name="company" value={formData.company} onChange={handleChange} error={errors.company} />
//                 <SelectField name="leadStatus" options={leadStatuses} value={formData.leadStatus} onChange={handleChange} error={errors.leadStatus} />
//                 <InputField name="value" type="number" value={formData.value} onChange={handleChange} error={errors.value} />
//               </div>

//               {/* ✅ Notes Field (added below the grid) */}
//               <div className="mt-2">
//                 <label className="block text-xs font-medium text-gray-700 mb-0.5">
//                   Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Add any notes or remarks about this lead..."
//                   className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                 ></textarea>
//               </div>

//               <div className="mt-3 flex gap-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//                 >
//                   {isSubmitting ? "Saving..." : "Save Lead"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//               {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
//               {submitSuccess && <p className="text-green-600 mt-2">Lead added successfully!</p>}
//             </form>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };


// export default AddLead;




import React, { useState, useEffect } from "react";
import { Plus, AlertCircle } from "lucide-react";
// import { Eye, Edit2 } from "lucide-react";
import { Eye, Edit2, X } from "lucide-react";
import Modal from "../UserManagement/Modal.jsx";

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

const AddLead = ({ onLeadAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", whatsAppNo: "",
    departureCity: "", destination: "", expectedTravelDate: "",
    noOfDays: "", placesToCover: "", noOfPerson: "",
    noOfChild: "", childAge: "", leadSource: "",
    leadType: "", tripType: "", company: "",
    leadStatus: "Hot", value: "", notes: "",
  });

  const [errors, setErrors] = useState({});

  // 🧩 Summary cards data
  const [totalMyLeads, setTotalMyLeads] = useState(0);
  const [totalAssignedLeads, setTotalAssignedLeads] = useState(0);

  useEffect(() => {
    const fetchLeadCounts = async () => {
      try {
        const response = await fetch("http://localhost:4000/leads/");
        const result = await response.json();
        if (result.success) {
          const allLeads = result.data || result;
          const myId = localStorage.getItem("userId");
          const myLeads = allLeads.filter(
            (lead) => lead.createdBy === myId || lead.assignedTo === myId
          );
          setTotalMyLeads(myLeads.length);
          setTotalAssignedLeads(allLeads.length);
        }
      } catch (err) {
        console.error("Error fetching lead counts:", err);
      }
    };
    fetchLeadCounts();
  }, []);

  // 🧠 Form validation
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

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const employeeId = localStorage.getItem("userId");
      if (!employeeId) throw new Error("Employee ID not found in localStorage");

      const leadRes = await fetch("http://localhost:4000/employeelead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, employeeId }),
      });

      if (!leadRes.ok) throw new Error("Failed to create lead");

      const leadData = await leadRes.json();
      console.log("✅ Lead Created:", leadData);

      setSubmitSuccess(true);
      onLeadAdded?.();

      setTimeout(() => {
        setIsOpen(false);
        setSubmitSuccess(false);
        setFormData({
          name: "", email: "", phone: "", whatsAppNo: "",
          departureCity: "", destination: "", expectedTravelDate: "",
          noOfDays: "", placesToCover: "", noOfPerson: "",
          noOfChild: "", childAge: "", leadSource: "",
          leadType: "", tripType: "", company: "",
          leadStatus: "Hot", value: "", notes: "",
        });
      }, 1500);

    } catch (err) {
      console.error("Lead creation failed:", err);
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 🧭 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <div className="text-lg font-semibold text-black">Total My Leads</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{totalMyLeads}</div>
        </div>

        <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <div className="text-lg font-semibold text-black">Total Assigned Leads</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{totalAssignedLeads}</div>
        </div>

        <div className="w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <div className="text-lg font-semibold text-black">Static Card</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">N/A</div>
        </div>
      </div>

      {/* Add Lead Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        <Plus className="w-4 h-4" /> Add Lead
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
        <div className="flex flex-col h-full max-h-[95vh]">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <form onSubmit={handleManualSubmit} className="space-y-3" noValidate>
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
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  {isSubmitting ? "Saving..." : "Save Lead"}
                </button>
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
              {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
              {submitSuccess && <p className="text-green-600 mt-2">Lead added successfully!</p>}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

// 🧠 Employee Leads Page with Table














const EmployeeLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewLead, setViewLead] = useState(null); // 🆕 For view modal

  // Fetch leads for this employee
  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    const employeeId = localStorage.getItem("userId");
    console.log("Employee ID:", employeeId);

    if (!employeeId) {
      setError("Employee ID not found");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/employeelead/employee/${employeeId}`);
      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched data:", data);

      const filteredLeads = data.leads || [];
      setLeads(filteredLeads);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleView = (lead) => {
    setViewLead(lead); // 🟢 Open modal with lead data
  };

  const handleEdit = (lead) => {
    console.log("Edit lead:", lead);
    // You can open an edit modal here next
  };

  const closeModal = () => setViewLead(null); // 🟢 Close modal

  return (
    <div className="p-4">
      <AddLead onLeadAdded={fetchLeads} />

      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <p>Loading leads...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : leads.length === 0 ? (
          <p>No leads found.</p>
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
                <th className="px-4 py-2 border">Lead Source</th>
                <th className="px-4 py-2 border">Lead Status</th>
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
                  <td className="px-4 py-2 border">{lead.expectedTravelDate}</td>
                  <td className="px-4 py-2 border">{lead.leadSource}</td>
                  <td className="px-4 py-2 border">{lead.leadStatus}</td>
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

      {/* 🆕 View Lead Modal */}
      {viewLead && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent modal close on inside click
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">Lead Details</h2>

            <div className="space-y-3">
              <div>
                <strong className="block text-gray-700">Name:</strong>
                <span className="text-gray-800">{viewLead.name || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Email:</strong>
                <span className="text-gray-800">{viewLead.email || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Phone:</strong>
                <span className="text-gray-800">{viewLead.phone || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Departure City:</strong>
                <span className="text-gray-800">{viewLead.departureCity || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Destination:</strong>
                <span className="text-gray-800">{viewLead.destination || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Expected Travel Date:</strong>
                <span className="text-gray-800">{viewLead.expectedTravelDate || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Lead Source:</strong>
                <span className="text-gray-800">{viewLead.leadSource || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Lead Status:</strong>
                <span className="text-gray-800">{viewLead.leadStatus || "-"}</span>
              </div>
              {viewLead.notes && (
                <div>
                  <strong className="block text-gray-700">Notes:</strong>
                  <span className="text-gray-800">{viewLead.notes}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeads;









