import IconHonda from "@/components/brand/Honda";
import IconHyundai from "@/components/brand/Hyundai";
import IconMercedes from "@/components/brand/Mercedes";
import IconMitsubishi from "@/components/brand/Mitsubishi";
import IconNissan from "@/components/brand/Nissan";
import IconSuzuki from "@/components/brand/Suzuki";
import IconToyota from "@/components/brand/Toyota";

export default function CarLogo() {
    return (
        <section className="container flex justify-evenly py-10">
            <IconHonda className="size-10 text-foreground/30" />
            <IconHyundai className="size-10 text-foreground/30" />
            <IconMercedes className="size-10 text-foreground/30" />
            <IconMitsubishi className="size-10 text-foreground/30" />
            <IconNissan className="size-10 text-foreground/30" />
            <IconSuzuki className="size-10 text-foreground/30" />
            <IconToyota className="size-10 text-foreground/30" />
        </section>
    );
}
