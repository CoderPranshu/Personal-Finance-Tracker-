/**
 * authorizeRoles.js
 * -----------------
 * RBAC middleware.
 *
 * Usage:
 *   router.get("/admin", verifyToken, authorizeRoles("admin"), handler)
 */

function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    const role = req.user?.role;

    if (!role) {
      return res.status(401).json({ error: "Unauthorized", message: "Missing user role" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        error: "Forbidden",
        message: `Role '${role}' is not allowed to access this resource`,
      });
    }

    return next();
  };
}

module.exports = { authorizeRoles };

