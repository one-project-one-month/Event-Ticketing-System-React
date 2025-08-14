import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout() {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-hidden">
        <Header />
        <main className="mt-0 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
