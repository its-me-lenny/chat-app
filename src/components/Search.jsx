import { useContext, useState } from "react";
import {
  collection,
  query,
  getDoc,
  getDocs,
  where,
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);

  const inputNameHandler = (event) => {
    setUsername(event.target.value);

    if (error) {
      setError("");
    }
  };

  const initiateSearchHandler = (event) => {
    event.code === "Enter" && searchForUserHandler();
  };

  const searchForUserHandler = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username.toLowerCase())
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty && username !== "") {
        setError("User not found!");
        setUser(null);
      } else if (username === "") {
        setError("Username required");
        setUser(null);
      } else {
        setError("");
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      console.log("Search for user error: ", error);
    }
  };

  const selectUserHandler = async () => {
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      //Checks whether a conversation already exist between two users
      const response = await getDoc(doc(db, "chats", combineId));

      if (!response.exists()) {
        //If no conversation exist between two users, creates an empty conversation
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        //Creates userChats that link the others which the user is having a conversation with
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log("Select user to chat error:", error);
    } finally {
      setUser(null);
      setUsername("");
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={initiateSearchHandler}
          onChange={inputNameHandler}
          value={username}
        />
        {error && <small>{error}</small>}
      </div>
      {user && (
        <div className="userChat" onClick={selectUserHandler}>
          <img src={user.photoURL} alt={user.displayName} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
