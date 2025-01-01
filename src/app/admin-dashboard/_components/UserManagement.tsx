import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UserDetail from './UserDetail';

interface User {
  id: string;
  nama_panjang: string;
  email: string;
  no_telepon: string | null;
  alamat?: string;
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserData, setSelectedUserData] = useState<User | undefined>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUserId(user.id);
    setSelectedUserData(user);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama_panjang?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.no_telepon?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))]">
      <div className={`flex-1 transition-all duration-300 ${selectedUserId ? 'w-1/2' : 'w-full'}`}>
        <div className="mb-4">
          <Input
            placeholder="Cari pengguna berdasarkan email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4 p-4">
            {filteredUsers.map((user) => (
              <Card 
                key={user.id} 
                className="flex items-center justify-between p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                  <div>
                    <h3 className="font-medium">{user.nama_panjang || 'No Name'}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{user.no_telepon || 'No Phone'}</p>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedUserId && (
        <div className="w-1/2 border-l">
          <UserDetail 
            userId={selectedUserId}
            userData={selectedUserData}
            onClose={() => {
              setSelectedUserId(null);
              setSelectedUserData(undefined);
            }}
          />
        </div>
      )}
    </div>
  );
}