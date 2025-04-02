//sees what type of user it is (student, faculty, admin)
const userRole = localStorage.getItem("userRole");
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
  document.getElementById("dayDisplay").textContent = getDateLabel(currentDate);
}

// add in the rooms of GWU connected with the back server
let rooms = [];
// different room types for different user
if (userRole === "faculty") {
  rooms = ['Room 101', 'Room 102', 'Room 103', 'Faculty Lounge', 'Conference Room A'];
} else if (userRole === "admin") {
  rooms = ['Room 101', 'Room 102', 'Room 103', 'Faculty Lounge', 'Conference Room A', 'Admin Office'];
} else {
  // student
  rooms = ['Room 101', 'Room 102', 'Room 103'];
}
// if they are a student set a 2 hour limit per day


//add in the time slots for the calendar
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM','11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM','2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM','4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM','6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM'
];

let calendarData = rooms.map(room => {
  return {
    room,
    slots: timeSlots.map(() => {
      const available = Math.random() > 0.3;
      return {
        available,
        reservedBy: available ? null : ["student", "faculty", "admin"][Math.floor(Math.random() * 3)]
      };
    })
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
      ${room.slots.map((slot, index) => `
        <div class="cell ${slot.available ? 'available' : 'reserved'}"
             onclick="handleClick('${room.room}', '${timeSlots[index]}', ${slot.available}, '${slot.reservedBy}')">
          ${slot.available ? "Available" : `Reserved (${slot.reservedBy})`}
        </div>
      `).join("")}`;
  
      calendar.appendChild(row);
    });
  }
// allow the admin to cancel any reservation
function handleClick(room, time, available, reservedBy = null) {
  if (!available) {
    if (userRole === "admin") {
      const confirmCancel = confirm(`Cancel reservation for ${room} at ${time}?`);
      if (confirmCancel) {
        alert("Reservation cancelled.");
        generateNewAvailability();
        renderCalendar();
      }
    } else {
      alert(`${room} at ${time} is already reserved.`);
    }
  } else {
    if (userRole === "student") {
      const totalBooked = calendarData.reduce((sum, room) => {
        return sum + room.slots.filter(slot => slot.reservedBy === "student").length;
      }, 0);

      if (totalBooked >= 4) {
        alert("You’ve reached your daily booking limit.");
        return;
      }
    }

    alert(`You selected ${room} at ${time}.`);
    // booking logic goes here (e.g., mark as reserved, update view)
  }
}

// adds in random reserved slots - thought would be good for the demo
function generateNewAvailability() {
  calendarData = rooms.map(room => ({
    room,
    slots: timeSlots.map(() => {
      const available = Math.random() > 0.3;
      return {
        available,
        reservedBy: available ? null : ["student", "faculty", "admin"][Math.floor(Math.random() * 3)]
      };
    })
  }));
}
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

document.addEventListener("DOMContentLoaded", () => {
    updateDateDisplay();
    generateNewAvailability();
    renderCalendar();
  });


