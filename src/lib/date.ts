export const transformDate = (date: string, time: string) => {
  return new Date(
    `${new Date(date).toISOString().split("T")[0]}T${
      new Date(time).toISOString().split("T")[1]
    }`
  );
};
