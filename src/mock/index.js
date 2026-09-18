import Mock from 'mockjs'
import { getRegionList } from './region'
import { getStreetList, getStreetSelectData } from './street'
import { getSelectData } from './select'
import { getItemList } from './item'
import { getAssetList, getAssetSelectData, getAssetTotal } from './asset'
import { getAppToken, getAccessToken } from './token';

const Random = Mock.Random

/**
 * 区域 mock 数据
 */
Mock.mock(
  `/kapi/v2/cqkd/cqkd_assets/queryRegisonApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  () => getRegionList()
)

/**
 * 街道 mock 数据
 */
Mock.mock(
  `/kapi/v2/cqkd/cqkd_assets/queryStreetByRegionApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  (data) => {
    let body = JSON.parse(data.body)
    let regionId = body.regionId
    return getStreetList(regionId)
  }
)

/**
 * 项目 mock 数据
 */
Mock.mock(
  `/kapi/v2/cqkd/cqkd_assets/queryItemByFilterApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  (data) => {
    let body = JSON.parse(data.body)
    let streetId = body.streetId
    let condition = {}
    condition.companyId = body.companyId
    condition.regionId = body.regionId
    condition.streetId = body.streetId
    condition.assetStatus = body.assetStatus
    condition.assetStructureId = body.assetStructureId
    condition.areaId = body.areaId
    condition.priceId = body.priceId
    condition.keyWord = body.keyWord
    return getItemList(streetId, condition)
  }
)

/**
 * 资产 mock数据
 */
Mock.mock(
  `/kapi/v2/cqkd/cqkd_assets/queryAssetByItemApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  (data) => {
    let body = JSON.parse(data.body)
    let streetId = body.streetId
    let condition = {}
    condition.companyId = body.companyId
    condition.streetId = body.streetId
    condition.itemId = body.itemId
    condition.assetStatus = body.assetStatus
    condition.assetStructureId = body.assetStructureId
    condition.areaId = body.areaId
    condition.priceId = body.priceId
    condition.keyWord = body.keyWord
    return getAssetList(streetId, condition)
  }
)

Mock.mock(
  `/kapi/v2/cqkd/cqkd_assets/queryAssetStatisticsApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  () => getAssetTotal()
)

/**
 * 页面顶部选项 mock 数据
 */
Mock.mock(
  `/kapi/v2/cqkd/cqkd_assets/queryBaseDataApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  () => getSelectData()
)

/**
 * 页面顶部 街道选项 mock 数据
 */
Mock.mock(
  `/kapi/v2/cqkd/cqkd_sjfxyy/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  (data) => {
    let body = JSON.parse(data.body)
    switch (body.int_code) {
      case 'get_street_list':
        return getStreetSelectData()
      case 'get_project_list':
        return getAssetSelectData()
    }

  }
)

/**
 * 页面头部街道 mock 数据
 */
Mock.mock(
  `/kapi/v2/cqkd/cqkd_assets/queryStreetIdAndNameApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
  'post',
  (data) => {
    let body = JSON.parse(data.body)
    let regionId = body.regionId
    return getStreetList(regionId)
  }
)

Mock.mock(
  `/api/getAppToken.do`,
  'post',
  (data) => getAppToken()
)

Mock.mock(
  `/api/login.do`,
  'post',
  (data) => {
    let body = JSON.parse(data.body)
    let phone = body.phone
    let apptoken = body.apptoken
    return getAccessToken(phone, apptoken)
  }
)