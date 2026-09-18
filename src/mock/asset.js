// 资产mock数据
const data = {
  'code': '200',
  'data': {
    'nums': 20,
    'area': 198.4,
    'price': 500,
    'hireNums': 2019,
    'useNums': 1451,
    'lendNums': 569,
    'leaveNums': 1048,
    'otherNums': 399,
    'totalNums': 5486,
    'retIncList': [
      {
        'year': 2023,
        'month': 1,
        'amount': 820,
        'actual_amount': 350
      },
      {
        'year': 2023,
        'month': 2,
        'amount': 932,
        'actual_amount': 678
      },
      {
        'year': 2023,
        'month': 3,
        'amount': 901,
        'actual_amount': 456
      },
      {
        'year': 2023,
        'month': 4,
        'amount': 934,
        'actual_amount': 609
      },
      {
        'year': 2023,
        'month': 5,
        'amount': 345,
        'actual_amount': 300
      },
      {
        'year': 2023,
        'month': 6,
        'amount': 456,
        'actual_amount': 421
      },
      {
        'year': 2023,
        'month': 7,
        'amount': 780,
        'actual_amount': 300
      },
      {
        'year': 2023,
        'month': 8,
        'amount': 345,
        'actual_amount': 230
      },
      {
        'year': 2023,
        'month': 9,
        'amount': 890,
        'actual_amount': 810
      },
      {
        'year': 2023,
        'month': 10,
        'amount': 450,
        'actual_amount': 310
      },
      {
        'year': 2023,
        'month': 11,
        'amount': 890,
        'actual_amount': 590
      },
      {
        'year': 2023,
        'month': 12,
        'amount': 751,
        'actual_amount': 670
      }
    ],
    'expireConDisList': [
      {
        'type': '1-3月',
        'nums': 120
      },
      {
        'type': '3-6月',
        'nums': 200
      },
      {
        'type': '6-12月',
        'nums': 150
      },
      {
        'type': '12月以上',
        'nums': 80
      }
    ],
    'assets': []
  },
  'count': 1,
  'message': 'success'
}

const assets = [
  {
    'id': '1685602749693',
    'name': '天星康韵-资产111111111111111111111111111',
    'type': 'aseet',
    'lng': 106.455167,
    'lat': 29.551995,
    'area': 100,
    'status': '空置',
    'use': '出租',
    'haveWarrant': false,
    'address': '重庆市沙坪坝区天星桥天梨路199号(天梨路地铁站1号口步行360米)',
    'imageAddress': 'https://img.tukuppt.com/png_preview/00/25/63/eaiG9pdTK7.jpg%21/fw/780',
    'videoAddress': 'http://1.mp4',
    'itemId': '1685597941162',
    'streetId': '1688346769194235904',
    'assetStatus': '2',
    'assetUse': '1',
    'areaId': '1692058555244362752',
    'priceId': '1692061013307833344'
  },
  {
    'id': '1685603513213',
    'name': '锦绣天城-资产',
    'type': 'aseet',
    'lng': 106.456964,
    'lat': 29.557861,
    'area': 100,
    'status': '部分出租',
    'use': '出租',
    'haveWarrant': true,
    'address': '重庆市沙坪坝区沙坪坝天星桥梨树方向500米(沙区党校旁)',
    'imageAddress': 'https://img.tukuppt.com/png_preview/00/25/63/eaiG9pdTK7.jpg%21/fw/780',
    'videoAddress': 'http://1.mp4',
    'itemId': '1685597980929',
    'streetId': '1688346769194235904',
    'companyId': '1685591134594',
    'assetStatus': '2',
    'assetUse': '1',
    'areaId': '1692058555244362752',
    'priceId': '1692061013307833344'
  }
]

export function getAssetList(streetId, condition) {
  let itemList = Object.assign([], assets)
  if (streetId) {
    itemList = itemList.filter(x => x.streetId === streetId)
  }
  if (condition != null && JSON.stringify(condition) !== '{}') {
    if (condition.companyId) {
      itemList = itemList.filter(x => x.companyId === condition.companyId)
    }
    if (condition.streetId) {
      itemList = itemList.filter(x => x.streetId === condition.streetId)
    }
    if (condition.itemId) {
      itemList = itemList.filter(x => x.id === condition.itemId)
    }
    if (condition.assetStatus && condition.assetStatus.length > 0) {
      itemList = itemList.filter(x => condition.assetStatus.indexOf(x.assetStatus) !== -1)
    }
    if (condition.assetStructureId && condition.assetStructureId.length > 0) {
      itemList = itemList.filter(x => condition.assetStructureId.indexOf(x.assetUse) !== -1)
    }
    if (condition.areaId) {
      itemList = itemList.filter(x => x.areaId === condition.areaId)
    }
    if (condition.priceId) {
      itemList = itemList.filter(x => x.priceId === condition.priceId)
    }
    if (condition.keyWord) {
      itemList = itemList.filter(x => x.name.indexOf(condition.keyWord) !== -1)
    }
  }
  data.data.assets = itemList
  return data
}

export function getAssetTotal() {
  return data
}

export function getAssetSelectData() {
  return {
    "code": "200",
    "data": assets,
    "count": 1,
    "message": "success"
  }
}