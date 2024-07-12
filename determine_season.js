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