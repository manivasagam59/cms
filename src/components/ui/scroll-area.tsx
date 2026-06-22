import React from "react";

export function ScrollArea({ className = "", children }: any) {
    return (
        <div className={`overflow-auto ${className}`}>
            {children}
        </div>
    );
}