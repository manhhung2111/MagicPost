const fs = require("fs");

const allTransactionHubs = [
  "DGD_TX_Hanoi",
  "DGD_HD_Hanoi",
  "DGD_HK_Hanoi",
  "DGD_HB_HaiPhong",
  "DGD_NQ_HaiPhong",
  "DGD_LC_HaiPhong",
  "DGD_ML_NamDinh",
  "DGD_NH_NamDinh",
  "DGD_XT_NamDinh",
  "DGD_SS_ThanhHoa",
  "DGD_HT_ThanhHoa",
  "DGD_VL_ThanhHoa",
  "DGD_ST_DaNang",
  "DGD_CL_DaNang",
  "DGD_HC_DaNang",
  "DGD_DH_KonTum",
  "DGD_NH_KonTum",
  "DGD_DG_KonTum",
  "DGD_NT_KhanhHoa",
  "DGD_VN_KhanhHoa",
  "DGD_CR_KhanhHoa",
  "DGD_BT_HoChiMinh",
  "DGD_TD_HoChiMinh",
  "DGD_Q1_HoChiMinh",
];

const allCollectionHubs = [
  "DTK_Hanoi",
  "DTK_HaiPhong",
  "DTK_NamDinh",
  "DTK_ThanhHoa",
  "DTK_DaNang",
  "DTK_KonTum",
  "DTK_KhanhHoa",
  "DTK_HoChiMinh",
];

const general_manager = {
  user_name: "General Manager",
  name: "Hoang Manh Hung",
  password: "111",
  center_name: null,
  role_name: "TGD",
  address: "Long Canh 86, vinhomes Thang Long, An Khanh, Hoai Duc, Ha Noi",
  phone: "0828481258",
  email: "generalmanager@magicpost.com",
  deleted: false,
  __v: 0,
};

const users = [general_manager];

const generateRandomName = () => {
  const name = {
    first: ["Hoàng", "Nguyễn", "Trần", "Phạm", "Đinh"],
    middle: ["Thu", "Duy", "Văn", "Minh"],
    last: ["Duy", "Huyền", "Ngọc", "Anh", "Hùng"],
  };
  const firstName = name.first[Math.floor(Math.random() * name.first.length)];
  const middleName =
    name.middle[Math.floor(Math.random() * name.middle.length)];
  const lastName = name.last[Math.floor(Math.random() * name.last.length)];
  return `${firstName} ${middleName} ${lastName}`;
};

const generateRandomAddress = () => {
  const address = {
    street: [
      "Nguyễn Văn Ngọc",
      "Ngọc Hà",
      "Thái Hà",
      "Nguyễn Thái Học",
      "Nguyễn Chí Thanh",
      "Núi Trúc",
      "Yên Thế",
      "Hoàng Hoa Thám",
      "Kim Mã",
      "Vạn Phúc",
      "Sơn Tây",
      "Vạn Bảo",
      "Phan Đình Phùng",
      "Nguyễn Trung Trực",
      "Đào Tấn",
      "Mai Anh Tuấn",
      "Trần Duy Hưng",
      "Trần Hưng Đạo",
      "Trúc Bạch",
      "Cửa Bắc",
    ],
    district: [
      "Thanh Xuan",
      "Quoc Oai",
      "Cau Giay",
      "Long Bien",
      "Hoang Mai",
      "Tay Ho",
      "Ba Vi",
      "Me Linh",
      "Soc Son",
      "Son Tay",
      "Phu Xuyen",
      "Thanh Tri",
      "Thach That",
    ],
    city: [
      "Hai Phong",
      "Ha Noi",
      "Thanh Hoa",
      "Khanh Hoa",
      "Da Nang",
      "Nam Dinh",
      "Kon Tum",
      "Ho Chi Minh",
    ],
  };

  const number = Math.floor(Math.random() * 300);
  const street =
    address.street[Math.floor(Math.random() * address.street.length)];
  const district =
    address.district[Math.floor(Math.random() * address.district.length)];
  const city = address.city[Math.floor(Math.random() * address.city.length)];

  return `${number} ${street} st., ${district} dist, ${city}, Vietnam`;
};

function generatePhone() {
  let code = "0";
  for (let i = 0; i < 9; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

function generateEmailTransaction(isEmployee, center, index) {
  const strs = center.split("_");
  return `${strs[1].toLowerCase()}${strs[2].toLowerCase()}_${
    isEmployee ? `employee${index}` : "manager"
  }@magicpost.transaction.com`;
}

function generateEmailCollection(isEmployee, center, index) {
  const strs = center.split("_");
  return `${strs[1].toLowerCase()}_${
    isEmployee ? `employee${index}` : "manager"
  }@magicpost.collection.com`;
}

allTransactionHubs.forEach((center) => {
  // create manager
  const manager = {
    user_name: `${center}_Manager`,
    name: generateRandomName(),
    password: "111",
    center_name: center,
    role_name: "GDT",
    address: generateRandomAddress(),
    phone: generatePhone(),
    email: generateEmailTransaction(false, center),
    deleted: false,
    __v: 0,
  };
  users.push(manager);
  for (let i = 1; i <= 2; i++) {
    const employee = {
      user_name: `${center}_Employee${i}`,
      name: generateRandomName(),
      password: "111",
      center_name: center,
      role_name: "GDV",
      address: generateRandomAddress(),
      phone: generatePhone(),
      email: generateEmailTransaction(true, center, i),
      deleted: false,
      __v: 0,
    };
    users.push(employee);
  }
});

allCollectionHubs.forEach((center) => {
  // create manager
  const manager = {
    user_name: `${center}_Manager`,
    name: generateRandomName(),
    password: "111",
    center_name: center,
    role_name: "TKT",
    address: generateRandomAddress(),
    phone: generatePhone(),
    email: generateEmailCollection(false, center),
    deleted: false,
    __v: 0,
  };
  users.push(manager);
  for (let i = 1; i <= 2; i++) {
    const employee = {
      user_name: `${center}_Employee${i}`,
      name: generateRandomName(),
      password: "111",
      center_name: center,
      role_name: "TKV",
      address: generateRandomAddress(),
      phone: generatePhone(),
      email: generateEmailCollection(true, center, i),
      deleted: false,
      __v: 0,
    };
    users.push(employee);
  }
});
// Convert object to JSON string
const jsonData = JSON.stringify(users, null, 2); // The third parameter (2) is for indentation

// Write JSON string to a file
fs.writeFileSync(`${__dirname}\\users.json`, jsonData);

console.log(`${users.length} users has been generated to users.json`);
