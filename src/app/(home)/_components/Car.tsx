import IconHonda from "@/components/brand/Honda";
import IconHyundai from "@/components/brand/Hyundai";
import IconMercedes from "@/components/brand/Mercedes";
import IconMitsubishi from "@/components/brand/Mitsubishi";
import IconNissan from "@/components/brand/Nissan";
import IconSuzuki from "@/components/brand/Suzuki";
import IconToyota from "@/components/brand/Toyota";

export default function CarLogo() {
    const className = "size-10 text-foreground/30";

    return (
        <section className="container flex justify-evenly py-10">
            <IconHonda className={className} />
            <IconHyundai className={className} />
            <IconMercedes className={className} />
            <IconMitsubishi className={className} />
            <IconNissan className={className} />
            <IconSuzuki className={className} />
            <IconToyota className={className} />
        </section>
    );
}
