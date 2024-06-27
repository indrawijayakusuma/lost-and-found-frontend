export const showFormattedDate = (date: string) => {
  const formattedDate = new Date(date);
  const months = [
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

  const tanggal = formattedDate.getDate();
  const monthName = months[formattedDate.getMonth()];
  const year = formattedDate.getFullYear();
  return `${tanggal} ${monthName} ${year}`;
};

export const showFormattedNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
