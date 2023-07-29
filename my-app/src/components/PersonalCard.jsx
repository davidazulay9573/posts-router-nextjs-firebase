
export default function PersonalCard({user}) {
  return (
    <div className="border rounded-lg overflow-hidden max-w-sm mx-auto">
      <div className="relative h-56 w-full">
       <img src={user.image} alt={user.name} />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600">bla bla</p>
      </div>
    </div>
  );
}
