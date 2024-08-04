const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { User } = require("../models")
const {signToken} = require("../helpers/jwt")

beforeAll(async () => {
    const newUser = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "12345",
        role: "Admin",
        phoneNumber: "08123456123", 
        address: "Surabaya"
    })
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})

describe("POST /user", () => {
    // success
    test("success login and send access token", async () => {
        const body = {
            email: "admin@mail.com",
            password: "12345"
        }
        
        const response = await request(app).post("/login").send(body)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    })

    // validation input
    test("Email empty", async () => {
        const body = {
            password: "12345"
        }
        
        const response = await request(app).post("/login").send(body)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid input: Please check your email and try again")
    })
    test("password empty", async () => {
        const body = {
            email: "admin@mail.com",
        }
        
        const response = await request(app).post("/login").send(body)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid input: Please check your password and try again")
    })
    test("email not valid", async () => {
        const body = {
            email: "admin1@mail.com",
            password: "12345"
        }
        
        const response = await request(app).post("/login").send(body)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid email or password. Please try again")
    })
    test("password not valid", async () => {
        const body = {
            email: "admin@mail.com",
            password: "123245"
        }
        
        const response = await request(app).post("/login").send(body)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid email or password. Please try again")
    })


})