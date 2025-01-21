// OpenCV.js wrapper with Promise-based initialization
let openCVPromise = null;

export function initOpenCV() {
    if (openCVPromise) {
        return openCVPromise;
    }

    openCVPromise = new Promise((resolve, reject) => {
        // Create a global Module object that OpenCV.js expects
        window.Module = {
            onRuntimeInitialized: function() {
                console.log('OpenCV.js runtime initialized');
                resolve(window.cv);
            },
            print: function(text) {
                console.log('OpenCV.js:', text);
            },
            printErr: function(text) {
                console.error('OpenCV.js error:', text);
                reject(new Error(text));
            }
        };

        // Load OpenCV.js script
        const script = document.createElement('script');
        script.src = '/stereoplayer/src/lib/opencv.js';
        script.async = true;
        script.onerror = () => {
            reject(new Error('Failed to load OpenCV.js'));
        };
        document.body.appendChild(script);
    });

    return openCVPromise;
}

// Export the cv object getter
export function getCV() {
    if (!openCVPromise) {
        throw new Error('OpenCV.js not initialized. Call initOpenCV() first.');
    }
    return openCVPromise;
}