import { PlusIcon, UserAddIcon } from "@heroicons/react/solid";
import PostCard from "./PostCard";
const UserProfile = ({ user ,posts}) => {
  return (
    <div className="bg-white shadow rounded-lg max-w-md mx-auto p-4 my-10">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={user.image}
        alt={user.name}
      />

      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="mt-1 text-gray-500">{user.email}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="flex items-center px-3 py-2 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow mx-2">
          <PlusIcon className="h-5 w-5 mr-2" />
          Follow
        </button>
        <button className="flex items-center px-3 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded shadow mx-2">
          <UserAddIcon className="h-5 w-5 mr-2" />
          Friend Request
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
        <p className="mt-2 text-gray-600">{user.bio}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Posts</h2>
       
      </div>
    </div>
  );
};

export default UserProfile;
