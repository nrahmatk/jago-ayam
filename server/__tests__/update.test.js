const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User, Category, Cuisine } = require("../models");
const { signToken } = require("../helpers/jwt");

let newEntityId;
let categoryId;
let accesToken;
let invalidAccesToken;
let adminAccesToken;

beforeAll(async () => {
  const newAdmin = await User.create({
    username: "admin",
    email: "admin@mail.com",
    password: "12345",
    role: "Admin",
    phoneNumber: "08123456123",
    address: "Surabaya",
  });

  adminAccesToken = signToken({
    id: newAdmin.id,
    role: newAdmin.role,
  });

  const newUser = await User.create({
    username: "staff",
    email: "staff@mail.com",
    password: "12345",
    role: "Staff",
    phoneNumber: "08123456123",
    address: "Surabaya",
  });

  accesToken = signToken({
    id: newUser.id,
    role: newUser.role,
  });

  const newCategory = await Category.create({
    name: "Makanan",
  });
  categoryId = newCategory.id;

  const entity = await Cuisine.create({
    name: "Spring Rolls",
    description: "Crispy rolls filled with fresh vegetables.",
    price: 50000,
    imgUrl: "http://example.com/spring_rolls.jpg",
    categoryId,
    authorId: newAdmin.id,
  });

  newEntityId = entity.id;

  invalidAccesToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb2JhIiwibmFtZSI6ImNvYmEiLCJpYXQiOjE1MTYyMzkwMjJ9.6JfEeQKChNXl1o5ovdV4hzEZBbDsEaO_W-CJoRtbQ8g";
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await sequelize.queryInterface.bulkDelete("Cuisines", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("PUT /cuisines/:cuisineId", () => {
  // success
  test("success update entity", async () => {
    const response = await request(app)
      .put(`/cuisines/${newEntityId}/`)
      .send({
        name: "Spring update",
        description: "Crispy rolls filled with fresh vegetables.",
        price: 60000,
        imgUrl: "http://example.com/spring_rolls.jpg",
        categoryId,
      })
      .set("authorization", `Bearer ${adminAccesToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.name).toBe("Spring update");
  });

  test("failed because not login", async () => {
    const response = await request(app)
      .put(`/cuisines/${newEntityId}/`)
      .send({
        name: "Spring update",
        description: "Crispy rolls filled with fresh vegetables.",
        price: 60000,
        imgUrl: "http://example.com/spring_rolls.jpg",
        categoryId,
      })

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Access denied: Please log in first");
  });

  test("Failed token not valid", async () => {
    const response = await request(app)
      .put(`/cuisines/${newEntityId}/`)
      .send({
        name: "Spring update",
        description: "Crispy rolls filled with fresh vegetables.",
        price: 60000,
        imgUrl: "http://example.com/spring_rolls.jpg",
        categoryId,
      })
      .set("authorization", `Bearer ${invalidAccesToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token: Please log in again");
  });

  test("failed no entity on database", async () => {
    const response = await request(app)
      .put(`/cuisines/2/`)
      .send({
        name: "Spring update",
        description: "Crispy rolls filled with fresh vegetables.",
        price: 60000,
        imgUrl: "http://example.com/spring_rolls.jpg",
        categoryId,
      })
      .set("authorization", `Bearer ${adminAccesToken}`);


    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Error 404: Item not found");
  });

  test("failed have no access", async () => {
    const response = await request(app)
      .put(`/cuisines/${newEntityId}/`)
      .send({
        name: "Spring update",
        description: "Crispy rolls filled with fresh vegetables.",
        price: 60000,
        imgUrl: "http://example.com/spring_rolls.jpg",
        categoryId,
      })
      .set("authorization", `Bearer ${accesToken}`);


    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Access denied: You do not have permission to access this resource");
  });

  test("failed invalid req body", async () => {
    const response = await request(app)
      .put(`/cuisines/${newEntityId}/`)
      .send({
        name: "Spring update",
        description: "Crispy rolls filled with fresh vegetables.",
        price: 300,
        imgUrl: "http://example.com/spring_rolls.jpg",
        categoryId,
      })
      .set("authorization", `Bearer ${adminAccesToken}`);


    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", ["The minimum price is 1000"]);
  });


});
