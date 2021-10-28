export const registerValidation = (
  user,
  username,
  email,
  password,
  confirmPassword,
  res
) => {
  if (user) {
    res.json({ status: "FAILED", message: "Username taken" });
  } else if (username.length <= 3) {
    res.json({
      status: "FAILED",
      message: "Username length must be greater than 3",
    });
  } else if (!email.includes("@")) {
    res.json({ status: "FAILED", message: "Invalid email address" });
  } else if (password.length <= 5) {
    res.json({
      status: "FAILED",
      message: "Password length must be greater than 5",
    });
  } else if (password !== confirmPassword) {
    res.json({ status: "FAILED", message: "Passwords do not match" });
  }
  return null;
};
