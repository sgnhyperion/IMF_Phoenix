import Gadget from "../models/gadget.model.js";
import OpenAI from "openai";
import logger from "../lib/logger.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Generating codename
async function generateCodename() {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "developer", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Generate a single cool spy gadget codename (e.g., 'The Nightingale', 'The Phantom Shadow'). Response should be just the name, nothing else. The codeName should be related to the gadget name.",
            },
        ],
        store: true,
    });
    
    return completion.choices[0].message.content;
  }


  // Get All Gadgets
  export const getAllGadgets = async (req, res) => {
    try {
        const { status } = req.query;
        const whereClause = status ? { status } : {};

        const gadgets = await Gadget.findAll({ where: whereClause });
        res.status(200).json(gadgets);
    } catch (error) {
        logger.error("Error in getAllGadgets controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
  };


  // Create Gadget
  export const createGadget = async (req, res) => {
    try {
        const { name } = req.body;

        const checkIfGadgetExists = await Gadget.findOne({ where: { name } });

        if(checkIfGadgetExists) {
            return res.status(400).json({ error: "Gadget already exists" });
        }

        const codeName = await generateCodename();
        const successRate = Math.floor(Math.random()*41) + 60;

        const gadget = await Gadget.create({
            name,
            codeName,
            status: "Available",
            successRate,
        });

        res.status(201).json(gadget);
    } catch (error) {
        logger.error("Error in createGadget controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Update Gadget
  export const updateGadget = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const gadget = await Gadget.findByPk(id);

        if(!gadget) {
            return res.status(404).json({ error: "Gadget not found" });
        }

        await gadget.update({ name, status });
        res.status(200).json(gadget);
    } catch (error) {
        logger.error("Error in updateGadget controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
  };


  // Delete Gadget
  export const decommissionGadget = async ( req, res ) => {
    try {
        const { id } = req.params;

        const gadget = await Gadget.findByPk(id);

        if(!gadget){
            return res.status(404).json({ error: "Gadget not found" });
        }

        await gadget.update({
            status: "Decommissioned",
            decommissionedAt: new Date(),
        });

        res.status(200).json(gadget);
    } catch (error) {
        logger.error("Error in decommissionGadget controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
  };


// Send Self-Destruct Request
export const sendSelfDestructRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const gadget = await Gadget.findByPk(id);

        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found" });
        }

        // Generate a confirmation code
        const confirmationCode = Math.random().toString(36).substring(7);
        // Store the confirmation code in the gadget (or in a temporary store)
        gadget.confirmationCode = confirmationCode; // You may need to add this field to your model
        await gadget.save();

        // Send the confirmation code to the user (e.g., via alert in the frontend)
        // For now, we will just return it in the response for testing purposes
        res.status(200).json({ message: "Confirmation code generated", confirmationCode });
    } catch (error) {
        logger.error("Error in sendSelfDestructRequest controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Execute Self-Destruct
export const executeSelfDestruct = async (req, res) => {
    try {
        const { id } = req.params;
        const { confirmationCode } = req.body;

        const gadget = await Gadget.findByPk(id);

        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found" });
        }

        // Check if the confirmation code matches
        if (confirmationCode !== gadget.confirmationCode) {
            return res.status(400).json({ error: "Invalid confirmation code" });
        }

        // Proceed with self-destruct
        await gadget.update({ status: "Destroyed" });
        res.status(200).json({ message: "Gadget self-destructed successfully" });
    } catch (error) {
        logger.error("Error in executeSelfDestruct controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};