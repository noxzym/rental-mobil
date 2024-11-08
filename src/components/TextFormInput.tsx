import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "./ui/input";

const TextFormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ icon, type, placeholder, className, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                icon={icon}
                type={type}
                placeholder={placeholder}
                className={cn(
                    "h-auto border-0 bg-background text-foreground/80 ring-1 ring-foreground/5 focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-0",
                    className
                )}
                {...props}
            />
        );
    }
);
TextFormInput.displayName = "TextFormInput";

export default TextFormInput;
