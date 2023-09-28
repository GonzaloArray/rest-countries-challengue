import { Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Details } from "./page/Details";
import { Header } from "./components/Header";
import { DarkModeProvider } from "./context/DarkModeProvider";
import { DarkModeBg } from "./layout/DarkModeBg";

function App() {
  return (
    <DarkModeProvider>
      <DarkModeBg>
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route index element={<Home />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </div>
      </DarkModeBg>
    </DarkModeProvider>
  );
}

export default App;
