import { getUser } from "../api/apiGames";
import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const UserListing = () => {
  const { session } = useSession(); // Get the Clerk session
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      // Get the Supabase access token from the Clerk session
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      // Fetch users from Supabase using the access token
      const data = await getUser({ token: supabaseAccessToken });
      setUserData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData || userData.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <h1>User Listing</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListing;