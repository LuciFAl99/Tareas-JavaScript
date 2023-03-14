const $td = document.getElementById("mayor-porcentaje")
const $td2 = document.getElementById("menor-porcentaje")
const $td3 = document.getElementById("mayor-capacidad")
const $tr = document.getElementById("tabla2")
const $tr2 = document.getElementById("table-container")

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        const events = data.events;
        const sortedEvents = events.sort((a, b) => b.assistance / b.capacity - a.assistance / a.capacity);
        const topEvent = sortedEvents[0];
        const sortEvents = events.sort((a, b) => a.assistance / a.capacity - b.assistance / b.capacity);
        const lowAttendanceEvent = sortEvents[0];
        const attendancePercentage = (topEvent.assistance / topEvent.capacity) * 100;
        $td.innerHTML = (`${topEvent.name}: ${attendancePercentage.toFixed(2)}%`);
        const attendPercentage = (lowAttendanceEvent.assistance / lowAttendanceEvent.capacity) * 100;
        $td2.innerHTML = (`${lowAttendanceEvent.name}: ${attendPercentage.toFixed(2)}%`);
        const sorEvents = events.sort((a, b) => b.capacity - a.capacity);
        const topCapacityEvent = sorEvents[0];

        // Mostrar el nombre y la capacidad del evento con mayor capacidad
        $td3.innerHTML += (`${topCapacityEvent.name}: ${topCapacityEvent.capacity}<br>`);
   //past stats
   
        const categories = {};
        const events2 = data.events;
        const currentDate = new Date();

        events2.filter(event => new Date(event.date) < currentDate)
            .forEach(event => {
                if (event.category in categories) {
                    const revenue = event.price * event.assistance;
                    if (!isNaN(revenue)) {
                        categories[event.category].revenue += revenue;
                        categories[event.category].attendance += event.assistance;
                        categories[event.category].capacity += event.capacity;
                    }
                } else {
                    const revenue = event.price * event.assistance;
                    if (!isNaN(revenue)) {
                        categories[event.category] = {
                            revenue: revenue,
                            attendance: event.assistance,
                            capacity: event.capacity
                        };
                    }
                }
            });

            const table = document.createElement('table');
            table.classList.add('table');
            const headerRow = table.insertRow();
            const categoryHeader = headerRow.insertCell();
            categoryHeader.classList.add('header-cell');
            categoryHeader.innerHTML = 'Categories';
            const revenueHeader = headerRow.insertCell();
            revenueHeader.classList.add('header-cell');
            revenueHeader.innerHTML = 'Revenues';
            const attendanceHeader = headerRow.insertCell();
            attendanceHeader.classList.add('header-cell');
            attendanceHeader.innerHTML = 'Percentaje of assistance';

        for (let category in categories) {
            const row = table.insertRow();
            const categoryCell = row.insertCell();
            categoryCell.innerHTML = category;
            const revenueCell = row.insertCell();
            revenueCell.innerHTML = `$${categories[category].revenue.toFixed(2)}`;
            const attendanceCell = row.insertCell();
            const attendancePercentage = (categories[category].attendance / categories[category].capacity) * 100;
            attendanceCell.innerHTML = `${attendancePercentage.toFixed(2)}%`;
        }

        $tr.appendChild(table);
    });


  // Obtener el contenedor donde se mostrará la tabla

//upcoming stats
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    const events = data.events;
    const currentDate = new Date();
    const categories = {};

    events.filter(event => new Date(event.date) > currentDate)
      .forEach(event => {
        if (event.category in categories) {
          const revenue = event.price * event.estimate;
          const attendance = parseFloat(event.estimate);
          const capacity = parseFloat(event.capacity);

          if (!isNaN(revenue) && !isNaN(attendance) && !isNaN(capacity)) {
            categories[event.category].revenue += revenue;
            categories[event.category].attendance += attendance;
            categories[event.category].capacity += capacity;
          }
        } else {
          const revenue = event.price * event.estimate;
          const attendance = parseFloat(event.estimate);
          const capacity = parseFloat(event.capacity);

          if (!isNaN(revenue) && !isNaN(attendance) && !isNaN(capacity)) {
            categories[event.category] = {
              revenue: revenue,
              attendance: attendance,
              capacity: capacity
            };
          }
        }
      });

    const table = document.createElement('table');
    table.classList.add('table');
    const headerRow = table.insertRow();
    const categoryHeader = headerRow.insertCell();
    categoryHeader.classList.add('header-cell');
    categoryHeader.innerHTML = 'Categories';
    const revenueHeader = headerRow.insertCell();
    revenueHeader.classList.add('header-cell');
    revenueHeader.innerHTML = 'Revenues';
    const attendanceHeader = headerRow.insertCell();
    attendanceHeader.classList.add('header-cell');
    attendanceHeader.innerHTML = 'Percentaje of assistance';

    for (let category in categories) {
      const row = table.insertRow();
      const categoryCell = row.insertCell();
      categoryCell.innerHTML = category;
      const revenueCell = row.insertCell();
      revenueCell.innerHTML = `$${categories[category].revenue.toFixed(2)}`;
      const attendanceCell = row.insertCell();
      const attendancePercentage = (categories[category].attendance / categories[category].capacity) * 100;
      attendanceCell.innerHTML = `${attendancePercentage.toFixed(2)}%`;
    }

    $tr2.appendChild(table);
  });





  