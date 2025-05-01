import { useUser } from "@clerk/clerk-react";
import {BarLoader} from 'react-spinners'
import UserListing from "./FetchUser";

const Onboarding = () =>{
    const {user, isLoaded}= useUser();
    console.log(user);

    if(!isLoaded){
        return <BarLoader className="mb-4" width={"100%"} color="blue"/>
    }
    return <div>
        <h2> Loading ....</h2>
        <UserListing/>
    </div>;
}

export default Onboarding;