// import React, { useState } from "react";
// import { Eye, Edit, Trash2 } from "lucide-react";

// const CustomerData = () => {
//   const [customers, setCustomers] = useState([
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       phone: "9876543210",
//       groupNo: "G-101",
//       email: "rahul@gmail.com",
//       address: "Delhi, India",
//     },
//     {
//       id: 2,
//       name: "Priya Verma",
//       phone: "9123456789",
//       groupNo: "G-202",
//       email: "priya@gmail.com",
//       address: "Mumbai, India",
//     },

//     {
//       id: 3,
//       name: "Ronit Das",
//       phone: "9123456789",
//       groupNo: "G-205",
//       email: "rahul@gmail.com",
//       address: "Hyderabad, India",
//     },
//   ]);

//   const [viewData, setViewData] = useState(null);
//   const [editData, setEditData] = useState(null);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       setCustomers(customers.filter((c) => c.id !== id));
//     }
//   };

//   const handleEditSave = () => {
//     setCustomers((prev) =>
//       prev.map((c) => (c.id === editData.id ? editData : c))
//     );
//     setEditData(null);
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Customer List</h2>

//       <div className="bg-white shadow rounded p-4">
//         {/* TABLE */}
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-800 text-white">
//               <th className="p-3 text-left">Customer Name</th>
//               <th className="p-3 text-left">Group No</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((c, index) => (
//               <tr
//                 key={c.id}
//                 className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//               >
//                 <td className="p-3 border-b">{c.name}</td>
//                 <td className="p-3 border-b">{c.groupNo}</td>
//                 <td className="p-3 border-b flex gap-3">
//                   <button
//                     className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
//                     onClick={() => setViewData(c)}
//                   >
//                     <Eye size={16} />
//                   </button>
//                   <button
//                     className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
//                     onClick={() => setEditData({ ...c })}
//                   >
//                     <Edit size={16} />
//                   </button>
//                   <button
//                     className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
//                     onClick={() => handleDelete(c.id)}
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* View Modal - Centered on Screen */}
//       {viewData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="w-96 bg-white border rounded shadow-lg p-6 relative">
//             <button
//               onClick={() => setViewData(null)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
//               aria-label="Close view modal"
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-bold mb-4">Customer Details</h3>
//             <p className="mb-2"><strong>Name:</strong> {viewData.name}</p>
//             <p className="mb-2"><strong>Phone:</strong> {viewData.phone}</p>
//             <p className="mb-2"><strong>Group No:</strong> {viewData.groupNo}</p>
//             <p className="mb-2"><strong>Email:</strong> {viewData.email}</p>
//             <p className="mb-2"><strong>Address:</strong> {viewData.address}</p>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal - Centered on Screen */}
//       {editData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="w-96 bg-white border rounded shadow-lg p-6 relative">
//             <button
//               onClick={() => setEditData(null)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
//               aria-label="Close edit modal"
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-bold mb-4">Edit Customer</h3>
//             <div className="space-y-3">
//               <input
//                 className="w-full border p-2 rounded"
//                 value={editData.name}
//                 onChange={(e) =>
//                   setEditData({ ...editData, name: e.target.value })
//                 }
//                 placeholder="Name"
//               />
//               <input
//                 className="w-full border p-2 rounded"
//                 value={editData.phone}
//                 onChange={(e) =>
//                   setEditData({ ...editData, phone: e.target.value })
//                 }
//                 placeholder="Phone"
//               />
//               <input
//                 className="w-full border p-2 rounded"
//                 value={editData.groupNo}
//                 onChange={(e) =>
//                   setEditData({ ...editData, groupNo: e.target.value })
//                 }
//                 placeholder="Group No"
//               />
//               <input
//                 className="w-full border p-2 rounded"
//                 value={editData.email}
//                 onChange={(e) =>
//                   setEditData({ ...editData, email: e.target.value })
//                 }
//                 placeholder="Email"
//               />
//               <textarea
//                 className="w-full border p-2 rounded"
//                 rows="3"
//                 value={editData.address}
//                 onChange={(e) =>
//                   setEditData({ ...editData, address: e.target.value })
//                 }
//                 placeholder="Address"
//               ></textarea>
//             </div>

//             <button
//               onClick={handleEditSave}
//               className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//             >
//               Save Changes
//             </button>

//             <button
//               onClick={() => setEditData(null)}
//               className="mt-2 w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerData;                       






import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const CustomerData = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      groupNo: "G-101",
      email: "rahul@gmail.com",
      address: "Delhi, India",
    },
    {
      id: 2,
      name: "Priya Verma",
      phone: "9123456789",
      groupNo: "G-202",
      email: "priya@gmail.com",
      address: "Mumbai, India",
    },
    {
      id: 3,
      name: "Ronit Das",
      phone: "9123456789",
      groupNo: "G-205",
      email: "rahul@gmail.com",
      address: "Hyderabad, India",
    },
  ]);

  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState(""); // <-- New filter state

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleEditSave = () => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === editData.id ? editData : c))
    );
    setEditData(null);
  };

  // Filtered customers based on filter text
  const filteredCustomers = customers.filter((c) => {
    const search = filter.toLowerCase();
    return (
      c.name.toLowerCase().includes(search) ||
      c.groupNo.toLowerCase().includes(search) ||
      c.phone.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search) ||
      c.address.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Customer List</h2>

      {/* Filter input */}
      <input
        type="text"
        placeholder="Search by name, group no, phone, email, address..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />

      <div className="bg-white shadow rounded p-4">
        {/* TABLE */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Group No</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c, index) => (
                <tr
                  key={c.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 border-b">{c.name}</td>
                  <td className="p-3 border-b">{c.groupNo}</td>
                  <td className="p-3 border-b flex gap-3">
                    <button
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                      onClick={() => setViewData(c)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                      onClick={() => setEditData({ ...c })}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                      onClick={() => handleDelete(c.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-4 text-gray-500 italic"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-96 bg-white border rounded shadow-lg p-6 relative">
            <button
              onClick={() => setViewData(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              aria-label="Close view modal"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">Customer Details</h3>
            <p className="mb-2">
              <strong>Name:</strong> {viewData.name}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {viewData.phone}
            </p>
            <p className="mb-2">
              <strong>Group No:</strong> {viewData.groupNo}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {viewData.email}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {viewData.address}
            </p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-96 bg-white border rounded shadow-lg p-6 relative">
            <button
              onClick={() => setEditData(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              aria-label="Close edit modal"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">Edit Customer</h3>
            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                className="w-full border p-2 rounded"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                placeholder="Phone"
              />
              <input
                className="w-full border p-2 rounded"
                value={editData.groupNo}
                onChange={(e) =>
                  setEditData({ ...editData, groupNo: e.target.value })
                }
                placeholder="Group No"
              />
              <input
                className="w-full border p-2 rounded"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                placeholder="Email"
              />
              <textarea
                className="w-full border p-2 rounded"
                rows="3"
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
                placeholder="Address"
              ></textarea>
            </div>

            <button
              onClick={handleEditSave}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditData(null)}
              className="mt-2 w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerData;
