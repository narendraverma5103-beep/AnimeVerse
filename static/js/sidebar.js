function toggleSidebar() {
    document.getElementById('sidebarMenu')?.classList.add('active');
    document.getElementById('sidebarOverlay')?.classList.add('active');
}

function closeSidebar() {
    document.getElementById('sidebarMenu')?.classList.remove('active');
    document.getElementById('sidebarOverlay')?.classList.remove('active');
}