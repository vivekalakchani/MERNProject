//K.V.Lakchani


import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
     <Header />
    
      <Routes>
        <Route>
          <Route path="/" element={  <Home />}/>
          <Route path="/register" element={  <Register />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
