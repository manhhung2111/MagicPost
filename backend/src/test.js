const arr = [
  "20/11/2023 20:16:59",
  "21/11/2023 20:16:59",
  "22/11/2023 20:16:59",
];

// Chuyển đổi định dạng DD/MM/YYYY HH:mm:ss thành YYYY/MM/DD HH:mm:ss
const formattedArr = arr.map((dateString) => {
  const parts = dateString.split(" ");
  const dateParts = parts[0].split("/");
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${parts[1]}`;
});

formattedArr.sort((a, b) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateB - dateA;
});

console.log(formattedArr);
