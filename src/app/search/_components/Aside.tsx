'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCallback } from 'react';

export default function Aside() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (updates: { sort?: string; order?: string }) => {
            const params = new URLSearchParams(searchParams.toString());
            
            // Update only the sort and order parameters
            if (updates.sort) params.set('sort', updates.sort);
            if (updates.order) params.set('order', updates.order);
            
            return params.toString();
        },
        [searchParams]
    );

    const handleSortChange = (type: string, order: 'asc' | 'desc') => {
        const newQueryString = createQueryString({ sort: type, order: order });
        router.push(`/search?${newQueryString}`);
    };

    return (
        <aside className="sticky top-[162px] flex h-1/2 w-full flex-col gap-3 rounded-xl bg-background px-4 py-2 shadow">
            <h3 className="text-lg font-semibold">Sort By</h3>
            
            <RadioGroup defaultValue="harga-asc">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                        value="harga-asc" 
                        id="harga-asc"
                        onClick={() => handleSortChange('harga', 'asc')}
                    />
                    <Label htmlFor="harga-asc">Harga: Rendah ke Tinggi</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                        value="harga-desc" 
                        id="harga-desc"
                        onClick={() => handleSortChange('harga', 'desc')}
                    />
                    <Label htmlFor="harga-desc">Harga: Tinggi ke Rendah</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                        value="tahun-desc" 
                        id="tahun-desc"
                        onClick={() => handleSortChange('tahun', 'desc')}
                    />
                    <Label htmlFor="tahun-desc">Tahun: Terbaru</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                        value="tahun-asc" 
                        id="tahun-asc"
                        onClick={() => handleSortChange('tahun', 'asc')}
                    />
                    <Label htmlFor="tahun-asc">Tahun: Terlama</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                        value="model-asc" 
                        id="model-asc"
                        onClick={() => handleSortChange('model', 'asc')}
                    />
                    <Label htmlFor="model-asc">Model: A-Z</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                        value="model-desc" 
                        id="model-desc"
                        onClick={() => handleSortChange('model', 'desc')}
                    />
                    <Label htmlFor="model-desc">Model: Z-A</Label>
                </div>
            </RadioGroup>
        </aside>
    );
}