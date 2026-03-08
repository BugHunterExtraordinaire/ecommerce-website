import { useLocation } from "react-router-dom";
import { default as CredentialsHeaders } from './header-components/CredentialsHeaders.tsx';

export default function Header() {
  const location = useLocation();

  return (
    <>
      {(location.pathname === '/login' || location.pathname === '/register') && <CredentialsHeaders />}
    </>
  );
}