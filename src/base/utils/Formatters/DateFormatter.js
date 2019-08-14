import Formatter from './Formatter';

/**
 * @TODO: use moment or some other library
 */

const fix = (num, length = 2) => String(num).padStart(length, '0');

const replacers = {
    yyyy(date) { return date.getFullYear(); },
    MM(date) { return fix(date.getMonth() + 1); },
    dd(date) { return fix(date.getDate()); },
    HH(date) { return fix(date.getHours()); },
    mm(date) { return fix(date.getMinutes()); },
    ss(date) { return fix(date.getSeconds()); },
    ms(date) { return fix(date.getMilliseconds(), 3); },
};
const trunk = new RegExp(Object.keys(replacers).join('|'), 'g');

export class DateFormatter extends Formatter {
    constructor(pattern = 'yyyy-MM-dd HH:mm:ss') {
        super();
        this.pattern = pattern;
    }

    format(value, pattern) {
        pattern = pattern || this.pattern;

        if (value && !isNaN(value))
            value = +value;
        const date = new Date(value);
        if (String(date) === 'Invalid Date')
            return value;

        return pattern.replace(trunk, (cap) => replacers[cap] ? replacers[cap](date) : '');
    }

    parse(value, pattern) {
        pattern = pattern || this.pattern;

        return new Date(value);
    }
}

export const dateFormatter = new DateFormatter();

export default DateFormatter;
