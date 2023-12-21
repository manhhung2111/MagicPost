const fs = require("fs");
const centers = require("./centers.json");
const ShortUniqueId = require("short-unique-id");

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

const selectedCenters = centers?.map((center) => {
  return {
    center_code: center.center_code,
    nearby_center: center.nearby_center,
    name: center.name.slice(4),
    postalCode: center.postalCode,
  };
});

const services = [
  "",
  "Standard Delivery",
  "Time-Sensitive Parcel",
  "Tracking and Insurance",
  "Economical Shipping",
  "Secure Handling",
];

const notes = [
  "",
  "Pack the items securely to prevent damage during transit.",
  "Clearly label the package with the recipient's address and contact information",
  "Using tracking services to monitor the parcel's progress in real-time.",
  "Signature confirmation upon delivery",
  "Keep copies of receipts, tracking information, and any relevant documentation.",
];

const items = [
  {
    content: `iPhone ${Math.random() < 0.5 ? 13 : 15}`,
    quantity: (Math.floor(Math.random() * 5) + 1).toString(),
    value: "15,000,000",
    attachment: "Charger, cases",
  },
  {
    content: `iPad air ${Math.random() < 0.5 ? 4 : 5}`,
    quantity: (Math.floor(Math.random() * 3) + 1).toString(),
    value: "20,000,000",
    attachment: "Charger, guide lines",
  },
  {
    content: `Headphone ${Math.random() < 0.5 ? "Razzer" : "Logitech"}`,
    quantity: (Math.floor(Math.random() * 2) + 1).toString(),
    value: "7,000,000",
    attachment: "Charger, containing box",
  },
  {
    content: `Mouse ${Math.random() < 0.5 ? "Apple" : "Logitech"}`,
    quantity: (Math.floor(Math.random() * 2) + 1).toString(),
    value: "2,000,000",
    attachment: "Battery, guide lines",
  },
  {
    content: `${Math.random() < 0.5 ? "H&M" : "Louis Vuitton"} T-shirt`,
    quantity: (Math.floor(Math.random() * 2) + 1).toString(),
    value: "6,000,000",
    attachment: "Tote bag",
  },
  {
    content: `${Math.random() < 0.5 ? "Baesus" : "Logitech"} light bulb`,
    quantity: (Math.floor(Math.random() * 2) + 1).toString(),
    value: "500,000",
    attachment: "",
  },
];

const bfs = (allCenters, source, dest) => {
  let adjacencyGraph = new Map();
  let visited = new Map();
  let path = new Map();
  allCenters?.forEach((center) => {
    adjacencyGraph.set(center.center_code, center.nearby_center);
    visited.set(center.center_code, false);
  });

  let queue = [source];
  visited.set(source, true);
  while (queue.length) {
    const node = queue.shift();
    if (node === dest) break;
    adjacencyGraph.get(node)?.forEach((neighbour) => {
      if (!visited.get(neighbour)) {
        queue.push(neighbour);
        visited.set(neighbour, true);
        path.set(neighbour, node);
      }
    });
  }
  if (!visited.get(dest)) return [];

  let route = [];
  let tranverseNode = dest;
  while (tranverseNode !== source) {
    route.push(tranverseNode);
    tranverseNode = path.get(tranverseNode);
  }
  route.push(tranverseNode);
  return route.reverse();
};

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

const generateRandomAddress = (suffix) => {
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
  };

  const number = Math.floor(Math.random() * 300);
  const street =
    address.street[Math.floor(Math.random() * address.street.length)];

  return `${number} ${street} st., ${suffix}, Vietnam`;
};

function generatePhone() {
  let code = "0";
  for (let i = 0; i < 9; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

const getCurrentTime = () => {
  const currentdate = new Date();
  const currentTime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return currentTime;
};

function onlyCapitalLetters(str) {
  if (str === "Hanoi") return "HN";
  return str.replace(/[^A-Z]+/g, "");
}

const generateRandomOrder = () => {
  let sourceCenter = selectedCenters.find(
    (center) =>
      center.center_code ===
      allTransactionHubs[Math.floor(Math.random() * allTransactionHubs.length)]
  );
  while (typeof sourceCenter === "undefined") {
    sourceCenter = selectedCenters.find(
      (center) =>
        center.center_code ===
        allTransactionHubs[
          Math.floor(Math.random() * allTransactionHubs.length)
        ]
    );
  }
  let destCenter = selectedCenters.find(
    (center) =>
      center.center_code ===
      allTransactionHubs[Math.floor(Math.random() * allTransactionHubs.length)]
  );
  while (typeof destCenter === "undefined") {
    destCenter = selectedCenters.find(
      (center) =>
        center.center_code ===
        allTransactionHubs[
          Math.floor(Math.random() * allTransactionHubs.length)
        ]
    );
  }

  const route = bfs(
    selectedCenters,
    sourceCenter.center_code,
    destCenter.center_code
  );
  const paths = route.map((center, index) => {
    return {
      center_code: center,
      user_name:
        index === 0 ? `${center}_Employee${Math.random() < 0.5 ? 1 : 2}` : null,
      time: {
        timeArrived: index === 0 ? getCurrentTime() : "",
        timeDeparted: "",
      },
      isConfirmed: index === 0 ? true : false,
    };
  });
  const packageInfo = {
    typeOfParcel: {
      isDocument: Math.random() < 0.5,
    },
    senderInfo: {
      nameAddress:
        generateRandomName() + ". " + generateRandomAddress(sourceCenter.name),
      address: sourceCenter.center_code,
      phoneNum: generatePhone(),
      customerID: "None",
      postalCode: sourceCenter.postalCode,
    },
    recipientInfo: {
      nameAddress:
        generateRandomName() + ". " + generateRandomAddress(destCenter.name),
      address: destCenter.center_code,
      phoneNum: generatePhone(),
      postalCode: destCenter.postalCode,
    },
    sender_instruction: {
      returnImmediately: Math.random() < 0.5,
      callRecipient: Math.random() < 0.5,
      cancel: Math.random() < 0.5,
      returnBefore: Math.random() < 0.5,
      returnAfterStorage: Math.random() < 0.5,
    },
    deliveryFare: {
      primary: Math.floor(Math.random() * 900).toString(),
      subordinated: Math.floor(Math.random() * 900).toString(),
      vat: Math.floor(Math.random() * 900).toString(),
      another: Math.floor(Math.random() * 900).toString(),
    },
    weight: {
      actual: Math.floor(Math.random() * 10).toString(),
      converted: Math.floor(Math.random() * 10).toString(),
    },
    recipientFare: {
      cod: Math.floor(Math.random() * 500).toString(),
      another: Math.floor(Math.random() * 500).toString(),
    },
    parcelContentValue: items.filter((items) => Math.random() < 0.5),
    additionalService: services[Math.floor(Math.random() * services.length)],
    notes: notes[Math.floor(Math.random() * notes.length)],
  };

  const city = route[route.length - 1].split("_").pop();
  const serialNum = new ShortUniqueId({ length: 9 });
  const order = {
    parcelId: `MP${serialNum.rnd()}${onlyCapitalLetters(city)}`,
    packageInfo: packageInfo,
    paths: paths,
    delivered: false,
    deleted: false,
    __v: 0,
  };
  return order;
};

const orders = [];

for (let i = 0; i < 1000; i++) {
  orders.push(generateRandomOrder());
}

// Convert object to JSON string
const jsonData = JSON.stringify(orders, null, 2); // The third parameter (2) is for indentation

// Write JSON string to a file
fs.writeFileSync(`${__dirname}\\orders.json`, jsonData);

console.log(`${orders.length} orders.js has been generated to orders.json`);
