import { useLocation } from "react-router-dom";
import type { JSX } from "react";
import { default as CredentialsHeaders } from './header-components/CredentialsHeaders.tsx';
import { default as DefaultHeaders } from './header-components/DefaultHeaders.tsx';
import { default as CheckoutHeaders } from './header-components/CheckoutHeaders.tsx';

function renderHeader(location: string): JSX.Element {
  if (location === '/login' || location === '/register') {
    return <CredentialsHeaders />;
  } else if (location === '/checkout') {
    return <CheckoutHeaders />;
  } else {
    return <DefaultHeaders />;
  }
}

export default function Header() {
  const location: string = useLocation().pathname;

  return (
    <>
      {renderHeader(location)}
    </>
  );
}