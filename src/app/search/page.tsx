import { Suspense } from "react";
import Aside from "./_components/Aside";
import ListCar from "./_components/ListCar";
import SearchBar from "./_components/SearchBar";

export default function SearchPage() {
    return (
        <section className="bg-[rgba(11,95,204,.1)] px-20 py-16">
            <div className="container flex flex-col items-center justify-center gap-5 px-0">
                <Suspense>
                    <SearchBar />
                </Suspense>
                <div className="z-0 grid w-full grid-cols-4 justify-between gap-5">
                    <Aside />
                    <ListCar />
                </div>
            </div>
        </section>
    );
}
