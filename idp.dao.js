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
        "SELECT * FROM IDP_USERS WHERE USER_ID= ?",
        userId,
        (err, res) => {
          if (err) {
            console.log(`err: ${err.message}`);
            reject(err);
          }

          if (res.length) {
            resolve({ status: 200, profile: { userId:res[0].user_id,name:res[0].user_name,role:res[0].user_role} });
          } else {
            resolve({ status: 404 });
          }
        }
      );
    });
  }

  static save(profile) {
    return new Promise((resolve, reject) => {
      const sqlInsert = `INSERT INTO IDP_USERS(user_id,user_name,user_role) VALUES('${profile.userId}','${profile.name}','${profile.role}')`
      sql.query(sqlInsert, (err, res) => {
        if (err) {
          console.log(`err: ${err.message}`);
          reject(err);
        }
        console.log(res)
        resolve({ status: 200 });
      });
    });
  }
}

module.exports = Profile;
