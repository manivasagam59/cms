import React from "react";

export const Card = ({ className = "", ...props }: any) => (
    <div className={`border rounded-lg bg-white ${className}`} {...props} />
);

export const CardHeader = ({ className = "", ...props }: any) => (
    <div className={`p-3 border-b ${className}`} {...props} />
);

export const CardContent = ({ className = "", ...props }: any) => (
    <div className={`p-3 ${className}`} {...props} />
);

export const CardTitle = ({ className = "", ...props }: any) => (
    <h3 className={`font-semibold ${className}`} {...props} />
);