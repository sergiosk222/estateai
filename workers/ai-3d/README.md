# EstateAI AI 3D Worker

This worker will eventually process uploaded property photos/videos and generate a 3D scene.

## Final worker responsibilities

1. Download uploaded files from storage.
2. Extract frames from video.
3. Filter bad frames.
4. Estimate camera poses.
5. Run 3D reconstruction.
6. Export result.
7. Optimize for browser.
8. Upload final viewer/model.
9. Update job status.

## First local prototype

For now, the local prototype does only this:

1. Create capture folder.
2. Put a video into `captures/<job-id>/raw`.
3. Extract frames with ffmpeg.
4. Prepare frames for future reconstruction.

## Later reconstruction engines

Possible engines:

- Nerfstudio / Gaussian Splatting
- COLMAP + OpenMVS
- Meshroom
- External AI 3D generation API
- Custom cloud GPU worker

## Important

This worker should not run inside Vercel serverless.

Heavy reconstruction needs:

- GPU
- long-running process
- queue system
- storage
- job status updates
