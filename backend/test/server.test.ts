import { Entry } from "@prisma/client";
import Prisma from "../src/db";
import { server } from "../src/server";

const TEST_PORT: number = 3011;
const TEST_SERVER_URL: string = "http://localhost:" + String(TEST_PORT);

beforeAll(() => {
  server.listen(TEST_PORT, "0.0.0.0");
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  // clear the database
  await Prisma.entry.deleteMany({});
  // seed the database
  const seeds = [
    {
      title: "Shed",
      description: "Needs to be cleaned out",
      created_at: new Date("2024-09-15"),
      due_at: new Date("2024-10-01"),
    },
    {
      title: "Cook soup",
      description: "Cook a big bowl of leek soup & freeze it",
      created_at: new Date("2024-10-02"),
      due_at: new Date("2024-11-02"),
    },
    {
      title: "Seeding",
      description: "Finish writing the database seeding script for my new app",
      created_at: new Date("2024-10-24"),
      due_at: new Date("2024-10-28"),
    },
  ];
  // Prisma 3 does not support createMany for sqlite, hence the for loop
  for (const entry of seeds) {
    await Prisma.entry.create({ data: entry });
  }
});

describe("server test", () => {
  it("GET /get/: should return a list of cards", async () => {
    const res = await fetch(TEST_SERVER_URL + "/get/");
    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
    const data: Entry[] = await res.json();
    expect(data).toHaveLength(3);
    const titles: string[] = data.map((entry) => entry.title);
    expect(titles).toContain("Shed");
    expect(titles).toContain("Cook soup");
    expect(titles).toContain("Seeding");
  });
  it("POST /create/: should create a new card with the given data", async () => {
    const res = await fetch(TEST_SERVER_URL + "/create/", {
      method: "POST",
      body: JSON.stringify({
        title: "Urgent!",
        description: "Sounds Important!!",
        created_at: new Date("2024-10-28"),
        due_at: new Date("2024-10-29"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.ok).toBe(true);
    expect(res.status).toBe(201);
    const data: Entry = await res.json();
    data.created_at = new Date(data.created_at);
    data.due_at = new Date(data.due_at);
    const exp = {
      title: "Urgent!",
      description: "Sounds Important!!",
      created_at: new Date("2024-10-28"),
      due_at: new Date("2024-10-29"),
    };
    expect(data).toMatchObject(exp);
  });
});
