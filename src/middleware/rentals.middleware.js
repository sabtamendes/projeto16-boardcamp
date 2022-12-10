import connection from "../database/database.js";

export async function rentalsValidation(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const customerIdExists = await connection.query("SELECT id FROM customers WHERE id = $1;", [customerId]);

        if (!customerIdExists.rows[0]) {
            return res.sendStatus(400);
        }

        const gameExists = await connection.query("SELECT id FROM games WHERE id = $1;", [gameId]);

        if (!gameExists.rows[0]) {
            return res.sendStatus(400);
        }

        if (daysRented === 0) {
            return res.sendStatus(400);
        }

        const rentalsOpen = await connection.query(`SELECT * FROM rentals WHERE "returnDate" IS NULL AND "delayFee" IS NULL AND "customerId" = $1;`, [gameId]);

        if (rentalsOpen.rows.length > gameExists.rows[0].stockTotal) {
            return res.sendStatus(400);
        }

        res.locals.rentals = req.body;

        next();

    } catch (err) {
        console.log(err, "AQUII 2");
        res.sendStatus(500);
    }
}
