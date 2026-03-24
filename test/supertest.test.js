import "dotenv/config";
import supertest from "supertest";
import chai from "chai";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Adoptme Tests", function () {
  this.timeout(20000);

  let testUserId;
  let testPetId;
  let testAdoptionId;

  // fakeID para pruebas
  const fakeId = "507f1f77bcf86cd799439011";

  before(async function () {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const userResponse = await requester.post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User",
      email: `test.adoption.${Date.now()}@example.com`,
      password: "contraseña123",
    });
    testUserId = userResponse.body.payload;

    const petResponse = await requester.post("/api/pets").send({
      name: "Test Pet",
      specie: "Dog",
      birthDate: "2022-02-04",
    });
    testPetId = petResponse.body.payload._id;
  });

  after(async function () {
    if (testUserId) await requester.delete(`/api/users/${testUserId}`);
    if (testPetId) await requester.delete(`/api/pets/${testPetId}`);
  });

  it("Obtener todas las adopciones", async () => {
    const response = await requester.get("/api/adoptions");
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status").that.equals("success");
    expect(response.body.payload).to.be.an("array");
  });

  it("Devuelve un array aunque este vacio", async () => {
    const response = await requester.get("/api/adoptions");
    expect(response.body.payload).to.be.an("array");
  });

  it("Crea una adopcion con usuario y mascota validos", async () => {
    const response = await requester.post(
      `/api/adoptions/${testUserId}/${testPetId}`,
    );
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status").that.equals("success");
    expect(response.body)
      .to.have.property("message")
      .that.equals("Pet adopted");

    const adoptionsResponse = await requester.get("/api/adoptions");
    const adoption = adoptionsResponse.body.payload.find(
      (a) =>
        a.owner.toString() === testUserId && a.pet.toString() === testPetId,
    );
    if (adoption) testAdoptionId = adoption._id;
  });

  it("Falla si el usuario no existe", async () => {
    const response = await requester.post(
      `/api/adoptions/${fakeId}/${testPetId}`,
    );
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status").that.equals("error");
    expect(response.body.error).to.equal("user Not found");
  });

  it("Falla si la mascota no existe", async () => {
    const response = await requester.post(
      `/api/adoptions/${testUserId}/${fakeId}`,
    );
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status").that.equals("error");
    expect(response.body.error).to.equal("Pet not found");
  });

  it("Falla si la mascota ya esta adoptada", async () => {
    const petResponse = await requester.post("/api/pets").send({
      name: "Mascota ya adoptada",
      specie: "Cat",
      birthDate: "2021-01-01",
    });
    const petId = petResponse.body.payload._id;

    const user1 = await requester.post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User3",
      email: `test.adoption3.${Date.now()}@ejemplo.com`,
      password: "contraseña123",
    });
    const userId1 = user1.body.payload;
    await requester.post(`/api/adoptions/${userId1}/${petId}`);

    const user2 = await requester.post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User4",
      email: `test.adoption4.${Date.now()}@ejemplo.com`,
      password: "contraseña123",
    });
    const userId2 = user2.body.payload;

    const response = await requester.post(`/api/adoptions/${userId2}/${petId}`);
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("status").that.equals("error");
    expect(response.body.error).to.equal("Pet is already adopted");

    await requester.delete(`/api/users/${userId1}`);
    await requester.delete(`/api/users/${userId2}`);
    await requester.delete(`/api/pets/${petId}`);
  });

  it("Obtiene una adopcion por Id", async () => {
    if (!testAdoptionId) return;
    const response = await requester.get(`/api/adoptions/${testAdoptionId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status").that.equals("success");
    expect(response.body.payload).to.have.property("_id");
  });

  it("Arroja un error 404 si no existe la adopcion", async () => {
    const response = await requester.get(`/api/adoptions/${fakeId}`);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status").that.equals("error");
    expect(response.body.error).to.equal("Adoption not found");
  });

  it("Elimina una mascota", async function () {
    const petResponse = await requester.post("/api/pets").send({
      name: "Mascota a eliminar",
      specie: "Bird",
      birthDate: "2020-05-10",
    });
    const petId = petResponse.body.payload._id;

    const { status, body } = await requester.delete(`/api/pets/${petId}`);
    expect(status).to.equal(200);
    expect(body.status).to.equal("success");
    expect(body.message).to.equal("pet deleted");
  });
});
