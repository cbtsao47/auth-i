const db = require("../dbConfig");
const usersDb = {
  get: async id => {
    if (id) {
      const query = await db("users")
        .where({ id })
        .first();
      return query;
    }
    const query = await db("users");
    return query;
  },
  create: async userInfo => {
    const result = await db("users").where("users.username", userInfo.username);
    if (result.length) {
      return [];
    } else {
      const query = await db("users").insert(userInfo);
      return query;
    }
  },
  check: async userInfo => {
    const result = await db("users")
      .where("users.username", userInfo.username)
      .first();
    if (result) {
      return result;
    } else {
      return false;
    }
  }
};
module.exports = usersDb;
