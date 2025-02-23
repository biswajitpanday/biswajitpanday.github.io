export const calculateDuration = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  const totalMonths = years * 12 + months;
  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;
  return `${displayYears} years, ${displayMonths} months`;
};


export const calculateFromTo = (startDate: Date, endDate: Date) => {
    const startYear = startDate.getFullYear();
    if(endDate.toDateString() === new Date().toDateString())
        return `${startYear} - Present`;
    const endYear = endDate.getFullYear();
    return `${startYear} - ${endYear}`;
  };