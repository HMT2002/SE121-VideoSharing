import { format, getDate } from "date-fns";

class Utils {
    static DateConverter(date) {
        const today = Date.now();
        const offset = getDate(today - date);

        if (offset === 0)
            return "Today";
        if (offset > 0 && offset <= 7)
            return `${offset} ${offset > 1 ? "days" : "day"} ago`;
        if (offset > 7)
            return format(date, "dd-MM-yyyy").toString();
    };
}

export default Utils;