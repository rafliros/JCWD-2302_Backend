const bcrypt = require("bcrypt");
const saltRounds = 10;

// hashPassword function : Function untuk melakukan hashing pada password yang diterima
const hashPassword = async (password) => {
    try {
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      return null;
    }
};

module.exports = {
    hashPassword
}