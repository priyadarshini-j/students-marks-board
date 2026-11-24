# Student Marks Board

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.14-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?logo=tailwindcss&logoColor=white)

## Project Description

Student Marks Board is a responsive academic management application for a Class 10 student cohort. It allows users to view student records, add and edit records, delete entries, calculate totals and percentages, determine pass/fail status, identify toppers, sort records by total marks, and print individual report cards.

The application is built with React and TypeScript, uses Redux Toolkit for shared state and async API operations, and consumes a REST-style JSON server backed by `db.json`.

## Live Application Link

No live application URL is currently documented or included in the repository.

## Key Features

- Dashboard statistics for total students, passed students, failed students, and class average
- Student marks table sorted by total marks
- Topper highlighting with a trophy indicator
- Individual subject marks below 35 highlighted in red
- Add-student form with live total and percentage calculations
- Edit and update existing student records
- Delete student records
- Automatic total, percentage, and pass/fail calculation
- Student report card with subject-wise marks and failed-subject details
- Browser print support for report cards
- Loading, empty, success, and error states
- Responsive Tailwind CSS layout
- 404 page for unknown routes

## Technologies Used

| Category | Technology |
| --- | --- |
| Frontend framework | React 19 |
| Programming language | TypeScript 6 |
| Build tool | Vite 8 |
| State management | Redux Toolkit 2 |
| React integration | React Redux |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| HTTP/API | Browser `fetch` API |
| Local REST data | JSON Server through `db.json` |
| Code quality | ESLint 10 and TypeScript ESLint |
| Package management | npm |
| Version control | Git and GitHub |

The repository does not currently contain Vercel, Render, Netlify, Docker, or backend deployment configuration.

## Project Folder Structure

```text
students-marks-board/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── features/
│   │   ├── component/
│   │   │   ├── addStudentForm/
│   │   │   │   ├── AddStudentData/
│   │   │   │   │   └── addStudentData.ts
│   │   │   │   └── AddStudentForm.tsx
│   │   │   ├── header/
│   │   │   │   └── Header.tsx
│   │   │   ├── stateCards/
│   │   │   │   └── StateCards.tsx
│   │   │   ├── studentTable/
│   │   │   │   ├── DeleteStudentData/
│   │   │   │   │   └── deleteStudentData.ts
│   │   │   │   ├── GetStudentdata/
│   │   │   │   │   └── getStudentData.ts
│   │   │   │   ├── UpdateStudentData/
│   │   │   │   │   └── editStudentData.ts
│   │   │   │   └── StudentTable.tsx
│   │   │   └── StudentMarksBoard.tsx
│   │   ├── pages/
│   │   │   ├── addStudent/
│   │   │   │   └── AddStudent.tsx
│   │   │   ├── editStudent/
│   │   │   │   └── EditStudent.tsx
│   │   │   ├── Home/
│   │   │   │   └── Home.tsx
│   │   │   ├── NotFound/
│   │   │   │   └── NotFound.tsx
│   │   │   └── StudentReport/
│   │   │       └── StudentReport.tsx
│   │   └── students/
│   │       ├── studentsSlice.ts
│   │       └── types.ts
│   ├── hooks/
│   │   ├── redux.ts
│   │   └── useFetch.ts
│   ├── store/
│   │   └── Store.ts
│   ├── App.tsx
│   ├── api.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── db.json
├── eslint.config.ts
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Important Files and Folders

- `src/App.tsx` — Defines application routes and loads students when the app starts.
- `src/main.tsx` — Mounts React with Redux and `BrowserRouter`.
- `src/store/Store.ts` — Configures the Redux store.
- `src/features/students/studentsSlice.ts` — Contains async thunks, reducers, and selectors.
- `src/features/students/types.ts` — Defines `Student` and `StudentInput` interfaces.
- `src/features/pages/` — Contains Home, add, edit, report, and 404 pages.
- `src/features/component/` — Contains reusable header, form, statistics, and table components.
- `src/hooks/redux.ts` — Provides typed Redux hooks.
- `src/hooks/useFetch.ts` — Provides a reusable fetch hook; it is not the main student data-loading path.
- `src/api.ts` — Exposes the configured API collection URL.
- `db.json` — Stores the local JSON server student collection.

## Installation and Setup

### Prerequisites

- Node.js 20 or later
- npm
- A JSON Server process using `db.json`

### 1. Clone the Repository

```bash
git clone https://github.com/priyadarshini-j/students-marks-board.git
cd students-marks-board
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure the Environment

Copy the example environment file:

```bash
cp .env.example .env
```

On Windows Command Prompt:

```cmd
copy .env.example .env
```

Set the collection URL in `.env`:

```env
VITE_API_URL=http://localhost:3001/students
```

Use a deployed student collection URL in hosted environments instead of `localhost`.

### 4. Start JSON Server

JSON Server is not declared in `package.json`, but `db.json` is provided for local REST data. Start it through npx:

```bash
npx json-server db.json --port 3001
```

Keep this process running during local frontend development.

## How to Run the Project

### Start the Frontend

```bash
npm run dev
```

The Vite development server is normally available at `http://localhost:5173`.

### Create a Production Build

```bash
npm run build
```

This runs `tsc --noEmit` and then builds the Vite application into `dist/`.

### Preview the Production Build

```bash
npm run preview
```

### Run Lint Checks

```bash
npm run lint
```

## Environment Variables

| Variable | Purpose | Example |
| --- | --- | --- |
| `VITE_API_URL` | Base URL of the JSON Server student collection | `http://localhost:3001/students` |

Example `.env.example`:

```env
VITE_API_URL=
```

The value is read from `import.meta.env.VITE_API_URL` in `src/api.ts`. Local API URLs are suitable only for local development. For a hosted deployment, configure `VITE_API_URL` in the frontend hosting platform and rebuild the application.

Do not commit `.env`. It is excluded through `.gitignore`.

## API Documentation

The application uses the collection URL exported by `src/api.ts`. The implemented student operations are:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `${VITE_API_URL}` | Fetch all student records |
| `POST` | `${VITE_API_URL}` | Add a student record |
| `PUT` | `${VITE_API_URL}/:id` | Replace and update a student record |
| `DELETE` | `${VITE_API_URL}/:id` | Delete a student record |

For the default local value, these resolve to:

| Method | Local endpoint |
| --- | --- |
| `GET` | `http://localhost:3001/students` |
| `POST` | `http://localhost:3001/students` |
| `PUT` | `http://localhost:3001/students/:id` |
| `DELETE` | `http://localhost:3001/students/:id` |

### Student Request Payload

```json
{
  "name": "Student Name",
  "tamil": 80,
  "english": 75,
  "maths": 90,
  "science": 85,
  "social": 78
}
```

The Redux thunks append `total`, `percentage`, and `result` before POST and PUT requests:

```json
{
  "name": "Student Name",
  "tamil": 80,
  "english": 75,
  "maths": 90,
  "science": 85,
  "social": 78,
  "total": 408,
  "percentage": 81.6,
  "result": "Pass"
}
```

`id` is generated by JSON Server for new records and is used for update, delete, and report routes.

## Application Screenshots

Application screenshot files are not currently included in the repository.

### Dashboard - Desktop

![Dashboard - Desktop Placeholder](screenshots/dashboard-desktop.png)

### Dashboard - Mobile

![Dashboard - Mobile Placeholder](screenshots/dashboard-mobile.png)

### Student Report Card

![Student Report Card Placeholder](screenshots/student-report-card.png)

## Project Development Journey

### Phase 1 - Static UI Development

The project began with a React JSX interface for the student board, including the header, statistics cards, student form, marks table, and report layout. The static foundation used hardcoded presentation data before records were loaded through state and APIs.

### Phase 2 - State Management and Events

React state and event handlers introduced interactive student creation, live calculations, sorting, record selection, and dynamic table values. This phase established the interaction model for adding students and updating the dashboard.

### Phase 3 - JSON Server API Integration

JSON Server integration enabled persistent student management through `db.json` using REST-style `GET`, `POST`, `PUT`, and `DELETE` operations. Loading and error states were added to handle asynchronous API outcomes.

### Phase 4 - React Router

React Router connects the Home, Add Student, Edit Student, dynamic student report, and 404 pages. Student report URLs use dynamic IDs, and report cards support browser print output.

### Phase 5 - Context API and Custom Hooks

The current verified implementation does not contain `StudentsContext`, `useStudents()`, or `useStats()`. It uses Redux Toolkit for shared state and includes custom typed Redux hooks plus a general `useFetch()` hook, although the main Redux flows use `fetch` directly.

### Phase 6 - Form Validation and Tailwind CSS

The add/edit form validates required names, accepted name characters, required subjects, and whole-number marks from 0 through 100. Tailwind CSS provides the responsive interface and the form displays live totals and percentages.

### Phase 7 - Redux Toolkit

Redux Toolkit now manages student state through `configureStore`, `createSlice`, `createAsyncThunk`, `extraReducers`, typed dispatch/selector hooks, and memoized selectors. Async loading and error states are tracked centrally.

### Phase 8 - TypeScript Conversion

The application is implemented in TypeScript with strict compiler settings. Interfaces and types cover student inputs, complete student records, component props, Redux state, update payloads, and selector return values.

## Learning Outcomes

- Building reusable React components and routed pages
- Designing strict TypeScript types and interfaces
- Managing shared application state with Redux Toolkit
- Implementing async thunks and extra reducers
- Connecting frontend features to REST-style API operations
- Calculating totals, percentages, and academic results
- Validating form data and presenting accessible error messages
- Applying responsive UI styling with Tailwind CSS
- Managing loading, empty, success, and failure UI states
- Generating and printing individual report cards

## Future Improvements

- Add authentication and role-based access
- Replace JSON Server with a deployed database-backed API
- Add server-side or client-side pagination and search
- Add confirmation dialogs before deletion
- Add CSV or PDF export
- Add subject-wise charts and academic performance analytics
- Add automated unit, integration, and end-to-end tests
- Add academic year and class filters
- Add persistent API and network retry handling
- Move legacy standalone API helper modules into a consolidated service layer

## Author

**Priyadharshini J**

- GitHub: [@priyadarshini-j](https://github.com/priyadarshini-j)
- Repository: [students-marks-board](https://github.com/priyadarshini-j/students-marks-board)

## License

No license file is currently included in this repository. Reuse, distribution, and modification rights are therefore not explicitly granted by a software license.

## Deployment Information

No live frontend URL, backend URL, Vercel configuration, Render configuration, or deployment workflow is present in the verified project files.

- **Frontend build command:** `npm run build`
- **Frontend output directory:** `dist/`
- **Environment variable:** `VITE_API_URL`
- **Router:** React Router uses `BrowserRouter`
- **Client-side route fallback:** A deployment platform should route unknown application paths such as `/student/:id`, `/add`, and `/edit/:id` back to `index.html`
- **Backend:** JSON Server must be hosted separately if the deployed frontend uses a remote API
- **Render/Vercel:** No project configuration or live URL is available, and no Render-specific free-tier information is documented in this repository
