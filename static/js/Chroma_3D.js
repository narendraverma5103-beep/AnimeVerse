document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('sourceVideo');
    const canvas = document.getElementById('outputCanvas');
    
    if (video && canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        function processFrame() {
            if (video.paused || video.ended) {
                return;
            }

            // वीडियो फ्रेम को कैनवस पर ड्रा करें
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = frame.data;
            const length = data.length;

            // पिक्सेल-दर-पिक्सेल ग्रीन स्क्रीन रिमूवल (क्रॉमा की)
            for (let i = 0; i < length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // ग्रीन कलर डिटेक्ट करने के लिए थ्रेशोल्ड
                if (g > 80 && g > r * 1.2 && g > b * 1.2) {
                    // बैकग्राउंड को पूरी तरह ट्रांसपेरेंट करने के लिए अल्फा चैनल 0 करें
                    data[i + 3] = 0;
                }
            }

            ctx.putImageData(frame, 0, 0);
            
            // स्मूथ एनिमेशन बनाए रखने के लिए requestAnimationFrame
            requestAnimationFrame(processFrame);
        }

        // वीडियो मेटाडेटा लोड होने पर कैनवस का ओरिजिनल रेजोल्यूशन सेट करें
        video.addEventListener('loadeddata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    requestAnimationFrame(processFrame);
                }).catch(error => {
                    console.log("Auto-play prevented:", error);
                });
            }
        });

        // बैकअप इवेंट लिसनर
        video.addEventListener('play', () => {
            requestAnimationFrame(processFrame);
        });

        // यदि वीडियो पहले से ही लोड हो चुका हो
        if (video.readyState >= 2) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.play().then(() => {
                requestAnimationFrame(processFrame);
            }).catch(e => console.log(e));
        }
    }
});