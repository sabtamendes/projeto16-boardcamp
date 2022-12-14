import connection from "../database/database.js";
import { customersSchema } from "../schemas/customers.schema.js";

export async function customersValidation(req, res, next) {
    const customer = req.body;

    const { error } = customersSchema.validate(customer, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const cpfAllreadyExists = await connection.query("SELECT * FROM customers WHERE cpf = $1;", [customer.cpf]);

        if (cpfAllreadyExists.rows.length !== 0 && cpfAllreadyExists.rows.id !== 0) {
            return res.sendStatus(409);
        }

        res.locals.customers = customer

        next();

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function customerIdValidation(req, res, next) {
    const { id } = req.params;

    try {
        const customersId = await connection.query("SELECT * FROM clientes WHERE id = $1;", [id]);

        if (customersId.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.locals.id = id;

        next();

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}