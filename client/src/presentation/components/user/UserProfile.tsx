

import { useGetDetailsQuery } from "../../../data/api/userApi";

const UserProfile = () => {
    const {data : user , isLoading ,isError} = useGetDetailsQuery()
   
    if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error fetching data</p>;
  
    return (
       <div className="flex justify-center items-center min-h-screen bg-[#1a0c75] p-4">
        <div className="w-96 bg-white/10 text-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">{user?.userData?.name}</h2>
          <p className="text-lg text-gray-300 mt-2">{user?.userData?.email}</p>
          <span className="mt-4 inline-block bg-purple-600 px-4 py-2 rounded-full text-sm font-medium">
            {user?.userData?.role}
          </span>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  