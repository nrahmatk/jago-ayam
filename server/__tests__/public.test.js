const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User, Category, Cuisine } = require("../models");
const { signToken } = require("../helpers/jwt");

let entity1;
let entity2;
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

  let dataCategory = require("../data/categories.json");
  dataCategory = dataCategory.map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
  });

  await sequelize.queryInterface.bulkInsert("Categories", dataCategory);

  let dataCuisine = require("../data/cuisines.json");
  dataCuisine = dataCuisine.map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
  });

  await sequelize.queryInterface.bulkInsert("Cuisines", dataCuisine);

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

describe("GET /cuisines/pub", () => {
  // success
  test("Get entity without query filter", async () => {
    const response = await request(app).get(`/pub/cuisines`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(10);
    expect(response.body.data[0]).toHaveProperty("id", 1);
    expect(response.body.data[0]).toHaveProperty("name", "Spring Rolls");
    expect(response.body.data[0]).toHaveProperty(
      "description",
      "Crispy rolls filled with fresh vegetables."
    );
    expect(response.body.data[0]).toHaveProperty("price", 50000);
    expect(response.body.data[0]).toHaveProperty(
      "imgUrl",
      "http://example.com/spring_rolls.jpg"
    );
    expect(response.body.data[0]).toHaveProperty("categoryId", 1);
    expect(response.body.data[0]).toHaveProperty("authorId", 1);
  });

  test("Get entity with query filter", async () => {
    const response = await request(app).get(`/pub/cuisines?filter=2`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(5);
    expect(response.body.data[0]).toHaveProperty("id", 5);
    expect(response.body.data[0]).toHaveProperty("name", "Grilled Chicken");
    expect(response.body.data[0]).toHaveProperty(
      "description",
      "Juicy grilled chicken with spices."
    );
    expect(response.body.data[0]).toHaveProperty("price", 120000);
    expect(response.body.data[0]).toHaveProperty(
      "imgUrl",
      "http://example.com/grilled_chicken.jpg"
    );
    expect(response.body.data[0]).toHaveProperty("categoryId", 2);
    expect(response.body.data[0]).toHaveProperty("authorId", 2);
  });

  test("Get entity with custom page number", async () => {
    const response = await request(app).get(`/pub/cuisines?page=2`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(10);
    expect(response.body.data[0]).toHaveProperty("id", 11);
    expect(response.body.data[0]).toHaveProperty("name", "Cheesecake");
    expect(response.body.data[0]).toHaveProperty(
      "description",
      "Creamy cheesecake with a graham cracker crust."
    );
    expect(response.body.data[0]).toHaveProperty("price", 70000);
    expect(response.body.data[0]).toHaveProperty(
      "imgUrl",
      "http://example.com/cheesecake.jpg"
    );
    expect(response.body.data[0]).toHaveProperty("categoryId", 3);
    expect(response.body.data[0]).toHaveProperty("authorId", 2);
  });
});

describe("GET /cuisines/pub/:cuisineId", () => {
  // success
  test("Get 1 entity with params", async () => {
    const response = await request(app).get(`/pub/cuisines/1/`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body.name).toBe("Spring Rolls");
  });
  
  test("Failed get 1 entity with invalid params", async () => {
    const response = await request(app).get(`/pub/cuisines/256/`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Error 404: Item not found`
    );
  });
});
