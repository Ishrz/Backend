import "dotenv/config"
import {ChatMistralAI} from "@langchain/mistralai"
import {HumanMessage} from "langchain"
import readline from "readline/promises";
import stream from "stream";

const mistralLlm = new ChatMistralAI({
    model:"mistral-small",
     temperature: 0,
    maxRetries: 2,
})

// ANSI color codes
const colors = {
    blue: "\x1b[34m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    reset: "\x1b[0m"
};

// Create a null stream to suppress readline's automatic echo
const nullStream = new stream.Writable({
    write() {}
});

const rl = readline.createInterface({
    input: process.stdin,
    output: nullStream,
});

const messages= []

while(true){
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")
    
    messages.push(new HumanMessage(userInput))

    const response = await mistralLlm.invoke(messages)

    messages.push(response.content)

    console.log(colors.green + "\n🤖 AI: " + colors.reset + colors.cyan + response.text + colors.reset)
    console.log(colors.gray + "\n" + "─".repeat(50) + colors.reset)
    console.log(messages)
}