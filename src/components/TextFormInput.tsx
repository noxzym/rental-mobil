import { Input, InputProps } from "./ui/input";

export default function TextFormInput({ icon, type, placeholder }: InputProps) {
    return (
        <Input
            icon={icon}
            type={type}
            placeholder={placeholder}
            className="h-auto border-0 bg-background text-foreground/80 ring-1 ring-foreground/5 focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-0"
        />
    );
}
