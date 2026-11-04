/* ==========================================
   CLEAR HISTORY & CHROMA KEY JAVASCRIPT
   ========================================== */
   function clearWatchHistory() {
    const historyWrapper = document.getElementById('historyContentWrapper');
    const emptyState = document.getElementById('emptyHistoryState');
    const clearBtn = document.getElementById('clearHistoryBtn');

    // 1. Watch history ki dono rows ko hide kar do
    if (historyWrapper) {
        historyWrapper.style.display = 'none';
    }

    // 2. "No Watch History" state aur video container ko show karo
    if (emptyState) {
        emptyState.style.display = 'block';
        initHistoryChromaKey(); // Green screen removal function call hoga
    }

    // 3. Clear History button ko hide kar do
    if (clearBtn) {
        clearBtn.style.display = 'none';
    }
}

/* Green Screen (Chroma Key) Removal Logic for Watch History Empty State */
function initHistoryChromaKey() {
    const video = document.getElementById('historySourceVideo');
    const canvas = document.getElementById('historyEmptyCanvas');
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    video.play().then(() => {
        canvas.width = video.videoWidth || 400;
        canvas.height = video.videoHeight || 400;

        function processFrame() {
            if (video.paused || video.ended) return;
            
            // Video frame ko canvas par draw karo
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let data = frame.data;

            // Green pixels ko transparent (alpha = 0) banane ka loop
            for (let i = 0; i < data.length; i += 4) {
                let red = data[i];
                let green = data[i + 1];
                let blue = data[i + 2];

                // Green screen threshold filter
                if (green > 85 && red < 110 && blue < 110) {
                    data[i + 3] = 0; // Transparent
                }
            }
            ctx.putImageData(frame, 0, 0);
            requestAnimationFrame(processFrame);
        }
        processFrame();
    }).catch(err => {
        console.log("History video autoplay error:", err);
    });
}