import { Suspense } from "react";
import SearchSection from "@/components/SearchSection";
import Aside from "./_components/Aside";
import List from "./_components/List";
import Sort from "./_components/Sort";

export default async function SearchPage() {
    return (
        <section className="bg-[rgba(11,95,204,.1)] px-20 py-16">
            <div className="container grid w-full grid-cols-4 gap-5 px-0">
                <Suspense>
                    <div className="col-span-3 flex flex-col gap-3">
                        <div className="sticky top-[96px] z-10 flex gap-1">
                            <SearchSection />
                            <Sort />
                        </div>
                        <List />
                    </div>
                    <Aside />
                </Suspense>
            </div>
        </section>
    );
}
