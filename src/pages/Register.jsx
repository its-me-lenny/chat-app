import { useState } from "react";
import addAvatar from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { useForm } from "react-hook-form";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    name: "",
    url: "",
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const signUpHandler = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    const displayName = data.username.toLowerCase();
    const email = data.email;
    const password = data.password;
    const file = data.file[0];

    /**
     * These are the way to fetch form data without react hook form
     * const displayName = event.target[0].value.toLowerCase();
     * const email = event.target[1].value;
     * const password = event.target[2].value;
     * const file = event.target[3].files[0];
     */

    try {
      //Create the user in Firebase Authentication
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //Create a unique image name for Firebase Storage
      const time = new Date().getTime();
      const storageRef = ref(storage, `${displayName + time}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Updates the profile of the user by adding the displayName and photoURL
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            //Creates the user in the Firestore
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //Creates an empty user chats in the firestore
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log("Firestore Error: ", error);
            if (error.message) {
              setError(error.message);
            } else if (error.code) {
              setError(error.code);
            } else {
              setError(error);
            }
            setLoading(false);
          }
        });
      });
    } catch (error) {
      console.log("Auth or Storage Error: ", error);
      if (error.message) {
        setError(error.message);
      } else if (error.code) {
        setError(error.code);
      } else {
        setError(error);
      }
      setLoading(false);
    }
  };

  const selectImageHandler = (event) => {
    setSelectedFile({
      name: event.target.files[0].name,
      url: URL.createObjectURL(event.target.files[0]),
    });
  };

  const resetSelectImageHandler = () => {
    setSelectedFile({
      name: "",
      url: "",
    });
    resetField("file", { defaultValue: null });
  };

  const previewAvatarComponent =
    selectedFile.name && JSON.stringify(selectedFile.url) !== "{}" ? (
      <div className="avatar">
        <img src={selectedFile.url} alt="selected-avatar-image" />
        <span>{selectedFile.name}</span>
        <button onClick={resetSelectImageHandler}>x</button>
      </div>
    ) : (
      <label htmlFor="file">
        <img src={addAvatar} alt="add-avatar-image" />
        <span> Add an avatar</span>
      </label>
    );

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chilla Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit(signUpHandler)}>
          {error && <small className="topError">{"Error: " + error}</small>}
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Userame"
          />
          {errors.username?.type === "required" && (
            <small>Username is required</small>
          )}
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <small>Email is required</small>
          )}
          {errors.email?.type === "pattern" && <small>Not a valid email</small>}
          <input
            type="password"
            {...register("password", {
              required: true,
              // More strict validation for password
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
            })}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <small>Password is required</small>
          )}
          <input
            type="file"
            {...register("file", {
              required: true,
              onChange: (e) => {
                selectImageHandler(e);
              },
            })}
            id="file"
            accept="image/*"
          />
          {previewAvatarComponent}
          {errors.file?.type === "required" && (
            <small>Avatar is required</small>
          )}
          <BallTriangle
            height={40}
            width={40}
            wrapperClass="loader"
            radius={5}
            color="#7b96ec"
            ariaLabel="ball-triangle-loading"
            visible={loading}
          />
          {!loading && <button>Sign up</button>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
