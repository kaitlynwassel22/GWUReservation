//gets the current date
let currentDate = new Date(); // Tracks current visible date
//gets the date label
function getDateLabel(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function updateDateDisplay() {
  document.getElementById("weekDisplay").textContent = getDateLabel(currentDate);
}

// add in the rooms of GWU connected with the back server
const rooms = ['Room 101', 'Room 102', 'Room 103'];
//add in the time slots for the calendar
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
    const calendar = document.getElementById('calendarGrid');
    calendar.innerHTML = ""; // Clear previous content
  
    // Header row
    const headerRow = document.createElement("div");
    headerRow.classList.add("row", "header");
  
    headerRow.innerHTML = `<div class="cell">Room / Time</div>`;
    timeSlots.forEach(slot => {
      headerRow.innerHTML += `<div class="cell">${slot}</div>`;
    });
  
    calendar.appendChild(headerRow);
  
    // Room rows
    calendarData.forEach(room => {
      const row = document.createElement("div");
      row.classList.add("row");
  
      row.innerHTML = `
        <div class="cell header">${room.room}</div>
        ${room.slots.map((available, index) => `
          <div class="cell ${available ? 'available' : 'reserved'}"
               onclick="handleClick('${room.room}', '${timeSlots[index]}', ${available})">
            ${available ? "Available" : "Reserved"}
          </div>
        `).join("")}
      `;
  
      calendar.appendChild(row);
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
let calendarData = [];

function generateNewAvailability() {
  calendarData = rooms.map(room => ({
    room,
    slots: timeSlots.map(() => Math.random() > 0.3)
  }));
}

document.addEventListener("DOMContentLoaded", () => {
    updateDateDisplay();
    generateNewAvailability();
    renderCalendar();
  });


// arrow functionality for the next days
document.getElementById("prevBtn").addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDateDisplay();
    generateNewAvailability(); // Refresh mock data
    renderCalendar();
  });
  
  document.getElementById("nextBtn").addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDateDisplay();
    generateNewAvailability(); // Refresh mock data
    renderCalendar();
  });