import { useContext } from "react";
import userContext from "./userContext";

const useUser = () => {
    const data = useContext(userContext);
    return data;
}

export default useUser;