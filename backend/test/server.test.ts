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
    },
    {
      title: "Cook soup",
      description: "Cook a big bowl of leek soup & freeze it",
      created_at: new Date("2024-10-02"),
    },
    {
      title: "Seeding",
      description: "Finish writing the database seeding script for my new app",
      created_at: new Date("2024-10-24"),
    },
  ];
  // Prisma 3 does not support createMany for sqlite
  for (const entry of seeds) {
    await Prisma.entry.create({ data: entry });
  }
});

describe("server test", () => {
  it("GET /get/: should return a list of cards", async () => {
    const res = await fetch(TEST_SERVER_URL + "/get/");
    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(0);
  });
});
