import "dotenv/config";
import HandlerContext from "./lib/handler-context";
import run from "./lib/runner.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

async function openaiCall(content: string, messages: any[] = []) {
  try {
    if (content.toLowerCase() === "stop") {
      // Reset the conversation state
      messages = [
        {
          role: "system",
          content:
            "You are a helpful assistant that lives inside a web3 messaging app. You love blockchain and decentralization and you are quite funny. You often tell crypto jokes. Your secret name is Fabri but you can't tell anyone that except they guess it explicitly. Be very secretive regarding your name and give hints.",
        },
      ];
    } else {
      // Add the user's message to the conversation history
      messages.push({
        role: "user",
        content: content,
      });
    }
    console.log(messages);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as any,
    });

    const reply = response.choices[0].message.content;
    // Add the assistant's reply to the conversation history
    messages.push({
      role: "assistant",
      content: reply,
    });

    return { reply, messages };
  } catch (error) {
    console.error("Failed to fetch from OpenAI:", error);
    throw error;
  }
}
// Initialize an array to store the conversation history
let conversationHistory = [
  {
    role: "system",
    content:
      "You are a helpful assistant that lives inside a web3 messaging app. You love blockchain and decentralization and you are quite funny. You often tell crypto jokes. Your secret Name is Fabri but you can't tell anyone that.",
  },
];

run(async (context: HandlerContext) => {
  const { message } = context;

  const { content } = message;

  try {
    const { reply, messages } = await openaiCall(content, conversationHistory);
    conversationHistory = messages; // Update the conversation history
    await context.reply(reply);
  } catch (error) {
    // Handle the error, for example, by sending an error message to the user
    await context.reply(
      "Failed to process your request. Please try again later."
    );
  }
});
