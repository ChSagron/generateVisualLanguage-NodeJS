# Visual Language Generator

This project is a web application built with Node.js and Express that generates a visual language for designers who start branding. based on user input. It utilizes the OpenAI API to generate suggestions for visual elements.

## Features

- Input form for business details and preferences.
- Generates visual language suggestions including line, shape, color, texture, typography, and photography.
- Displays generated suggestions in a user-friendly format.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- OpenAI API Key


## Usage

1. Fill out the form with the following details:
   - **About**: What does the business do and how?
   - **Audience**: Detailed target audience description (e.g., gender, age, socio-economic status, style, etc.)
   - **Values**: Core brand values.
   - **Rival**: Key elements of competitors' visual language to avoid.
   - **Preferences**: Personal preferences.

2. Click "Submit" to generate visual language suggestions.

3. The application will display the generated suggestions for various visual elements in both Hebrew and English.

## Code Overview

- `app.js`: Main application file.
- `views/index.ejs`: EJS template for rendering the form and displaying results.