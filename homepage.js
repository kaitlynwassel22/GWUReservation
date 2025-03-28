document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/rooms')
        .then(response => response.json())
        .then(data => {
            const roomsDiv = document.getElementById('rooms');
            data.forEach(room => {
                const roomDiv = document.createElement('div');
                roomDiv.className = 'room';
                roomDiv.innerHTML = `
                    <h2>${room.name}</h2>
                    <p>Capacity: ${room.capacity}</p>
                    <p>Status: ${room.isAvailable ? 'Available' : 'Reserved'}</p>
                    ${room.isAvailable ? `<button onclick="reserveRoom(${room.id})">Reserve</button>` : ''}
                `;
                roomsDiv.appendChild(roomDiv);
            });
        });
});

function reserveRoom(roomId) {
    fetch(`/api/reserve/${roomId}`, { method: 'POST' })
        .then(response => {
            if (response.ok) {
                alert('Room reserved successfully!');
                location.reload();
            } else {
                alert('Failed to reserve the room.');
            }
        });
}