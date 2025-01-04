type SearchParams = {
    date?: string;
    duration?: string;
    location?: string;
    time?: string;
    sort?: string;
    order?: "asc" | "desc";
};

type Car = {
    id: string;
    warna: string;
    merek: string;
    model: string;
    tahun: string;
    harga: number;
    image: string | null;
};
