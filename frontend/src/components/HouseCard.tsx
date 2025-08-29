import Link from 'next/link';

interface House {
  id: number;
  name: string;
  address: string;
}

export default function HouseCard({ house }: { house: House }) {
  return (
    <Link 
      key={house.id} 
      href={`/houses/${house.id}`}
      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-lg text-gray-900">{house.name}</h3>
      <p className="text-gray-600 mt-1">{house.address}</p>
    </Link>
  );
}
