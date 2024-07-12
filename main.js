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
                    <a href="" id="${holiday.id}" class="btn btn-sm btn-primary update"><i class="fas fa-edit"></i></a>
                    <a href="" id="${holiday.id}" class="btn btn-sm btn-danger delete"><i class="fas fa-trash-alt"></i></a>
                </td>
            </tr>
        `).join('');
        // addEventListenersOnDelete();
        // addEventListenersOnUpdate();
    }
});
