const errors = {
  //COMMON
  "auth/invalid-email": { email: "Invalid email" },

  //SIGNUP
  "auth/email-already-in-use": { email: "Account already exists" },
  "auth/weak-password": { password: "Password is too weak" },

  //SIGNIN
  "auth/user-not-found": { email: "Email does not exist" },
  "auth/too-many-requests": { password: "Too many unsuccessful attempts" },
  "auth/wrong-password": { password: "Incorrect password" },
};

export default errors;
