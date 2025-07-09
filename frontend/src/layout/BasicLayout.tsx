import { Outlet } from "react-router-dom";
import Header from "~/components/Header";

export default function BasicLayout() {
  return (
    <div className="h-screen w-full">
      <Header />
      <Outlet />
    </div>
  );
}
