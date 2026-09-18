import * as cosmicFilter from '@/utils/cosmicFilter';

/**
 * 打开星瀚列表
 * @param formId    单据标识
 * @param openType  打开类型
 * @param param 参数
 */
export function openCosmicListPage(formId, openType, param) {
    console.log("==formId==", formId);
    console.log("==openType==", openType);
    console.log("==param==", param);
    if (!formId || !openType || !param) {
        console.log("缺少必要的跳转类型参数");
        return;
    }
    //基础地址
    const baseUrl = process.env.VUE_APP_API_URL;
    //字段过滤参数
    let filterParam = [];
    if ("cqkd_zqzd" !== formId) {
        //不为合同账期账单添加公共条件
        filterParam.push(cosmicFilter.getFilter2("billstatus", "equals", "C")); // 公共过滤条件
    }
    //自定义过滤参数
    let filterCusParam = {};
    if (formId === "cqkd_release_contract") {
        filterCusParam.type = openType;
        //新租退租池
        switch (openType) {
            case "1":
                //净增加面积
                filterParam.push(cosmicFilter.getFilter2("cqkd_htsfyx", "equals", "0")); // 合同是否有效
                filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0", "3"])); // 合同租赁状态
                break
            case "2":
                //新增加面积
                filterParam.push(cosmicFilter.getFilter2("cqkd_htsfyx", "equals", "0")); // 合同是否有效
                filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0"])); // 合同租赁状态
                break
            case "3":
                //退租面积总数
                filterParam.push(cosmicFilter.getFilter2("cqkd_htsfyx", "equals", "0")); // 合同是否有效
                filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["3"])); // 合同租赁状态
        }
    } else if (formId === "cqkd_ht") {
        //租赁合同
        filterCusParam.type = openType;
        switch (openType) {
            case "1":
                //在租客户数
                filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0", "1"])); // 合同租赁状态
                break
            case "2":
                //在租合同数
                filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0", "1"])); // 合同租赁状态
                break
            case "3":
                //合同到期数
                filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0", "1"]));// 合同租赁状态
                break
            case "4":
                //合同到期预警
                let keys = Object.keys(param);
                if (keys) {
                    keys.forEach(key => {
                        let value = param[key];
                        if (value) {
                            filterCusParam[key] = value;
                        }
                    })
                }
                break
        }
    } else if (formId === "cqkd_ht_periodbill") {
        //合同-账期账单(PC布局)
        filterCusParam.type = openType;
        switch (openType) {
            case "1":
                //欠租金额
                filterCusParam.day = -30;
                filterParam.push(cosmicFilter.getFilter2("cqkd_zqzd_entity.cqkd_zq_qshz", "not_equals", 0)); // 欠租汇总
                filterParam.push(cosmicFilter.getFilter2("cqkd_zqzd_entity.cqkd_zq_fylx.cqkd_fylx_zd", "not_in", ['保证金', '财政补贴'])); // 费用类型
                break
        }
    } else if (formId === "cqkd_zqzd") {
        //合同账期账单
        filterCusParam.type = openType;
        switch (openType) {
            case "1":
                //欠租金额
                filterCusParam.day = -31;
                filterParam.push(cosmicFilter.getFilter2("cqkd_contract.status", "equals", "C")); // 合同状态
                filterParam.push(cosmicFilter.getFilter2("cqkd_zq_qshz", "not_equals", 0)); // 欠租汇总
                filterParam.push(cosmicFilter.getFilter2("cqkd_zq_fylx.cqkd_fylx_zd", "not_in", ['保证金', '财政补贴'])); // 费用类型
                break
        }
    } else if (formId === "cqkd_assetcard") {
        //资产卡片
        filterCusParam.type = openType;
        switch (openType) {
            case "1":
                //资产总量
                filterParam.push(cosmicFilter.getFilter2("cqkd_asset_jzmj", "large_than", 0)); // 建筑面积
                filterParam.push(cosmicFilter.getFilter2("cqkd_sfky", "equals", '1')); // 是否可用
                break
            case "2":
                //资产卡片：项目
                filterCusParam.proId = param.proId;
                filterParam.push(cosmicFilter.getFilter2("cqkd_sfky", "equals", "1"));//是否可用
        }
    }
    console.log("跳转星瀚filterParam参数：", filterParam);
    console.log("跳转星瀚filterCusParam参数：", filterCusParam);
    //构建跳转地址
    const openUrl = `${baseUrl}?formId=bos_list&billFormId=${formId}&type=list` +
        `&filterParam=${encodeURIComponent(JSON.stringify(filterParam))}` +
        `&filterCusParam=${encodeURIComponent(JSON.stringify(filterCusParam))}`;
    console.log("跳转星瀚地址：", openUrl);
    window.open(openUrl);
}

/**
 * 打开星瀚单据页面
 * @param formId    单据标识
 * @param id  打开类型
 * @param param 参数
 */
export function openCosmicFormPage(formId, id, param) {
    //基础地址
    const baseUrl = process.env.VUE_APP_API_URL;
    //自定义传递参数
    let filterCusParam = {};
    let keys = Object.keys(param);
    if (keys) {
        keys.forEach(key => {
            let value = param[key];
            if (value) {
                filterCusParam[key] = value;
            }
        })
    }
    //构建跳转地址
    const openUrl = `${baseUrl}/index.html?formId=${formId}&operationStatus=view&pkId=${id}` +
        `&filterCusParam=${encodeURIComponent(JSON.stringify(filterCusParam))}`;
    console.log("跳转星瀚地址：", openUrl);
    window.open(openUrl);
}