import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    createGadget,
    getAllGadgets,
    updateGadget,
    decommissionGadget,
    sendSelfDestructRequest,
    executeSelfDestruct,
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
 * /gadgets/{id}/self-destruct/request:
 *   post:
 *     summary: Request self-destruct confirmation code
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Confirmation code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 confirmationCode:
 *                   type: string
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/self-destruct/request", sendSelfDestructRequest);

/**
 * @swagger
 * /gadgets/{id}/self-destruct/execute:
 *   post:
 *     summary: Execute self-destruct with confirmation code
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
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/self-destruct/execute", executeSelfDestruct);

export default router;