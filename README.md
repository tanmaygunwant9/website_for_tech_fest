<div align="center">

# ✨ NIRVANA — Tech Fest Website

### Discover. Participate. Celebrate Innovation.

A responsive, multi-page website concept for a technology fest — featuring event information, participant registration UI, an event gallery, contact form, profile setup, and an organizer-style dashboard.

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

</div>

---

## 📖 About the Project

**Nirvana** is a front-end website concept designed to bring the key parts of a technology-fest experience together in one place. Visitors can explore the fest, browse event categories, view photo highlights, and use forms to express interest or get in touch. The project also includes a profile setup flow and a dashboard-style page for displaying event statistics and past-event information.

The website is built with vanilla HTML, CSS, and JavaScript, making it straightforward to understand, customize, and run without a build system.

## ✨ Features

| Section | What it offers |
|---|---|
| 🏠 **Home** | Landing page, navigation, search UI, theme toggle, notifications, and animated sections |
| ℹ️ **About** | Project information and expandable content |
| 🎯 **Events** | Event cards for Hackathon, Tech Fest, Coding Competition, Innovation Expo, and Game Jam |
| 📝 **Event Registration** | Participant form with required-field and email validation |
| 🖼️ **Gallery** | Event images displayed as interactive cards with a detail modal |
| ✉️ **Contact** | Contact form with client-side success feedback |
| 👤 **Profile Setup** | Profile form with field validation and browser-based profile storage |
| 📊 **Dashboard** | Past-event summary, sample statistics, event table, profile panel, and Chart.js visualization |

### Additional UI interactions

- Responsive navigation menu
- Light/dark theme preference saved in `localStorage`
- Notification dropdown
- Smooth scrolling and section animations
- Interactive gallery modal
- Profile details loaded from browser storage

## 🧰 Tech Stack

- **HTML5** — page structure and content
- **CSS3** — layouts, styling, responsive behavior, and visual effects
- **JavaScript (Vanilla)** — DOM manipulation, form validation, and interactions
- **Chart.js** — dashboard chart visualization
- **Font Awesome** — interface icons
- **Google Fonts** — typography

## 📂 Project Structure

```text
website_for_tech_fest/
│
├── index.html              # Main landing page
├── script.js               # Home page interactions
├── style.css               # Main website styles
│
├── about.html              # About page
├── about.css
├── about.js
│
├── services.html           # Events and participation form
├── services.css
├── services.js
│
├── portfolio.html          # Event gallery
├── portfolio.css
├── portfolio.js
│
├── contact.html            # Contact page
├── contact.css
├── contact.js
│
├── getstarted.html         # Profile creation page
├── getstarted.css
├── getstarted.js
│
├── signup.html             # Additional signup page
├── signup.css
├── signup.js
│
├── dashboard.html          # Event dashboard
├── dashboard.css
├── dashboard.js
│
├── 1.jpg
├── 1.webp
├── 2.jpg
└── 3.jpg                   # Gallery image assets
```

## 🚀 Run Locally

This is a static front-end project. No backend server, package installation, or compilation step is required to preview the pages.

### Option 1: Open directly

1. Download or clone this repository.
2. Extract the project folder if downloaded as a ZIP.
3. Open the folder.
4. Double-click `index.html` to launch the website in your browser.

### Option 2: Use Visual Studio Code Live Server

1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The site will open in your default browser. Live Server is recommended while editing because it refreshes the page when files change.

## 🧭 Pages

- `index.html` — main landing page
- `about.html` — about information
- `services.html` — event listings and participation form
- `portfolio.html` — event gallery and image details
- `contact.html` — contact form
- `getstarted.html` — profile creation flow
- `dashboard.html` — event statistics and past-event overview

## 💾 Browser Storage & Form Behavior

This version uses browser-side JavaScript rather than a backend service.

- Profile information is stored in the browser's `localStorage` under the `profile` key.
- The profile creation date is stored under `profileJoined`.
- The selected color theme is stored under `theme`.
- Event registration and contact forms currently perform client-side validation and show success feedback. They do **not** submit data to a server or send emails.
- Dashboard metrics and past-event rows are sample/demo content.

Data stored in `localStorage` belongs to the current browser and device. Clearing browser site data will remove it.

## 🌐 External Resources

The pages load some resources from external CDNs/services:

- Google Fonts
- Font Awesome (CDN)
- Chart.js (jsDelivr CDN)
- Random User images on the About page

An internet connection may be required for these external assets to load correctly.

## 🔧 Customization

You can adapt the project to your own fest or organization:

1. Update event names and descriptions in `services.html`.
2. Replace the gallery images (`1.jpg`, `1.webp`, `2.jpg`, `3.jpg`) with your own event photographs.
3. Edit the theme, typography, and layout in the corresponding CSS files.
4. Update dashboard figures and sample event rows in `dashboard.html`.
5. Change the website name, logo text, and footer content to match your event.

## 🛣️ Future Enhancements

Ideas to evolve this front-end concept into a complete event-management platform:

- Connect registration and contact forms to a backend API.
- Add secure authentication and role-based organizer access.
- Store participants, events, and registrations in a database.
- Build an organizer panel to create, edit, and manage events.
- Add registration confirmation emails and unique participant IDs.
- Show live event capacity and registration status.
- Replace sample dashboard figures with real event data.
- Add image upload and gallery management.
- Improve accessibility and add automated UI tests.

## ⚠️ Project Scope

This repository currently represents a **front-end prototype**. It does not include a backend, database, real-time registration processing, or production authentication. The profile form stores data locally in the browser, while event and contact forms only display client-side feedback. The dashboard uses sample values.

Before using this for a live event, connect the forms and dashboard to a secure backend and implement appropriate validation, authorization, and data handling.

## 🤝 Contributing

Suggestions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add: your feature"`.
4. Push your branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

## 📄 License

No license is currently included. 

---

<div align="center">

**Made with 💙 using HTML, CSS & JavaScript**

If you like this project, consider giving it a ⭐ on GitHub.

</div>
