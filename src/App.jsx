import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Add from "./components/Add";

function App() {
  return (
    <>
      <Navbar />  {/* Navbar outside Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </>
  );
}

export default App;
