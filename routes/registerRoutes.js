const { checkNotAuthenticated } = require("../middlewares/requireLogin");
const {
  register,
  confirmUser,
  resendVerificationEmail,
} = require("../controllers/registerUserController");
const checkToken = require("../middlewares/requireToken");
const passport = require("passport");

/**
 * This module focuses on the endpoints related to registering a user, logging in the user, and resending email verifications.
 * @param {*} app
 */
module.exports = (app) => {
  // @route POST - Registers a user if they are not authenticated.
  app.post("/register", checkNotAuthenticated, register);

  // @route GET - Verifies the user's email if they provide the token that is sent to their email.
  app.get("/confirmRegistration", checkToken, confirmUser);

  // @route POST - Resends an confirmation email to user if they did not their confirm their account.
  app.post("/resendEmailVerification", resendVerificationEmail);

  // @route POST - Logs in the user if they are not authenticated and provide the proper credentials.
  app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/",
    })
  );
};
