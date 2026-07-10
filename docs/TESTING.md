# Testing Results & Strategies

## Testing strategies employed

| Strategy | Scope | Description |
|---|---|---|
| **Manual Functional Testing** | All features | Every user-facing flow (document upload, Socratic dialogue, quiz, flashcards, knowledge gap map, Canvas sync, settings) was tested manually across Chrome, Firefox, and Safari to confirm correct behaviour. |
| **Cross-Browser & Responsive Testing** | UI / Layout | Verified on Chrome (desktop), Safari (macOS / iOS), and Firefox. Responsive breakpoints (`sm`, `md`, `lg`) were tested using DevTools device emulation (iPhone SE, iPad, 1440 px desktop). |
| **Input Validation & Edge Cases** | Forms / uploads | Tested sign-up/sign-in forms with empty fields, invalid emails, weak passwords, and mismatched confirm passwords. Document upload tested with oversized files, unsupported formats, and zero-byte files. Quiz confidence rating tested with rapid double-clicks. |
| **API Error Handling** | Network layer | Simulated 401 (expired JWT), 404, and 500 responses using browser DevTools network throttling and mock server errors. Verified that: expired tokens trigger automatic redirect to `/signin`; failed uploads show user-friendly error messages; quiz/flashcard generation gracefully handles backend timeouts. |
| **State Persistence Testing** | Auth / session | Confirmed that Zustand-persisted auth state (`localStorage`) survives page refreshes and new tabs. Verified that signing out clears tokens and redirects. Tested session store reset after completing a study session. |
| **Performance & Loading States** | Dashboard / lists | Verified skeleton loaders and `<Spinner />` components render during data fetch. Tested React Query caching (`staleTime: 5 min`, `gcTime: 10 min`) by navigating between pages and confirming cached data is reused without redundant API calls. |

## Key test results

| Test case | Input / Scenario | Expected outcome | Result |
|---|---|---|---|
| Upload valid PDF | 2 MB lecture-notes PDF | Document appears in library; topics extracted | Pass |
| Upload unsupported file | `.exe` file | Rejection with error toast | Pass |
| Socratic dialogue progression | Answer 5 consecutive questions correctly | Bloom level advances from *Remember* → *Understand* → *Apply* | Pass |
| Quiz with 0/10 correct | Select all wrong answers deliberately | Score shows 0 %; post-session summary reflects poor performance | Pass |
| Flashcard SM-2 scheduling | Rate card as "forgot" | `nextInterval` resets to 1 day; `repetitions` resets to 0 | Pass |
| Knowledge gap filter | Filter by "shaky" | Only topics with mastery 50–79 % displayed | Pass |
| Canvas sync with valid token | Connect real Canvas access token | Courses and modules fetched; documents synced | Pass |
| Expired JWT | Wait for token expiry / manually clear | App redirects to sign-in; no white screen | Pass |
| Mobile responsive layout | iPhone SE (375 px) | Bottom navigation shows; sidebar hidden; cards stack vertically | Pass |
| Offline / slow network | Throttle to "Slow 3G" in DevTools | Loading spinners shown; no unhandled promise rejections in console | Pass |
