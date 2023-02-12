import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} exact/>
      </Routes>
	  </BrowserRouter>
  )
}
