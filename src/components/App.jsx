import { useEffect, useState } from "react";
import { Header, Footer, Sidebar, BookStoreStartPage } from "./index";
import { Outlet } from "react-router-dom";
const App = () => {
  const [frontPageDisplay, setFrontPageDisplay] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        setFrontPageDisplay(false);
        setFirstLoad(false);
        console.log("Delayed for 1 second.");
      }, "3000");
    }
  }, [firstLoad, frontPageDisplay]);

  //SIDE BAR disable code
  const [disableSidebar, setDisableSidebar] = useState(true);
  const handleSidebarDisable = () => {
    if (disableSidebar) {
      setDisableSidebar(false);
    } else {
      setDisableSidebar(true);
    }
  };

  if (firstLoad) {
    return <BookStoreStartPage />;
  } else {
    return (
      <div className="h-screen flex flex-col">
        <Header handleSidebarDisable={handleSidebarDisable} />
        <div className="flex ">
          <Sidebar disable={disableSidebar} />
          <div className="flex flex-col w-full">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  //.................................................................
};

export default App;
