import React from "react";

export const Tabs = ({ children }: any) => <div>{children}</div>;
export const TabsList = ({ children }: any) => <div className="flex gap-2">{children}</div>;
export const TabsTrigger = ({ children }: any) => <button>{children}</button>;
export const TabsContent = ({ children }: any) => <div>{children}</div>;