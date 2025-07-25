import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Gamepage from "./pages/Gamepage";

function App() {
  return (
    <div className="bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<Gamepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
