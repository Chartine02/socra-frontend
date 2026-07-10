# Functionality, Scope Alignment & Algorithms

## Core functionalities implemented

1. **Document Management** — Upload (multipart/form-data with progress tracking), list, view, and delete documents via `documentService.ts`. The upload hook (`useDocumentUpload.ts`) uses React Query mutations with optimistic UI updates and automatic cache invalidation.

2. **Socratic Dialogue Engine** — `studyService.startDialogue()` initiates a session, and `sendSocraticResponse()` drives a back-and-forth AI conversation. Each exchange returns the current Bloom's Taxonomy level, which the session store tracks via `advanceBloomLevel()`. The dialogue continues until the backend signals `isSessionComplete: true`.

3. **Quiz Generation & Scoring** — `studyService.generateQuiz()` requests MCQs from the backend for a given document. Each answer submission (`submitQuizAnswer`) sends the selected index, confidence rating (`guessing | unsure | confident`), and time taken. The backend returns correctness, the correct index, an explanation, and a source excerpt.

4. **Spaced-Repetition Flashcards (SM-2 Algorithm)** — Flashcards are generated per document. When a student rates a card, the SM-2 algorithm (`src/utils/sm2.ts`) calculates:
   - **If rating < 2 (forgot):** Reset `repetitions` to 0, set `nextInterval` to 1 day.
   - **If rating >= 2:** Compute ease factor adjustment: `EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))`, clamped to a minimum of 1.3. Interval grows as `I(n) = I(n-1) * EF'`.
   - Self-ratings map to SM-2 quality scores: `forgot → 1`, `hard → 2`, `good → 3`, `easy → 5`.

5. **Knowledge Gap Visualisation** — The `KnowledgeGapMap` component fetches all topics, categorises them using mastery thresholds (`mastered >= 80%`, `shaky >= 50%`, `forgotten < 50%`), and renders filterable topic cards with mastery percentages. The `GapMapFilters` component supports filtering by mastery state.

6. **Canvas LMS Integration** — Full lifecycle: connect token → fetch courses → fetch modules → sync documents → fetch quiz/assignment results → trigger automated analysis. The `canvasPerformanceService.ts` surfaces grades alongside SOCRA mastery data.

7. **Dashboard Analytics** — Aggregates `totalTopics`, `overallMasteryPercent`, `currentStreak`, and `totalStudySessionsCount` from the analytics API. Quick-action buttons route directly to study modes.

## Algorithms and custom logic

| Algorithm / Logic | Location | Description |
|---|---|---|
| **SM-2 Spaced Repetition** | `src/utils/sm2.ts` | Implements the SuperMemo 2 algorithm for optimal review scheduling based on self-assessed recall quality. |
| **Bloom's Taxonomy Progression** | `src/utils/bloomsHelper.ts` + `src/utils/constants.ts` | Tracks cognitive level across 6 stages (*Remember → Create*). The session store advances the level as the student demonstrates deeper understanding. |
| **Mastery Thresholds** | `src/utils/constants.ts` | Configurable breakpoints (`mastered: 80`, `shaky: 50`, `forgotten: 0`) that classify topic retention state for the knowledge gap map. |
| **JWT Auto-Refresh & Redirect** | `src/services/api.ts` | Axios response interceptor detects 401 errors, clears the auth store, and redirects to `/signin` — except for Canvas token requests (to avoid sign-out during Canvas linking). |
| **React Query Caching Strategy** | `src/main.tsx` | `staleTime: 5 min` and `gcTime: 10 min` minimise redundant API calls while ensuring data freshness. Single retry on failure. |
