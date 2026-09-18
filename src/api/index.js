// api接口调用
import request from './request'
import aes from '@/utils/aes'

/**
 * 权限校验
 * @param phone 手机号
 * @returns {*}
 */
export function checkAuthority(phone) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/permissionVerification?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {phone}
    })
}

/**
 * 获取区域列表
 * @param phone 手机号
 * @returns {*}
 */
export function getRegionList(phone) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/queryRegisonApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {phone}
    })
}

/**
 * 获取街道列表
 * @param phone 手机号
 * @param regionId 区域id
 * @returns {*}
 */
export function getStreetList(phone, regionId = null) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/queryStreetByRegionApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {phone, regionId}
    })
}

/**
 * 获取无条件数据
 * @param code 配置代码
 */

// 查询合同到期数
export function getUnconditionalData(code) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {
            "int_code": code,
        }
    })
}

/**
 * 获取项目列表
 * @param phone 手机号
 * @param streetId 街道ID
 * @param condition 查询条件
 * @returns {*}
 */
export function getItemList(phone, streetId = null, condition = {}) {
    let data = {phone, streetId}
    if (JSON.stringify(condition) !== '{}') {
        // 若condition查询条件不为空对象
        // 将condition中的所有属性添加到data中
        let keys = Object.keys(condition)
        keys.forEach(key => {
            let value = condition[key]
            if (value) data[key] = value
        })
    }
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/queryItemByFilterApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: data
    })
}

/**
 * 获取资产列表
 * @param phone 手机号
 * @param streetId 街道id
 * @param condition 查询条件
 * @returns {*}
 */
export function getAssetList(phone, streetId = null, condition = {}) {
    let data = {phone, streetId}
    if (JSON.stringify(condition) !== '{}') {
        // 若condition查询条件不为空对象
        // 将condition中的所有属性添加到data中
        let keys = Object.keys(condition)
        keys.forEach(key => {
            let value = condition[key]
            if (value) data[key] = value
        })
    }
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/queryAssetByItemApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: data
    })
}

/**
 * 获取资产、项目列表
 * @param phone 手机号
 * @param streetId 街道id
 * @param condition 查询条件
 * @returns {*}
 */
export function getAssetProjectList(phone, streetId = null, condition = {}) {
    let data = {phone, streetId}
    if (JSON.stringify(condition) !== '{}') {
        // 若condition查询条件不为空对象
        // 将condition中的所有属性添加到data中
        let keys = Object.keys(condition)
        keys.forEach(key => {
            let value = condition[key]
            if (value) data[key] = value
        })
    }
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/queryAssetProByItemApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: data
    })
}

/**
 * 获取资产统计数据
 * @param {string} phone
 * @param {string} streetId
 * @param {object} condition
 */
export function getAssetTotal(phone, streetId = null, condition = {}) {
    let data = {phone, streetId}
    if (JSON.stringify(condition) !== '{}') {
        let keys = Object.keys(condition)
        keys.forEach(key => {
            let value = condition[key]
            if (value) data[key] = value
        })
    }
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/queryAssetStatisticsApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: data
    })
}

/**
 * 获取首页顶部 多个选项的数据
 * @param phone 手机号
 * @returns {*}
 */
export function getSelectData(phone) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/queryBaseDataApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {phone}
    })
}


/**
 * 获取首页顶部 街道选项数据
 */
export function getStreetSelectData() {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {
            "int_code": "get_street_list",
            "int_db": "secd"
        }
    })
}

/**
 * 获取项目关联的资产卡片的财务入账价值
 */
export function getProAssetBookValue(proId) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {
            "int_code": "get_pro_asset_finvalue",
            "int_db": "secd",
            "filter": {
                "fk_cqkd_asset_ssxm": proId
            }
        }
    })
}

/**
 * 获取首页顶部 项目选项的数据
 * @param streetId 街道选项id
 * @returns {*}
 */
export function getItemSelectData(streetId) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {
            "int_code": "get_project_list",
            "int_db": "secd",
            "filter": {
                "fk_cqkd_street": streetId
            }
        }
    })
}

/**
 * 获取 获取appToken
 * @returns {*}
 */
export function getAppToken() {
    console.log("process.env===", process.env);
    return request({
        url: `/api/getAppToken.do`,
        method: 'post',
        data: {
            appId: process.env.VUE_APP_COSMIC_APPID,
            appSecret: process.env.VUE_APP_COSMIC_APPSECRET,
            tenantid: process.env.VUE_APP_COSMIC_TENANTID,
            accountId: process.env.VUE_APP_COSMIC_ACCOUNTID,
            language: process.env.VUE_APP_COSMIC_LANGUAGE
        }
    })
}

/**
 * 获取 accessToken
 * @param phone
 * @param apptoken
 */
export function getAccessToken(phone, apptoken) {
    return request({
        url: `/api/login.do`,
        method: 'post',
        data: {
            'user': aes.decrypt(phone),
            'apptoken': apptoken,
            'tenantid': process.env.VUE_APP_COSMIC_TENANTID,
            'accountId': process.env.VUE_APP_COSMIC_ACCOUNTID,
            'usertype': 'Mobile'
        }
    })
}

/**
 * 查询资产详情
 * @param {String} id
 * @returns
 */
export function getAssetDetail(id) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/getAssetInfoById?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {id}
    })
}

/**
 * 查询项目详情
 * @param {String} id
 * @returns
 */
export function getProjectDetail(id) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/getProjectInfoById?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {id}
    })
}

/**
 * 获取年收入
 * @param {long} projectId
 * @returns
 */
export function getCurYearTotalIncomeCompose(projectId) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/getCurYearTotalIncomeCompose?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {projectId}
    })
}

/**
 * 应收
 * @param {long} projectId
 * @returns
 */
export function getYearReceivableCompare(projectId) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/getYearReceivableCompare?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
    })
}

/**
 * 实收
 * @param {long} projectId
 * @returns
 */
export function getYearReceiptsCompare(projectId) {
    return request({
        url: `/kapi/v2/cqkd/cqkd_assets/getYearReceiptsCompare?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
    })
}