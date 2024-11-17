# Time Tracker
This is a Vue 3 + Vite-based time tracking application created for a coding test. The app aims to provide a simplified yet fully functional time tracker similar to tools like Clockify or Jira, but on a smaller scale. While the app demonstrates core features found in such tools, there's always room for further refinement. The app does not rely on a backend, instead backend functionality is mocked by storing data in local storage. It also containes a basic E2E test to validate the time entry addition and deletion functionality.

![time_tracker_app_img](https://github.com/user-attachments/assets/9fd66884-35e8-49ee-853d-6942331101f3)

## Installation:
```javascript
npm i
```

## Run:
```javascript
npm run dev
```

## Run Cypress Tests:
```javascript
npm run dev
npm run cypress:run
```

## Features:
- Add time entries with details such as date, task name, start and end time, project, and customer
- Modify existing time entries
- Delete time entries
- Daily, weekly, and monthly views
- Tag-based (and "cached") filtering for time entries
- Simple E2E test case using Cypress to verify time entry creation and deletion

## Technologies / Libraries used:
- Vue 3, Vite, TypeScript
- Tailwind CSS for styling
- PrimeVue for select components
- VCalendar for date and time pickers
- Toastify for toast notifications
- Cypress for end-to-end testing
