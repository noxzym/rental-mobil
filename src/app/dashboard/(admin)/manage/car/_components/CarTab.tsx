import { Prisma } from "@prisma/client";
import { CarStoreType } from "@/hooks/floppy-disk/use-carStore";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import ManageCar from "./ManageCar";

type props = {
    tab: string;
    mobil: Prisma.mobilGetPayload<{
        include: {
            booking: {
                where: {
                    status: "ONGOING";
                };
            };
        };
    }>[];
    onSave: (carStore: CarStoreType) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
};

export default function CarTab({ tab, mobil, onSave, onDelete }: props) {
    function AddCarButton() {
        return <Button>Tambah Mobil</Button>;
    }

    return (
        <TabsContent value={tab} className="flex-grow">
            <section className="flex h-full flex-col gap-3 rounded-xl bg-background px-4 py-5 shadow">
                <AddCarButton />
                {mobil.map((car, index) => (
                    <ManageCar key={index} mobil={car} onSave={onSave} onDelete={onDelete} />
                ))}
            </section>
        </TabsContent>
    );
}
