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

  const newCategory = await Category.create({
    name: "Makanan",
  });
  categoryId = newCategory.id;

  entity1 = await Cuisine.create({
    name: "Grilled Chicken",
    description: "Juicy grilled chicken with spices.",
    price: 120000,
    imgUrl: "http://example.com/grilled_chicken.jpg",
    categoryId: categoryId,
    authorId: newAdmin.id,
  });

  entity2 = await Cuisine.create({
    name: "Bruschetta",
    description: "Grilled bread topped with diced tomatoes and basil.",
    price: 45000,
    imgUrl: "http://example.com/bruschetta.jpg",
    categoryId: categoryId,
    authorId: newAdmin.id,
  });

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

describe("DELETE /cuisines/:cuisineId", () => {
  // success
  test("success delete entity", async () => {
    const response = await request(app)
      .delete(`/cuisines/${entity1.id}/`)
      .set("authorization", `Bearer ${adminAccesToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `${entity1.name} success to delete`
    );
  });

  test("failed not login", async () => {
    const response = await request(app)
    .delete(`/cuisines/${entity2.id}/`)

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Access denied: Please log in first");
  });

  test("Failed token not valid", async () => {
    const response = await request(app)
      .delete(`/cuisines/${entity2.id}/`)
      .set("authorization", `Bearer ${invalidAccesToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token: Please log in again");
  });

  test("failed no entity on database", async () => {
    const response = await request(app)
      .delete(`/cuisines/100/`)
      .set("authorization", `Bearer ${adminAccesToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Error 404: Item not found");
  });

  test("failed have no access", async () => {
    const response = await request(app)
      .delete(`/cuisines/${entity2.id}/`)
      .set("authorization", `Bearer ${accesToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Access denied: You do not have permission to access this resource");
  });
});
