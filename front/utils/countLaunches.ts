"use client"
export const countLaunches = (rockets: {_id: string, count: 5, date: string[], name: string}[], yearsArray: number[]) => {
  return rockets.map((rocket) => {
    const dateCounts = rocket.date.reduce((acc, date) => {
      const year = new Date(date).getFullYear();
      if (yearsArray.includes(year)) {
        // @ts-ignore
        acc[year] = (acc[year] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      ...dateCounts,
      name: rocket.name,
    };
  });
}
