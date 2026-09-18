// 区域mock数据
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
        "year": 2023,
        "month": 1,
        "amount": 820,
        "actual_amount": 350
      },
      {
        "year": 2023,
        "month": 2,
        "amount": 932,
        "actual_amount": 678
      },
      {
        "year": 2023,
        "month": 3,
        "amount": 901,
        "actual_amount": 456
      },
      {
        "year": 2023,
        "month": 4,
        "amount": 934,
        "actual_amount": 609
      },
      {
        "year": 2023,
        "month": 5,
        "amount": 345,
        "actual_amount": 300
      },
      {
        "year": 2023,
        "month": 6,
        "amount": 456,
        "actual_amount": 421
      },
      {
        "year": 2023,
        "month": 7,
        "amount": 780,
        "actual_amount": 300
      },
      {
        "year": 2023,
        "month": 8,
        "amount": 345,
        "actual_amount": 230
      },
      {
        "year": 2023,
        "month": 9,
        "amount": 890,
        "actual_amount": 810
      },
      {
        "year": 2023,
        "month": 10,
        "amount": 450,
        "actual_amount": 310
      },
      {
        "year": 2023,
        "month": 11,
        "amount": 890,
        "actual_amount": 590
      },
      {
        "year": 2023,
        "month": 12,
        "amount": 751,
        "actual_amount": 670
      },
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
    'regionList': [
      {
        'id': 'QY-00000021',
        'name': '沙坪坝区',
        'type': 'region',
        'lng': 106.4644651109,
        'lat': 29.5471929878
      },
      {
        'id': 'QY-00000013',
        'name': '渝北区',
        'type': 'region',
        'lng': 106.6375595996,
        'lat': 29.7239276567
      },
      {
        'id': 'QY-00000016',
        'name': '渝中区',
        'type': 'region',
        'lng': 106.5754417736,
        'lat': 29.5590908113
      },
      {
        'id': 'QY-00000015',
        'name': '南岸区',
        'type': 'region',
        'lng': 106.6684253769,
        'lat': 29.5026838847
      },
      {
        'id': 'QY-00000020',
        'name': '江北区',
        'type': 'region',
        'lng': 106.5804183861,
        'lat': 29.6128323141
      },
      {
        'id': 'QY-00000022',
        'name': '九龙坡区',
        'type': 'region',
        'lng': 106.5175549665,
        'lat': 29.5079274012
      },
      {
        'id': 'QY-00000023',
        'name': '南岸区',
        'type': 'region',
        'lng': 106.6684253769,
        'lat': 29.5026838847
      },
      {
        'id': 'QY-00000024',
        'name': '北碚区',
        'type': 'region',
        'lng': 106.4022844035,
        'lat': 29.8111559645
      },
      {
        'id': 'QY-00000027',
        'name': '巴南区',
        'type': 'region',
        'lng': 106.5474505739,
        'lat': 29.4084739532
      }
    ]
  },
  'count': 1,
  'message': 'success'
}

export function getRegionList() {
  return data
}