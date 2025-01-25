import Gadget from "../model/gadget.model.js";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Generating codename
async function generateCodename() {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "developer", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Generate a single cool spy gadget codename (e.g., 'The Nightingale', 'The Phantom Shadow'). Response should be just the name, nothing else.",
            },
        ],
        store: true,
    });
    
    return completion.choices[0].message.content;
  }