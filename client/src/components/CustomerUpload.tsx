import { useState } from "react";
import axios from "axios";

export default function CustomerUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.patch("http://localhost:5000/api/upload/customers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Customer Tagging Updated");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Uploading Customer Tagging failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg py-8 px-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Customer Tagging
        </h2>
        <p className="text-center text-sm pb-4">This will update customer tagging data</p>

        {/* File Input */}
        <label className="flex flex-col items-center px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
          <svg
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8M8 16l4-4 4 4"
            />
          </svg>
          <span className="text-gray-600">
            {file ? file.name : "Click to select an Excel file (.xlsx/.xls)"}
          </span>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full mt-6 py-2 cursor-pointer px-4 rounded-lg text-white font-semibold transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Optional Info */}
        <p className="mt-4 text-sm text-gray-500 text-center">
          Make sure your Excel file has the correct headers: <br />
         <span className="font-medium">salesman, custcode, customer, contact, longitude, latitude, status</span>
        </p>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";

// export default function CustomerUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       await axios.patch("http://localhost:5000/api/upload/customers", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Customers uploaded successfully");
//     } catch (err) {
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".xlsx,.xls"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />
//       <button onClick={handleUpload} disabled={loading} className="cursor-pointer px-2">
//         {loading ? "Uploading..." : "Upload Excel"}
//       </button>
//     </div>
//   );
// }
