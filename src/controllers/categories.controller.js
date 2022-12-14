import connection from "../database/database.js";

export async function getCategories(req, res) {
    try {
        const listingCategories = await connection.query(`SELECT * FROM categories;`);

        res.send(listingCategories.rows);

    } catch (err) {
        res.send(err);
    }
}
export async function postCategories(req, res) {
    const { name } = req.body;

    try {
        if (!name) {
            return res.sendStatus(400);
        }
        const theNameAllreadyExists = await connection.query("SELECT * FROM categories WHERE name = $1", [name]);

        if (theNameAllreadyExists.rows.length !== 0 || theNameAllreadyExists.rows[0].name === name) {
            return res.sendStatus(409);
        }

        await connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);

        res.sendStatus(201);

    } catch (err) {
        res.send(err);
    }
}