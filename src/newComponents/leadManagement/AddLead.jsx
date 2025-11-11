// import React, { useState } from "react";
// import { Plus, AlertCircle, Upload } from "lucide-react";
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

// const AddLead = ({ onLeadAdded }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [tab, setTab] = useState("manual"); // manual | upload
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [uploadSummary, setUploadSummary] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "", whatsAppNo: "",
//     departureCity: "", destination: "", expectedTravelDate: "",
//     noOfDays: "", placesToCover: "", noOfPerson: "",
//     noOfChild: "", childAge: "", leadSource: "",
//     leadType: "", tripType: "", company: "",
//     leadStatus: "Hot", value: "", notes: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [file, setFile] = useState(null);

//   // 🧠 Validate manual form (only required fields: name, phone, departureCity)
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
//   const handleManualSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate(formData);
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     setIsSubmitting(true);
//     setApiError("");

//     try {
//       // Convert phone to array by splitting on comma
//       const payload = { ...formData, phone: formData.phone.split(",").map(p => p.trim()) };

//       const res = await fetch("http://localhost:4000/leads", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error("Failed to add lead");

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

//   // 🧩 Excel Upload
//   const handleFileUpload = async (e) => {
//   e.preventDefault();
//   if (!file) return alert("Please select a file first!");

//   setIsSubmitting(true);
//   setUploadSummary(null);
//   setApiError("");

//   try {
//     setUploadSummary({ status: "Processing..." }); // <-- show processing status

//     const formDataObj = new FormData();
//     formDataObj.append("file", file);

//     const res = await fetch("http://localhost:4000/leads/upload", {
//       method: "POST",
//       body: formDataObj,
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to upload");

//     setUploadSummary({
//       status: "Completed",
//       total: data.total,
//       inserted: data.inserted,
//       skipped: data.skipped,
//       errors: data.errors,
//       successRate: data.successRate,
//       failedRate: data.failedRate,
//     });

//     onLeadAdded?.();
//   } catch (err) {
//     setApiError(err.message);
//     setUploadSummary(null);
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
//             <div className="flex gap-2">
//               <button
//                 className={`px-3 py-1 rounded ${tab === "manual" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
//                 onClick={() => setTab("manual")}
//               >
//                 Manual
//               </button>
//               <button
//                 className={`px-3 py-1 rounded ${tab === "upload" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
//                 onClick={() => setTab("upload")}
//               >
//                 Upload Excel
//               </button>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {tab === "manual" ? (
//               <form onSubmit={handleManualSubmit} className="space-y-3" noValidate>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <InputField name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
//                   <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
//                   <InputField name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} placeholder="Separate multiple numbers with commas" />
//                   <InputField name="whatsAppNo" value={formData.whatsAppNo} onChange={handleChange} error={errors.whatsAppNo} />
//                   <InputField name="departureCity" value={formData.departureCity} onChange={handleChange} required error={errors.departureCity} />
//                   <InputField name="destination" value={formData.destination} onChange={handleChange} error={errors.destination} />
//                   <InputField name="expectedTravelDate" type="date" value={formData.expectedTravelDate} onChange={handleChange} error={errors.expectedTravelDate} />
//                   <InputField name="noOfDays" type="number" value={formData.noOfDays} onChange={handleChange} error={errors.noOfDays} />
//                   <InputField name="placesToCover" value={formData.placesToCover} onChange={handleChange} error={errors.placesToCover} />
//                   <InputField name="noOfPerson" type="number" value={formData.noOfPerson} onChange={handleChange} error={errors.noOfPerson} />
//                   <InputField name="noOfChild" type="number" value={formData.noOfChild} onChange={handleChange} error={errors.noOfChild} />
//                   <InputField name="childAge" value={formData.childAge} onChange={handleChange} error={errors.childAge} />
//                   <SelectField name="leadSource" options={leadSources} value={formData.leadSource} onChange={handleChange} error={errors.leadSource} />
//                   <SelectField name="leadType" options={leadTypes} value={formData.leadType} onChange={handleChange} error={errors.leadType} />
//                   <SelectField name="tripType" options={tripTypes} value={formData.tripType} onChange={handleChange} error={errors.tripType} />
//                   <InputField name="company" value={formData.company} onChange={handleChange} error={errors.company} />
//                   <SelectField name="leadStatus" options={leadStatuses} value={formData.leadStatus} onChange={handleChange} error={errors.leadStatus} />
//                   <InputField name="value" type="number" value={formData.value} onChange={handleChange} error={errors.value} />
//                 </div>
//                 <div className="mt-3 flex gap-2">
//                   <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
//                     {isSubmitting ? "Saving..." : "Save Lead"}
//                   </button>
//                   <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
//                     Cancel
//                   </button>
//                 </div>
//                 {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
//                 {submitSuccess && <p className="text-green-600 mt-2">Lead added successfully!</p>}
//               </form>
//             ) : (
//               <form onSubmit={handleFileUpload} className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Select Excel File</label>
//                   <input type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded w-full"/>
//                 </div>
//                 <div className="flex gap-2">
//                   <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
//                     {isSubmitting ? "Uploading..." : "Upload"}
//                   </button>
//                   <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
//                     Cancel
//                   </button>
//                 </div>
//                 {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
//                 {uploadSummary && (
//   <div className="mt-2 text-sm text-gray-700">
//     <p>Total Records: {uploadSummary.total}</p>
//     <p>Successful: {uploadSummary.success}</p>
//     <p>Failed: {uploadSummary.failed}</p>
//   </div>
// )}

//               </form>
//             )}
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default AddLead;





import React, { useState, useEffect } from "react";
import { Plus, AlertCircle } from "lucide-react";
import Modal from "../UserManagement/Modal.jsx";

// 🧩 Dropdown Options
const leadSources = [
  "Cold Call", "Website", "Referral", "LinkedIn", "Trade Show",
  "Email Campaign", "Social Media", "Event", "Organic Search", "Paid Ads",
];
const leadTypes = ["International", "Domestic"];
const tripTypes = ["Solo", "Group", "Family", "Couple", "Honeymoon"];
const leadStatuses = ["Hot", "Warm", "Cold", "Converted", "Lost"];

// 🧩 Input Component
const InputField = ({ name, type = "text", placeholder, required, value, error, onChange }) => (
  <div className="h-[4.5rem]">
    <label className="block text-xs font-medium text-gray-700 mb-0.5">
      {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
      {required && <span className="text-red-500">*</span>}
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

// 🧩 Select Component
const SelectField = ({ name, options, required, value, error, onChange }) => (
  <div className="h-[4.5rem]">
    <label className="block text-xs font-medium text-gray-700 mb-0.5">
      {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
      {required && <span className="text-red-500">*</span>}
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
  const [tab, setTab] = useState("manual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [uploadSummary, setUploadSummary] = useState(null);
  const [progress, setProgress] = useState(0);
  const [recordProgress, setRecordProgress] = useState({ current: 0, total: 0 });

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", whatsAppNo: "",
    departureCity: "", destination: "", expectedTravelDate: "",
    noOfDays: "", placesToCover: "", noOfPerson: "",
    noOfChild: "", childAge: "", leadSource: "",
    leadType: "", tripType: "", company: "",
    leadStatus: "Hot", value: "", notes: "",
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  // 🧩 Manual Validation
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

  // 🧩 Manual Submit
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setApiError("");
    try {
      const payload = { ...formData, phone: formData.phone.split(",").map((p) => p.trim()) };
      const res = await fetch("http://localhost:4000/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add lead");
      onLeadAdded?.();
      setIsOpen(false);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🧩 Upload Excel + Progress System
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    setIsSubmitting(true);
    setApiError("");
    setProgress(0);
    setRecordProgress({ current: 0, total: 0 });
    setUploadSummary(null);

    const formDataObj = new FormData();
    formDataObj.append("file", file);

    // ✅ Upload with progress tracking
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/leads/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        setUploadSummary(res);
        onLeadAdded?.();
      } else {
        setApiError("Upload failed");
      }
      setIsSubmitting(false);
    };

    xhr.onerror = () => {
      setApiError("Network error during upload");
      setIsSubmitting(false);
    };

    xhr.send(formDataObj);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        <Plus className="w-4 h-4" /> Add Lead
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
        <div className="flex flex-col h-full max-h-[95vh]">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded ${tab === "manual" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setTab("manual")}
              >
                Manual
              </button>
              <button
                className={`px-3 py-1 rounded ${tab === "upload" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setTab("upload")}
              >
                Upload Excel
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {tab === "manual" ? (
              // Manual Form
              <form onSubmit={handleManualSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
                  <InputField name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} />
                  <InputField name="departureCity" value={formData.departureCity} onChange={handleChange} required error={errors.departureCity} />
                  <SelectField name="leadSource" options={leadSources} value={formData.leadSource} onChange={handleChange} />
                  <SelectField name="leadType" options={leadTypes} value={formData.leadType} onChange={handleChange} />
                </div>
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isSubmitting ? "Saving..." : "Save Lead"}
                </button>
              </form>
            ) : (
              // Upload Form
              <form onSubmit={handleFileUpload} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Excel File</label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* ✅ Progress Bar */}
                {isSubmitting && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-700 mt-1 text-center">
                      Uploading... {progress}% 
                    </p>
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {isSubmitting ? "Uploading..." : "Upload"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>

                {uploadSummary && (
                  <div className="mt-3 text-sm text-gray-700">
                    <p><strong>Total:</strong> {uploadSummary.total}</p>
                    <p><strong>Inserted:</strong> {uploadSummary.inserted}</p>
                    <p><strong>Skipped:</strong> {uploadSummary.skipped}</p>
                    <p>
                      <strong>Success Rate:</strong> {uploadSummary.successRate}% |{" "}
                      <strong>Failed:</strong> {uploadSummary.failedRate}%
                    </p>
                  </div>
                )}

                {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
              </form>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddLead;