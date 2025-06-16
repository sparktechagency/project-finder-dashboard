import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="px-5">
      <Outlet />
    </div>
  );
};

export default MainLayout;
