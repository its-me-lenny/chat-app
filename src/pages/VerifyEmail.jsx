import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import checkMark from "../assets/icons8-checkmark-64.png";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";

const VerifyEmail = () => {
  const [loading, setLoading] = useState("notloading");

  const sendEmailHandler = async () => {
    const actionCode = {
      url: import.meta.env.VITE_ACTION_URL,
    };

    try {
      setLoading("loading");
      await sendEmailVerification(auth.currentUser, actionCode).then(() => {
        setLoading("done");
      });
    } catch (error) {
      setLoading("notloading");
      console.log("Sending email verification error: ", error);
    }
  };

  return (
    <div className="formContainerVerify">
      <div className="formWrapperVerify">
        <span className="logoVerify">Chilla Chat</span>
        {loading === "loading" && <p>Sending email verification:</p>}
        <BallTriangle
          height={40}
          width={40}
          wrapperClass="loader"
          radius={5}
          color="#7b96ec"
          ariaLabel="ball-triangle-loading"
          visible={loading === "loading"}
        />
        {loading === "notloading" && (
          <>
            <p>
              Verify Email: <br /> Verify your email so you can chat with other
              users
            </p>
            <button onClick={sendEmailHandler}>Send Email Verification</button>
          </>
        )}
        {loading === "done" && (
          <>
            <p>
              Email verification sent: <br /> You may exit this page and check
              your email
            </p>
            <img src={checkMark} alt="checkmark-image" />
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
