// import React, { useEffect, useState } from "react";
// import { auth, firebase } from "../firebase/firebase";
// import { useNavigate } from "react-router-dom";


// declare global {
//   interface Window {
//     recaptchaVerifier: any;
//   }
// }

// const PhoneSignIn = () => {
//   const [phone, setPhone] = useState("");
//   const [code, setCode] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState<any>(null);

//   const navigate = useNavigate();

//   const setupRecaptcha = () => {
//     const container = document.getElementById("recaptcha-container");

//     if (!container) {
//       console.error("recaptcha-container topilmadi");
//       return;
//     }

//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//         container as HTMLElement,
//         {
//           size: "invisible",
//           callback: () => {
//             onSignInSubmit();
//           },
//         }
//       );

//       window.recaptchaVerifier.render().catch(console.error);
//     }
//   };

//   useEffect(() => {
//     setupRecaptcha();
//   }, []);

//   const onSignInSubmit = async () => {
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const result = await auth.signInWithPhoneNumber(phone, appVerifier);
//       setConfirmationResult(result);
//       alert("SMS yuborildi");
//     } catch (err) {
//       console.error("Xato:", err);
//     }
//   };

//   const verifyCode = async () => {
//     if (!confirmationResult) return;

//     try {
//       await confirmationResult.confirm(code);
//       alert("Tasdiqlandi!");
//       navigate("/"); // 🟢 Bosh sahifaga yo‘naltirish
//     } catch (err) {
//       console.error("Kod noto‘g‘ri:", err);
//     }
//   };


//   return (
//     <div>
//       <input
//         type="tel"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         placeholder="+998901234567"
//       />
//       <button onClick={onSignInSubmit}>SMS yuborish</button>

//       <input
//         type="text"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         placeholder="SMS kod"
//       />
//       <button onClick={verifyCode}>Tasdiqlash</button>

//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default React.memo(PhoneSignIn);
