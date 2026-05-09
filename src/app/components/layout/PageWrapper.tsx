import React, { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { useApp } from "../../context/AppContext";

interface PageWrapperProps {
  title: string;
  breadcrumb?: string;
  children: ReactNode;
}

export function PageWrapper({ title, breadcrumb, children }: PageWrapperProps) {
  return (
    <>
      <TopBar title={title} breadcrumb={breadcrumb} />
      <main
        style={{
          marginTop: "60px",
          padding: "32px",
          flex: 1,
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {children}
      </main>
    </>
  );
}
