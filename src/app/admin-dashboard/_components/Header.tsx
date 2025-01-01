import { Card } from '@/components/ui/card';

export default function Header() {
  return (
    <div className="p-4 bg-white border-b">
      <div className="flex justify-end">
        <span className="text-gray-600">Welcome Boss</span>
      </div>
    </div>
  );
}