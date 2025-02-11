import { useGetUsersQuery } from "../../../usecases/userApi";

const AdminDashboard = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h2>Admin Dashboard - User List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
