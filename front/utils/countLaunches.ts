"use client"

// don't like using interface/type in the same file, but also, kind a simple type and single utilization
type rockets = {_id: string, count: number, date: string[], name: string}[]
export const countLaunches = (rockets: rockets, yearsArray: number[]) => {
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
