"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import DynamicLoader from "./DynamicLoader";

const ImageProvider = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
    />
));
ImageProvider.displayName = AvatarPrimitive.Root.displayName;

const Image = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
    />
));
Image.displayName = AvatarPrimitive.Image.displayName;

const ImageFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & { useDynamicLoader?: boolean }
>(({ useDynamicLoader = false, className, ...props }, ref) => (
    <AvatarPrimitive.Fallback ref={ref} className={cn("h-full w-full", className)} {...props}>
        <DynamicLoader className="h-full w-full" />
    </AvatarPrimitive.Fallback>
));
ImageFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { ImageProvider, Image, ImageFallback };
