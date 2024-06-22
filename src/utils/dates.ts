import { format } from 'date-fns';

const formatDate = (value: string, dateFormat: string)  => {
    return format(value, dateFormat);
};

export {
    formatDate
}