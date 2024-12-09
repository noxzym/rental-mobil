"use client";

import * as React from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactElement;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const Icon = icon;

        const togglePasswordVisibility = () => setShowPassword(!showPassword);

        return (
            <div className="group relative w-full">
                {Icon && (
                    <div className="absolute left-2.5 top-1/2 z-50 -translate-y-1/2 transform">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    type={type === "password" && showPassword ? "text" : type}
                    className={cn(
                        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                        Icon ? "pl-8" : "",
                        className
                    )}
                    {...props}
                />
                {type === "password" && (
                    <div
                        className={cn(
                            "absolute right-2.5 top-1/2 z-50 -translate-y-1/2 transform cursor-pointer group-hover:block",
                            showPassword ? "" : "hidden"
                        )}
                    >
                        {showPassword ? (
                            <IoMdEyeOff
                                onClick={togglePasswordVisibility}
                                className="text-muted-foreground"
                            />
                        ) : (
                            <IoMdEye
                                onClick={togglePasswordVisibility}
                                className="text-muted-foreground"
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
);
CustomInput.displayName = "Input";

export { CustomInput };
