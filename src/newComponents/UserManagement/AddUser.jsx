// import React, { useState, useEffect, useCallback } from "react";
// import Modal from "./Modal.jsx";
// import axios from "axios";

// const ROLES = ["Admin", "Employee"];
// const DEPARTMENTS = ["IT", "Sales", "Digital Marketing", "Legal", "HR", "Accounts","Operations"];

// const AddUser = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [companies, setCompanies] = useState([]);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     officialNo: "",
//     emergencyNo: "",
//     department: "",
//     company: "",
//     role: "",
//     password: "",
//     isActive: true
//   });

//   const handleInputChange = useCallback((field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   }, []);

//   // Fetch company list
//   const getCompanies = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/company/all");
//       setCompanies(response.data.companies);
//     } catch (error) {
//       console.error("Failed to fetch companies:", error);
//     }
//   };

//   useEffect(() => {
//     getCompanies();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.role) {
//       alert("Please select a role");
//       return;
//     }

//     setIsSubmitting(true);

//     // Choose endpoint based on role
//     const endpoint =
//       formData.role === "Admin"
//         ? "http://localhost:4000/addAdmin"
//         : "http://localhost:4000/employee/addEmployee";

//     try {
//       await axios.post(endpoint, {
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         officialNo: formData.officialNo,
//         emergencyNo: formData.emergencyNo,
//         department: formData.department,
//         company: formData.company,
//         password: formData.password,
//         accountActive: formData.isActive,
//         role: formData.role
//       });

//       alert(`${formData.role} added successfully!`);

//       // Reset form
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         officialNo: "",
//         emergencyNo: "",
//         department: "",
//         company: "",
//         role: "",
//         password: "",
//         isActive: true
//       });
//       setIsOpen(false);
//     } catch (error) {
//       console.error("Error adding user:", error);
//       alert("Failed to add user. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = useCallback(() => {
//     setIsOpen(false);
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       officialNo: "",
//       emergencyNo: "",
//       department: "",
//       company: "",
//       role: "",
//       password: "",
//       isActive: true
//     });
//   }, []);

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M5 12h14" />
//           <path d="M12 5v14" />
//         </svg>
//         Add User
//       </button>

//       <Modal isOpen={isOpen} onClose={handleClose} maxWidth="max-w-2xl">
//         <div className="p-6">
//           <h2 className="mb-6 text-xl font-semibold text-gray-900">Add New User</h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
//                 <input
//                   type="text"
//                   value={formData.fullName}
//                   onChange={(e) => handleInputChange("fullName", e.target.value)}
//                   placeholder="Enter full name"
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   placeholder="Enter email address"
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => handleInputChange("phone", e.target.value)}
//                   placeholder="Phone number"
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                 />
//               </div>

//               {/* New Official Number Field */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Official Number</label>
//                 <input
//                   type="tel"
//                   value={formData.officialNo}
//                   onChange={(e) => handleInputChange("officialNo", e.target.value)}
//                   placeholder="Official contact number"
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                 />
//               </div>

//               {/* New Emergency Number Field */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Emergency Number</label>
//                 <input
//                   type="tel"
//                   value={formData.emergencyNo}
//                   onChange={(e) => handleInputChange("emergencyNo", e.target.value)}
//                   placeholder="Emergency contact number"
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Department</label>
//                 <select
//                   value={formData.department}
//                   onChange={(e) => handleInputChange("department", e.target.value)}
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                   required
//                 >
//                   <option value="">Select department</option>
//                   {DEPARTMENTS.map((dept) => (
//                     <option key={dept} value={dept}>
//                       {dept}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Company</label>
//                 <select
//                   value={formData.company}
//                   onChange={(e) => handleInputChange("company", e.target.value)}
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                   required
//                 >
//                   <option value="">Select company</option>
//                   {companies.map((comp) => (
//                     <option key={comp._id} value={comp._id}>
//                       {comp.companyName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
//                 <select
//                   value={formData.role}
//                   onChange={(e) => handleInputChange("role", e.target.value)}
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                   required
//                 >
//                   <option value="">Select Role</option>
//                   {ROLES.map((role) => (
//                     <option key={role} value={role}>
//                       {role}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="relative">
//                 <label className="mb-1 block text-sm font-medium text-gray-700">Temporary Password</label>
//                 <input
//                   type={formData.showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={(e) => handleInputChange("password", e.target.value)}
//                   placeholder="Enter temporary password"
//                   className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
//                   disabled={isSubmitting}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleInputChange("showPassword", !formData.showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                   tabIndex={-1}
//                 >
//                   {formData.showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M1 1l18 18" />
//                       <path d="M10 10a4 4 0 0 1 4 4" />
//                       <path d="M4.5 4.5C7 2 13 2 15.5 4.5" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" />
//                       <circle cx="10" cy="10" r="3" />
//                     </svg>
//                   )}
//                 </button>
//               </div>

//             </div>

//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={formData.isActive}
//                 onChange={(e) => handleInputChange("isActive", e.target.checked)}
//                 className="rounded border-gray-300 text-blue-600"
//                 disabled={isSubmitting}
//               />
//               <label className="text-sm font-medium text-gray-700">Account Active</label>
//             </div>

//             <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
//               <button
//                 type="button"
//                 onClick={handleClose}
//                 className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center gap-2">
//                     <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                     Adding...
//                   </span>
//                 ) : (
//                   "Add User"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default AddUser;




import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal.jsx";
import axios from "axios";

const ROLES = ["Admin", "Employee"];

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    officialNo: "",
    emergencyNo: "",
    department: "",
    designation: "",
    company: "",
    role: "",
    password: "",
    isActive: true,
    showPassword: false,
  });

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Fetch companies
  const getCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:4000/company/all");
      console.log("Companies response:", response.data);
      setCompanies(response.data.companies || []);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      alert("Failed to fetch companies. Please check your connection.");
    }
  };

  // Fetch departments for selected company
  const getDepartments = async (companyId) => {
    if (!companyId) return;
    
    const possibleUrls = [
      `http://localhost:4000/department?company=${companyId}`,
      `http://localhost:4000/department/department?company=${companyId}`,
      `http://localhost:4000/departments?company=${companyId}`,
    ];
    
    console.log("=== DEPARTMENTS API CALL ===");
    console.log("Company ID:", companyId);
    
    for (const url of possibleUrls) {
      try {
        console.log("Trying department URL:", url);
        const response = await fetch(url);
        
        if (!response.ok) {
          console.log(`Failed with status ${response.status}, trying next URL...`);
          continue;
        }
        
        const data = await response.json();
        console.log("✓ Departments API successful!");
        console.log("Departments response:", data);
        
        // Handle different possible response structures
        let deptData = [];
        if (Array.isArray(data)) {
          deptData = data;
        } else if (data.departments) {
          deptData = data.departments;
        } else if (data.data) {
          deptData = data.data;
        }
        
        console.log("Extracted department data:", deptData);
        
        // Extract unique department names
        const uniqueDepartments = [...new Set(deptData.map((d) => d.dep || d.department || d.name))].filter(Boolean);
        console.log("Unique departments:", uniqueDepartments);
        setDepartments(uniqueDepartments);
        
        if (uniqueDepartments.length === 0) {
          alert("No departments found for this company.");
        }
        
        return; // Success, exit
        
      } catch (error) {
        console.log(`Error with ${url}:`, error.message);
        continue;
      }
    }
    
    // All URLs failed
    console.error("All department API endpoints failed");
    alert("Failed to fetch departments. Please check the API endpoint.");
    setDepartments([]);
  };

  // Fetch designations for selected company and department
  const getDesignations = async (companyId, departmentName) => {
    if (!companyId || !departmentName) {
      console.log("Missing companyId or departmentName:", { companyId, departmentName });
      return;
    }
    
    try {
      const url = `http://localhost:4000/designation?company=${companyId}&department=${encodeURIComponent(departmentName)}`;
      console.log("Fetching designations from:", url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Designations response:", data);
      
      // Handle different possible response structures
      let desigData = [];
      if (Array.isArray(data)) {
        desigData = data;
      } else if (data.designations) {
        desigData = data.designations;
      } else if (data.data) {
        desigData = Array.isArray(data.data) ? data.data : [];
      }
      
      console.log("Extracted designation data:", desigData);
      
      // If the data is an array of objects, extract the designation field
      const designationList = desigData.map(d => {
        if (typeof d === 'string') return d;
        return d.designation || d.name || d.title || d.desig;
      }).filter(Boolean);
      
      console.log("Final processed designations:", designationList);
      setDesignations(designationList);
      
      if (designationList.length === 0) {
        console.warn("No designations found for this department");
        alert("No designations found for this department.");
      }
    } catch (error) {
      console.error("Failed to fetch designations:", error);
      alert(`Failed to fetch designations: ${error.message}`);
      setDesignations([]);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    setIsSubmitting(true);

    const endpoint =
      formData.role === "Admin"
        ? "http://localhost:4000/addAdmin"
        : "http://localhost:4000/employee/addEmployee";

    try {
      await axios.post(endpoint, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        officialNo: formData.officialNo,
        emergencyNo: formData.emergencyNo,
        department: formData.department,
        designation: formData.designation,
        company: formData.company,
        password: formData.password,
        accountActive: formData.isActive,
        role: formData.role,
      });

      alert(`${formData.role} added successfully!`);
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      officialNo: "",
      emergencyNo: "",
      department: "",
      designation: "",
      company: "",
      role: "",
      password: "",
      isActive: true,
      showPassword: false,
    });
    setDepartments([]);
    setDesignations([]);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Add User
      </button>

      <Modal isOpen={isOpen} onClose={handleClose} maxWidth="max-w-2xl">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Add New User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Enter full name"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Phone number"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                />
              </div>

              {/* Official Number */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Official Number
                </label>
                <input
                  type="tel"
                  value={formData.officialNo}
                  onChange={(e) =>
                    handleInputChange("officialNo", e.target.value)
                  }
                  placeholder="Official contact number"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                />
              </div>

              {/* Emergency Number */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Emergency Number
                </label>
                <input
                  type="tel"
                  value={formData.emergencyNo}
                  onChange={(e) =>
                    handleInputChange("emergencyNo", e.target.value)
                  }
                  placeholder="Emergency contact number"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                />
              </div>

              {/* Company */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Company
                </label>
                <select
                  value={formData.company}
                  onChange={(e) => {
                    const compId = e.target.value;
                    handleInputChange("company", compId);
                    handleInputChange("department", "");
                    handleInputChange("designation", "");
                    setDepartments([]);
                    setDesignations([]);
                    if (compId) {
                      getDepartments(compId);
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select company</option>
                  {companies.map((comp) => (
                    <option key={comp._id} value={comp._id}>
                      {comp.companyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => {
                    const dep = e.target.value;
                    handleInputChange("department", dep);
                    handleInputChange("designation", "");
                    setDesignations([]);
                    if (dep && formData.company) {
                      getDesignations(formData.company, dep);
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={!formData.company || isSubmitting}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <select
                  value={formData.designation}
                  onChange={(e) =>
                    handleInputChange("designation", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={!formData.department || isSubmitting}
                  required
                >
                  <option value="">Select designation</option>
                  {designations.map((desig, idx) => (
                    <option key={idx} value={desig}>
                      {desig}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select Role</option>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={formData.showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Enter password"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange("showPassword", !formData.showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {formData.showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Account Active */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
                className="rounded border-gray-300 text-blue-600"
                disabled={isSubmitting}
              />
              <label className="text-sm font-medium text-gray-700">
                Account Active
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Adding...
                  </span>
                ) : (
                  "Add User"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddUser;