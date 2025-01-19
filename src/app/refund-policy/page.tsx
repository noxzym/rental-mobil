import React from "react";
import { Card } from "@/components/ui/card";

export default function RefundPolicyPage() {
    return (
        <section className="bg-[rgba(11,95,204,.1)] px-0 py-16">
            <Card className="prose container max-w-6xl px-8 py-12">
                <h1>Kebijakan Pengembalian Dana</h1>
                <p>
                    Di Rentid, kami berkomitmen untuk memberikan pengalaman penyewaan mobil yang
                    memuaskan. Berikut adalah kebijakan pengembalian dana kami:
                </p>
                <h2>1. Pembatalan dan Pengembalian Dana</h2>
                <ul>
                    <li>
                        Jika Anda membatalkan pemesanan maksimal 3 jam sebelum waktu penyewaan, Anda
                        berhak mendapatkan pengembalian dana penuh.
                    </li>
                    <li>
                        Pembatalan yang dilakukan dalam 3 jam sebelum penyewaan dapat dikenakan
                        biaya pembatalan.
                    </li>
                </ul>
                <h2>2. Pembatalan oleh Pihak Kami</h2>
                <p>
                    Jika kami membatalkan pemesanan, Anda berhak menerima pengembalian dana penuh
                    atau opsi untuk memilih kendaraan pengganti.
                </p>
                <h2>3. Kerusakan atau Masalah dengan Kendaraan</h2>
                <p>
                    Jika kendaraan tidak dapat digunakan karena masalah teknis, Anda berhak meminta
                    pengembalian dana proporsional.
                </p>
                <h2>4. Biaya Tidak Dapat Dikembalikan</h2>
                <p>
                    Biaya tambahan seperti biaya asuransi, biaya pengantaran, atau biaya bahan bakar
                    yang telah dibayar tidak dapat dikembalikan.
                </p>
                <h2>5. Proses Pengembalian Dana</h2>
                <p>
                    Pengembalian dana akan diproses menggunakan metode pembayaran yang sama dengan
                    yang digunakan untuk transaksi awal.
                </p>
                <h2>6. Kontak dan Bantuan</h2>
                <p>
                    Jika Anda membutuhkan bantuan lebih lanjut, silakan hubungi kami di
                    me@rentid.app.
                </p>
            </Card>
        </section>
    );
}
