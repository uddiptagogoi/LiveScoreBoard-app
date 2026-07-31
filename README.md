# ⚽ LiveScoreBoard – React Frontend

A responsive football score application built with **React** to provide users with access to live football information, league details, matches, standings, statistics, and customizable scoreboards.

## 🎯 Project Overview

LiveScoreBoard is a football-focused web application designed to make football information easier to explore in one place.

The frontend provides a user-friendly interface for browsing football leagues, viewing matches, checking standings and statistics, and creating a personalized scoreboard experience.

The application is built with React and uses React Router for client-side navigation.

## ✨ Key Features

### 🏆 Football Leagues

Browse popular football leagues and access league-specific information.

### 📅 Match Information

View football matches through dedicated match pages.

### 📊 League Standings

Display league standings and rankings in a structured table.

### 📈 League Statistics

Provide access to league-level statistics.

### 👤 User Authentication

Includes frontend pages for:

* Login
* Registration
* User-related functionality

### ⭐ Custom Scoreboard

Users can access a custom scoreboard experience to personalize the matches they want to follow.

### 🌓 Dark / Light Theme

The application supports light and dark themes, with the selected theme stored locally in the browser.

## 🛠️ Technology Stack

* **React 19**
* JavaScript
* TypeScript
* React Router
* Bootstrap
* CSS
* HTML
* Create React App
* date-fns

These dependencies and application scripts are defined in the project's `package.json`.

## 🧩 Main Application Components

```text
src/
│
├── HomePage.js
├── NewHomePage.tsx
├── LeagueDetail.js
├── LeagueMatches.js
├── LeagueStandingTable.js
├── LeagueStatistics.js
├── MatchesPage.js
│
├── Login.js
├── Register.js
├── UserCustomScoreBoard.js
│
├── NavBar.js
├── Header.js
├── Footer.js
│
└── App.js
```

The application uses React Router to connect the main pages, including the home page, login, match information, custom scoreboard, and registration routes.

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/uddiptagogoi/LiveScoreBoard-app.git
cd LiveScoreBoard-app
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

The application runs locally at:

```text
http://localhost:3000
```

The repository currently uses the standard Create React App scripts for development, testing, and production builds.

## 🧪 Available Commands

```bash
npm start
npm test
npm run build
```

## 📈 Skills Demonstrated

* React development
* Component-based architecture
* Client-side routing
* Responsive UI development
* State management
* Theme management
* User authentication interfaces
* API-driven application design
* Frontend/backend integration

## 🔗 Related Backend

The backend service for this application is maintained separately:

https://github.com/uddiptagogoi/LiveScoreBoard-Service

## 🔗 Project Repository

https://github.com/uddiptagogoi/LiveScoreBoard-app

## 👨‍💻 About

This project demonstrates practical experience building a modern frontend application with React and integrating multiple application features into a single football-focused user experience.
