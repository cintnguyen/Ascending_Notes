const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


let notes = {
    content: "This is a testing note",
    important: false,
};

beforeEach(() => {
    notes = {
        content: "This is a testing note",
        important: false,
    };
});

describe("GET /api/notes", () => {
    it("responds with json from database", async () => {
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .then((res) => {
                console.log(res.body.length);
            });
    });
});

describe("POST /api/createNote", () => {
    it("responds with json from database", async () => {
        await api
            .post("/api/createNote")
            .send(notes)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201);
    });

    describe("error handling", () => {
        it("returns an error when posting an incomplete note", async () => {
            delete notes.content;
            await api
                .post("/api/createNote")
                .send(notes)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(400)
                .expect({
                    error: "Note validation failed: content: Path `content` is required.",
                });
        });
    });
});

describe("PUT /api/notes/:id", () => {

    it("updates the identified note and returns the matching note in the database with updated information", async () => {
        await api
            .post("/api/createNote")
            .send(notes)
            .then((res) => {
                console.log(res.body)
                notes.id = res.body.note._id
            }
            );

        await api
            .put(`/api/notes/${notes.id}`)
            .send({ important: !notes.important })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(notes.id).toEqual(res.body.note._id);
                expect(notes.important).not.toEqual(res.body.note.important);
            });
    });

    describe("error handling", () => {
        it("returns an error when sending a update request to database using non-exisitent id", async () => {
            await api
                .put("/api/notes/65c13ff3de22ff419caffd95")
                .send(notes)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(404)
                .expect({ error: "unknown endpoint" });
        });
    });
});

describe("DELETE /api/notes/:id", () => {
    it("deletes the note document from database", async () => {
        await api
            .post("/api/createNote")
            .send(notes)
            .then((res) => {
                console.log(res.body)
                notes.id = res.body.note._id
            }
                );

        await api.delete(`/api/notes/${notes.id}`).expect(200);
    });

    describe("error handling", () => {
        it("returns an error when sending a delete request to database using non-exisitent id", async () => {
            await api
                .delete("/api/notes/65c19151573bfc38cf426c7a")
                .send(notes)
                .set("Accept", "application/json")
                .expect(404);
        });
    });
});

afterAll(async () => {
    await api.delete("/api/cleartests");
    await mongoose.connection.close();
  });