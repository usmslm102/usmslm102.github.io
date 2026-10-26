---
title: "Building foundations for AI agents"
description: "Why tools, memory, evaluation, and security deserve as much attention as the model in an agent platform."
pubDate: "2026-10-27"
category: "AI platforms"
---

An AI agent is more than a model responding to a prompt. Once an agent needs to use tools or operate as part of a team’s workflow, the surrounding system becomes just as important as the model itself.

My work on the Azure Networking AI Agent Platform has reinforced the value of treating those surrounding capabilities as foundations that teams can build on. Here are a few of the areas that matter.

## Give agents useful tools

An agent becomes more useful when it can interact with the systems relevant to its task. That creates a need for clear interfaces between the agent and those tools. The platform includes MCP integration as part of that foundation.

The goal is not to give every agent access to everything. It is to connect the right capabilities to the right workflow, with appropriate security controls around them.

## Treat memory as a design decision

Context can help an agent carry information across interactions, but it also introduces questions about what to store, retrieve, and use. Our platform includes dynamic memory management and uses Cosmos DB for operational state and vector memory.

The practical design question is how to make context useful to the task without making the system harder to understand or operate.

## Make evaluation part of the system

A convincing answer in a single demonstration is not enough to understand how an agent behaves across different tasks. Automated evaluation gives teams a way to assess behavior as they develop and change their agents.

Evaluation is most useful when it is tied to the work the agent is meant to perform: the kinds of requests it receives, the tools it uses, and the outcomes people expect.

## Build for the environment it runs in

Enterprise agents operate within existing security and infrastructure requirements. The platform brings together multi-model orchestration, evaluation, memory, and security controls on Azure AI Foundry, Container Apps, and Cosmos DB.

The balance is familiar from other platform work: provide shared foundations while leaving enough room for teams to solve different problems. You can read more about the platform's scope in the [case study](/work/#agent-platform).
