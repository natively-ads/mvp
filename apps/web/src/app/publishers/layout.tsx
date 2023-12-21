import { Metadata } from "next";

// this is where we should authenticate and make sure that only publsihers are accessing publisher routes
// hypothetical for now 

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
    {children}
    </>
  );
}
