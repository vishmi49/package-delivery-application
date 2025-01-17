const protect = (req, res, next) => {
  console.log(req.oidc.isAuthenticated);
  if (req.oidc.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
}

export default protect;