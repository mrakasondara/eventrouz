import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const getEventDate = ({
  start_at,
  end_at,
  type,
}: {
  start_at: string;
  end_at: string;
  type: string;
}) => {
  const startDate = new Date(start_at);
  const endDate = new Date(end_at);

  const checkIsOnlyADay =
    startDate.getDate() == endDate.getDate() &&
    startDate.getMonth() == endDate.getMonth();
  const date = `${
    checkIsOnlyADay
      ? startDate.getDate()
      : `${startDate.getDate()} - ${endDate.getDate()}`
  } ${getMonthName({
    monthNumber: endDate.getMonth(),
    type,
  })}  ${endDate.getFullYear()}`;

  return date;
};

export const getEventSingleDateandTime = ({
  date,
  type,
}: {
  date: string | undefined;
  type: string;
}) => {
  const splittedDate = date?.split(" ");
  if (splittedDate) {
    const getDate = new Date(splittedDate[0]);
    const getTime = splittedDate[1];
    const monthNumber = getDate.getMonth();
    return `${getDate.getDate()} ${getMonthName({
      monthNumber,
      type,
    })} ${getDate.getFullYear()} ${getTime}`;
  }
};

export const getSingleDate = ({
  date,
  type,
}: {
  date: string;
  type: string;
}) => {
  const getDate = new Date(date);
  const monthNumber = getDate.getMonth();
  return `${getDate.getDate()} ${getMonthName({
    monthNumber,
    type,
  })} ${getDate.getFullYear()}`;
};

const getMonthName = ({
  monthNumber,
  type,
}: {
  monthNumber: number;
  type: string;
}) => {
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const fullMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return type == "full" ? fullMonths[monthNumber] : shortMonths[monthNumber];
};

export const getRelativeDate = (date: string | undefined) => {
  const getDate = date ? new Date(date) : "";

  const relativeDate = formatDistanceToNow(getDate, {
    addSuffix: true,
    locale: id,
  });
  return relativeDate;
};
