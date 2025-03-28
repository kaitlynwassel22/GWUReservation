const rooms = ['Room 101', 'Room 102', 'Room 103'];
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM','11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM','2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM','4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM','6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM'
];

// Mock availability: randomly set some reserved
const calendarData = rooms.map(room => {
  return {
    room,
    slots: timeSlots.map(() => Math.random() > 0.3) // true = available, false = reserved
  };
});

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.style.gridTemplateColumns = `150px repeat(${timeSlots.length}, 1fr)`;

  // Header row
  calendar.innerHTML = `<div class="header">Room / Time</div>`;
  timeSlots.forEach(slot => {
    calendar.innerHTML += `<div class="header">${slot}</div>`;
  });

  // Room rows
  calendarData.forEach(room => {
    calendar.innerHTML += `<div class="cell header">${room.room}</div>`;
    room.slots.forEach((available, index) => {
      const statusClass = available ? 'available' : 'reserved';
      calendar.innerHTML += `
        <div class="cell ${statusClass}" 
             onclick="handleClick('${room.room}', '${timeSlots[index]}', ${available})">
          ${available ? 'Available' : 'Reserved'}
        </div>
      `;
    });
  });
}

function handleClick(room, time, available) {
  if (!available) {
    alert(`${room} at ${time} is already reserved.`);
  } else {
    alert(`You selected ${room} at ${time}.`);
    // You can trigger a reservation modal or update UI here
  }
}

renderCalendar();