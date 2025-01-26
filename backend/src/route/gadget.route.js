import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    createGadget,
    getAllGadgets,
    updateGadget,
    decommissionGadget,
    selfDestruct,
} from "../controllers/gadget.controller.js";

const router = express.Router();

router.use(protectRoute);

/**
 * @swagger
 * components:
 *   schemas:
 *     Gadget:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         codeName:
 *           type: string
 *         successRate:
 *           type: number
 *         decommissionedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Get all gadgets
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: List of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gadget'
 *   post:
 *     summary: Create a new gadget
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gadget created successfully
 */
router.route("/").get(getAllGadgets).post(createGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *   delete:
 *     summary: Decommission a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 */
router.route("/:id").patch(updateGadget).delete(decommissionGadget);

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Self-destruct a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmationCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget self-destructed successfully
 *       400:
 *         description: Invalid confirmation code
 */
router.route("/:id/self-destruct").post(selfDestruct);

export default router;