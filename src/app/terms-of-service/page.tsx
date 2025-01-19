import React from "react";
import { Card } from "@/components/ui/card";

export default function TOSPage() {
    return (
        <section className="bg-[rgba(11,95,204,.1)] px-0 py-16">
            <Card className="prose container max-w-6xl px-8 py-12">
                <h1>Syarat dan Ketentuan Layanan</h1>
                <p>
                    Dengan mengakses atau menggunakan situs web Rentid dan layanan rental mobil,
                    Anda setuju untuk terikat dengan Syarat dan Ketentuan ini.
                </p>
                <h2>1. Penerimaan Syarat dan Ketentuan</h2>
                <p>
                    Anda setuju untuk terikat dengan syarat dan ketentuan ini saat menggunakan
                    layanan kami.
                </p>
                <h2>2. Pengguna yang Diperbolehkan</h2>
                <p>
                    Anda harus berusia minimal 21 tahun dan memiliki SIM yang sah untuk menggunakan
                    layanan kami.
                </p>
                <h2>3. Pemesanan dan Pembayaran</h2>
                <p>Semua pemesanan harus dibayar penuh sebelum kendaraan diserahkan kepada Anda.</p>
                <h2>4. Penggunaan Kendaraan</h2>
                <p>
                    Kendaraan hanya boleh digunakan untuk tujuan pribadi, dan Anda bertanggung jawab
                    atas kondisi kendaraan selama masa sewa.
                </p>
                <h2>5. Asuransi dan Tanggung Jawab</h2>
                <p>
                    Kami menyediakan asuransi dasar. Anda bertanggung jawab atas kerusakan atau
                    kehilangan kendaraan.
                </p>
                <h2>6. Pembatalan dan Pengembalian Dana</h2>
                <p>
                    Pembatalan dapat dilakukan sesuai dengan kebijakan pembatalan yang berlaku di
                    situs kami.
                </p>
                <h2>7. Pembatasan Tanggung Jawab</h2>
                <p>
                    Kami tidak bertanggung jawab atas kerusakan atau kehilangan yang timbul akibat
                    penggunaan layanan kami.
                </p>
                <h2>8. Perubahan Layanan dan Kebijakan</h2>
                <p>
                    Kami berhak untuk mengubah Syarat dan Ketentuan ini kapan saja tanpa
                    pemberitahuan terlebih dahulu.
                </p>
                <h2>9. Hukum yang Berlaku</h2>
                <p>Syarat dan Ketentuan ini diatur oleh hukum yang berlaku di Indonesia.</p>
                <h2>10. Kontak Kami</h2>
                <p>Jika Anda memiliki pertanyaan, silakan hubungi kami di me@rentid.app.</p>
            </Card>
        </section>
    );
}
