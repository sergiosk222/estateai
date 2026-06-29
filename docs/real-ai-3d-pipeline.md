# EstateAI — Real AI 3D Generation Pipeline

## Final product goal

EstateAI is an AI platform where a real estate agent uploads property photos or a walkthrough video, and the system automatically creates a browser-ready 3D property experience.

The final flow:

1. User uploads photos or video.
2. System creates a processing job.
3. Video is converted into image frames.
4. Bad frames are filtered.
5. Camera movement is estimated.
6. AI/3D reconstruction creates a 3D scene.
7. Scene is optimized for browser viewing.
8. User receives a shareable 3D property page.

---

## Important distinction

EstateAI is NOT just a manual 3D page service.

Correct positioning:

> Upload photos/video → AI generates 3D → user receives a 3D listing page.

Wrong positioning:

> Send us your property and we manually prepare a page.

---

## Best technical direction for real estate

For full rooms, apartments, villas and offices, the best first technical direction is:

> walkthrough video / multi-photo capture → 3D Gaussian Splatting → browser viewer

Why:

- Real estate is a full spatial scene, not a single object.
- Single image-to-3D APIs are usually better for isolated objects.
- Gaussian Splatting is more suitable for photorealistic scene reconstruction.
- The result can be viewed in the browser with a splat viewer.

---

## Possible generation engines

### Option A — Gaussian Splatting pipeline

Input:

- walkthrough video
- or 50–300 photos from different angles

Processing:

- extract frames
- estimate camera poses
- train/reconstruct Gaussian Splat
- export .ply / .splat / compressed viewer format

Output:

- browser-viewable 3D scene

Pros:

- best for real rooms and interiors
- realistic result
- good for real estate presentation

Cons:

- needs GPU
- not suitable for Vercel serverless
- requires worker machine / cloud GPU

---

### Option B — AI image-to-3D API

Input:

- one or more images

Processing:

- external AI API generates 3D object model

Output:

- GLB / OBJ / FBX model

Pros:

- easier API integration
- faster to prototype
- good for objects

Cons:

- not ideal for full apartments
- may hallucinate geometry
- less reliable for real estate interiors

---

### Option C — Photogrammetry mesh pipeline

Input:

- many photos

Processing:

- Structure-from-Motion
- dense reconstruction
- mesh generation
- texture generation

Output:

- mesh model, often OBJ/GLB

Pros:

- more geometric
- can export mesh

Cons:

- slower
- harder to automate
- can fail indoors with plain walls / reflective surfaces

---

## Recommended EstateAI path

### Phase 1 — Upload + job system

Build real upload and job status:

- user uploads video/photos
- files go to storage
- database creates job
- job status: uploaded, extracting_frames, reconstructing, optimizing, completed, failed

### Phase 2 — Local processing prototype

Run local pipeline manually:

- upload or place video into input folder
- extract frames with ffmpeg
- inspect frame quality
- prepare data for reconstruction

### Phase 3 — Cloud GPU worker

Move processing to a GPU machine:

- worker downloads files
- extracts frames
- runs reconstruction
- uploads result
- updates job status

### Phase 4 — Browser viewer

Add viewer for generated output:

- GLB viewer for mesh models
- Gaussian Splat viewer for splat models

### Phase 5 — Automation

Connect everything:

- user upload
- processing queue
- worker
- result viewer
- shareable page

---

## Why Vercel alone is not enough

Vercel is good for:

- frontend
- API routes
- forms
- dashboard
- displaying final models

Vercel is not enough for:

- heavy video processing
- AI reconstruction
- GPU training
- long-running 3D generation jobs

AI 3D generation needs a separate worker machine or cloud GPU service.

---

## First real technical milestone

The first real milestone is not perfect 3D.

The first milestone is:

> Upload a walkthrough video → extract frames → create a processing job → show processing status → prepare the data for reconstruction.

After that, we connect the actual reconstruction engine.
