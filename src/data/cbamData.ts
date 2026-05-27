import { StepDetail, IndustryDetail } from '../types';

export const FREE_ALLOCATION_SHEDULE = [
  { year: 2026, factor: 0.975, label: "2026 (正式开征，2.5%征收)" },
  { year: 2027, factor: 0.950, label: "2027 (5.0%征收)" },
  { year: 2028, factor: 0.900, label: "2028 (10%征收)" },
  { year: 2029, factor: 0.775, label: "2029 (22.5%征收)" },
  { year: 2030, factor: 0.515, label: "2030 (48.5%征收)" },
  { year: 2031, factor: 0.390, label: "2031 (61.0%征收)" },
  { year: 2032, factor: 0.265, label: "2032 (73.5%征收)" },
  { year: 2033, factor: 0.140, label: "2033 (86.0%征收)" },
  { year: 2034, factor: 0.000, label: "2034 (100%全面征收)" },
];

export const STEPS_DATA: StepDetail[] = [
  {
    id: "step1",
    label: "5%",
    subLabel: "产品级核算误差上限",
    badge: "合规门槛",
    color: "#3b82f6", // Blue
    desc: "实报实销与惩罚性缺省值的博弈。欧盟要求申报数据必须具备可追溯性和极高精度。",
    details: [
      "若中欧企业在核查中误差或偏离值超过5%，欧盟官方将判定数据不合规，强制采用恶劣的‘惩罚性缺省值’进行计算。",
      "缺省值通常基于出口国碳效率最差的前10%企业设置，这将成倍增加出口碳成本成本。",
      "小时级碳溯源与数字化产品凭证（DPP）是保证实报实销、规避缺省惩罚的必备底座。"
    ]
  },
  {
    id: "step2",
    label: "75.36",
    subLabel: "欧元/吨 抵扣上限",
    badge: "价格门槛",
    color: "#eab308", // Yellow / Accent
    desc: "抵扣上限以欧盟近三月碳价均值为基准，且仅承认‘已在出口国实际支付’的部分。",
    details: [
      "草案规定，唯有原产国（如中国）实际发生的碳排放有偿支付（如CEA交易成本）且无隐性返还，才可等额申请扣减。",
      "非有偿配额（如免费配额、地方补贴或奖励政策等）在欧盟一律无法享受减免抵扣。",
      "必须向欧盟提交官方核发的出纳发票、注销凭证以及由中国合格评定国家认可委员会（CNAS）类似机构出具的双重审计。"
    ]
  },
  {
    id: "step3",
    label: "8倍",
    subLabel: "中欧碳价鸿沟",
    badge: "成本红利",
    color: "#ef4444", // Red
    desc: "中欧碳价差是企业最直接的财务压力源。目前国内碳价约100元人民币/吨（13欧元），而欧盟保持在80-100欧元/吨。",
    details: [
      "这一鸿沟直接决定了中国出口制造即便完成CEA履约抵扣，仍需补缴高达70%~90%的欧盟差额碳关税。",
      "低碳排放强度的企业将能显著抹平这8倍劣势。能耗每削减20%，在欧盟的竞争成本优势可能放大约2.5倍。",
      "高能耗低效率的‘伪合规’在8倍重压下将被市场自动淘汰。"
    ]
  },
  {
    id: "step4",
    label: "97.5%",
    subLabel: "2026年免费配额因子",
    badge: "爬坡缓冲",
    color: "#10b981", // Green
    desc: "欧盟为本地工业提供的免费配额将在2026-2034年间逐年递减，这也是CBAM征收比例的缓冲器。",
    details: [
      "在2026年，欧盟为了公平竞争，CBAM仅针对未受欧盟免费配额保护的‘2.5%净敞口’进行收费，此时实际负担极小。",
      "按时间表，免费配额比例随年份递减，在2030年骤降至51.5%（征收比例达48.5%），2034年正式归零并全面重税征收。",
      "此机制提供了一个宝贵的‘8年低成本合规窗口期’，催促企业必须在这八年内完成全产业链脱碳技术改造。"
    ]
  }
];

export const INDUSTRIES_DATA: IndustryDetail[] = [
  {
    id: "steel",
    name: "钢铁",
    color: "#ef4444", // Red
    defaultIntensity: 2.0, // standard BF-BOF
    emissionType: "both",
    defaultImpact: "+150 欧元/吨 (长流程吨排 ~2.0吨)",
    customDetail: "国内基本为长流程高炉炼铁（约2.0吨排放），电弧炉短流程仅约0.4-0.6吨。欧美多为短流程或天然气DRI，这使我国钢铁出口承担极大的差值税。",
    description: "受双碳管控最严格的大宗商品，涉及板材、棒线材、钢轨及管道等全系列出口产品。对精度核算要求最高。",
    unit: "吨螺纹钢/板材",
    mitigationAdvise: [
      "引入废钢炉电炉短流程替代高炉长流程",
      "氢冶金（绿氢DRI）技术升级与中长期高比例混氢",
      "使用碳捕集、利用与封存（CCUS）捕捉工艺CO2"
    ]
  },
  {
    id: "aluminum",
    name: "铝",
    color: "#9b2c2c", // Dark Red
    defaultIntensity: 15.0, // Electrolytic coal power
    emissionType: "both",
    defaultImpact: "+1130 欧元/吨 (吨排 ~15.0吨 CO₂e)",
    customDetail: "电解铝是我国能源消耗极高的行业。使用火电的电解铝每吨排放高达14-16吨 CO2e，而水电铝或再生铝则能控制在2吨以内甚至更低。CBAM过渡期后若直接计入间接排放成本极其恐怖。",
    description: "铝土矿、精炼铝、铝型材及铝箔。欧盟市场因新能源汽车轻量化需求对低碳铝存在巨大溢价。",
    unit: "吨电解铝/铝制品",
    mitigationAdvise: [
      "‘北铝南移’、‘西铝东输’，将生产线向水电、风光资源富集区（如云南、青海）迁移",
      "极力提高再生铝（二次铝）回收再利用比例，吨排骤降95%",
      "通过零碳直供电网获取100%可溯源绿电凭证"
    ]
  },
  {
    id: "cement",
    name: "水泥",
    color: "#f97316", // Orange
    defaultIntensity: 0.85,
    emissionType: "direct",
    defaultImpact: "+66 欧元/吨 (工艺及燃烧排放 ~0.85吨)",
    customDetail: "主要包含熟料生产过程中的石灰石分解（工艺排放占60%以上）和煤炭燃料。属于‘难以脱碳（Hard-to-abate）’行业，难以通过简单用能清洁化解决。",
    description: "受水运半径和重量制约，整体出口额比例偏低，但被设定为CBAM首批标杆品类。间接排放暂未完全强制征收。",
    unit: "吨水泥熟料",
    mitigationAdvise: [
      "使用钢渣、粉煤灰等电石渣或非碳酸盐原料替代石灰石熟料",
      "利用富氧燃烧和炉窑深度余热回收发电降低标煤能耗",
      "布局工业窑炉烟气CCUS，进行资源化利用"
    ]
  },
  {
    id: "fertilizer",
    name: "化肥",
    color: "#d69e2e", // Yellow green / gold
    defaultIntensity: 2.0, // Synthetic ammonia
    emissionType: "both",
    defaultImpact: "+160 欧元/吨 (加成较高，氮肥吨排 ~2.0吨)",
    customDetail: "合成氨、硝酸等含氮肥料排放较大。煤化工路线吨排偏高。欧美合成氨企业多依赖平价天然气，吨排在1.5-1.8吨左右，中国企业若未配备绿氢氨技术，税负成本占货值的比例将居高不下。",
    description: "含氮多元肥料、合成氨。涉及农业原材料成本，影响极其敏感。",
    unit: "吨含氮化肥 (合成氨折纯)",
    mitigationAdvise: [
      "用可再生能源风光水电解水制‘绿氢’，再合成自产‘零碳绿氨’",
      "优化炉温提高煤气化效率，升级催化剂降低NOx高潜能温室效应逸散",
      "副产CO2深度利用于食品级干冰及尿素高值捕集"
    ]
  },
  {
    id: "electricity",
    name: "电力",
    color: "#3b82f6", // Blue
    defaultIntensity: 0.58, // average coal/gas grid MWh
    emissionType: "direct",
    defaultImpact: "+38 欧元/MWh (需要严格的绿电及小时级结算)",
    customDetail: "电力核算要求极高。如无专属直供给欧洲负荷（通常指陆地接壤地区）或无可溯源的小时级无碳发电凭证，欧盟常采用高碳因数缺省电力值惩罚。",
    description: "主要针对欧盟周边接壤输电国。我国西电东送及周边输电网络在中欧互联大局中具深远战略意义。",
    unit: "兆瓦时 (MWh)",
    mitigationAdvise: [
      "配备实时小时级发电和入网溯源仪表（24/7 matching）",
      "100%直供新能源（风电、光伏、光热配储能）物理组网",
      "取得与欧洲AIB成员国接轨认可的无碳绿证（GO/REC）"
    ]
  },
  {
    id: "hydrogen",
    name: "氢气",
    color: "#8b5cf6", // Purple
    defaultIntensity: 10.0, // Gray SMR hydrogen
    emissionType: "both",
    defaultImpact: "特殊核算·依据绿氢路径分类 (标准待定)",
    customDetail: "灰氢（天然气SMR/煤气化）吨排高达10-20吨二氧化碳。欧盟对进口氢设定了极为严苛的反稀释和加法准则。只承认结合严格地理/时间相关性的可再生氢（RFHBO）。",
    description: "新型绿色零碳二次能源载体，欧盟作为高潜能战略资源，未来正引导全球‘绿氢贸易圈’。",
    unit: "吨纯氢 (H2)",
    mitigationAdvise: [
      "彻底告别灰氢，建设规模化离网风光制绿氢项目",
      "严格匹配欧盟可再生燃料指令（RED II）所要求的‘物理额外性’等三项黄金法则",
      "提高氢气长距离储运设备（如低温液氢、液态有机物LOHC）运行效率"
    ]
  }
];
