const User = require("../models/user");
const { faker } = require("@faker-js/faker");

const createUser = async (numUsers) => {
  try {
    const fakeusers = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      fakeusers.push(tempUser);
    }
    await Promise.all(fakeusers);

    console.log("Users Created", numUsers);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = createUser;
