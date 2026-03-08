import { Outlet } from "react-router-dom";
import { default as Header } from '../components/layout/Header'
import { default as Footer } from '../components/layout/Footer'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />      
    </>
  );
}