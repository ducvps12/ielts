# Video Learning Engine

## Goal

Turn an authorized transcript into a structured language lesson without copying the visual identity of another product and without treating arbitrary online video as downloadable source material.

## User flow

1. Learner chooses target language, explanation language and level.
2. Learner supplies one supported source:
   - YouTube URL for an owned/authorized video;
   - uploaded `.vtt` or `.srt` file;
   - pasted transcript;
   - licensed provider source.
3. The source passes validation and provenance checks.
4. The worker normalizes transcript segments.
5. The lesson pipeline produces:
   - key vocabulary and phrases;
   - definitions and contextual translations;
   - comprehension questions;
   - shadowing segments;
   - spaced-review cards;
   - suggested quest and evidence requirements.
6. Learner reviews, edits and starts the lesson.

## Source policy

The platform must not assume that a public YouTube URL grants permission to download captions, audio or video.

Each source stores:

- provider;
- external ID and canonical URL;
- owner/user who submitted it;
- acquisition method;
- authorization or license status;
- transcript language;
- retention policy;
- processing status and failure reason.

`YOUTUBE_URL` is not equivalent to `AUTHORIZED_YOUTUBE_TRANSCRIPT`.

## Pipeline states

```text
DRAFT
→ SOURCE_VALIDATING
→ TRANSCRIPT_REQUIRED | TRANSCRIPT_READY
→ ANALYZING
→ REVIEW_REQUIRED
→ READY
→ ARCHIVED
```

Failures are explicit and retryable. A retry must not duplicate lessons, vocabulary cards or billing usage.

## Lesson modules

- Video context and learning objective
- Interactive transcript
- Vocabulary deck
- Phrase and grammar notes
- Comprehension check
- Shadowing practice
- Recall review
- Completion summary

## Data boundaries

The source transcript is separate from generated learning material. Generated content records model/provider version, prompt/rule version and language pair so output can be reproduced or invalidated.

## Safety and quality

- User-visible AI output is labelled and editable.
- Personal data in pasted transcripts is treated as untrusted input.
- Prompt injection in transcript text must not alter system policy.
- URLs are normalized and checked against SSRF rules.
- Uploads use size/type limits and malware scanning before processing.
- Copyright takedown and source deletion must invalidate derivative private lessons according to policy.

## Initial implementation slice

The first UI is a non-processing preview at `/app/video-lab`. It demonstrates source selection, language settings, quota, pipeline steps, vocabulary cards and lesson modules. No network extraction or production usage charge occurs until the API, worker and source authorization flow are implemented.
