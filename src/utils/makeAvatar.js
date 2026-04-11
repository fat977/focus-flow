export const makeAvatar = (name) => {
  if (!name) return null; 

  const nameArray = name.split(" ");
  if (nameArray.length >= 2) {
    return (nameArray[0][0] + nameArray[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};
