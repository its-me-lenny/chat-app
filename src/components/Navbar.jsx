import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { capitalize } from "../utils/helper";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chilla Chat</span>
      <div className="user">
        {currentUser && (
          <div className="avatar">
            <img
              src={currentUser.photoURL}
              alt={capitalize(currentUser.displayName) + "image"}
            />
            <span>{capitalize(currentUser.displayName)}</span>
          </div>
        )}
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
