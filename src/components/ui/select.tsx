import React from "react";

export const Select = ({ children }: any) => <div>{children}</div>;

export const SelectTrigger = ({ children }: any) => (
    <div className="border rounded p-2">{children}</div>
);

export const SelectValue = ({ placeholder }: any) => <span>{placeholder}</span>;

export const SelectContent = ({ children }: any) => (
    <div className="border rounded">{children}</div>
);

export const SelectItem = ({ children }: any) => (
    <div className="p-1 hover:bg-gray-100">{children}</div>
);