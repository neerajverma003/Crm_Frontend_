// import React, { useState, useEffect } from 'react';

// const CreateHotel = () => {
//   const [isDomestic, setIsDomestic] = useState(true);

//   const [country, setCountry] = useState("India");
//   const [state, setState] = useState("");
//   const [destination, setDestination] = useState("");

//   const [hotelName, setHotelName] = useState("");
//   const [hotelPhone, setHotelPhone] = useState("");
//   const [hotelAddress, setHotelAddress] = useState("");
//   const [hotelEmail, setHotelEmail] = useState("");
//   const [hotelEmergencyPhone, setHotelEmergencyPhone] = useState("");

//   const [states, setStates] = useState([]);
//   const [destinations, setDestinations] = useState([]);

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

//   useEffect(() => {
//     fetchStates();
//     fetchDestinations();
//   }, []);

//   // ---------------------------- FILTERED DROPDOWNS ----------------------------

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

//   // ---------------------------- SUBMIT WITH POST API ----------------------------
//   const handleSubmit = async () => {
//     if (!state || !destination || !hotelName || !hotelPhone || !hotelAddress || !hotelEmail || !hotelEmergencyPhone) {
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
//       EmergencyPhone: hotelEmergencyPhone,
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

//         // Reset form
//         setHotelName("");
//         setHotelPhone("");
//         setHotelAddress("");
//         setHotelEmail("");
//         setHotelEmergencyPhone("");
//         setState("");
//         setDestination("");
//         if (!isDomestic) setCountry("");

//       } else {
//         alert(data.message || "Failed to create hotel!");
//       }

//     } catch (error) {
//       console.error("Error saving hotel:", error);
//       alert("Server error!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
//         <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//           Create Hotel
//         </h1>

//         {/* Domestic / International Toggle */}
//         <div className="flex items-center justify-center gap-6 mb-6">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input type="checkbox" checked={isDomestic} onChange={(e) => setIsDomestic(e.target.checked)} />
//             <span>Domestic</span>
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input type="checkbox" checked={!isDomestic} onChange={(e) => setIsDomestic(!e.target.checked)} />
//             <span>International</span>
//           </label>
//         </div>

//         {/* COUNTRY */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Country</label>

//           {isDomestic ? (
//             <input value="India" className="w-full border p-2 bg-gray-100" disabled />
//           ) : (
//             <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border p-2">
//               <option value="">Select Country</option>
//               {internationalCountries.map((c) => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//           )}
//         </div>

//         {/* STATE */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">State</label>

//           <select value={state} onChange={(e) => setState(e.target.value)} className="w-full border p-2">
//             <option value="">Select State</option>

//             {isDomestic
//               ? domesticStates.map((s) => (
//                   <option key={s._id} value={s._id}>{s.state}</option>
//                 ))
//               : internationalStates.map((s) => (
//                   <option key={s._id} value={s._id}>{s.state}</option>
//                 ))}
//           </select>
//         </div>

//         {/* DESTINATION */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Destination</label>

//           <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border p-2">
//             <option value="">Select Destination</option>
//             {filteredDestinations.map((d) => (
//               <option key={d._id} value={d._id}>{d.destinationName}</option>
//             ))}
//           </select>
//         </div>

//         {/* HOTEL NAME */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Hotel Name</label>
//           <input value={hotelName} onChange={(e) => setHotelName(e.target.value)} className="w-full border p-2" />
//         </div>

//         {/* HOTEL PHONE */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Hotel Phone</label>
//           <input value={hotelPhone} onChange={(e) => setHotelPhone(e.target.value)} className="w-full border p-2" />
//         </div>

//         {/* HOTEL ADDRESS */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Hotel Address</label>
//           <textarea value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} className="w-full border p-2" rows="3"></textarea>
//         </div>

//         {/* HOTEL EMAIL */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Hotel Email</label>
//           <input type="email" value={hotelEmail} onChange={(e) => setHotelEmail(e.target.value)} className="w-full border p-2" />
//         </div>

//         {/* EMERGENCY PHONE */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Emergency Phone</label>
//           <input value={hotelEmergencyPhone} onChange={(e) => setHotelEmergencyPhone(e.target.value)} className="w-full border p-2" />
//         </div>

//         <button onClick={handleSubmit} className="w-full bg-black text-white py-3 rounded-lg">
//           Save Hotel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateHotel;
import React, { useState, useEffect } from 'react';

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
        console.log("Saved:", data);

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

  return (
    <div className="min-h-screen bg-gray-50">
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
            <input value={hotelWhatsapp} onChange={(e) => setHotelWhatsapp(e.target.value)} className="w-full border p-2" placeholder="Enter WhatsApp number" />
          </div>

          {/* CONTACT PERSON NUMBER */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Contact Person Number</label>
            <input value={contactPersonNumber} onChange={(e) => setContactPersonNumber(e.target.value)} className="w-full border p-2" placeholder="Enter contact person number" />
          </div>

          {/* HOTEL RATING */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Hotel Rating</label>
            <select value={hotelRating} onChange={(e) => setHotelRating(e.target.value)} className="w-full border p-2">
              <option value="">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
              <option value="6">6 Stars</option>
              <option value="7">7 Stars</option>
            </select>
          </div>

          <button onClick={handleSubmit} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Save Hotel
          </button>
        </div>
      </div>

      {/* ---------------------- HOTEL LIST TABLE ---------------------- */}
      <div className="p-6 max-w-7xl mx-auto pb-8">
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
      </div>
    </div>
  );
};

export default CreateHotel;
