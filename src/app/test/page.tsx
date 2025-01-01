'use client';

export default function TestPage() {
  const handleCreateReviews = async () => {
    try {
      const response = await fetch('/api/reviews/create-completed', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Response:', data);
      alert('Check console for results');
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test API Endpoint</h1>
      <button
        onClick={handleCreateReviews}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Reviews for Completed Bookings
      </button>
    </div>
  );
}