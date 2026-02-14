import { Router } from "express";
import { generateUsers, generatePets } from "../utils/mock.utils.js";
import Users from "../dao/Users.dao.js";
import Pets from "../dao/Pets.dao.js";

const router = Router();
const usersDao = new Users();
const petsDao = new Pets();

const createMultipleUsers = async (count = 50) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(await generateUsers());
  }
  return users;
};

const createMultiplePets = (count = 50) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push(generatePets());
  }
  return pets;
};

router.get("/mockingpets", (req, res) => {
  try {
    const pets = createMultiplePets();
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.get("/mockingusers", async (req, res) => {
  try {
    const users = await createMultipleUsers();
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const generatedUsers = await createMultipleUsers(users);

    const savedUsers = [];
    for (const user of generatedUsers) {
      const savedUser = await usersDao.save(user);
      savedUsers.push(savedUser);
    }

    const generatedPets = createMultiplePets(pets);

    const savedPets = [];
    for (const pet of generatedPets) {
      const savedPet = await petsDao.save(pet);
      savedPets.push(savedPet);
    }

    res.json({
      status: "success",
      message: "Datos generados exitosamente",
      payload: {
        users: savedUsers,
        pets: savedPets,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
});

export default router;
