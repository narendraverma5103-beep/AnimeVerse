/* Clear Watch History Function */
function clearWatchHistory() {
    const historyWrapper = document.getElementById('historyContentWrapper');
    const emptyState = document.getElementById('emptyHistoryState');
    const clearBtn = document.getElementById('clearHistoryBtn');

    // 2-row history wrapper ko hide kar do
    if (historyWrapper) {
        historyWrapper.style.display = 'none';
    }

    // "No Watch History" aur video state ko show kar do
    if (emptyState) {
        emptyState.style.display = 'block';
    }

    // Clear button ko bhi hide kar sakte hain agar history clean ho chuki hai
    if (clearBtn) {
        clearBtn.style.display = 'none';
    }
}