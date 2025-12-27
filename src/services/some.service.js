class SomeService {
    timeDiff(listenAt) {
        if (!listenAt) 'Недавно'

        const timeListen = new Date(listenAt);
        const currentDate = new Date();
        const differenceMs = currentDate - timeListen;

        const seconds = Math.floor(differenceMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        const pluralize = (number, one, few, many) => {
            if (number % 10 === 1 && number % 100 !== 11) return one;
            if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) return few;
            return many;
        };

        if (years >= 1) {
            return `${years} ${years, 'гед', 'года', 'лет'} назад`
        }

        if (months >= 1) {
            return `${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')} назад`
        }

        if (days >= 1) {
            return `${days} ${pluralize(days, 'день', 'дня', 'дней')} назад`
        }

        if (hours >= 1) {
            return `${hours} ${pluralize(hours, 'час', 'часа', 'часов')} назад`
        }

        if (minutes >= 1) {
            return `${minutes} ${pluralize(minutes, 'минута', 'минуты', 'минут')} назад`
        }

        return 'Только что';
    }
}

export const someService = new SomeService();