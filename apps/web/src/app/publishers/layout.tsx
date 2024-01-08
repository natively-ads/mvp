import ContextHeader from "@/components/contextHeader";
import { Metadata } from "next";
import React from "react";

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
    <React.Fragment>
      <ContextHeader
        message="Currently on the Publisher view"
        linkTo="/advertisers"
      />
      {children}
    </React.Fragment>
  );
}
