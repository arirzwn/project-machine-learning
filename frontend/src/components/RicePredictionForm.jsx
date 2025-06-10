import { useState } from "react";

const RicePredictionForm = () => {
  const [formData, setFormData] = useState({
    Tahun: "",
    Bulan: "",
    Luas_Lahan: "",
    Luas_Panen_ha: "",
    Curah_Hujan_mm: "",
    Suhu_Tanah: "",
    Kelembapan: "",
    pH: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      // Convert form data to numbers
      const numericData = {};
      Object.keys(formData).forEach((key) => {
        numericData[key] = parseFloat(formData[key]);
      });

      const response = await fetch(
        "https://machine-learning-model-be-production.up.railway.app/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(numericData),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      setPrediction(result.prediction[0]);
    } catch (err) {
      setError(
        "Failed to get prediction. Please check your input and try again."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: "Tahun", label: "Year", placeholder: "2024", icon: "📅" },
    { name: "Bulan", label: "Month (1-12)", placeholder: "6", icon: "📆" },
    {
      name: "Luas_Lahan",
      label: "Land Area (ha)",
      placeholder: "100",
      icon: "🏞️",
    },
    {
      name: "Luas_Panen_ha",
      label: "Harvest Area (ha)",
      placeholder: "95",
      icon: "🌾",
    },
    {
      name: "Curah_Hujan_mm",
      label: "Rainfall (mm)",
      placeholder: "150",
      icon: "🌧️",
    },
    {
      name: "Suhu_Tanah",
      label: "Soil Temperature (°C)",
      placeholder: "25",
      icon: "🌡️",
    },
    {
      name: "Kelembapan",
      label: "Humidity (%)",
      placeholder: "80",
      icon: "💧",
    },
    { name: "pH", label: "Soil pH", placeholder: "6.5", icon: "⚗️" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-sm px-8 py-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            Rice Production Prediction Form
          </h2>
          <p className="text-white/90 mt-2 drop-shadow-md">
            Fill in the agricultural parameters to predict rice production
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white drop-shadow-md">
                  <span className="mr-2 text-lg">{field.icon}</span>
                  {field.label}
                </label>
                <input
                  type="number"
                  step="any"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 hover:bg-white/25"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-sm hover:from-green-600/80 hover:to-green-700/80 text-white font-semibold py-3 px-8 rounded-lg shadow-lg border border-white/30 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Predicting...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">🔮</span>
                  Predict Rice Production
                </span>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/30 border-l-4 border-l-red-400 p-4 mb-6 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-300 text-xl">❌</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-100 drop-shadow-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {prediction !== null && (
            <div className="bg-green-500/20 backdrop-blur-sm border border-green-300/30 border-l-4 border-l-green-400 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🎉</span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                    Prediction Result
                  </h3>
                  <div className="mt-2 flex items-center">
                    <span className="text-3xl font-bold text-green-300 drop-shadow-lg">
                      {prediction.toFixed(2)}
                    </span>
                    <span className="text-green-200 ml-2 drop-shadow-md">
                      tons
                    </span>
                  </div>
                  <p className="text-sm text-green-100 mt-1 drop-shadow-sm">
                    Estimated rice production based on your input parameters
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RicePredictionForm;
