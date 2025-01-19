import React from "react";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    return (
        <section className="bg-[rgba(11,95,204,.1)] px-0 py-16">
            <Card className="prose container max-w-6xl px-8 py-12">
                <h1>Kebijakan Privasi</h1>
                <p>
                    Kami di Rentid sangat menghargai privasi pengunjung kami dan berkomitmen untuk
                    melindungi informasi pribadi Anda yang kami kumpulkan.
                </p>
                <h2>1. Informasi yang Kami Kumpulkan</h2>
                <ul>
                    <li>Nama lengkap</li>
                    <li>Alamat email</li>
                    <li>Nomor telepon</li>
                    <li>Informasi identitas</li>
                    <li>Informasi kendaraan yang disewa</li>
                    <li>Lokasi</li>
                </ul>
                <h2>2. Penggunaan Informasi</h2>
                <p>
                    Kami menggunakan informasi pribadi untuk memproses pemesanan, mengirim
                    pemberitahuan terkait pemesanan, dan menyediakan layanan yang disesuaikan
                    berdasarkan preferensi Anda.
                </p>
                <h2>3. Penyimpanan dan Keamanan Data</h2>
                <p>
                    Kami mengambil langkah-langkah yang wajar untuk melindungi data pribadi Anda
                    dari akses yang tidak sah.
                </p>
                <h2>4. Pembagian Data dengan Pihak Ketiga</h2>
                <p>
                    Kami dapat berbagi data dengan penyedia layanan pihak ketiga yang membantu dalam
                    pemrosesan transaksi atau pengiriman kendaraan.
                </p>
                <h2>5. Penggunaan Cookies</h2>
                <p>
                    Kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Anda dapat
                    mengatur browser Anda untuk menolak cookies.
                </p>
                <h2>6. Hak Anda terhadap Data Pribadi</h2>
                <p>
                    Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda
                    yang kami simpan.
                </p>
                <h2>7. Perubahan Kebijakan Privasi</h2>
                <p>
                    Kami dapat memperbarui kebijakan privasi ini kapan saja. Setiap perubahan akan
                    diumumkan di halaman ini.
                </p>
                <h2>8. Kontak Kami</h2>
                <p>Jika Anda memiliki pertanyaan, silakan hubungi kami di me@rentid.app.</p>
            </Card>
        </section>
    );
}
