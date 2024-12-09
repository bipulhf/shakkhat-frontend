"use server";

import { ChatGroq } from "@langchain/groq";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import {
  SystemMessage,
  HumanMessage,
  trimMessages,
} from "@langchain/core/messages";

const config = { configurable: { thread_id: uuidv4() } };
const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});
const memory = new MemorySaver();
const llm = new ChatGroq({
  model: "llama3-70b-8192",
  temperature: 0,
});

export const singleTurnChat = async (input: string) => {
  const output = await llm.invoke([{ role: "user", content: input }]);
  return output.content as string;
};

export const defaultPromptChat = async (text: string) => {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Your task is to help the user to write proper description for the user who wants to set a meeting with someone. You will have the responsibility to guide the user to write a proper description for the meeting. You only write within 50-80 words only. Write in only text format. It will be plain text. It should be a proper description for the meeting. Do not add extra information. Just write a proper description for the meeting. No need to add extra line. Just description.",
    ],
    new MessagesPlaceholder("messages"),
  ]);

  const messages: SystemMessage | HumanMessage[] = [];

  const callModel = async (state: typeof MessagesAnnotation.State) => {
    const chain = prompt.pipe(llm);
    const trimmedMessage = await trimmer.invoke(state.messages);
    const response = await chain.invoke({
      messages: trimmedMessage,
    });
    return { messages: [response] };
  };

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

  const app = workflow.compile({ checkpointer: memory });
  const input = {
    messages: [...messages, new HumanMessage(text)],
  };

  const output = await app.invoke(input, config);
  const resp = output.messages[output.messages.length - 1];
  return resp.content as string;
};
