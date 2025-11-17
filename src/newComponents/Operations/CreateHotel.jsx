// import React, { useState, useEffect } from 'react';
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// const CreateHotel = () => {
//   const [isDomestic, setIsDomestic] = useState(true);
//   const [country, setCountry] = useState("India");
//   const [state, setState] = useState("");
//   const [destination, setDestination] = useState("");
//   const [hotelName, setHotelName] = useState("");
//   const [hotelPhone, setHotelPhone] = useState("");
//   const [hotelAddress, setHotelAddress] = useState("");
//   const [hotelEmail, setHotelEmail] = useState("");
//   const [hotelWhatsapp, setHotelWhatsapp] = useState("");
//   const [contactPersonNumber, setContactPersonNumber] = useState("");
//   const [hotelRating, setHotelRating] = useState("");
//   const [states, setStates] = useState([]);
//   const [destinations, setDestinations] = useState([]);
//   const [hotels, setHotels] = useState([]);

//   // ---------------------------- FETCH APIs ----------------------------
//   const fetchStates = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/state/");
//       const data = await res.json();
//       setStates(data);
//     } catch (err) {
//       console.error("Error fetching states:", err);
//     }
//   };

//   const fetchDestinations = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/destination/");
//       const data = await res.json();
//       setDestinations(data);
//     } catch (err) {
//       console.error("Error fetching destinations:", err);
//     }
//   };

//   const fetchHotels = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/hotel/");
//       const data = await res.json();
//       setHotels(data);
//     } catch (err) {
//       console.error("Error fetching hotels:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStates();
//     fetchDestinations();
//     fetchHotels();
//   }, []);

//   const internationalCountries = [
//     ...new Set(states.filter(s => s.type === "International").map(s => s.country))
//   ];

//   const domesticStates = states.filter(s => s.type === "Domestic");
//   const internationalStates = states.filter(
//     (s) => s.type === "International" && s.country === country
//   );

//   const filteredDestinations = destinations.filter(
//     (d) => d.state?._id === state
//   );

//   useEffect(() => {
//     if (isDomestic) setCountry("India");
//     else setCountry("");

//     setState("");
//     setDestination("");
//   }, [isDomestic]);

//   useEffect(() => {
//     setState("");
//     setDestination("");
//   }, [country]);

//   useEffect(() => {
//     setDestination("");
//   }, [state]);

//   const handleSubmit = async () => {
//     if (!state || !destination || !hotelName || !hotelPhone || !hotelAddress || !hotelEmail || !hotelWhatsapp || !contactPersonNumber  || !hotelRating) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const payload = {
//       type: isDomestic ? "Domestic" : "International",
//       country,
//       state,
//       destination,
//       hotelName,
//       hotelPhone,
//       hotelAddress,
//       hotelEmail,
//       whatsappNumber: hotelWhatsapp,
//       contactPersonNumber,
//       rating: hotelRating,
//     };

//     try {
//       const res = await fetch("http://localhost:4000/hotel/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Hotel created successfully!");
//         console.log("Saved:", data);

//         setHotelName("");
//         setHotelPhone("");
//         setHotelAddress("");
//         setHotelEmail("");
//         setHotelWhatsapp("");
//         setContactPersonNumber("");
//         setHotelRating("");
//         setState("");
//         setDestination("");
//         if (!isDomestic) setCountry("");

//         fetchHotels();
//       } else {
//         alert(data.message || "Failed to create hotel!");
//       }

//     } catch (error) {
//       console.error("Error saving hotel:", error);
//       alert("Server error!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex items-center justify-center p-4 pt-8">
//         <div className="bg-white rounded-lg shadow-md p-8 w-full" style={{maxWidth: '1000px'}}>
//           <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Hotel</h1>

//           {/* Domestic / International Toggle */}
//           <div className="flex items-center justify-center gap-6 mb-6">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input type="checkbox" checked={isDomestic} onChange={(e) => setIsDomestic(e.target.checked)} />
//               <span>Domestic</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input type="checkbox" checked={!isDomestic} onChange={(e) => setIsDomestic(!e.target.checked)} />
//               <span>International</span>
//             </label>
//           </div>

//           {/* COUNTRY */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Country</label>
//             {isDomestic ? (
//               <input value="India" className="w-full border p-2 bg-gray-100" disabled />
//             ) : (
//               <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border p-2">
//                 <option value="">Select Country</option>
//                 {internationalCountries.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             )}
//           </div>

//           {/* STATE */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">State</label>
//             <select value={state} onChange={(e) => setState(e.target.value)} className="w-full border p-2">
//               <option value="">Select State</option>
//               {isDomestic
//                 ? domesticStates.map((s) => (
//                     <option key={s._id} value={s._id}>{s.state}</option>
//                   ))
//                 : internationalStates.map((s) => (
//                     <option key={s._id} value={s._id}>{s.state}</option>
//                   ))}
//             </select>
//           </div>

//           {/* DESTINATION */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Destination</label>
//             <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border p-2">
//               <option value="">Select Destination</option>
//               {filteredDestinations.map((d) => (
//                 <option key={d._id} value={d._id}>{d.destinationName}</option>
//               ))}
//             </select>
//           </div>

//           {/* HOTEL NAME */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Hotel Name</label>
//             <input value={hotelName} onChange={(e) => setHotelName(e.target.value)} className="w-full border p-2" />
//           </div>

//           {/* HOTEL PHONE */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Hotel Phone</label>
//             <input value={hotelPhone} onChange={(e) => setHotelPhone(e.target.value)} className="w-full border p-2" />
//           </div>

//           {/* HOTEL ADDRESS */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Hotel Address</label>
//             <textarea value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} className="w-full border p-2" rows="3"></textarea>
//           </div>

//           {/* HOTEL EMAIL */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Hotel Email</label>
//             <input type="email" value={hotelEmail} onChange={(e) => setHotelEmail(e.target.value)} className="w-full border p-2" />
//           </div>

//           {/* WHATSAPP NUMBER */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">WhatsApp Number</label>
//             <input value={hotelWhatsapp} onChange={(e) => setHotelWhatsapp(e.target.value)} className="w-full border p-2" placeholder="Enter WhatsApp number" />
//           </div>

//           {/* CONTACT PERSON NUMBER */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Contact Person Number</label>
//             <input value={contactPersonNumber} onChange={(e) => setContactPersonNumber(e.target.value)} className="w-full border p-2" placeholder="Enter contact person number" />
//           </div>

//           {/* HOTEL RATING */}
//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Hotel Rating</label>
//             <select value={hotelRating} onChange={(e) => setHotelRating(e.target.value)} className="w-full border p-2">
//               <option value="">Select Rating</option>
//               <option value="1">1 Star</option>
//               <option value="2">2 Stars</option>
//               <option value="3">3 Stars</option>
//               <option value="4">4 Stars</option>
//               <option value="5">5 Stars</option>
//               <option value="6">6 Stars</option>
//               <option value="7">7 Stars</option>
//             </select>
//           </div>

//           <button onClick={handleSubmit} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
//             Save Hotel
//           </button>
//         </div>
//       </div>

    
   
//    <div className="p-6 max-w-7xl mx-auto pb-8">
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">All Hotels</h2>

//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-800 text-white">
//             <th className="p-3 text-left font-semibold">Hotel Name</th>
//             <th className="p-3 text-left font-semibold">Type</th>
//             <th className="p-3 text-left font-semibold">State</th>
//             <th className="p-3 text-left font-semibold">Destination</th>
//             <th className="p-3 text-left font-semibold">Phone</th>
//             <th className="p-3 text-left font-semibold">Email</th>
//             <th className="p-3 text-left font-semibold">WhatsApp</th>
//             <th className="p-3 text-left font-semibold">Rating</th>
//             <th className="p-3 text-left font-semibold">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {hotels.length === 0 ? (
//             <tr>
//               <td colSpan="11" className="p-4 text-center text-gray-500">
//                 No hotels found. Create your first hotel above.
//               </td>
//             </tr>
//           ) : (
//             hotels.map((h, index) => (
//               <tr key={h._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                
//                 {/* 1. Hotel Name */}
//                 <td className="p-3 border-b border-gray-200 font-medium text-gray-900">
//                   {h.hotelName}
//                 </td>

//                 {/* 2. Type */}
//                 <td className="p-3 border-b border-gray-200">
//                   <span className={`px-2 py-1 rounded text-xs font-medium ${
//                     h.type === 'Domestic'
//                       ? 'bg-blue-100 text-blue-700'
//                       : 'bg-purple-100 text-purple-700'
//                   }`}>
//                     {h.type}
//                   </span>
//                 </td>

//                 {/* 3. State */}
//                 <td className="p-3 border-b border-gray-200 text-gray-700">
//                   {h.state?.state || "N/A"}
//                 </td>

//                 {/* 4. Destination */}
//                 <td className="p-3 border-b border-gray-200 text-gray-700">
//                   {h.destination?.destinationName || "N/A"}
//                 </td>

//                 {/* 5. Phone */}
//                 <td className="p-3 border-b border-gray-200 text-gray-700">
//                   {h.hotelPhone}
//                 </td>

//                 {/* 6. Email */}
//                 <td className="p-3 border-b border-gray-200 text-gray-700">
//                   {h.hotelEmail}
//                 </td>

//                 {/* 7. WhatsApp */}
//                 <td className="p-3 border-b border-gray-200 text-gray-700">
//                   {h.whatsappNumber || "N/A"}
//                 </td>

//                 {/* 8. Rating */}
//                 <td className="p-3 border-b border-gray-200">
//                   <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
//                     {h.rating ? `${h.rating} ⭐` : "N/A"}
//                   </span>
//                 </td>

//                 {/* 9. ACTION BUTTONS */}
//                 <td className="p-3 border-b border-gray-200 text-gray-700 flex gap-3">

//                   {/* VIEW */}
//                   <button
//                     className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
//                     onClick={() => onView(h)}
//                   >
//                     <FaEye size={18} />
//                   </button>

//                   {/* EDIT */}
//                   <button
//                     className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
//                     onClick={() => onEdit(h)}
//                   >
//                     <FaEdit size={18} />
//                   </button>

//                   {/* DELETE */}
//                   <button
//                     className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
//                     onClick={() => onDelete(h._id)}
//                   >
//                     <FaTrash size={18} />
//                   </button>

//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// };

// export default CreateHotel;







import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CreateHotel = () => {
  const [isDomestic, setIsDomestic] = useState(true);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [destination, setDestination] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelPhone, setHotelPhone] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [hotelWhatsapp, setHotelWhatsapp] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");
  const [hotelRating, setHotelRating] = useState("");
  const [states, setStates] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);

  // ----------- FILTER STATES -----------
  const [filterType, setFilterType] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [filterRating, setFilterRating] = useState("All");
  const [searchName, setSearchName] = useState("");

  // ---------------------------- FETCH APIs ----------------------------
  const fetchStates = async () => {
    try {
      const res = await fetch("http://localhost:4000/state/");
      const data = await res.json();
      setStates(data);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const fetchDestinations = async () => {
    try {
      const res = await fetch("http://localhost:4000/destination/");
      const data = await res.json();
      setDestinations(data);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  const fetchHotels = async () => {
    try {
      const res = await fetch("http://localhost:4000/hotel/");
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchDestinations();
    fetchHotels();
  }, []);

  const internationalCountries = [
    ...new Set(states.filter(s => s.type === "International").map(s => s.country))
  ];

  const domesticStates = states.filter(s => s.type === "Domestic");
  const internationalStates = states.filter(
    (s) => s.type === "International" && s.country === country
  );

  const filteredDestinations = destinations.filter(
    (d) => d.state?._id === state
  );

  useEffect(() => {
    if (isDomestic) setCountry("India");
    else setCountry("");

    setState("");
    setDestination("");
  }, [isDomestic]);

  useEffect(() => {
    setState("");
    setDestination("");
  }, [country]);

  useEffect(() => {
    setDestination("");
  }, [state]);

  // --------------------------- SUBMIT HOTEL ---------------------------
  const handleSubmit = async () => {
    if (!state || !destination || !hotelName || !hotelPhone || !hotelAddress || !hotelEmail || !hotelWhatsapp || !contactPersonNumber  || !hotelRating) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      type: isDomestic ? "Domestic" : "International",
      country,
      state,
      destination,
      hotelName,
      hotelPhone,
      hotelAddress,
      hotelEmail,
      whatsappNumber: hotelWhatsapp,
      contactPersonNumber,
      rating: hotelRating,
    };

    try {
      const res = await fetch("http://localhost:4000/hotel/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Hotel created successfully!");

        setHotelName("");
        setHotelPhone("");
        setHotelAddress("");
        setHotelEmail("");
        setHotelWhatsapp("");
        setContactPersonNumber("");
        setHotelRating("");
        setState("");
        setDestination("");
        if (!isDomestic) setCountry("");

        fetchHotels();
      } else {
        alert(data.message || "Failed to create hotel!");
      }

    } catch (error) {
      console.error("Error saving hotel:", error);
      alert("Server error!");
    }
  };

  // --------------------------- FILTER HOTELS ---------------------------
  const filteredHotels = hotels.filter((h) => {
    const matchType = filterType === "All" || h.type === filterType;
    const matchState = filterState === "All" || h.state?.state === filterState;
    const matchRating = filterRating === "All" || Number(h.rating) === Number(filterRating);
    const matchSearch = h.hotelName.toLowerCase().includes(searchName.toLowerCase());

    return matchType && matchState && matchRating && matchSearch;
  });

  // --------------------------- VIEW, EDIT, DELETE (HOOKS YOU WILL CONNECT LATER) ---------------------------
  const onView = (hotel) => console.log("VIEW HOTEL →", hotel);
  const onEdit = (hotel) => console.log("EDIT HOTEL →", hotel);
  const onDelete = (id) => console.log("DELETE HOTEL →", id);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ------------------------- HOTEL CREATE FORM ------------------------- */}
      <div className="flex items-center justify-center p-4 pt-8">
        <div className="bg-white rounded-lg shadow-md p-8 w-full" style={{maxWidth: '1000px'}}>
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Hotel</h1>

          {/* Domestic / International Toggle */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isDomestic} onChange={(e) => setIsDomestic(e.target.checked)} />
              <span>Domestic</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!isDomestic} onChange={(e) => setIsDomestic(!e.target.checked)} />
              <span>International</span>
            </label>
          </div>

          {/* COUNTRY */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Country</label>
            {isDomestic ? (
              <input value="India" className="w-full border p-2 bg-gray-100" disabled />
            ) : (
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border p-2">
                <option value="">Select Country</option>
                {internationalCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          </div>

          {/* STATE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full border p-2">
              <option value="">Select State</option>
              {isDomestic
                ? domesticStates.map((s) => (
                    <option key={s._id} value={s._id}>{s.state}</option>
                  ))
                : internationalStates.map((s) => (
                    <option key={s._id} value={s._id}>{s.state}</option>
                  ))}
            </select>
          </div>

          {/* DESTINATION */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Destination</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border p-2">
              <option value="">Select Destination</option>
              {filteredDestinations.map((d) => (
                <option key={d._id} value={d._id}>{d.destinationName}</option>
              ))}
            </select>
          </div>

          {/* HOTEL NAME */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Hotel Name</label>
            <input value={hotelName} onChange={(e) => setHotelName(e.target.value)} className="w-full border p-2" />
          </div>

          {/* HOTEL PHONE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Hotel Phone</label>
            <input value={hotelPhone} onChange={(e) => setHotelPhone(e.target.value)} className="w-full border p-2" />
          </div>

          {/* HOTEL ADDRESS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Hotel Address</label>
            <textarea value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} className="w-full border p-2" rows="3"></textarea>
          </div>

          {/* HOTEL EMAIL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Hotel Email</label>
            <input type="email" value={hotelEmail} onChange={(e) => setHotelEmail(e.target.value)} className="w-full border p-2" />
          </div>

          {/* WHATSAPP NUMBER */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">WhatsApp Number</label>
            <input value={hotelWhatsapp} onChange={(e) => setHotelWhatsapp(e.target.value)} className="w-full border p-2" />
          </div>

          {/* CONTACT PERSON NUMBER */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Contact Person Number</label>
            <input value={contactPersonNumber} onChange={(e) => setContactPersonNumber(e.target.value)} className="w-full border p-2" />
          </div>

          {/* HOTEL RATING */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Hotel Rating</label>
            <select value={hotelRating} onChange={(e) => setHotelRating(e.target.value)} className="w-full border p-2">
              <option value="">Select Rating</option>
              {[1,2,3,4,5,6,7].map(r => (
                <option key={r} value={r}>{r} Star</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Save Hotel
          </button>
        </div>
      </div>

      {/* ------------------------- HOTEL LIST ------------------------- */}

      <div className="p-6 max-w-7xl mx-auto pb-8">
        <div className="bg-white rounded-lg shadow-md p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Hotels</h2>

          {/* FILTER BAR */}
          <div className="flex flex-wrap gap-4 mb-6">

            {/* TYPE FILTER */}
            <select
              className="border border-gray-300 px-3 py-2 rounded"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
            </select>

            {/* STATE FILTER */}
            <select
              className="border border-gray-300 px-3 py-2 rounded"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="All">All States</option>
              {[...new Set(hotels.map((h) => h.state?.state))].map(
                (st, idx) =>
                  st && (
                    <option key={idx} value={st}>
                      {st}
                    </option>
                  )
              )}
            </select>

            {/* RATING FILTER */}
            <select
              className="border border-gray-300 px-3 py-2 rounded"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="All">All Ratings</option>
              {[1, 2, 3, 4, 5, 6, 7].map((r) => (
                <option key={r} value={r}>{r} ⭐</option>
              ))}
            </select>

            {/* SEARCH FILTER */}
            <input
              type="text"
              placeholder="Search hotel..."
              className="border border-gray-300 px-3 py-2 rounded"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left font-semibold">Hotel Name</th>
                  <th className="p-3 text-left font-semibold">Type</th>
                  <th className="p-3 text-left font-semibold">State</th>
                  <th className="p-3 text-left font-semibold">Destination</th>
                  <th className="p-3 text-left font-semibold">Phone</th>
                  <th className="p-3 text-left font-semibold">Email</th>
                  <th className="p-3 text-left font-semibold">WhatsApp</th>
                  <th className="p-3 text-left font-semibold">Rating</th>
                  <th className="p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredHotels.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="p-4 text-center text-gray-500">
                      No hotels found.
                    </td>
                  </tr>
                ) : (
                  filteredHotels.map((h, index) => (
                    <tr key={h._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      
                      {/* 1. Hotel Name */}
                      <td className="p-3 border-b border-gray-200 font-medium text-gray-900">
                        {h.hotelName}
                      </td>

                      {/* 2. Type */}
                      <td className="p-3 border-b border-gray-200">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          h.type === 'Domestic'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {h.type}
                        </span>
                      </td>

                      {/* 3. State */}
                      <td className="p-3 border-b border-gray-200 text-gray-700">
                        {h.state?.state || "N/A"}
                      </td>

                      {/* 4. Destination */}
                      <td className="p-3 border-b border-gray-200 text-gray-700">
                        {h.destination?.destinationName || "N/A"}
                      </td>

                      {/* 5. Phone */}
                      <td className="p-3 border-b border-gray-200 text-gray-700">
                        {h.hotelPhone}
                      </td>

                      {/* 6. Email */}
                      <td className="p-3 border-b border-gray-200 text-gray-700">
                        {h.hotelEmail}
                      </td>

                      {/* 7. WhatsApp */}
                      <td className="p-3 border-b border-gray-200 text-gray-700">
                        {h.whatsappNumber || "N/A"}
                      </td>

                      {/* 8. Rating */}
                      <td className="p-3 border-b border-gray-200">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          {h.rating ? `${h.rating} ⭐` : "N/A"}
                        </span>
                      </td>

                      {/* 9. ACTIONS */}
                      <td className="p-3 border-b border-gray-200 text-gray-700 flex gap-3">

                        {/* VIEW */}
                        <button
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                          onClick={() => onView(h)}
                        >
                          <FaEye size={18} />
                        </button>

                        {/* EDIT */}
                        <button
                          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                          onClick={() => onEdit(h)}
                        >
                          <FaEdit size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                          onClick={() => onDelete(h._id)}
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

        </div>
      </div>

    </div>
  );
};

export default CreateHotel;



  {/* ---------------------- HOTEL LIST TABLE ---------------------- */}
      {/* <div className="p-6 max-w-7xl mx-auto pb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Hotels</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left font-semibold">Type</th>
                  <th className="p-3 text-left font-semibold">Hotel Name</th>
                  <th className="p-3 text-left font-semibold">Country</th>
                  <th className="p-3 text-left font-semibold">State</th>
                  <th className="p-3 text-left font-semibold">Destination</th>
                  <th className="p-3 text-left font-semibold">Phone</th>
                  <th className="p-3 text-left font-semibold">Email</th>
                  <th className="p-3 text-left font-semibold">WhatsApp</th>
                  <th className="p-3 text-left font-semibold">Contact Person</th>
                  <th className="p-3 text-left font-semibold">Rating</th>
                  <th className="p-3 text-left font-semibold">Address</th>
                </tr>
              </thead>

              <tbody>
                {hotels.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="p-4 text-center text-gray-500">
                      No hotels found. Create your first hotel above.
                    </td>
                  </tr>
                ) : (
                  hotels.map((h, index) => (
                    <tr key={h._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 border-b border-gray-200">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${h.type === 'Domestic' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {h.type}
                        </span>
                      </td>
                      <td className="p-3 border-b border-gray-200 font-medium text-gray-900">{h.hotelName}</td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">{h.country}</td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">{h.state?.state || "N/A"}</td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">{h.destination?.destinationName || "N/A"}</td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">{h.hotelPhone}</td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">{h.hotelEmail}</td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">{h.whatsappNumber || "N/A"}</td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">{h.contactPersonNumber || "N/A"}</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          {h.rating ? `${h.rating} ⭐` : "N/A"}
                        </span>
                      </td>
                      <td className="p-3 border-b border-gray-200 text-gray-700 max-w-xs truncate">{h.hotelAddress}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}