import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function StatsCards() {
    const [stats, setStats] = useState({
        totalPendapatan: 0,
        totalPemesanan: 0,
        mobilTerpakai: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/stats");
                if (!response.ok) {
                    throw new Error("Failed to fetch stats");
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="mb-6 grid grid-cols-3 gap-4">
            <Card>
                <CardContent className="p-4">
                    <h3 className="font-medium text-gray-500">Total Pendapatan</h3>
                    <p className="text-2xl font-bold">
                        {loading ? "Loading..." : `Rp ${stats.totalPendapatan.toLocaleString()}`}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <h3 className="font-medium text-gray-500">Total Pemesanan</h3>
                    <p className="text-2xl font-bold">
                        {loading ? "Loading..." : stats.totalPemesanan}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <h3 className="font-medium text-gray-500">Mobil Terpakai Sekarang</h3>
                    <p className="text-2xl font-bold">
                        {loading ? "Loading..." : stats.mobilTerpakai}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
