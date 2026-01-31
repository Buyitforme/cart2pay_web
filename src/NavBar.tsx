// import AuthenticatedNav from "./Pages/UserHub/AuthenticatedNav";
import PublicNav from "./Components/PublicNav";
import UserHubNav from "./Pages/UserHub/UserHubNav";
import { isAuthenticated } from "./utils/auth";

const Navbar = () => {
  return isAuthenticated() 
    ? <UserHubNav /> 
    : <PublicNav />;
};

export default Navbar;