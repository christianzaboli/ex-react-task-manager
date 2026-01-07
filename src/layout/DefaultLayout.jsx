import MyHeader from "../myHeader";
import { Outlet } from "react-router-dom";
export default function DefaultLayout() {
  return (
    <>
      <MyHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
