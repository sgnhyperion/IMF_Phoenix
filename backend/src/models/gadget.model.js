import { Sequelize } from "sequelize";
import { sequelize } from "../lib/db";

// id (UUID)
// name (string)
// status (string, enum: ["Available", "Deployed", "Destroyed", "Decommissioned"])

const Gadget = sequelize.define('Gadget', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM(["Available", "Deployed", "Destroyed", "Decommissioned"]),
        allowNull: false
    },
    codeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    successRate: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

export default Gadget;