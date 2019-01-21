exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "test", password: "123" },
        { username: "test1", password: "1234" },
        { username: "test2", password: "1235" }
      ]);
    });
};
