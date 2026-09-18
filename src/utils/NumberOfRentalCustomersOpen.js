import * as cosmicFilter from '@/utils/cosmicFilter';

function NumberOfRentalCustomersOpen(item) {
    console.log("今年出租面积分析跳转入参：", item);

    // 参数验证
    if (!item.openType && !item.name && !item.phone) {
        console.warn("缺少必要的跳转类型参数");
        return;
    }

    // 基础配置
    const baseUrl = process.env.VUE_APP_API_URL;
    const config = {
        filterParam: [
            cosmicFilter.getFilter2("billstatus", "equals", "C") // 公共过滤条件
        ],
        filterCusParam: {}
    };

    // 策略处理函数
    const handlePhoneStrategy = () => {
        config.formId = "cqkd_ht";
        config.filterCusParam = {
            type: "4",
            startMonth: item.startMonth,
            endMonth: item.endMonth
        };

        // 动态添加过滤条件
        const dynamicFilters = [
            "areaId", "assetStatus", "assetStructureId", "companyId",
            "itemId", "keyWord", "phone", "priceId", "streetId"
        ];

        dynamicFilters.forEach(field => {
            if (item[field] !== undefined && item[field] !== null) {
                const operator = Array.isArray(item[field]) ? "in" : "equals";
                config.filterParam.push(cosmicFilter.getFilter2(field, operator, item[field]));
            }
        });
    };

    // 策略映射表
    const strategyMap = {
        // 名称类型策略
        name: {
            "在租客户数": () => {
                config.formId = "cqkd_ht";
                config.filterCusParam = { type: "1" };
                config.filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0", "1"]));
            },
            "在租合同数": () => {
                config.formId = "cqkd_ht";
                config.filterCusParam = { type: "2" };
                config.filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0", "1"]));
            },
            "合同到期数": () => {
                config.formId = "cqkd_ht";
                config.filterCusParam = { type: "3" };
                config.filterParam.push(cosmicFilter.getFilter2("cqkd_zlzt", "not_equals", "3"));
            },
            "欠租金额": () => {
                config.formId = "cqkd_ht_periodbill";
                config.filterCusParam = { type: "1", day: -30 };
                config.filterParam.push(
                    cosmicFilter.getFilter2("cqkd_zq_qshz", "not_equals", "0"),
                    cosmicFilter.getFilter2("cqkd_zqzd_entity.cqkd_zq_fylx.cqkd_fylx_zd", "not_in", ['保证金', '财政补贴'])
                );
            }
        },
        // 开放类型策略
        openType: {
            "1": () => {
                config.formId = "cqkd_release_contract";
                config.filterCusParam = { type: "1" };
                config.filterParam.push(
                    cosmicFilter.getFilter2("cqkd_htsfyx", "equals", "0"),
                    cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0", "3"])
                );
            },
            "2": () => {
                config.formId = "cqkd_release_contract";
                config.filterCusParam = { type: "1" };
                config.filterParam.push(
                    cosmicFilter.getFilter2("cqkd_htsfyx", "equals", "0"),
                    cosmicFilter.getFilter2("cqkd_zlzt", "in", ["0"])
                );
            },
            "3": () => {
                config.formId = "cqkd_release_contract";
                config.filterCusParam = { type: "1" };
                config.filterParam.push(
                    cosmicFilter.getFilter2("cqkd_htsfyx", "equals", "0"),
                    cosmicFilter.getFilter2("cqkd_zlzt", "in", ["3"])
                );
            }
        },
        // 电话类型策略 - 动态处理
        phone: () => handlePhoneStrategy()
    };

    // 确定策略类型和值
    let strategyType, strategyValue;
    if (item.openType) {
        strategyType = "openType";
        strategyValue = item.openType;
    } else if (item.phone) {
        strategyType = "phone";
        strategyValue = "phone"; // 不需要具体值
    } else if (item.name) {
        strategyType = "name";
        strategyValue = item.name;
    } else {
        console.error("无法确定跳转策略类型");
        return;
    }

    // 执行策略
    if (strategyType === "phone") {
        strategyMap.phone();
    } else {
        const strategy = strategyMap[strategyType][strategyValue];
        if (strategy) {
            strategy();
        } else {
            console.error(`未定义的跳转类型[${strategyType}]: ${strategyValue}`);
            return;
        }
    }

    // 构建URL
    const openUrl = `${baseUrl}?formId=bos_list&billFormId=${config.formId}&type=list` +
        `&filterParam=${encodeURIComponent(JSON.stringify(config.filterParam))}` +
        `&filterCusParam=${encodeURIComponent(JSON.stringify(config.filterCusParam))}`;

    console.log("跳转地址：", openUrl);
    window.open(openUrl);
}

export { NumberOfRentalCustomersOpen };