# Key Architectural Decisions

## Table of Contents

- [Directions](#directions)
- [1. Introduction](#1-introduction)
  - [1.1. Purpose](#11-purpose)
- [2. System Overview](#2-system-overview)
- [3. Technical Choices](#3-technical-choices)
  - [3.1. Frontend Framework](#31-frontend-framework)
  - [3.2. Backend Framework](#32-backend-framework)
  - [3.3. Database System](#33-database-system)
- [4. Other Considerations](#4-other-considerations)
  - [4.1. Team Skills and Learning](#41-team-skills-and-learning)
  - [4.2. Community and Support](#42-community-and-support)
  - [4.3. Future Adaptability](#43-future-adaptability)
- [5. Decision Log](#5-decision-log)

## Directions:

This assignment is designed to guide you in understanding the foundational aspects of your project. Remember, in software engineering, understanding the "why" behind decisions is often as important as the decisions themselves. As you navigate these early stages of your coding journey, focus on grasping the core reasons behind each choice, and use this document to record and reflect on those reasons.

---

## 1. Introduction

### 1.1. Purpose


Our goal is to develop a web-based application that simplifies schedule organization. This software will provide users, including students and employees, with a versatile calendar tool. Additionally, it will seamlessly connect with various software platforms, consolidating deadlines and meetings into a single, user-friendly interface.

---

## 2. System Overview

**Reference Architecture - Level 1:** 

The C4 diagram below shows the high-level view of systems used on the Task Center ecosystem. 

![C4 Diagram](https://github.com/Natalie-Zi/csci401w-sandbox/assets/143458363/d32f80b5-6135-4dec-8cca-4e1665e8b55a)

**Container View - Level 2:** 

![C4 Diagram drawio](https://github.com/Natalie-Zi/csci401w-sandbox/assets/143458363/49f8502f-4eab-4bf7-8ea2-143b486bdbd8)

The C4 diagram below shows additional details about the Task Center ecosystem.

---

## 3. Technical Choices

### 3.1. Frontend Framework

Angular material
We chose this framework because it has many optons we could implement.

### 3.2. Backend Framework

Express.js 
We chose this framework because we want to use node.js which can be used to connect with our database.

### 3.3. Database System

mySQL, because it's the one we're most familiar with.

---

## 4. Other Considerations

### 4.1. Team Skills and Learning

Nicholas told us he knows something about javascript so we all decided to learn more about it.
Also, we want to learn more about developing web applications.
Furthermore, Bryan has some knowledge about mySQL from previous classes so it looked ideal to use that for database.

### 4.2. Community and Support

Did the availability of tutorials, community support, or other resources influence your choice?
Yes we found various resources we can use for our project.

### 4.3. Future Adaptability

How easy do you believe it will be to adapt or extend the technology choices you’ve made in the future based on your current knowledge?
We think it would be fairly duable to adapt and extwnd our technology choices.

### 4.4. Constraints

Single-User Scope: The project's architecture is designed for a single-user login at any given time. The application isn't designed to facilitate multiple concurrent user logins. 

---

## 5. Decision Log

Here, you'll log key decisions made and the rationale behind them. Here's an example:

| Date       | Decision                                 | Reasoning                                                                                                           |
|------------|------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
|2023-8-10| Use MySQL| it's the one at least one team member is more familiar with|
|2023-10-10| Change from mobile app to web app| We believe that we're able to better work with a website and it seemed interesting to learn more about.|
| 2023-10-10 | Chose Javascript for backend   | Our team found that it would be easier to use javascript for backend because we're developing a web application.|
|2023-16-10| Chose Node.js | We decided to use node.js as our backend framework|
|2023-16-10| Chose jQuery and HTML | jQuery  and HTML will be used for frontend|
|2023-28-11|Established features priority|We established which feature needed to be done by a certain date. Register/login, Add/share calendar, add/delete a task.|

Note: As you progress, keep adding to this log. It will not only help you track your decisions but also offer insights into your evolving
