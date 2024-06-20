document.addEventListener('DOMContentLoaded', function() {
    // Lấy tên người chơi từ localStorage
    let playerName = localStorage.getItem('playerName');

    // Hiển thị tên người chơi nếu đã lưu
    if (playerName) {
        let playerNameDisplay = document.getElementById('player-name-display');
        playerNameDisplay.textContent = `PLAYER: ${playerName}`;
    }
});
