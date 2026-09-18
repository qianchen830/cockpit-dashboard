// 街道mock数据
const result = {
  code: "200",
  data: {
    nums: 20,
    area: 3344565.19,
    price: 10010,
    hireNums: 1651,
    useNums: 2301,
    lendNums: 912,
    leaveNums: 2000,
    otherNums: 399,
    totalNums: 7263,
    retIncList: [
      {
        year: 2023,
        month: 1,
        amount: 341,
        actual_amount: 310,
      },
      {
        year: 2023,
        month: 2,
        amount: 890,
        actual_amount: 456,
      },
      {
        year: 2023,
        month: 3,
        amount: 813,
        actual_amount: 351,
      },
      {
        year: 2023,
        month: 4,
        amount: 789,
        actual_amount: 341,
      },
      {
        year: 2023,
        month: 5,
        amount: 895,
        actual_amount: 751,
      },
      {
        year: 2023,
        month: 6,
        amount: 678,
        actual_amount: 456,
      },
      {
        year: 2023,
        month: 7,
        amount: 910,
        actual_amount: 671,
      },
      {
        year: 2023,
        month: 8,
        amount: 568,
        actual_amount: 489,
      },
      {
        year: 2023,
        month: 9,
        amount: 890,
        actual_amount: 810,
      },
      {
        year: 2023,
        month: 10,
        amount: 450,
        actual_amount: 310,
      },
      {
        year: 2023,
        month: 11,
        amount: 890,
        actual_amount: 590,
      },
      {
        year: 2023,
        month: 12,
        amount: 751,
        actual_amount: 670,
      },
    ],
    expireConDisList: [
      {
        type: "1-3月",
        nums: 351,
      },
      {
        type: "3-6月",
        nums: 798,
      },
      {
        type: "6-12月",
        nums: 567,
      },
      {
        type: "12月以上",
        nums: 900,
      },
    ],
    streetList: null,
  },
  count: 1,
  message: "success",
};

const streets = [
  {
    id: "1688346769194235904",
    name: "天星桥",
    type: "street",
    lng: 106.455095,
    lat: 29.545775,
    regionId: "QY-00000021",
  },
  {
    id: "1685584216108",
    name: "杨公桥",
    type: "street",
    lng: 106.448004,
    lat: 29.563411,
    regionId: "QY-00000021",
  },
  {
    id: "1685584573555",
    name: "梨树湾",
    type: "street",
    lng: 106.442158,
    lat: 29.550066,
    regionId: "QY-00000021",
  },
  {
    id: "1685584624292",
    name: "沙正街",
    type: "street",
    lng: 106.464577,
    lat: 29.564457,
    regionId: "QY-00000021",
  },
  {
    id: "1685584713898",
    name: "三峡广场",
    type: "street",
    lng: 106.462406,
    lat: 29.557143,
    regionId: "QY-00000021",
  },
  {
    id: "1685584769386",
    name: "西永",
    type: "street",
    lng: 106.377074,
    lat: 29.589801,
    regionId: "QY-00000021",
  },
  {
    id: "1685584874867",
    name: "凤天路",
    type: "street",
    lng: 106.45401,
    lat: 29.535349,
    regionId: "QY-00000021",
  },
  {
    id: "1685584914612",
    name: "小龙坎",
    type: "street",
    lng: 106.463007,
    lat: 29.551328,
    regionId: "QY-00000021",
  },
  {
    id: "1685584996647",
    name: "杨家坪",
    type: "street",
    lng: 106.512646,
    lat: 29.508676,
    regionId: "QY-00000022",
  },
  {
    id: "1685585056692",
    name: "石板桥",
    type: "street",
    lng: 116.527837,
    lat: 39.884907,
    regionId: "QY-00000022",
  },
  {
    id: "1685585090886",
    name: "二郎",
    type: "street",
    lng: 106.461082,
    lat: 29.510406,
    regionId: "QY-00000022",
  },
  {
    id: "1685585140501",
    name: "巴国城",
    type: "street",
    lng: 106.473011,
    lat: 29.49982,
    regionId: "QY-00000022",
  },
  {
    id: "1685585196737",
    name: "蟠龙",
    type: "street",
    lng: 106.481752,
    lat: 29.506928,
    regionId: "QY-00000022",
  },
  {
    id: "1685585284478",
    name: "黄桷坪",
    type: "street",
    lng: 106.52701,
    lat: 29.494443,
    regionId: "QY-00000022",
  },
  {
    id: "1685585316566",
    name: "谢家湾",
    type: "street",
    lng: 106.519262,
    lat: 29.521236,
    regionId: "QY-00000022",
  },
];

const select = {
  "code": "200",
  "data": streets,
  "count": 3,
  "message": "success"
}

export function getStreetList(regionId) {
  let streetList;
  if (regionId && regionId !== "500") {
    streetList = streets.filter((x) => x.regionId === regionId);
  } else {
    streetList = streets;
  }
  result.data.streetList = streetList;
  return result;
}

export function getStreetSelectData() {
  return select
}