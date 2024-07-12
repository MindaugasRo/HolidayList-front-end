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
});
