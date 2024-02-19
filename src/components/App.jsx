import { Header, Footer } from "./index";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
