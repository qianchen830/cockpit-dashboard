const appToken = {
  'data': {
    'app_token': 'efdf78a2-b01d-4385-8db8-5019fcb8ebf1',
    'success': true,
    'error_desc': '',
    'expire_time': 1683878393526,
    'error_code': '0'
  },
  'state': 'success',
  'status': true
}

const accessToken = {
  'data': {
    'access_token': '1681283910979289088_ofMIaoIkg3i6bn1BwpMS2aYBvDgDr95CtE31bY8z2QI18jAqvpgyTYTM15yuS9kAST2JyTDqwZTQv3ARBBYRxsBxLFtzY6wtz2dF',
    'success': true,
    'error_desc': '',
    'expire_time': 1683878556353,
    'error_code': '0'
  },
  'state': 'success',
  'status': true
}


export function getAppToken() {
  return appToken
}

export function getAccessToken() {
  return accessToken
}