const bcrypt = require("bcrypt");
const {
  getUserById,
  getUserByEmail,
} = require("../controllers/userController");

const user = {
  serialize: (user, done) => {
    done(null, user._id);
  },
  deserialize: async (id, done) => {
    try {
      const validUser = await getUserById(id);
      return done(null, validUser);
    } catch (err) {
      console.log(err);
    }
  },
  authenticate: async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (user == null) {
        return done(null, false);
      }

      if ((await bcrypt.compare(password, user.password)) && user.isVerified) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  },
};

module.exports = user;
