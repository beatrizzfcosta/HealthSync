export const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth retorna 0-11, por isso +1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const parseDate = (dateString: string): Date => {
    // Divide a string no formato dd/mm/aaaa usando o delimitador '/'
    const [day, month, year] = dateString.split('/').map(Number);

    // Cria um novo objeto Date com o ano, mês (mês - 1 porque começa em 0), e o dia
    return new Date(year, month - 1, day);
};

const convertMealTimeToDate = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
};
