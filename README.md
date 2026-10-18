# Primary 4–6 Digital Literacy practice

This folder contains a draft for teacher review. It has three untimed, 100-mark sets for each level. Every set has Section A (20 marks), Section B (35 marks), and Section C (45 marks). The practice questions are written separately from the examination papers. The examination documents and answer keys are **not** included in this folder.

## Review before sharing

1. Open `index.html` on your computer to preview the app.
2. Select each year group and set, then read the questions. Try a few multiple-choice and written answers, including the hint and retry flow. The revealed written answers now use complete sentences. Each Primary 6 set includes an original drawn flowchart in its algorithms section.
3. Use a sample name and class. Finish a set to check the score and report. The report shows only written first answers that the keyword checker could not confidently match; use your judgement to review those answers.
4. Send any content or wording corrections before publishing. Keep this folder private until you approve the nine sets.

## Student workflow

- Students enter a name and class, then choose any set. There is no timer.
- Multiple-choice feedback appears immediately.
- For written parts, the first answer determines the practice mark. A hint and one retry help the student learn; the model answer follows. A blank part earns zero.
- A student may repeat a set. Attempts are separate and can be found again on the same device using the same name and class.
- A different device starts fresh. Browser storage can be lost if the student clears site data or uses private browsing.
- At the end, the student saves the short report as a PDF and submits it in Google Classroom. Results are **not** sent to the teacher automatically. Google Classroom submissions are the teacher's collected record.
- Keyword scores are provisional. The teacher can review flagged answers and adjust marks in their own record if a different wording is valid.

## GitHub Pages, after teacher approval

1. Create a repository on GitHub. Upload only `index.html`, `styles.css`, `diagrams.css`, `bank.js`, and `app.js` to the repository's top level. Never upload the actual exam files or answer keys.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select the main branch and the root folder (`/`). Save.
3. When GitHub shows the Pages address, open it and test one question and the report on both a computer and phone.
4. Post that Pages link in Google Classroom. Create an assignment where students attach their PDF reports.

GitHub Pages serves the app files, but it does not collect attempts. Student names, answers, and scores remain in that browser until the student submits a report through Google Classroom. Anyone who knows the public link can view the practice questions and marking rules.

## Set 4: Application Booster

P4, P5 and P6 now each have an additional 100-mark application-focused paper. Sets 1–3 and their generator are unchanged. New questions are defined in `set4-data.js` and adapted for the existing quiz interface in `set4-bank.js`. Run `node test-set4.js` to verify all four sets at each level.

**Important:** Set 4 written responses receive only provisional keyword-based marks. Teacher checking is necessary, especially for reasoning, calculations and valid alternative wording. No confidential exam questions or marking schemes are added.

### Set 4 verification (2026-10-18)

- `node test-set4.js`: all 12 papers (P4/P5/P6 x Sets 1–4) passed question/mark structural checks.
- Headless Chromium smoke tests: Set 4 selection, MCQ feedback, written-response check, model reveal, save/resume passed for all levels.
- Full headless Chromium runs: completed all 44 questions, finished and opened student report for P4, P5 and P6.
- Set 4 written marks are **provisional** because the keyword checker does not grade reasoning or valid paraphrases reliably. Teachers should review these reports before interpreting total marks. These tests do not constitute a subject-matter moderation of every answer or verified final TOS alignment.
