---
title: "Designing with local data: notes from LocalFinance"
description: "A look at the choices and trade-offs behind a personal finance tool that keeps its data on your own machine."
pubDate: "2026-10-27"
category: "Local-first"
---

A bank statement is full of useful information, but it is not always easy to turn that information into a picture of how you spend. LocalFinance is an open-source tool for importing Indian bank and credit card statements, categorizing transactions, and exploring that data on your own machine.

The choice to keep data local shapes more than storage. It changes what the product needs to do well and what its users need to understand.

## Start with a useful workflow

The starting point is practical: bring statements together, make transactions easier to categorize, and give people a way to explore spending. A local database alone does not make the experience useful; the import and review workflow has to help turn raw records into something understandable.

That is why the product is organized around the work a person wants to do with the data, rather than around the database itself.

## Keep ownership visible

LocalFinance stores its data in SQLite on the user's machine. That makes the location of the data a clear part of the product: the person using it has direct control over the machine and its files.

Local storage also has a trade-off. A user needs to think about protecting and backing up their data. “Local” does not automatically mean “backed up,” and it does not remove the need to secure the device.

## Choose a stack that supports the job

LocalFinance uses Go, React, and SQLite. Together they support the app's interface, application logic, and local persistence. The interesting question is not whether this stack is universally best; it is whether it fits the workflow and constraints of the product being built.

A good technical choice should make the experience easier to maintain and understand. For a personal finance tool, that includes being clear about where information lives and what happens when it is imported.

## Build in the open

The project is [open source on GitHub](https://github.com/usmslm102/local-finance), and you can [explore LocalFinance](https://usamaansari.com/local-finance/) for its current features. For a shorter overview of the problem and trade-offs, see the [case study](/work/#localfinance).
