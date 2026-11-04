document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('heroSourceVideo');
    const charCanvas = document.getElementById('heroCharacterCanvas');
    
    if (video && charCanvas) {
        const charCtx = charCanvas.getContext('2d', { willReadFrequently: true });

        video.addEventListener('loadedmetadata', () => {
            charCanvas.width = video.videoWidth;
            charCanvas.height = video.videoHeight;
        });

        function renderHeroChromaKey() {
            if (!video.paused && !video.ended && video.readyState >= 2) {
                charCtx.drawImage(video, 0, 0, charCanvas.width, charCanvas.height);

                let frame = charCtx.getImageData(0, 0, charCanvas.width, charCanvas.height);
                let data = frame.data;
                let len = data.length;

                for (let i = 0; i < len; i += 4) {
                    let r = data[i];
                    let g = data[i + 1];
                    let b = data[i + 2];

                    // Green Screen Removal Algorithm
                    if (g > 65 && g > r * 1.25 && g > b * 1.2) {
                        data[i + 3] = 0; // Transparent
                    }
                }
                charCtx.putImageData(frame, 0, 0);
            }
            requestAnimationFrame(renderHeroChromaKey);
        }

        video.play().catch(err => {
            console.log("Autoplay prevented:", err);
        });

        renderHeroChromaKey();
    }
});