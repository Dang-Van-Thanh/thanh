document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let playerName = document.getElementById('player-name').value.trim();
    if (playerName !== '') {
        // Lưu tên người chơi vào localStorage hoặc cookie để sử dụng trong trò chơi
        localStorage.setItem('playerName', playerName);
        // Chuyển hướng người dùng đến trang game.html sau khi đăng nhập thành công
        window.location.href = 'snack.html';
    } else {
        alert('Vui lòng nhập tên của bạn để bắt đầu chơi!');
    }
});
document.getElementById('delete-player-name').addEventListener('click', function() {
    localStorage.removeItem('playerName');
    alert('Đã xoá tên người chơi đã lưu.');
});