import { fakerES } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const generatePets = () => {
  return {
    name: fakerES.animal.dog(),
    specie: fakerES.helpers.arrayElement([
      "dog",
      "cat",
      "bird",
      "rabbit",
      "hamster",
      "fish",
    ]),
    birthDate: fakerES.date.past(),
    adopted: false,
    owner: null,
    image: fakerES.image.url(),
  };
};

export const generateUsers = async () => {
  return {
    first_name: fakerES.person.firstName(),
    last_name: fakerES.person.lastName(),
    email: fakerES.internet.email(),
    password: await bcrypt.hash("coder123", 10),
    role: fakerES.helpers.arrayElement(["user", "admin"]),
    pets: [],
  };
};
