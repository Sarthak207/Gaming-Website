import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const SyncUser = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios
        .post(
          "http://localhost:4001/api/user/me", // Backend endpoint
          {
            clerkId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            name: `${user.firstName} ${user.lastName}`,
          },
          {
            headers: {
              Authorization: `Bearer ${user.sessionId}`, // Pass Clerk session token
            },
          }
        )
        .then((response) => {
          console.log("User synced:", response.data);
        })
        .catch((error) => {
          console.error("Error syncing user:", error.response?.data || error.message);
        });
    }
  }, [user]);

  return null; // This component doesn't render anything
};

export default SyncUser;
