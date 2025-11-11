// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// function CompanySidebar({ roles }) {
//   const [openDropdowns, setOpenDropdowns] = useState({});
//   const location = useLocation();
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   useEffect(() => {
//     // Load selected company from localStorage (for display only)
//     const storedCompany = localStorage.getItem("selectedCompany");
//     if (storedCompany) {
//       setSelectedCompany(JSON.parse(storedCompany));
//     }
//   }, []);

//   const toggleDropdown = (key) => {
//     setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // Check if dropdown should be open based on active URL
//   const isDropdownActive = (role, sub) => {
//     const path = location.pathname.slice(1); // remove leading '/'
//     if (sub) {
//       return sub.points?.some(
//         (point) => point.trim().toLowerCase().replace(/\s+/g, "-") === path
//       );
//     } else {
//       return role.subRoles?.some((subRole) =>
//         subRole.points?.some(
//           (point) => point.trim().toLowerCase().replace(/\s+/g, "-") === path
//         )
//       );
//     }
//   };

//   // ✅ Direct route mapping (matches index.jsx routes)
//   const generateRoutePath = (point) => {
//     const routeMap = {
//       // Core modules
//       "lead management": "/lead-management",
//       "user management": "/user-management",
//       "employee list": "/user-management", // 👈 NEW alias
//       attendance: "/attendance",
//       settings: "/settings",

//       // Lead-related
//       "assign lead": "/assignlead",
//       "todays leads": "/todaysleads",
//       "followup leads": "/followupleads",

//       // Admin modules
//       leaves: "/leaves",
//       "leave management": "/leaves", // 👈 NEW alias
//       "daily expenses": "/dailyexpenses",
//       cheque: "/cheque",

//       // Superadmin modules
//       "assign role": "/assignrole",
//       "add role": "/addrole",
//       "assign company": "/assigncompany",
//       "add admin": "/add-admin",
//       "add user": "/add-user",

//       // Company operations
//       department: "/department",
//       designation: "/designation",
//       "create state": "/createstate",
//       "create destination": "/createdestination",
//       "create hotel": "/createhotel",
//     };

//     const normalizedPoint = point.trim().toLowerCase();
//     return routeMap[normalizedPoint] || `/${normalizedPoint.replace(/\s+/g, "-")}`;
//   };

//   return (
//     <aside className="w-64 bg-white border-r h-screen overflow-y-auto shadow-sm">
//       {/* Sidebar Header */}
//       <div className="p-6 border-b bg-black">
//         <h2 className="text-xl font-bold text-white">
//           {selectedCompany ? selectedCompany.companyName : "Dashboard"}
//         </h2>
//         <p className="text-blue-100 text-sm mt-1">Company Management</p>
//       </div>

//       {/* Sidebar Content */}
//       <div className="p-4">
//         {/* Static Section */}
//         <ul className="space-y-3">
//           <li>
//             <Link
//               to="/dashboard"
//               className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-100 text-gray-800 font-medium ${
//                 location.pathname === "/dashboard" ? "bg-gray-200" : ""
//               }`}
//             >
//               Dashboard
//             </Link>
//           </li>
//         </ul>

//         {/* Dynamic Roles */}
//         {roles && roles.length > 0 ? (
//           <ul className="space-y-3 mt-4">
//             {roles.map((role, index) => {
//               const roleKey = role.roleName || role.name || `role-${index}`;
//               const roleActive = isDropdownActive(role);

//               return (
//                 <li key={index} className="space-y-1">
//                   {/* Role Header */}
//                   <button
//                     onClick={() => toggleDropdown(roleKey)}
//                     className="flex justify-between items-center w-full bg-gray-50 rounded-lg p-3 border border-gray-200 font-semibold text-gray-800 text-left hover:bg-gray-100 focus:outline-none"
//                   >
//                     {role.roleName || role.name || "Unknown Role"}
//                     {role.subRoles?.length > 0 && (
//                       <span>
//                         {openDropdowns[roleKey] || roleActive ? (
//                           <FiChevronUp />
//                         ) : (
//                           <FiChevronDown />
//                         )}
//                       </span>
//                     )}
//                   </button>

//                   {/* Sub-Roles */}
//                   {role.subRoles &&
//                     role.subRoles.length > 0 &&
//                     (openDropdowns[roleKey] || roleActive) && (
//                       <ul className="ml-4 mt-2 space-y-1">
//                         {role.subRoles.map((sub, i) => {
//                           const subKey = `${roleKey}-${i}`;
//                           const subActive = isDropdownActive(role, sub);

//                           return (
//                             <li key={i} className="space-y-1">
//                               <button
//                                 onClick={() => toggleDropdown(subKey)}
//                                 className="flex justify-between items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none font-medium text-sm"
//                               >
//                                 {sub.subRoleName || "Unknown SubRole"}
//                                 {sub.points?.length > 0 && (
//                                   <span>
//                                     {openDropdowns[subKey] || subActive ? (
//                                       <FiChevronUp />
//                                     ) : (
//                                       <FiChevronDown />
//                                     )}
//                                   </span>
//                                 )}
//                               </button>

//                               {/* Points (actual links) */}
//                               {sub.points &&
//                                 sub.points.length > 0 &&
//                                 (openDropdowns[subKey] || subActive) && (
//                                   <ul className="ml-4 mt-1 space-y-1">
//                                     {sub.points.map((point, j) => {
//                                       const route = generateRoutePath(point);
//                                       return (
//                                         <li key={j}>
//                                           <Link
//                                             to={route}
//                                             className={`block px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150 text-sm ${
//                                               location.pathname === route
//                                                 ? "bg-blue-100"
//                                                 : ""
//                                             }`}
//                                           >
//                                             {point}
//                                           </Link>
//                                         </li>
//                                       );
//                                     })}
//                                   </ul>
//                                 )}
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     )}
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <div className="text-center py-8">
//             <svg
//               className="w-12 h-12 text-gray-300 mx-auto mb-3"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <p className="text-gray-500 text-sm">No roles assigned yet.</p>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

// export default CompanySidebar;





// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FiChevronDown, FiChevronUp, FiHome, FiBriefcase } from "react-icons/fi";

// function CompanySidebar({ roles }) {
//   const [openDropdowns, setOpenDropdowns] = useState({});
//   const location = useLocation();
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   useEffect(() => {
//     const storedCompany = localStorage.getItem("selectedCompany");
//     if (storedCompany) {
//       setSelectedCompany(JSON.parse(storedCompany));
//     }
//   }, []);

//   const toggleDropdown = (key) => {
//     setOpenDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   // Determine if a dropdown (role/subrole) should appear active
//   const isDropdownActive = (role, sub) => {
//     const current = location.pathname;
//     const checkPoints = (points) =>
//       points?.some((p) => generateRoutePath(p) === current);

//     if (sub) return checkPoints(sub.points);
//     return role.subRoles?.some((s) => checkPoints(s.points));
//   };

//   const generateRoutePath = (point) => {
//     const routeMap = {
//       "lead management": "/lead-management",
//       "user management": "/user-management",
//       "employee list": "/user-management",
//     //  "attendance": "/attendance",
//       "attendence": "/attendance",
//       settings: "/settings",
//       "assign lead": "/assignlead",
//       "todays leads": "/todaysleads",
//       "followup leads": "/followupleads",
//       leaves: "/leaves",
//       "leave management": "/leaves",
//  "daily expenses": "/dailyexpenses",
// "expense": "/dailyexpenses",
// "expenses": "/dailyexpenses",
   
//     cheque: "/cheque",
//       "assign role": "/assignrole",
//       "add role": "/addrole",
//       "assign company": "/assigncompany",
//       "add admin": "/add-admin",
//       "add user": "/add-user",
//       department: "/department",
//       designation: "/designation",
//       "create state": "/createstate",
//       "create destination": "/createdestination",
//       "create hotel": "/createhotel",
//       };
//     const normalized = point.trim().toLowerCase();
//     return routeMap[normalized] || `/${normalized.replace(/\s+/g, "-")}`;
//   };

//   return (
//     <aside className="w-64 bg-white h-screen border-r border-gray-200 shadow-lg overflow-y-auto transition-all duration-300">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200 bg-black text-white flex items-center gap-3">
//         <div className="flex size-12 items-center justify-center rounded-lg bg-white text-black text-xl font-bold shadow-md">
//           {selectedCompany?.companyName?.[0]?.toUpperCase() || "C"}
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold">
//             {selectedCompany?.companyName || "Company Dashboard"}
//           </h2>
//           <p className="text-gray-300 text-xs mt-1">Company Management</p>
//         </div>
//       </div>

//       {/* Sidebar Content */}
//       <div className="p-4">
//         {/* Dashboard */}
//         <ul className="space-y-2 list-none">
//           <li>
//             <Link
//               to="/dashboard"
//               className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all ${
//                 location.pathname === "/dashboard"
//                   ? "bg-black text-white shadow-md"
//                   : "text-gray-800 hover:bg-gray-100"
//               }`}
//             >
//               <FiHome size={18} />
//               <span>Dashboard</span>
//             </Link>
//           </li>
//         </ul>

//         {/* Dynamic Roles */}
//         {roles && roles.length > 0 ? (
//           <ul className="space-y-3 mt-6 list-none">
//             {roles.map((role, index) => {
//               const roleKey = `role-${index}-${role.roleName || role.name}`;
//               const roleActive = isDropdownActive(role);
//               const roleOpen = openDropdowns[roleKey] || roleActive;

//               return (
//                 <li key={roleKey} className="space-y-1 list-none">
//                   {/* Role Header */}
//                   <button
//                     onClick={() => toggleDropdown(roleKey)}
//                     className={`flex justify-between items-center w-full px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
//                       roleOpen
//                         ? "bg-black text-white border-black"
//                         : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <FiBriefcase />
//                       {role.roleName || role.name || "Unknown Role"}
//                     </div>
//                     {role.subRoles?.length > 0 && (
//                       <span>{roleOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
//                     )}
//                   </button>

//                   {/* Sub Roles */}
//                   {role.subRoles?.length > 0 && roleOpen && (
//                     <ul className="ml-4 mt-2 space-y-1 border-l border-gray-300 pl-3 list-none">
//                       {role.subRoles.map((sub, i) => {
//                         const subKey = `${roleKey}-sub-${i}-${sub.subRoleName}`;
//                         const subActive = isDropdownActive(role, sub);
//                         const subOpen = openDropdowns[subKey] || subActive;

//                         return (
//                           <li key={subKey} className="space-y-1 list-none">
//                             <button
//                               onClick={() => toggleDropdown(subKey)}
//                               className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-sm font-medium transition ${
//                                 subOpen
//                                   ? "bg-black text-white"
//                                   : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                             >
//                               {sub.subRoleName || "Unknown SubRole"}
//                               {sub.points?.length > 0 && (
//                                 <span>
//                                   {subOpen ? (
//                                     <FiChevronUp size={15} />
//                                   ) : (
//                                     <FiChevronDown size={15} />
//                                   )}
//                                 </span>
//                               )}
//                             </button>

//                             {/* Points */}
//                             {sub.points?.length > 0 && subOpen && (
//                               <ul className="ml-4 mt-1 space-y-1 list-none">
//                                 {sub.points.map((point, j) => {
//                                   const route = generateRoutePath(point);
//                                   const isActive = location.pathname === route;
//                                   return (
//                                     <li key={`${subKey}-point-${j}`} className="list-none">
//                                       <Link
//                                         to={route}
//                                         className={`block px-3 py-1.5 rounded-md text-sm transition-colors duration-150 ${
//                                           isActive
//                                             ? "bg-black text-white font-semibold"
//                                             : "text-gray-700 hover:bg-gray-100"
//                                         }`}
//                                       >
//                                         {point}
//                                       </Link>
//                                     </li>
//                                   );
//                                 })}
//                               </ul>
//                             )}
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <div className="text-center py-10 text-gray-400">
//             <svg
//               className="w-10 h-10 mx-auto mb-3"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <p className="text-sm">No roles assigned yet.</p>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

// export default CompanySidebar;





import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiHome, FiBriefcase } from "react-icons/fi";

function CompanySidebar({ roles }) {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const storedCompany = localStorage.getItem("selectedCompany");
    if (storedCompany) {
      setSelectedCompany(JSON.parse(storedCompany));
    }
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Determine if a dropdown (role/subrole) should appear active
  const isDropdownActive = (role, sub) => {
    const current = location.pathname;
    const checkPoints = (points) =>
      points?.some((p) => generateRoutePath(p) === current);

    if (sub) return checkPoints(sub.points);
    return role.subRoles?.some((s) => checkPoints(s.points));
  };

  const generateRoutePath = (point) => {
    const routeMap = {
      // Lead Management
      "lead management": "/lead-management",
      "all leads": "/lead-management",
      "all lead": "/lead-management",
      "leads": "/lead-management",
      
      // User Management
      "user management": "/user-management",
      "employee list": "/user-management",
      
      // Attendance
      "attendance": "/attendance",
      "attendence": "/attendance",
      
      // Settings
      "settings": "/settings",
      
      // Lead Operations
      "assign lead": "/assignlead",
      "todays leads": "/todaysleads",
      "followup leads": "/followupleads",
      
      // Leave Management
      "leaves": "/leaves",
      "leave management": "/leaves",
      
      // Expenses - All variations mapped to /dailyexpenses
      "daily expenses": "/dailyexpenses",
      "expense": "/dailyexpenses",
      "expenses": "/dailyexpenses",
      "daily expense": "/dailyexpenses",
      
      // Cheque
      "cheque": "/cheque",
      "cheque entry": "/cheque",
      "cheque expense": "/cheque",
      
      // Role Management
      "assign role": "/assignrole",
      "add role": "/addrole",
      
      // Company Management
      "assign company": "/assigncompany",
      
      // User Operations
      "add admin": "/add-admin",
      "add user": "/add-user",
      
      // Company Structure
      "department": "/department",
      "designation": "/designation",
      
      // Operations
      "create state": "/createstate",
      "create destination": "/createdestination",
      "create hotel": "/createhotel",
    };
    
    const normalized = point.trim().toLowerCase();
    return routeMap[normalized] || `/${normalized.replace(/\s+/g, "-")}`;
  };

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 shadow-lg overflow-y-auto transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-black text-white flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-lg bg-white text-black text-xl font-bold shadow-md">
          {selectedCompany?.companyName?.[0]?.toUpperCase() || "C"}
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {selectedCompany?.companyName || "Company Dashboard"}
          </h2>
          <p className="text-gray-300 text-xs mt-1">Company Management</p>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="p-4">
        {/* Dashboard */}
        <ul className="space-y-2 list-none">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all ${
                location.pathname === "/dashboard"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <FiHome size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>

        {/* Dynamic Roles */}
        {roles && roles.length > 0 ? (
          <ul className="space-y-3 mt-6 list-none">
            {roles.map((role, index) => {
              const roleKey = `role-${index}-${role.roleName || role.name}`;
              const roleActive = isDropdownActive(role);
              const roleOpen = openDropdowns[roleKey];

              return (
                <li key={roleKey} className="space-y-1 list-none">
                  {/* Role Header */}
                  <button
                    onClick={() => toggleDropdown(roleKey)}
                    className={`flex justify-between items-center w-full px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                      roleOpen
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FiBriefcase />
                      {role.roleName || role.name || "Unknown Role"}
                    </div>
                    {role.subRoles?.length > 0 && (
                      <span>{roleOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
                    )}
                  </button>

                  {/* Sub Roles */}
                  {role.subRoles?.length > 0 && roleOpen && (
                    <ul className="ml-4 mt-2 space-y-1 border-l border-gray-300 pl-3 list-none">
                      {role.subRoles.map((sub, i) => {
                        const subKey = `${roleKey}-sub-${i}-${sub.subRoleName}`;
                        const subActive = isDropdownActive(role, sub);
                        const subOpen = openDropdowns[subKey];

                        return (
                          <li key={subKey} className="space-y-1 list-none">
                            {/* If sub-role has points, show as dropdown. Otherwise, show as link */}
                            {sub.points?.length > 0 ? (
                              <button
                                onClick={() => toggleDropdown(subKey)}
                                className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-sm font-medium transition ${
                                  subOpen
                                    ? "bg-black text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {sub.subRoleName || "Unknown SubRole"}
                                <span>
                                  {subOpen ? (
                                    <FiChevronUp size={15} />
                                  ) : (
                                    <FiChevronDown size={15} />
                                  )}
                                </span>
                              </button>
                            ) : (
                              <Link
                                to={generateRoutePath(sub.subRoleName)}
                                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition ${
                                  location.pathname === generateRoutePath(sub.subRoleName)
                                    ? "bg-black text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {sub.subRoleName || "Unknown SubRole"}
                              </Link>
                            )}

                            {/* Points */}
                            {sub.points?.length > 0 && subOpen && (
                              <ul className="ml-4 mt-1 space-y-1 list-none">
                                {sub.points.map((point, j) => {
                                  const route = generateRoutePath(point);
                                  const isActive = location.pathname === route;
                                  return (
                                    <li key={`${subKey}-point-${j}`} className="list-none">
                                      <Link
                                        to={route}
                                        className={`block px-3 py-1.5 rounded-md text-sm transition-colors duration-150 ${
                                          isActive
                                            ? "bg-black text-white font-semibold"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                      >
                                        {point}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <svg
              className="w-10 h-10 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm">No roles assigned yet.</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default CompanySidebar;