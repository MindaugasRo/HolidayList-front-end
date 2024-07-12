let baseUrl = "http://localhost";
let port = ":8000";

$(function() {
    $(document).on('show.bs.modal', '#createHolidayModal', function(event) {
        const modal = $(this);
        const currentDate = new Date();
        const currentSeason = determineSeason(currentDate);
        
        // Įrašome sezoną į modalinį langą
        modal.find('#season').text(currentSeason);

        // Skaitliukas nuotraukų skaičiui
        let photoCount = 1;

        $('#addPhotoButton').click(function() {
            photoCount++;
            const newPhotoField = `
                <div class="mb-3">
                    <label for="photos${photoCount}" class="form-label">Photo ${photoCount} URL</label>
                    <input type="text" class="form-control" id="photos${photoCount}" required>
                </div>
            `;
            $('#addPhotoButton').before(newPhotoField); // Įterpiame naują nuotraukos lauką prieš mygtuką "+"
        });
    });

    getHolidays();

    async function getHolidays() {
        try {
            const response = await fetch(`${baseUrl}${port}/getHolidays`);
            const data = await response.json();
            fillTable(data);
        } catch (error) {
            console.error(error);
        }
    }

    function fillTable(data) {
        const tbody = document.querySelector("#holidayTableBody");
        tbody.innerHTML = data.map(holiday => `
            <tr>
                <td>${holiday.title}</td>
                <td>${holiday.country}</td>
                <td>${holiday.city}</td>
                <td>${holiday.duration}</td>
                <td>${holiday.season}</td>
                <td>${holiday.description}</td>
                <td>${holiday.price}</td>
                <td>${holiday.photos}</td>
                <td class="bungee-spice-regular">${holiday.average_rating}</td>
                <td class="action-buttons">
                    <a href="#" id="update-${holiday.id}" class="btn btn-sm btn-primary update"><i class="fas fa-edit"></i></a>
                    <a href="#" id="${holiday.id}" class="btn btn-sm btn-danger delete"><i class="fas fa-trash-alt"></i></a>
                </td>
            </tr>
        `).join('');
    
        // Pridedame event listener'į „Update“ mygtukams
        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const holidayId = this.id.replace('update-', ''); // Gauname holiday ID
                const holiday = data.find(h => h.id == holidayId); // Palyginame kaip string ir skaičius
                openUpdateModal(holiday);
            });
        });
    }
    
    function openUpdateModal(holiday) {
        if (!holiday) {
            console.error("Holiday data is undefined.");
            return;
        }
    
        // Užpildome modalinį langą duomenimis
        document.getElementById('title').value = holiday.title;
        document.getElementById('country-select').value = holiday.country;
        document.getElementById('city-select').value = holiday.city;
        document.getElementById('duration').value = holiday.duration;
        document.getElementById('season').textContent = holiday.season;
        document.getElementById('description').value = holiday.description;
        document.getElementById('price').value = holiday.price;
    
        // Užpildome nuotraukų laukus
        let photoCount = 1;
        document.querySelectorAll('#addPhotoText input').forEach((input, index) => {
            if (holiday.photos[index]) {
                input.value = holiday.photos[index];
            } else {
                input.value = '';
            }
        });
    
        // Rodome modalinį langą
        const modal = new bootstrap.Modal(document.getElementById('createHolidayModal'));
        modal.show();
    }
    
    $(function() {
        // Inicializuojame daterangepicker
        $('input[name="daterange"]').daterangepicker({
            locale: {
                format: 'YYYY-MM-DD',
                applyLabel: 'Patvirtinti',
                cancelLabel: 'Atšaukti',
                daysOfWeek: ['Sek', 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', 'Šeš'],
                monthNames: ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'],
                firstDay: 1
            }
        }, function(start, end, label) {
            // Callback funkcija, kuri kviečiama po pasirinkimo
            var days = end.diff(start, 'days') + 1; // Suskaičiuojame dienų skaičių, pridedame +1, kad būtų įskaičiuotas ir pats pasirinktas dienos
            
            // Rodome suskaičiuotą dienų skaičių modaliniame lange
            $('#selectedDaysCount').text('Pasirinktų dienų skaičius: ' + days);
    
            // Atnaujiname Season lauką pagal pasirinktą datą
            var season = determineSeason(start.toDate());
            $('#season').text(season);
        });
    
        // Funkcija, kuri nustato metų sezoną pagal pasirinktą datą
        function determineSeason(date) {
            const month = date.getMonth() + 1; // getMonth() grąžina mėnesius nuo 0 iki 11, todėl pridedame 1
    
            if (month >= 3 && month <= 5) {
                return 'Pavasaris';
            } else if (month >= 6 && month <= 8) {
                return 'Vasara';
            } else if (month >= 9 && month <= 11) {
                return 'Ruduo';
            } else {
                return 'Žiema';
            }
        }
    
        // Iškviečiame getHolidays funkciją duomenų gavimui
        getHolidays();
    });
    
    async function getHolidays() {
        try {
            const response = await fetch(`${baseUrl}${port}/getHolidays`);
            const data = await response.json();
            fillTable(data);
        } catch (error) {
            console.error(error);
        }
    }
    
});
