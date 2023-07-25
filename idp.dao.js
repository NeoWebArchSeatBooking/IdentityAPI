const sql = require("./idp.db");

class Profile {
  constructor({ name, userId, role }) {
    this.name = name;
    this.userId = userId;
    this.role = role;
  }

  static findById(userId) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM IDP_USER WHERE USERID= ?",
        userId,
        (err, res) => {
          if (err) {
            console.log(`err: ${err.message}`);
            reject(err);
          }

          if (res.length) {
            resolve({ status: 200, profle: res[0] });
          } else {
            resolve({ status: 404 });
          }
        }
      );
    });
  }

  static save(profile) {
    return new Promise((resolve, reject) => {
      sql.query("INSRT INTO IDP_USER SET ?", profile, (err, res) => {
        if (err) {
          console.log(`err: ${err.message}`);
          reject(err);
        }
        resolve({ status: 200 });
      });
    });
  }
}

module.exports = Profile;
