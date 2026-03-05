# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/textbook/spec.md`, `/specs/textbook/plan.md`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan (`book/`, `backend/`, `scripts/`, `.github/workflows/`)
- [ ] T002 Initialize Node.js project (`book/`) with Docusaurus and pnpm dependencies
- [ ] T003 Initialize Python project (`backend/`) with FastAPI, LangChain, and pnpm dependencies
- [ ] T004 [P] Configure linting and formatting tools (e.g., ESLint for Docusaurus, Black/Flake8 for Python)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Setup Qdrant Cloud instance and collection
- [ ] T006 Setup Neon Serverless Postgres instance and schema for users/sessions
- [ ] T007 Implement base FastAPI structure (`backend/main.py`, routing, CORS middleware)
- [ ] T008 Implement Gemini API client for embeddings and generation (`backend/rag/embedder.py`, `backend/rag/generator.py`)
- [ ] T009 Implement basic RAG pipeline structure (`backend/rag/retriever.py`)
- [ ] T010 Implement basic authentication structure using better-auth (`backend/auth/better_auth.py`)
- [ ] T011 Setup Docusaurus basic configuration (`book/docusaurus.config.ts`)
- [ ] T012 [P] Configure GitHub Actions for deployment to GitHub Pages (`.github/workflows/deploy.yml`)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Docusaurus Book Structure (Priority: P1) 🎯 MVP

**Goal**: Set up the Docusaurus project with the correct module and chapter structure.

**Independent Test**: Docusaurus builds successfully with the defined structure and all placeholder pages are accessible.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create Docusaurus project structure (`book/docs/`, `book/src/components/ChatBot/`)
- [ ] T014 [P] [US1] Define module and chapter structure in Docusaurus `docs/` directory (e.g., `module-1-ros2/overview.md`, etc.)
- [ ] T015 [US1] Configure Docusaurus sidebar (`book/sidebars.ts`) to reflect the structure
- [ ] T016 [US1] Create placeholder markdown files for all chapters
- [ ] T017 [US1] Ensure Docusaurus builds successfully (`pnpm build` in `book/`)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - RAG Chatbot Integration (Priority: P1)

**Goal**: Embed a functional RAG chatbot UI into the Docusaurus site.

**Independent Test**: The chatbot UI is visible on all pages, accepts questions, and returns responses.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

### Implementation for User Story 2

- [ ] T018 [P] [US2] Develop basic Chatbot React component (`book/src/components/ChatBot/index.tsx`, `ChatBot.css`)
- [ ] T019 [P] [US2] Integrate Chatbot component into Docusaurus layout (`docusaurus.config.ts` or theme)
- [ ] T020 [US2] Create FastAPI endpoint (`backend/main.py`) for `/chat` that accepts user queries
- [ ] T021 [US2] Implement basic RAG logic: embed query, search Qdrant, call Gemini for response (mocked initially)
- [ ] T022 [US2] Connect frontend Chatbot component to backend `/chat` endpoint
- [ ] T023 [US2] Add loading state and basic error handling for chatbot interactions

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Landing Page and Navigation (Priority: P2)

**Goal**: Create a user-friendly landing page and ensure all navigation works correctly.

**Independent Test**: The landing page displays correctly, and navigation links lead to the respective module overview pages.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

### Implementation for User Story 3

- [ ] T024 [P] [US3] Create Docusaurus landing page (`book/src/pages/index.js` or `docs/index.md`)
- [ ] T025 [P] [US3] Implement navigation links to all modules and chapters in Docusaurus sidebar/header
- [ ] T026 [US3] Populate landing page with textbook overview and roadmap

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Core Content Population (Priority: P2)

**Goal**: Populate the textbook with detailed content for all modules and chapters.

**Independent Test**: Each page renders with substantial placeholder content that follows the Docusaurus markdown format.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

### Implementation for User Story 4

- [ ] T027 [P] [US4] Write introductory content for Module 1 (ROS 2)
- [ ] T028 [P] [US4] Write detailed content for Chapters 1.1, 1.2, 1.3
- [ ] T029 [P] [US4] Write content for Module 2 (Simulation), Chapters 2.1, 2.2, 2.3
- [ ] T030 [P] [US4] Write content for Module 3 (Isaac), Chapters 3.1, 3.2, 3.3
- [ ] T031 [P] [US4] Write content for Module 4 (VLA), Chapters 4.1, 4.2, 4.3
- [ ] T032 [US4] Add code examples and diagrams as specified in the content outline

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: User Story 5 - Bonus Features (Auth, Personalization, Urdu) (Priority: P3)

**Goal**: Implement authentication, content personalization, and Urdu translation features.

**Independent Test**: Each bonus feature can be activated and functions as specified.

### Tests for User Story 5 (OPTIONAL - only if tests requested) ⚠️

### Implementation for User Story 5

- [ ] T033 [P] [US5] Implement user signup and signin flow using better-auth and Neon Postgres
- [ ] T034 [P] [US5] Store user profile data in Neon Postgres
- [ ] T035 [P] [US5] Implement content personalization logic: read profile, call Gemini API with prompt, update chapter content display
- [ ] T036 [P] [US5] Implement Urdu translation logic: call Gemini API with translation prompt, toggle display language
- [ ] T037 [US5] Add UI elements for Auth, Personalization, and Urdu features

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Update `README.md` with project URLs and setup instructions
- [ ] TXXX [P] Write RAG ingestion script (`scripts/ingest_book.py`) to embed book content into Qdrant
- [ ] TXXX [P] Refine Docusaurus theme and styling
- [ ] TXXX Implement robust error handling and logging across backend and frontend
- [ ] TXXX Add unit tests for backend services and frontend components (if requested)
- [ ] TXXX Security hardening (e.g., rate limiting on `/chat` endpoint, protect API keys)
- [ ] TXXX Finalize deployment checklist and ensure all items are complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 (for UI integration) and Foundational (Phase 2) - Can start after US1 UI is integrated.
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - No direct dependencies on other stories.
- **User Story 4 (P2)**: Depends on User Story 1 (book structure) - Content can be written in parallel with other stories but integrated once structure is stable.
- **User Story 5 (P3)**: Depends on Foundational (Phase 2) - Auth depends on Neon DB, Personalization/Urdu depend on Gemini API and content availability.

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1 and 2 (P1) can be worked on in parallel.
- User Stories 3 and 4 (P2) can start once Foundational is done, potentially in parallel with US1/US2 or after they are complete.
- User Story 5 (P3) can start once Foundational is done.
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all models for User Story 1 together:
Task: "Create Docusaurus project structure (book/docs/, book/src/components/ChatBot/)"
Task: "Define module and chapter structure in Docusaurus docs/ directory"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2 (UI integration)
5. **STOP and VALIDATE**: Test User Stories 1 & 2 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
