import RicePredictionForm from "./components/RicePredictionForm";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0bg-opacity-30"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              🌾 Rice Production Prediction
            </h1>
            <p className="text-gray-100 text-lg max-w-2xl mx-auto drop-shadow-md">
              Predict rice production using advanced machine learning
              algorithms. Enter your field parameters to get accurate production
              estimates.
            </p>
          </header>

          <main>
            <RicePredictionForm />
          </main>

          <footer className="text-center mt-16 text-gray-300">
            <p>Powered by Machine Learning & React.js</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
