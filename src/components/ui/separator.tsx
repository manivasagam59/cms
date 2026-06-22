import React from "react";

export function Separator({ orientation = "horizontal" }: any) {
    return orientation === "vertical" ? (
        <div className="w-px bg-gray-200 h-full" />
    ) : (
        <div className="h-px bg-gray-200 w-full" />
    );
}