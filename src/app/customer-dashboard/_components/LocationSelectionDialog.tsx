import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IoSearch } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface LocationData {
  id: string;
  nama: string;
}

interface LocationSelectorProps {
  title: string;
  data: LocationData[];
  value?: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}

const LocationSelector = ({ title, data, value, onChange, disabled }: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const filteredData = data.filter(item => 
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const selectedItem = data.find(item => item.id === value);

  return (
    <Dialog open={open} onOpenChange={disabled ? undefined : setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left font-normal"
          disabled={disabled}
        >
          <MdLocationOn className="mr-2 h-4 w-4" />
          {selectedItem ? selectedItem.nama : `Select ${title}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[400px] flex-col py-10">
        <DialogHeader>
          <DialogTitle className="text-2xl">{`Select ${title}`}</DialogTitle>
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <Input
              className="pl-9"
              placeholder={`Search ${title}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col overflow-y-auto">
          {filteredData.map(({ id, nama }) => (
            <Button
              key={id}
              variant="ghost"
              className="cursor-pointer justify-start gap-4 py-6"
              onClick={() => {
                onChange(id);
                setOpen(false);
              }}
            >
              <MdLocationOn className="h-5 w-5" />
              <span className="font-semibold">{nama}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelector;