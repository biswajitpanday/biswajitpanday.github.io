export const calculateDuration = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  const totalMonths = years * 12 + months;
  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;
  
  if (displayYears === 0 && displayMonths === 0) {
    return "Less than 1 month";
  } else if (displayYears === 0) {
    return `${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
  } else if (displayMonths === 0) {
    return `${displayYears} year${displayYears > 1 ? 's' : ''}`;
  } else {
    return `${displayYears} year${displayYears > 1 ? 's' : ''}, ${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
  }
};


export const calculateFromTo = (startDate: Date, endDate: Date) => {
    const startYear = startDate.getFullYear();
    if(endDate.toDateString() === new Date().toDateString())
        return `${startYear} - Present`;
    const endYear = endDate.getFullYear();
    return `${startYear} - ${endYear}`;
  };

export const calculateFromToWithDuration = (startDate: Date, endDate: Date) => {
  const dateRange = calculateFromTo(startDate, endDate);
  const duration = calculateDuration(startDate, endDate);
  return `${dateRange}\n${duration}`;
  };

export const getDateRange = (startDate: Date, endDate: Date) => {
  return calculateFromTo(startDate, endDate);
};

export const getDuration = (startDate: Date, endDate: Date) => {
  return calculateDuration(startDate, endDate);
};

export const calculateTotalExperience = (positions: Array<{startDate: Date, endDate: Date}>) => {
  let totalMonths = 0;
  
  positions.forEach(position => {
    const start = new Date(position.startDate);
    const end = new Date(position.endDate);
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    totalMonths += years * 12 + months;
  });
  
  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;
  
  if (displayYears === 0) {
    return `${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
  } else if (displayMonths === 0) {
    return `${displayYears} year${displayYears > 1 ? 's' : ''}`;
  } else {
    return `${displayYears}+ years`;
  }
};

export const calculateTotalCompaniesServed = (positions: Array<{company: string}>) => {
  const uniqueCompanies = new Set(positions.map(position => position.company));
  return uniqueCompanies.size;
};