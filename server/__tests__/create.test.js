const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { User, Category, Cuisine } = require("../models")
const {signToken} = require("../helpers/jwt")

let categoryid;
let accesToken;
let invalidAccesToken;

beforeAll(async () => {
    const newUser = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "12345",
        role: "Admin",
        phoneNumber: "08123456123", 
        address: "Surabaya"
    })

    const newCategory = await Category.create({
        name: "Makanan",
    })
    categoryid = newCategory.id

    accesToken = signToken({ 
        id: newUser.id,
        role: newUser.role
     })

    invalidAccesToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb2JhIiwibmFtZSI6ImNvYmEiLCJpYXQiOjE1MTYyMzkwMjJ9.6JfEeQKChNXl1o5ovdV4hzEZBbDsEaO_W-CJoRtbQ8g'
    
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      });
    
      await sequelize.queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      });
    
      await sequelize.queryInterface.bulkDelete('Cuisines', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      });
})

describe("POST /user", () => {
    // success
    test("success create entity", async () => {
        const body = {
            name: "Spring Rolls",
            description: "Crispy rolls filled with fresh vegetables.",
            price: 50000,
            imgUrl: "http://example.com/spring_rolls.jpg",
            categoryId: categoryid
        }
        
        const response = await request(app).post("/cuisines").send(body).set("authorization", `Bearer ${accesToken}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Spring Rolls")
    })

    test("failed create entity because no auth", async () => {
        const body = {
            name: "Spring Rolls",
            description: "Crispy rolls filled with fresh vegetables.",
            price: 50000,
            imgUrl: "http://example.com/spring_rolls.jpg",
            categoryId: categoryid
        }
        
        const response = await request(app).post("/cuisines").send(body)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Access denied: Please log in first")
    })

    test("failed create entity because invalid token", async () => {
        const body = {
            name: "Spring Rolls",
            description: "Crispy rolls filled with fresh vegetables.",
            price: 50000,
            imgUrl: "http://example.com/spring_rolls.jpg",
            categoryId: categoryid
        }
        
        const response = await request(app).post("/cuisines").send(body).set("authorization", `Bearer ${invalidAccesToken}`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid token: Please log in again")
    })

    test("failed create entity because has invalid input", async () => {
        const body = {
            name: "",
            description: "Crispy rolls filled with fresh vegetables.",
            price: 50,
            imgUrl: "http://example.com/spring_rolls.jpg",
            categoryId: categoryid
        }
        
        const response = await request(app).post("/cuisines").send(body).set("authorization", `Bearer ${accesToken}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message[0]).toBe("Name is required")

    })

})