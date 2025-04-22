import { getUser } from "../api/apiGames"; // Use relative path
import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const UserDetails = () => {
  const { session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session) return;

      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      const data = await getUser(supabaseAccessToken, {}); // add an empty object if no filters
      console.log(data);
      setUserData(data);
    };

    fetchUsers();
  }, [session]);

  return (
    <div>
      <h1>User Details</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;
