# **Firebase-React JS Chat App**

<br>

# Table of Contents

- [Project Description](#description)
- [Development Challenges](#challenges)
- [Application Improvements (Optional)](#improvements)
- [How To Setup](#setup)
- [Credits](#credits)

<br>

## **Description**

Welcome fellow developer, thank you for your interest in this project. I created projects like this to mainly put into practice and deep dive into the React library and at the same time learn some backend technologies.

This is a basic chat app that requires user authentication, you can send text w/ image or text only with other users. [**Firebase**](https://firebase.google.com/) handles the backend (Authentication, Firestore and Storage) while for the frontend, the [**React library**](https://reactjs.org/) was used. Styling was done using [**Sass**](https://sass-lang.com/).

<br>

## **Challenges**

- Implementation of previewing the image to be used as the avatar of the user while registering for an account while still be able to get the file data when uploading it to storage. I'm using the package [**react-hook-form**](https://react-hook-form.com/) for this. _(Resolved)_

- Unsubscribing the listeners of the Firestore database during sign out in the useEffect hook. _(Resolved)_

<br>

## **Improvements**

- A stricter password validation on registration. I already prepared a pattern for the form validation which requires the user to elect a password with atleat 1 capitalized letter, 1 number and between 8 to 16 characters. You may change this requirement.

- Mobile responsiveness behavior and WCAG implementation. Implemented some mobile responsiveness behavior on some of the components but this needs more work.

- Adding the video call functionality and sending of other file types.

<br>

## **Setup**

1. You can either [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository or [download](https://github.com/its-me-lenny/chat-app/archive/refs/heads/main.zip) and extract it in your local machine.

2. You need to [create](https://firebase.google.com/docs/web/setup#create-project) a Firebase project (I did not enable Analytics in my project) and [register](https://firebase.google.com/docs/web/setup#register-app) this app.

3. You need to create an .env file first with these variables which will contain the configuration from Firebase. This will help prevent others to have access to your configuration data if you are planning to share the codebase to others. Just make sure that the _.env_ is included in your _.gitignore_ file.} :

   > `VITE_FB_APIKEY=` <br> `VITE_FB_AUTHDOMAIN= `<br> `VITE_FB_PROJECTID=` <br> `VITE_FB_STORAGEBUCKET=` <br> `VITE_FB_MESSAGINGSENDERID=` <br> `VITE_FB_APPID=` <br>

4. To initialize the Firebase SDK and for the app to be able to use the Firebase services, fill out the corresponding variables in the _.env_ file with your configuration data that looks like this:

   > `const firebaseconfig = {
//...
}`

5. Run the following command on the root directory of the codebase:

   > `npm install`

6. After succesfull installation of dependencies, you can now run the command,

   > `npm run dev`

   to start serving the app on your local machine.

7. Now, add a another variable in your _.env_ file:

   > `VITE_ACTION_URL = http://localhost:5173/`

   After the email verification, this is the URL of where you will get redirected. If you will deploy this app to the web, always remember to change this variable to the domain name of your app.

8. Always remember to use a **real and valid email** for registration, as this has a email verification process. If you want, you can remove it to reduce friction to the user flow but it will take major changes on the routing and to some of the components.

9. If you want to deploy the app, just initiate the command:

   > `npm run build`

   After that, you can use the _dist_ folder in the root directory for your production deployment.

<br>

## **Credits**

- For the loader, [react-loader-spinner](https://mhnpd.github.io/react-loader-spinner/).
- For unique identifiers, I used the [uuid](https://www.npmjs.com/package/uuid) package.
- For routing, [react-router-dom](https://reactrouter.com/en/main/start/tutorial).
- Chinchilla favicon by [Icons8](https://icons8.com/icon/-OzfA26hCSZg/chinchilla).
- Checkmark icon by [Icons8](https://icons8.com/icon/114054/checkmark).
- [Tutorial and inspiration](https://www.youtube.com/watch?v=k4mjF4sPITE) from [Lama Dev](https://www.youtube.com/@LamaDev/featured) ([safak](https://github.com/safak) on GitHub).
- [Vite](https://vitejs.dev/) for bootstrapping the project.
