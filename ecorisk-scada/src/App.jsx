import React, { useState } from 'react';
import { 
  Leaf, Factory, Cpu, Zap, Flame, Activity, AlignVerticalSpaceAround,
  Database, Network, Boxes, Gauge, FileBadge2, Download, 
  Droplets, Fan, ShieldCheck, Thermometer, ArrowRight, Settings, Sliders,
  FileText, TrendingDown, AlertTriangle, ShieldAlert, Coins, DollarSign, TrendingUp
} from 'lucide-react';

// --- 產業、金管會合規、以及銀行授信評估資料庫 (結合財務壓力測試基本面) ---
const industryData = {
  steel: {
    id: 'steel', name: '鋼鐵產業',
    mechanism: '針對高爐、轉爐等高溫熔煉製程，監控直接燃料投入量與還原劑消耗。現場地磅與焦碳、鐵礦砂進料系統串聯，防止原料虛報與數據篡改。',
    nodes: [
      { title: '高爐煉鐵製程', status: 'NORMAL', electric: '850', heat: '4,200', output: '鐵水 150t/h', yieldRate: '98.5', carbon: '215.4', active: true, visualType: 'blast-furnace', visualMetrics: { temp: '1,500°C', input: '煤/鐵礦', loss: '廢熱 12%' } },
      { title: '轉爐吹氧精煉', status: 'ALERT', electric: '1,200', heat: '850', output: '粗鋼 145t/h', yieldRate: '96.2', carbon: '85.2', active: false, warning: '吹氧流率異常，熱效降低', visualType: 'converter-furnace', visualMetrics: { current: '45kA', temp: '1,650°C', flow: 'O2 800m³' } },
      { title: '熱軋成型機組', status: 'NORMAL', electric: '2,100', heat: '120', output: '鋼捲 140t/h', yieldRate: '99.1', carbon: '12.8', active: true, visualType: 'rolling-mill', visualMetrics: { rpm: '1,200 RPM', pressure: '85MPa', power: '2.1MW' } }
    ],
    // 授信基本財務底票 (Bank Credit Foundation)
    finance: {
      annualEmissions: 180000, // 估算年總排放量 (tCO2e)
      ebitdaBeforeCarbon: 12500000, // 營業未計碳成本前之 EBITDA (USD)
      annualDebtService: 3200000, // 每年應還本息總額 (USD)
      defaultPrice: 30, // 預設碳價
      defaultAllowance: 80, // 預設免費配額比例 %
    },
    complianceMetrics: [
      { id: 'FSC-ST01', category: '溫室氣體範疇一', label: '冶煉直接排放總量', value: '112,450 tCO2e', ratio: '62.4%', target: '符合氣候法碳費申報門檻', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-ST02', category: '溫室氣體範疇二', label: '外購電力間接排放', value: '67,550 tCO2e', ratio: '37.6%', target: '經濟部契約容量契綠能條款', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-ST03', category: 'CBAM申報合規', label: '歐盟進口鋼鐵嵌入碳排', value: '1.45 tCO2e/t-Steel', ratio: 'N/A', target: 'CBAM過渡期申報規範', status: '核對無誤 (BSI 第三方)' },
      { id: 'FSC-ST04', category: '過渡計劃與轉型實務', label: '低碳冶金與混氫高爐轉型', value: '減碳率 8.5%', ratio: '對比基準年', target: '產發署「高碳轉型」專案補助', status: '執行中' }
    ],
    products: [
      { name: '規格熱軋鋼捲 (HS-HRC)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量與熱值分配法 (Mass & Thermal Allocation)', primarySource: '機台智慧電表 + 原料地磅實時磅單', factorSource: '國家溫室氣體排放係數資料庫 v8.1', intensity: '1.85 tCO2e/噸', trend: '↓ 3.2% 較前季' }
    ],
    sllLink: {
      icp: '$373,275 USD',
      intensity: '1.42 t/噸',
      discount: '- 15.0 bps',
      saving: '↓ 3.2%',
      scopePct: { s1: 61, s2: 39, s3: 0 }
    }
  },
  petrochemical: {
    id: 'petrochemical', name: '煉油/石化產業',
    mechanism: '依產發署溫室氣體減量指引，聚焦常減壓蒸餾與裂解製程之化石燃料直接燃燒與製程尾氣（如甲烷、乙烷）回收能效。全面對接DCS系統及連續排放監測 (CEMS)。',
    nodes: [
      { title: '常減壓蒸餾系統', status: 'NORMAL', electric: '920', heat: '5,100', output: '餾分油 450t/h', yieldRate: '99.1', carbon: '280.5', active: true, visualType: 'blast-furnace', visualMetrics: { temp: '370°C', feed: '原油 450t', pressure: '0.3MPa' } },
      { title: '乙烯輕油裂解爐', status: 'NORMAL', electric: '1,450', heat: '6,200', output: '乙烯 120t/h', yieldRate: '98.2', carbon: '345.2', active: true, visualType: 'converter-furnace', visualMetrics: { temp: '850°C', input: '石腦油', efficiency: '熱效 92%' } },
      { title: '多級精餾與分離系統', status: 'ALERT', electric: '1,800', heat: '250', output: '丙烯/丁二烯', yieldRate: '95.5', carbon: '35.4', active: false, warning: '冷凝端壓降異常，能耗增加', visualType: 'scrubber', visualMetrics: { temp: '85°C', reflux: '比率 2.4', column: '38 階' } }
    ],
    finance: {
      annualEmissions: 320000,
      ebitdaBeforeCarbon: 22000000,
      annualDebtService: 5500000,
      defaultPrice: 30,
      defaultAllowance: 85,
    },
    complianceMetrics: [
      { id: 'FSC-PET01', category: '溫室氣體範疇一', label: '蒸餾與裂解製程燃燒排放', value: '218,240 tCO2e', ratio: '68.2%', target: '符合環境部 CEMS 連線申報規範', status: '連線驗證通過' },
      { id: 'FSC-PET02', category: '溫室氣體範疇一', label: '儲罐區 VOCs 逸散與精煉折算', value: '43,840 tCO2e', ratio: '13.7%', target: '金管會逸散申報與 LDAR 檢測', status: '符合檢測標準' },
      { id: 'FSC-PET03', category: '溫室氣體範疇二', label: '重型泵浦與壓縮機動力電耗', value: '57,920 tCO2e', ratio: '18.1%', target: '經濟部馬達能效提升計畫標準', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-PET04', category: '循環經濟轉型', label: '製程尾氣再生燃料替代比例', value: '替代率 12%', ratio: '相較基準值', target: '產發署石化產業轉型特別補助', status: '進行中' }
    ],
    products: [
      { name: '裂解高純度乙烯單體 (Ethylene)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量分配法 (Mass Allocation)', primarySource: '裂解爐中控計量 + 儲罐出口流量閥', factorSource: '國家溫室氣體排放係數資料庫 v8.1', intensity: '1.32 tCO2e/噸', trend: '↓ 1.5% 較前季' },
      { name: '環保去芳香烴溶劑油 (D80)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量與熱值分配法 (Mass & Enthalpy Allocation)', primarySource: 'DCS系統出料閥 + MES批次銷售地磅', factorSource: 'IPCC 2006 國家溫室氣體清單指南', intensity: '1.18 tCO2e/噸', trend: '↓ 2.4% 較前季' }
    ],
    sllLink: {
      icp: '$922,650 USD',
      intensity: '1.25 t/噸-產品',
      discount: '- 16.5 bps',
      saving: '↓ 4.2%',
      scopePct: { s1: 82, s2: 18, s3: 0 }
    }
  },
  chemical: {
    id: 'chemical', name: '化學製造業',
    mechanism: '監管重點在於「反應合成熱」與「副產品回收」。整合高精度反應釜流量閥、壓力變送器，實時核算伴生與散失碳排，防止化學原料用量虛報。',
    nodes: [
      { title: '自動配料與混料釜', status: 'NORMAL', electric: '420', heat: '150', output: '調和液 80t/h', yieldRate: '99.5', carbon: '12.4', active: true, visualType: 'grinder', visualMetrics: { rpm: '120 RPM', temp: '45°C', purity: '99.5%' } },
      { title: '高溫高壓合成反應釜', status: 'NORMAL', electric: '1,100', heat: '1,800', output: '合成料 50t/h', yieldRate: '98.5', carbon: '85.2', active: true, visualType: 'fab-equipment', visualMetrics: { pressure: '15MPa', temp: '280°C', catalyst: '活化 98%' } },
      { title: '冷凝回收與廢氣洗滌', status: 'ALERT', electric: '350', heat: '0', output: '回收料/達標排放', yieldRate: '95.0', carbon: '45.0', active: false, warning: '噴淋泵壓力偏低，吸收效率下降', visualType: 'scrubber', visualMetrics: { temp: '15°C', vacuum: '-80kPa', recover: '比率 95%' } }
    ],
    finance: {
      annualEmissions: 95000,
      ebitdaBeforeCarbon: 8200000,
      annualDebtService: 1900000,
      defaultPrice: 30,
      defaultAllowance: 90,
    },
    complianceMetrics: [
      { id: 'FSC-CH01', category: '溫室氣體範疇一', label: '非燃燒化學反應直接製程排放', value: '51,775 tCO2e', ratio: '54.5%', target: '符合氣候申報製程非燃料碳排', status: '經 SGS 合格查證' },
      { id: 'FSC-CH02', category: '溫室氣體範疇二', label: '反應釜加熱與冷卻系統電力消耗', value: '31,825 tCO2e', ratio: '33.5%', target: '符合高耗能公用冷卻塔一級標準', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-CH03', category: '溫室氣體範疇三', label: '製程副產物與有機廢液焚化處置', value: '11,400 tCO2e', ratio: '12.0%', target: '永續供應鏈減廢指引標準', status: '合規申報登記' },
      { id: 'FSC-CH04', category: '低碳替代策略', label: '生物基/再生原材料替代比例', value: '替代率 18%', ratio: 'N/A', target: '金管會綠色轉型融資自律規範', status: '驗證通過' }
    ],
    products: [
      { name: '食品級無水檸檬酸 (Citric Acid)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量分配法 (Mass Allocation)', primarySource: '發酵釜電表 + 原料發酵糖蜜進料單', factorSource: '國家溫室氣體排放係數資料庫 v8.1', intensity: '0.68 kgCO2e/kg', trend: '↓ 3.8% 較前季' },
      { name: '環保型增塑劑 (DOTP)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '化學計量分配法 (Stoichiometric)', primarySource: '酯化反應釜感測器 + MES批次生產履歷', factorSource: 'Ecoinvent v3.9 生命週期資料庫', intensity: '1.45 tCO2e/噸', trend: '↓ 2.1% 較前季' }
    ],
    sllLink: {
      icp: '$512,100 USD',
      intensity: '0.98 t/噸-產品',
      discount: '- 14.0 bps',
      saving: '↓ 3.5%',
      scopePct: { s1: 54, s2: 34, s3: 12 }
    }
  },
  cement: {
    id: 'cement', name: '水泥產業',
    mechanism: '聚焦「石灰石煆燒 (Process Emissions)」及「高耗電研磨」。嚴格監控旋窯溫度與替代燃料 (AFR) 投入比例，確保符合 ESG 減碳路徑。',
    nodes: [
      { title: '生料磨與預熱', status: 'NORMAL', electric: '1,500', heat: '350', output: '生料 300t/h', yieldRate: '99.5', carbon: '45.0', active: true, visualType: 'grinder', visualMetrics: { rpm: '850 RPM', temp: '850°C', draft: '-150Pa' } },
      { title: '高溫旋窯 (Kiln)', status: 'NORMAL', electric: '450', heat: '3,800', output: '熟料 200t/h', yieldRate: '98.0', carbon: '185.5', active: true, visualType: 'rotary-kiln', visualMetrics: { temp: '1,450°C', fuel: 'AFR 15%', rotation: '3.5 RPM' } },
      { title: '熟料水泥磨', status: 'NORMAL', electric: '2,800', heat: '0', output: '水泥 210t/h', yieldRate: '99.8', carbon: '18.2', active: true, visualType: 'grinder', visualMetrics: { current: '6.6kV', load: '92%', vibration: '2.1mm/s' } }
    ],
    finance: {
      annualEmissions: 220000,
      ebitdaBeforeCarbon: 11000000,
      annualDebtService: 2800000,
      defaultPrice: 30,
      defaultAllowance: 75,
    },
    complianceMetrics: [
      { id: 'FSC-CEM01', category: '範疇一製程排放', label: '石灰石分解化學反應排放', value: '158,620 tCO2e', ratio: '72.1%', target: '符合氣候法製程直接碳排查證', status: '經 SGS 合格查證' },
      { id: 'FSC-CEM02', category: '範疇一燃料排放', label: '旋窯燃燒燃煤與AFR排放', value: '47,300 tCO2e', ratio: '21.5%', target: '產發署替代燃料(AFR)減量指引', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-CEM03', category: '範疇二能源間接', label: '生料與水泥研磨耗電排放', value: '14,080 tCO2e', ratio: '6.4%', target: '能源局高耗能設備能效一級標準', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-CEM04', category: '循環經濟指標', label: '替代熟料之爐石粉/飛灰使用率', value: '替代率 35%', ratio: 'N/A', target: '產發署循環經濟再利用比例', status: '合格 (符合CNS規範)' }
    ],
    products: [
      { name: '卜特蘭一型水泥 (Portland Cement I)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量分配法 (Mass Allocation)', primarySource: '旋窯中控熟料產能計量計 + 生料粉計重儀', factorSource: 'CNS 15993 國家產品類別規則 (PCR)', intensity: '0.78 tCO2e/噸', trend: '↓ 4.1% 較前季' },
      { name: '綠色低碳預拌混凝土 (3000psi)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量分配法 (Mass Allocation)', primarySource: '批次配料系統 (ERP) 實時配方 + 水表電表', factorSource: '台灣營建研究院混凝土碳足跡庫', intensity: '195 kgCO2e/m³', trend: '↓ 5.5% 較前季' }
    ],
    sllLink: {
      icp: '$516,900 USD',
      intensity: '0.62 t/噸-水泥',
      discount: '- 18.0 bps',
      saving: '↓ 5.2%',
      scopePct: { s1: 94, s2: 6, s3: 0 }
    }
  },
  datacenter: {
    id: 'datacenter', name: '資料中心',
    mechanism: '針對資料中心 PUE (電力使用效率) 進行即時監控。深度整合不斷電系統 (UPS) 與冰水主機，監測冷熱通道氣流與 IT 設備負載之碳排關聯。',
    nodes: [
      { title: '冰水主機 (Chiller)', status: 'NORMAL', electric: '3,200', heat: '0', output: '冷能 4,500RT', yieldRate: '100', carbon: '15.5', active: true, visualType: 'chiller', visualMetrics: { flow: '12k L/m', tempIn: '12°C', tempOut: '7°C' } },
      { title: 'UPS 智能配電', status: 'NORMAL', electric: '8,500', heat: '0', output: '淨電力 8.2MW', yieldRate: '96.5', carbon: '4.2', active: true, visualType: 'ups-grid', visualMetrics: { load: '75%', loss: '3.5%', voltage: '380V' } },
      { title: '高密度運算機房', status: 'ALERT', electric: '8,200', heat: '850', output: '運算力 99.9%', yieldRate: '99.9', carbon: '45.8', active: true, warning: '熱通道氣流短路 (38°C)', visualType: 'server-rack', visualMetrics: { load: '85%', airflow: '15k CFM', temp: '38°C' } }
    ],
    finance: {
      annualEmissions: 85000,
      ebitdaBeforeCarbon: 15000000,
      annualDebtService: 4200000,
      defaultPrice: 30,
      defaultAllowance: 95,
    },
    complianceMetrics: [
      { id: 'FSC-DC01', category: '範疇二耗電指標', label: 'IT 與伺服器核心用電', value: '74,885 tCO2e', ratio: '88.1%', target: '企業 RE100 淨零路徑目標 (30% 綠電)', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-DC02', category: '範疇二廠務耗電', label: '冰水空調與冷卻系統電力', value: '6,715 tCO2e', ratio: '7.9%', target: '符合 PUE 設計規範限制 < 1.3', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-DC03', category: '範疇一逸散排放', label: '冷媒逸散與發電機柴油儲量', value: '3,400 tCO2e', ratio: '4.0%', target: '符合金管會 1-D 類冷媒申報', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-DC04', category: '範疇三上下游', label: '供應鏈與委外伺服器製造範疇三', value: '未列入法定查證', ratio: 'N/A', target: '符合 GRI 305 / ISSB S2 要求', status: '系統自主計算估算中' }
    ],
    products: [
      { name: 'Edge-AI 100 邊緣運算伺服器', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '經濟價值分配法 (Economic Allocation)', primarySource: '組裝產線 MES 耗電計量 + 零件 BOM 表', factorSource: 'Ecoinvent v3.9 資料庫 & SimaPro', intensity: '840 kgCO2e/台', trend: '↓ 2.5% 較前季' },
      { name: '10U 高密度代管機櫃 (1年期代管)', boundary: 'Gate-to-Gate (大門到大門/營運期)', allocation: '實體用電分配法 (Physical Power Allocation)', primarySource: 'PDU 機櫃排智慧電表 + 機房總PUE係數', factorSource: '台灣經濟部能源署發電排碳係數 (0.495)', intensity: '12.4 tCO2e/櫃年', trend: '↓ 6.1% 較前季' }
    ],
    sllLink: {
      icp: '$780,000 USD',
      intensity: '1.24 PUE 值',
      discount: '- 12.5 bps',
      saving: '↓ 6.1%',
      scopePct: { s1: 4, s2: 96, s3: 0 }
    }
  },
  chip: {
    id: 'chip', name: '半導體晶片製造',
    mechanism: '重點監管無塵室高耗能及含氟溫室氣體 (F-GHGs)。強制監控尾氣破壞去除設備 (Local Scrubber) 之運轉率與去除效率 (DRE)。',
    nodes: [
      { title: '黃光區 (EUV/空調)', status: 'NORMAL', electric: '1,800', heat: '0', output: 'Wafer 150w/h', yieldRate: '99.8', carbon: '8.5', active: true, visualType: 'cleanroom', visualMetrics: { clean: 'Class 1', temp: '23.0°C', humidity: '45%' } },
      { title: '蝕刻/CVD 機台', status: 'NORMAL', electric: '2,500', heat: '350', output: 'Wafer 145w/h', yieldRate: '98.5', carbon: '25.4', active: true, visualType: 'fab-equipment', visualMetrics: { rfPower: '5kW', gas: 'CF4/NF3', pressure: '10mT' } },
      { title: '尾氣洗氣塔 (Scrubber)', status: 'ALERT', electric: '850', heat: '900', output: '合規排放', yieldRate: '92.0', carbon: '115.0', active: false, warning: '燃燒器溫度偏低，DRE 92%', visualType: 'scrubber', visualMetrics: { temp: '750°C', dre: '92%', flow: '200 L/m' } }
    ],
    complianceMetrics: [
      { id: 'FSC-CP01', category: '範疇一氣體', label: '蝕刻與CVD製程含氟氣體(F-GHGs)排放', value: '72,480 tCO2e', ratio: '52.4%', target: '世界半導體協會 (WSC) 減量協定', status: 'BSI 查證 (符合 14064-1)' },
      { id: 'FSC-CP02', category: '範疇二電力排碳', label: '晶圓廠 EUV 曝光機與廠務系統電耗', value: '61,540 tCO2e', ratio: '44.5%', target: 'RE100 綠電進程 (當前綠電比 18%)', status: 'BSI 查證 (符合 14064-1)' },
      { id: 'FSC-CP03', category: '水足跡指標', label: '製程超純水 (UPW) 循環系統電耗排放', value: '4,280 tCO2e', ratio: '3.1%', target: '符合經濟部工業用水回收率規範 (>85%)', status: '合格 (符合產業標準)' },
      { id: 'FSC-CP04', category: '供應鏈範疇三', label: '範疇三：矽晶圓/高純度化學品採購生命週期', value: '14,200 tCO2e', ratio: 'N/A', target: '符合 IFRS S2 溫室氣體範疇三揭露', status: '系統自主追溯計算' }
    ],
    finance: {
      annualEmissions: 138000,
      ebitdaBeforeCarbon: 45000000,
      annualDebtService: 12000000,
      defaultPrice: 30,
      defaultAllowance: 90,
    },
    products: [
      { name: '3奈米超級高效能晶片 (Wafer)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '晶片面積與光罩層數分配法 (Area & Layer Allocation)', primarySource: '晶圓廠 SECS/GEM SECI通訊 + 廠務 SCADA', factorSource: 'SEMI S23 半導體能效與環境指引', intensity: '4.85 tCO2e/片', trend: '↓ 5.2% 較前季' },
      { name: '8吋汽車電源管理IC (PMIC)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '晶片面積分配法 (Area Allocation)', primarySource: '8吋廠聯網流量計 + 電量計 + 氣體流量紀錄', factorSource: '台灣半導體產業協會 (TSIA) 公開係數', intensity: '1.12 tCO2e/K-pcs', trend: '↓ 3.8% 較前季' }
    ],
    sllLink: {
      icp: '$1,388,250 USD',
      intensity: '4.85 t/片',
      discount: '- 20.0 bps',
      saving: '↓ 4.8%',
      scopePct: { s1: 52, s2: 45, s3: 3 }
    }
  },
  power: {
    id: 'power', name: '電力供應商 (發電廠)',
    mechanism: '發電效率 (Heat Rate) 與燃料生命週期監管。精準對接汽輪機轉速與發電機激磁數據，作為產發署核算國家電網排放係數之依據。',
    nodes: [
      { title: '超臨界燃煤/燃氣鍋爐', status: 'NORMAL', electric: '500', heat: '15,000', output: '高壓蒸汽 800t', yieldRate: '99.5', carbon: '1250.0', active: true, visualType: 'power-boiler', visualMetrics: { fuel: '天然氣/煤', temp: '1,300°C', pressure: '25MPa' } },
      { title: '重型汽輪機 (Turbine)', status: 'NORMAL', electric: '0', heat: '14,500', output: '機械動能 500MW', yieldRate: '98.5', carbon: '0', active: true, visualType: 'turbine', visualMetrics: { rpm: '3,600 RPM', steamIn: '560°C', vacuum: '-95kPa' } },
      { title: '發電機與升壓站', status: 'NORMAL', electric: '500,000', heat: '150', output: '電能 495MW', yieldRate: '99.0', carbon: '0', active: true, visualType: 'generator', visualMetrics: { voltage: '20kV', freq: '60Hz', pf: '0.95' } }
    ],
    finance: {
      annualEmissions: 1850000,
      ebitdaBeforeCarbon: 95000000,
      annualDebtService: 28000000,
      defaultPrice: 30,
      defaultAllowance: 80,
    },
    complianceMetrics: [
      { id: 'FSC-PW01', category: '發電排碳係數', label: '售電電力排碳密集度', value: '0.495 kgCO2e/kWh', ratio: '100%', target: '能源署國家發電排碳目標 (0.45)', status: '核定 (經濟部能源署每年發布)' },
      { id: 'FSC-PW02', category: '範疇一燃料消耗', label: '天然氣與煤炭總燃燒排放', value: '1,846,300 tCO2e', ratio: '99.8%', target: '空污法與溫管法國家核配額度', status: '環境部盤查申報登錄完畢' },
      { id: 'FSC-PW03', category: '範疇二廠用電率', label: '汽機輔助設備(幫浦/風扇)耗電', value: '3,700 tCO2e', ratio: '0.2%', target: '廠用電率限制 < 4.5%', status: '已查證 (ISO 14064-1)' },
      { id: 'FSC-PW04', category: '過渡計劃與政策', label: '低碳混氨/混氫燃燒實施進度', value: '混燒 5%', ratio: 'N/A', target: '國家淨零12項關鍵戰略計畫之電力無碳化', status: '示範計畫中' }
    ],
    products: [
      { name: '民營燃氣複循環基載電能 (1 MWh)', boundary: 'Gate-to-Gate (營運端發電)', allocation: '不適用物理分攤 (直接發電歸屬)', primarySource: '經濟部標準檢驗局合格併網電表 (Taipower Billing)', factorSource: '能源署 111年度公用售電業電力排碳係數', intensity: '495.0 kgCO2e/MWh', trend: '↓ 1.2% 較前季' },
      { name: '發電伴生工業高壓蒸汽 (1 噸)', boundary: 'Gate-to-Gate (汽電共生分攤)', allocation: '熱焓分配法 (Enthalpy Allocation)', primarySource: '廠際熱交換蒸汽流量流量計 + 溫度壓力變送器', factorSource: '台灣汽電共生系統能量申報係數', intensity: '82.5 kgCO2e/噸', trend: '↓ 2.4% 較前季' }
    ],
    sllLink: {
      icp: '$2,778,000 USD',
      intensity: '0.495 kg/kWh',
      discount: '- 25.0 bps',
      saving: '↓ 1.2%',
      scopePct: { s1: 100, s2: 0, s3: 0 }
    }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('steel');
  const currentIndustry = industryData[activeTab];

  // --- 銀行壓力測試動態 State ---
  const [carbonPrice, setCarbonPrice] = useState(currentIndustry.finance.defaultPrice); // 碳費單價 (USD/噸)
  const [allowancePct, setAllowancePct] = useState(currentIndustry.finance.defaultAllowance); // 免費配額百分比 (%)

  // 當切換產業時，重設壓力測試滑桿預設值
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCarbonPrice(industryData[tabId].finance.defaultPrice);
    setAllowancePct(industryData[tabId].finance.defaultAllowance);
  };

  // --- 壓力測試核心財務計算式 ---
  const fBase = currentIndustry.finance;
  // 1. 課稅/付費排放量 = 總碳排 * (100% - 免費配額%)
  const taxableEmissions = Math.max(0, fBase.annualEmissions * (1 - allowancePct / 100));
  // 2. 總碳曝險支出 = 付費碳排 * 碳費單價
  const totalCarbonCost = taxableEmissions * carbonPrice;
  // 3. 碳成本侵蝕後之 EBITDA = 原始 EBITDA - 碳成本
  const adjustedEbitda = fBase.ebitdaBeforeCarbon - totalCarbonCost;
  // 4. DSCR (債務服務覆蓋率) = 調整後 EBITDA / 應還本息
  const dscr = Math.max(0, adjustedEbitda / fBase.annualDebtService);
  // 5. EBITDA 侵蝕率 %
  const ebitdaErosion = (totalCarbonCost / fBase.ebitdaBeforeCarbon) * 100;

  // 6. 動態信用評級與信用利差加點判定
  let creditRating = 'AAA';
  let ratingColor = 'text-emerald-600 bg-emerald-100 border-emerald-300';
  let ratingLabel = '低度風險 (授信優待)';
  
  if (dscr >= 2.5) {
    creditRating = 'AAA';
    ratingColor = 'text-emerald-600 bg-emerald-100 border-emerald-300';
    ratingLabel = '極佳償債力 (AA級利差優待)';
  } else if (dscr >= 1.8 && dscr < 2.5) {
    creditRating = 'A';
    ratingColor = 'text-teal-600 bg-teal-100 border-teal-300';
    ratingLabel = '穩健還款 (正常授信)';
  } else if (dscr >= 1.3 && dscr < 1.8) {
    creditRating = 'BBB';
    ratingColor = 'text-yellow-600 bg-yellow-100 border-yellow-300';
    ratingLabel = '中度風險 (需加強授信追蹤)';
  } else if (dscr >= 1.0 && dscr < 1.3) {
    creditRating = 'BB';
    ratingColor = 'text-orange-600 bg-orange-100 border-orange-300';
    ratingLabel = '高度風險 (考慮調升放款利差)';
  } else {
    creditRating = 'D';
    ratingColor = 'text-red-600 bg-red-100 border-red-300 animate-pulse';
    ratingLabel = '違約高危 (建議列入追蹤或暫停撥款)';
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-blue-200">
      {/* Top Engineering Navigation */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Leaf className="text-emerald-500 w-7 h-7" />
            <span className="text-xl font-bold tracking-wide text-white">
              EcoRisk<span className="text-blue-400"> SCADA</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-1 bg-slate-800 p-1 rounded-md border border-slate-700">
            {Object.values(industryData).map(ind => (
              <button 
                key={ind.id}
                onClick={() => handleTabChange(ind.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors duration-200 ${activeTab === ind.id ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {ind.name}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center px-3 py-1 bg-blue-900/40 rounded text-xs font-bold text-blue-400 border border-blue-800">
              授信風險審查控制台 (Credit Risk Hub)
            </span>
          </div>
        </div>
        {/* Mobile Tabs */}
        <div className="lg:hidden bg-slate-800 border-t border-slate-700 overflow-x-auto whitespace-nowrap px-4 py-2 flex space-x-2">
          {Object.values(industryData).map(ind => (
            <button key={ind.id} onClick={() => handleTabChange(ind.id)} className={`px-3 py-1.5 rounded text-xs font-bold ${activeTab === ind.id ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-900'}`}>
              {ind.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Report Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Section 1 & 2 Combined: Contextual Architecture */}
        <section id="architecture" className="scroll-mt-24">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <Factory className="w-6 h-6 mr-2 text-blue-600" />
                {currentIndustry.name} - 製程段實時碳排監控
              </h2>
              <p className="text-slate-600 mt-1 text-sm max-w-3xl">對接廠務 PLC 與智慧電表獲取之底層生產流。實時碳流率會動態匯入至下方金管會與授信還款壓力評估模型中。</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-sm mb-6 flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-900">官方產業發展署 (產發署) 指引防篡改採集機制：</p>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed">{currentIndustry.mechanism}</p>
            </div>
          </div>
          
          {/* Dashboard within a dashboard - Industrial SCADA Theme */}
          <div className="bg-[#1e293b] p-6 sm:p-8 rounded-xl shadow-lg border-2 border-slate-700 relative overflow-hidden font-mono">
            {/* Background Grid Pattern - Blueprint style */}
            <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px'}}></div>
            
            <div className="relative z-10 flex items-center justify-between mb-8 pb-3 border-b-2 border-slate-600">
              <div className="flex items-center space-x-3 text-slate-200">
                <Sliders className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold tracking-wider">PROCESS FLOW DIAGRAM (PFD)</h3>
              </div>
              <div className="text-xs text-slate-400 flex items-center space-x-4">
                <span className="flex items-center font-bold text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div> TELEMETRY STREAM ACTIVE</span>
              </div>
            </div>

            <div className="relative mt-8">
              <div className="flex flex-col lg:flex-row gap-8 relative items-center lg:items-stretch justify-center">
                
                {/* 實體管線連接 (Desktop only) */}
                <div className="hidden lg:block absolute top-[100px] left-10 right-10 h-3 bg-slate-700 -z-10 rounded shadow-inner border-y border-slate-800">
                   {/* 內部流動物質動畫 */}
                   <div className="w-full h-full bg-[linear-gradient(90deg,transparent_25%,rgba(56,189,248,0.3)_50%,transparent_75%)] bg-[length:200%_100%] animate-[slide_2s_linear_infinite]"></div>
                </div>
                
                {currentIndustry.nodes.map((node, idx) => (
                  <React.Fragment key={idx}>
                    <IndustrialTechNode {...node} />
                    {idx < currentIndustry.nodes.length - 1 && <PipeConnector />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Data Aggregation to Hub */}
            <div className="mt-14 flex flex-col items-center">
              <div className="h-12 w-3 bg-slate-700 border-x border-slate-800 relative z-0">
                <div className="w-full h-full bg-[linear-gradient(180deg,transparent_25%,rgba(52,211,153,0.4)_50%,transparent_75%)] bg-[length:100%_200%] animate-[slide-down_2s_linear_infinite]"></div>
              </div>
              <div className="bg-slate-800 border-2 border-slate-600 p-5 rounded-lg flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl shadow-xl relative z-10">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-white font-bold text-md flex items-center">
                    <Database className="w-5 h-5 mr-2 text-blue-400" /> AI 碳核算數據閘道器 (Gateway)
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">即時演算機台物理流量，對接 ISO 14067 係數庫，每小時更新年估算曝險值。</p>
                </div>
                <div className="flex space-x-2 text-xs">
                   <span className="bg-slate-900 text-blue-400 px-3 py-1.5 rounded border border-slate-700 font-bold flex items-center">
                     <Network className="w-3.5 h-3.5 mr-1.5 animate-spin" style={{ animationDuration: '3s' }}/> DATA INTEGRATED
                   </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: 銀行授信與還款壓力測試報告 */}
        <section id="dashboard" className="scroll-mt-24 pb-20">
          <SectionHeader 
            title="階段三：碳資產財務評估與還款能力壓力測試" 
            subtitle="將製程端捕捉到的真實碳排，直接對接銀行授信最看重的 EBITDA、債務覆蓋率(DSCR)及違約風險燈號。提供審查主管與永續金融專案小組決策支持。"
          />
          
          {/* 銀行核心：動態壓力測試模擬器 (Bank Credit Stress Test Simulator) */}
          <div className="bg-white rounded-xl shadow-md border-2 border-slate-300 overflow-hidden mb-8">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-md">授信還款壓力測試模型 (動態情境模擬)</h3>
              </div>
              <span className="text-xs bg-blue-800 text-blue-300 font-mono px-3 py-1 rounded">
                EBITDA-Stress-v2.1
              </span>
            </div>
            
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Col: Sliders for bank scenario analysis */}
              <div className="space-y-6 bg-slate-50 p-5 rounded-lg border border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 flex items-center uppercase tracking-wide">
                  <Coins className="w-4 h-4 mr-2 text-yellow-600" /> 調整風險變數
                </h4>
                
                {/* Slider 1: Carbon Price */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-600">未來碳定價/碳權價格 (USD / 噸)</span>
                    <span className="text-blue-600 font-bold font-mono text-sm">${carbonPrice}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="150" 
                    step="5" 
                    value={carbonPrice} 
                    onChange={(e) => setCarbonPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$10 (起徵點)</span>
                    <span>$80 (歐盟預測)</span>
                    <span>$150 (高碳風險)</span>
                  </div>
                </div>

                {/* Slider 2: Free Allowance */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-600">免費排放額度配額 (%)</span>
                    <span className="text-blue-600 font-bold font-mono text-sm">{allowancePct}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="5" 
                    value={allowancePct} 
                    onChange={(e) => setAllowancePct(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0% (無配額)</span>
                    <span>50% (中度管設)</span>
                    <span>100% (無負擔)</span>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded text-xs text-slate-600 leading-relaxed">
                  <p className="font-bold text-blue-800 mb-1 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1" /> 金融審核提示：
                  </p>
                  當製程碳排超標、碳權價格上揚、或政府逐步削減免費配額時，此處可直觀呈現企業在不同情境下的現金流承受力。
                </div>
              </div>

              {/* Mid Col: Dynamic Repayment Impact Output */}
              <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                
                {/* Grid of banker dynamic results */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Dynamic Metric 1: Carbon Liability */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                    <span className="text-xs text-slate-500 font-medium">預估本年碳曝險財務成本</span>
                    <p className="text-xl font-bold text-slate-900 mt-1 font-mono">
                      ${totalCarbonCost.toLocaleString(undefined, {maximumFractionDigits: 0})} <span className="text-[10px] font-normal text-slate-500">USD</span>
                    </p>
                    <span className="text-[10px] text-slate-400">課稅量: {taxableEmissions.toLocaleString()} 噸/年</span>
                  </div>

                  {/* Dynamic Metric 2: EBITDA Erosion */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                    <span className="text-xs text-slate-500 font-medium">EBITDA 被碳成本侵蝕率</span>
                    <p className="text-xl font-bold text-red-600 mt-1 font-mono">
                      {ebitdaErosion.toFixed(1)}%
                    </p>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{width: `${Math.min(100, ebitdaErosion)}%`}}></div>
                    </div>
                  </div>

                  {/* Dynamic Metric 3: Debt Service Coverage Ratio (DSCR) */}
                  <div className="bg-slate-900 text-white p-4 rounded-lg border border-slate-700">
                    <span className="text-xs text-slate-400 font-medium">還款覆蓋率 (DSCR)</span>
                    <p className={`text-2xl font-black mt-1 font-mono ${dscr < 1.0 ? 'text-red-400' : dscr < 1.3 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                      {dscr.toFixed(2)}x
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-1">基準門檻: 1.20x</span>
                  </div>
                </div>

                {/* Massive Dynamic Risk Alarm / Health Rating Badge */}
                <div className={`p-5 rounded-lg border-2 ${ratingColor} flex flex-col sm:flex-row justify-between sm:items-center gap-4`}>
                  <div className="flex items-start space-x-3">
                    {dscr < 1.0 ? (
                      <ShieldAlert className="w-10 h-10 flex-shrink-0 text-red-600" />
                    ) : dscr < 1.3 ? (
                      <AlertTriangle className="w-10 h-10 flex-shrink-0 text-yellow-600" />
                    ) : (
                      <ShieldCheck className="w-10 h-10 flex-shrink-0 text-emerald-600" />
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        本案預測信用評等：<span className="text-xl font-black font-mono tracking-widest">{creditRating}</span>
                      </h4>
                      <p className="text-xs text-slate-700 mt-1 font-medium">{ratingLabel}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-slate-700">
                    <p>原始 EBITDA: ${fBase.ebitdaBeforeCarbon.toLocaleString()} USD</p>
                    <p className="font-bold">壓力後 EBITDA: ${adjustedEbitda.toLocaleString(undefined, {maximumFractionDigits: 0})} USD</p>
                    <p>應還款本息: ${fBase.annualDebtService.toLocaleString()} USD</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Sub Panels: Regulations & Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: FSC Compliance Matrix */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 金管會指定氣候揭露與合規矩陣 */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center border-b border-slate-200 pb-2">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  金管會上市櫃碳申報合規指標 (FSC Regulatory Matrix)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                        <th className="p-2">指標編碼</th>
                        <th className="p-2">合規監管類別</th>
                        <th className="p-2">關鍵實施數據 (年累計)</th>
                        <th className="p-2">法規/轉型政策依據</th>
                        <th className="p-2 text-right">稽核驗證狀態</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {currentIndustry.complianceMetrics.map((metric) => (
                        <tr key={metric.id} className="hover:bg-slate-50 text-slate-700">
                          <td className="p-2 font-bold text-blue-600">{metric.id}</td>
                          <td className="p-2 font-sans">{metric.category}</td>
                          <td className="p-2 text-slate-900 font-bold">{metric.value} <span className="text-[10px] text-slate-500 font-normal">({metric.ratio})</span></td>
                          <td className="p-2 font-sans text-slate-500">{metric.target}</td>
                          <td className="p-2 text-right font-sans">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              metric.status.includes('查證') || metric.status.includes('核對') || metric.status.includes('合格')
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {metric.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 產品層級碳足跡分析 (ISO 14067 PCF) */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-5">
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center">
                    <Boxes className="w-4 h-4 mr-2 text-blue-600" />
                    產品碳足跡深度解析表 (ISO 14067 PCF Factor Mapping)
                  </h3>
                  <button className="flex items-center text-xs bg-slate-100 text-slate-700 border border-slate-300 font-bold px-3 py-1.5 rounded hover:bg-slate-200 transition-colors shadow-sm">
                    <Download className="w-3.5 h-3.5 mr-1.5" /> 匯出合規報告
                  </button>
                </div>
                
                <div className="space-y-4">
                  {currentIndustry.products.map((prod, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 pb-2 border-b border-slate-200">
                        <span className="font-bold text-slate-900 text-sm">{prod.name}</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full mt-1 sm:mt-0">
                          計算範疇：{prod.boundary}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[11px] text-slate-600 font-sans">
                        <div>
                          <p className="text-slate-400">數據分攤方法</p>
                          <p className="font-semibold text-slate-800">{prod.allocation}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">一級活動數據源</p>
                          <p className="font-semibold text-slate-800">{prod.primarySource}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">排放係數庫來源</p>
                          <p className="font-semibold text-slate-800">{prod.factorSource}</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200 text-center font-mono">
                          <p className="text-slate-500 text-[10px] font-sans">產品碳足跡值</p>
                          <p className="text-base font-black text-slate-900">{prod.intensity}</p>
                          <p className="text-[9px] text-emerald-600 font-bold mt-0.5">{prod.trend}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Audit Trail & Real-time Anomalies */}
            <div className="lg:col-span-1 space-y-6">
              {/* GHG 盤查結構 */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center border-b border-slate-200 pb-2">
                  <AlignVerticalSpaceAround className="w-4 h-4 mr-2 text-blue-600" />
                  溫室氣體排碳來源分析 (當前製程)
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-slate-700">範疇一 (直接溫室氣體排放)</span>
                      <span className="text-slate-600 font-mono font-bold">{currentIndustry.sllLink.scopePct.s1}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: `${currentIndustry.sllLink.scopePct.s1}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-slate-700">範疇二 (輸入能源間接排放)</span>
                      <span className="text-slate-600 font-mono font-bold">{currentIndustry.sllLink.scopePct.s2}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${currentIndustry.sllLink.scopePct.s2}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-slate-700">範疇三 (價值鏈上下游排放)</span>
                      <span className="text-slate-600 font-mono font-bold">{currentIndustry.sllLink.scopePct.s3}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full" style={{width: `${currentIndustry.sllLink.scopePct.s3}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Automated Audit Trail */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-0 overflow-hidden flex flex-col h-64">
                <div className="p-3 border-b border-slate-300 bg-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center">
                    <FileBadge2 className="w-4 h-4 mr-2 text-slate-600" />
                    現場 IoT 節點自動化防篡改日誌
                  </h3>
                  <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded shadow-sm">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Ledger Synced
                  </span>
                </div>
                <div className="overflow-y-auto p-0 flex-1 bg-slate-900 font-mono text-[10px]">
                  <table className="w-full text-left text-slate-300">
                    <thead className="bg-slate-800 text-slate-400 sticky top-0 border-b border-slate-700">
                      <tr>
                        <th className="px-3 py-1.5">時間</th>
                        <th className="px-3 py-1.5">事件點</th>
                        <th className="px-3 py-1.5">原始數值</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr className="hover:bg-slate-800">
                        <td className="px-3 py-2 text-slate-500">15:34:02</td>
                        <td className="px-3 py-2 text-emerald-400">UNIT 3: 電表 API 讀取</td>
                        <td className="px-3 py-2">890.2 kWh</td>
                      </tr>
                      <tr className="bg-red-950/40 hover:bg-red-900/30">
                        <td className="px-3 py-2 text-slate-500">15:33:45</td>
                        <td className="px-3 py-2 text-red-400 font-bold">UNIT 2: 閥值異常</td>
                        <td className="px-3 py-2">Temp=1,650C</td>
                      </tr>
                      <tr className="hover:bg-slate-800">
                        <td className="px-3 py-2 text-blue-400">15:30:00</td>
                        <td className="px-3 py-2 text-blue-400">ERP 完工同步</td>
                        <td className="px-3 py-2">Batch #A992</td>
                      </tr>
                      <tr className="hover:bg-slate-800">
                        <td className="px-3 py-2 text-slate-500">15:28:12</td>
                        <td className="px-3 py-2 text-emerald-400">UNIT 1: 流量計 API</td>
                        <td className="px-3 py-2">Flow 12,050</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes slide-down {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 100%; }
        }
      `}} />
    </div>
  );
}

// --- Helper Components ---

function SectionHeader({ title, subtitle }) {
  return (
    <div className="border-l-4 border-blue-600 pl-4 mb-4">
      <h2 className="text-xl font-bold text-slate-900 tracking-wide">{title}</h2>
      <p className="text-slate-600 mt-1 max-w-4xl text-sm leading-relaxed">{subtitle}</p>
    </div>
  );
}

// --- 工業 SCADA 風格: 具象化 SVG 機台元件 ---
function IndustrialTechNode({ title, status, electric, heat, output, yieldRate, carbon, warning, visualType, visualMetrics }) {
  const isAlert = status === 'ALERT';
  
  return (
    <div className={`flex-1 min-w-[280px] lg:max-w-[320px] bg-slate-800 border-2 ${isAlert ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-slate-600'} rounded-lg relative z-10 flex flex-col overflow-hidden`}>
      
      {/* 核心工業 SVG 圖示呈現區域 (Industrial HMI Visualizer) */}
      <div className="p-4 bg-[#0f172a] flex flex-col items-center justify-center border-b-2 border-slate-700 h-48 relative z-10">
        
        {/* 依據 visualType 繪製具象化的 PFD 工業圖形 */}
        {visualType === 'blast-furnace' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <path d="M 35 20 L 65 20 L 75 70 L 25 70 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <rect x="40" y="5" width="20" height="15" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
             <path d="M 60 10 L 80 10" stroke="#94a3b8" strokeWidth="3" />
             <rect x="30" y="70" width="40" height="10" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
             <path d="M 45 75 L 55 75 L 55 90 L 45 90 Z" fill="#f97316" className="animate-pulse" />
             <circle cx="50" cy="50" r="10" fill="#ea580c" opacity="0.6" className="animate-pulse" />
             <path d="M 35 45 L 65 45 M 30 60 L 70 60" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2" />
          </svg>
        )}

        {visualType === 'converter-furnace' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <path d="M 25 35 Q 50 20 75 35 L 70 70 Q 50 85 30 70 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <rect x="47" y="0" width="6" height="40" fill="#94a3b8" />
             <polygon points="45,40 55,40 50,55" fill="#f87171" className="animate-pulse" />
             <circle cx="20" cy="55" r="5" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
             <circle cx="80" cy="55" r="5" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
             <line x1="10" y1="55" x2="20" y2="55" stroke="#94a3b8" strokeWidth="3" />
             <line x1="80" y1="55" x2="90" y2="55" stroke="#94a3b8" strokeWidth="3" />
             <circle cx="50" cy="65" r="12" fill="#ea580c" opacity="0.7" className="animate-pulse" />
          </svg>
        )}

        {visualType === 'rolling-mill' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <rect x="10" y="20" width="80" height="60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
             <circle cx="50" cy="35" r="15" fill="#475569" stroke="#94a3b8" strokeWidth="2" className="animate-[spin_2s_linear_infinite]" />
             <circle cx="50" cy="65" r="15" fill="#475569" stroke="#94a3b8" strokeWidth="2" className="animate-[spin_2s_linear_infinite_reverse]" />
             <circle cx="50" cy="35" r="3" fill="#1e293b" />
             <circle cx="50" cy="65" r="3" fill="#1e293b" />
             <rect x="10" y="47" width="35" height="6" fill="#fb923c" />
             <rect x="50" y="48.5" width="40" height="3" fill="#f87171" className="animate-pulse" />
          </svg>
        )}

        {visualType === 'rotary-kiln' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <g transform="rotate(10, 50, 50)">
               <rect x="15" y="35" width="70" height="30" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
               <rect x="30" y="32" width="5" height="36" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
               <rect x="65" y="32" width="5" height="36" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
               <polygon points="15,40 45,50 15,60" fill="#f97316" opacity="0.6" className="animate-pulse" />
               <line x1="15" y1="50" x2="85" y2="50" stroke="#64748b" strokeWidth="1" strokeDasharray="5,3" />
             </g>
          </svg>
        )}

        {visualType === 'grinder' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="35" fill="#334155" stroke="#94a3b8" strokeWidth="2" className="animate-[spin_5s_linear_infinite]" />
             <circle cx="50" cy="50" r="25" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" />
             <circle cx="40" cy="65" r="4" fill="#94a3b8" />
             <circle cx="55" cy="70" r="5" fill="#94a3b8" />
             <circle cx="65" cy="60" r="4" fill="#94a3b8" />
             <rect x="40" y="45" width="20" height="10" fill="#1e293b" />
             <path d="M 25 80 L 75 80 L 85 95 L 15 95 Z" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
          </svg>
        )}

        {visualType === 'chiller' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <rect x="20" y="25" width="60" height="50" rx="5" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <circle cx="50" cy="40" r="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
             <circle cx="50" cy="65" r="12" fill="#1e293b" stroke="#fb923c" strokeWidth="2" />
             <path d="M 38 40 L 62 40 M 38 65 L 62 65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
             <g transform="translate(50,40) scale(0.5) rotate(0)" className="animate-spin text-cyan-400">
               <path d="M0 -15 L5 -5 L-5 -5 Z M0 15 L5 5 L-5 5 Z M15 0 L5 5 L5 -5 Z M-15 0 L-5 5 L-5 -5 Z" fill="currentColor"/>
             </g>
          </svg>
        )}

        {visualType === 'ups-grid' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <rect x="25" y="15" width="50" height="70" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <rect x="35" y="25" width="30" height="15" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
             <text x="50" y="35" fontSize="8" fill="#0ea5e9" textAnchor="middle" fontFamily="monospace">8.2MW</text>
             <rect x="30" y="50" width="18" height="10" fill="#475569" />
             <rect x="52" y="50" width="18" height="10" fill="#475569" />
             <rect x="30" y="65" width="18" height="10" fill="#475569" />
             <rect x="52" y="65" width="18" height="10" fill="#475569" />
             <polygon points="48,80 55,80 50,88 56,88 46,100 49,88 43,88" fill="#eab308" transform="scale(0.5) translate(50,55)" className="animate-pulse" />
          </svg>
        )}

        {visualType === 'server-rack' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             {/* 高科技/資料中心：伺服器機櫃 */}
             <rect x="25" y="10" width="50" height="80" rx="2" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
             {/* 伺服器刀片 */}
             {[20, 32, 44, 56, 68].map(y => (
               <g key={y}>
                 <rect x="30" y={y} width="40" height="8" fill="#334155" stroke="#475569" strokeWidth="1" />
                 <circle cx="34" cy={y+4} r="1.5" fill="#10b981" />
                 <circle cx="38" cy={y+4} r="1.5" fill="#10b981" className="animate-pulse" />
                 <line x1="45" y1={y+4} x2="65" y2={y+4} stroke="#475569" strokeWidth="1" />
               </g>
             ))}
             {/* 散熱氣流箭頭 (紅色代表熱通道異常) */}
             <path d="M 75 30 L 85 20 M 75 50 L 85 40 M 75 70 L 85 60" stroke="#f43f5e" strokeWidth="2" fill="none" className="animate-pulse" markerEnd="url(#arrow)" />
             <defs>
               <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
               </marker>
             </defs>
          </svg>
        )}
        
        {visualType === 'cleanroom' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <rect x="15" y="15" width="70" height="70" fill="none" stroke="#94a3b8" strokeWidth="2" />
             <rect x="15" y="15" width="70" height="15" fill="#334155" />
             <path d="M 25 30 L 25 85 M 40 30 L 40 85 M 60 30 L 60 85 M 75 30 L 75 85" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" className="animate-[slide-down_2s_linear_infinite] opacity-50" />
             <rect x="35" y="55" width="30" height="30" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
             <circle cx="50" cy="70" r="6" fill="#1e293b" />
             <rect x="48" y="55" width="4" height="15" fill="#facc15" className="animate-pulse" />
          </svg>
        )}

        {visualType === 'fab-equipment' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="30" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <circle cx="50" cy="50" r="20" fill="#1e293b" stroke="#475569" strokeWidth="2" />
             <circle cx="50" cy="50" r="12" fill="#cbd5e1" />
             <rect x="10" y="45" width="10" height="10" fill="#475569" />
             <rect x="80" y="45" width="10" height="10" fill="#475569" />
             <circle cx="50" cy="50" r="16" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4" className="animate-[spin_3s_linear_infinite]" />
          </svg>
        )}

        {visualType === 'scrubber' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <path d="M 30 20 L 70 20 L 70 80 L 30 80 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <path d="M 40 10 L 60 10 L 60 20 L 40 20 Z" fill="#475569" />
             <path d="M 15 65 L 30 65" stroke="#94a3b8" strokeWidth="4" />
             <polygon points="25,60 35,65 25,70" fill="#38bdf8" />
             <rect x="35" y="45" width="30" height="15" fill="#f97316" opacity="0.7" className="animate-pulse" />
             <line x1="30" y1="35" x2="70" y2="35" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
             <line x1="30" y1="40" x2="70" y2="40" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
             <path d="M 45 5 C 40 5, 35 10, 45 10 C 50 10, 55 5, 45 5 Z" fill="#94a3b8" opacity="0.5" className="animate-pulse" />
          </svg>
        )}

        {visualType === 'power-boiler' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <rect x="25" y="15" width="50" height="70" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <polygon points="25,85 50,45 75,85" fill="#ea580c" opacity="0.6" className="animate-pulse" />
             <path d="M 35 20 L 35 80 M 50 20 L 50 45 M 65 20 L 65 80" stroke="#cbd5e1" strokeWidth="1.5" />
             <path d="M 50 15 L 50 5" stroke="#cbd5e1" strokeWidth="3" />
             <polygon points="45,10 50,5 55,10" fill="#cbd5e1" />
          </svg>
        )}

        {visualType === 'turbine' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <path d="M 20 40 L 80 25 L 80 75 L 20 60 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <line x1="10" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeWidth="4" />
             <line x1="35" y1="35" x2="35" y2="65" stroke="#475569" strokeWidth="2" />
             <line x1="50" y1="32" x2="50" y2="68" stroke="#475569" strokeWidth="2" />
             <line x1="65" y1="28" x2="65" y2="72" stroke="#475569" strokeWidth="2" />
             <path d="M 85 40 A 10 10 0 0 1 85 60" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-blue)" className="animate-pulse" />
             <defs>
               <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
               </marker>
             </defs>
          </svg>
        )}

        {visualType === 'generator' && (
          <svg className="w-32 h-32 text-slate-400" viewBox="0 0 100 100">
             <rect x="25" y="30" width="50" height="40" rx="5" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
             <circle cx="50" cy="50" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
             <line x1="10" y1="50" x2="25" y2="50" stroke="#94a3b8" strokeWidth="4" />
             <line x1="30" y1="35" x2="70" y2="35" stroke="#1e293b" strokeWidth="1" />
             <line x1="30" y1="65" x2="70" y2="65" stroke="#1e293b" strokeWidth="1" />
             <polygon points="75,45 95,45 90,55 80,55 75,45" fill="#facc15" />
             <polygon points="85,35 95,40 85,45" fill="#facc15" className="animate-pulse" />
          </svg>
        )}

        {/* 狀態指示燈與標籤 */}
        <div className="absolute top-2 left-2 flex items-center bg-slate-900/80 px-2 py-1 rounded text-[9px] font-bold text-slate-300">
          <div className={`w-2 h-2 rounded-full mr-1.5 ${isAlert ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`}></div>
          ID: UNIT_{visualType.substring(0, 3).toUpperCase()}
        </div>
      </div>

      {/* 節點主數據內容 (Data Panel) */}
      <div className="p-4 flex flex-col h-full bg-slate-800 border-t border-slate-700">
        
        {/* Node Header */}
        <div className="flex justify-between items-start mb-3 border-b border-slate-700 pb-2">
          <h5 className="text-sm font-bold text-white tracking-wide">{title}</h5>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isAlert ? 'bg-red-900/50 text-red-400 border border-red-800' : 'bg-emerald-900/30 text-emerald-400 border border-emerald-800'}`}>
            {status}
          </span>
        </div>

        {/* Sensor Metrics (儀表數據) */}
        <div className="mb-4 bg-slate-900 rounded border border-slate-700 p-2 flex justify-around items-center font-mono">
          {Object.entries(visualMetrics).map(([key, value], i) => (
             <div key={i} className="text-center flex flex-col items-center">
               <span className="text-[9px] text-slate-500 uppercase">{key}</span>
               <span className="text-[11px] text-slate-200 font-bold flex items-center mt-0.5">
                 {key.includes('temp') && <Thermometer className="w-3 h-3 text-orange-400 mr-1" />}
                 {key.includes('rpm') && <Fan className="w-3 h-3 text-slate-400 mr-1" />}
                 {key.includes('current') && <Zap className="w-3 h-3 text-yellow-400 mr-1" />}
                 {key.includes('flow') && <Droplets className="w-3 h-3 text-blue-400 mr-1" />}
                 {value}
               </span>
             </div>
          ))}
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-2 flex-1 mt-auto text-xs font-mono">
          <div className="bg-slate-700/50 p-2 rounded border border-slate-600/50">
            <div className="text-[9px] text-slate-400">耗電 (kWh)</div>
            <div className="text-sm font-bold text-yellow-400">{electric}</div>
          </div>
          <div className="bg-slate-700/50 p-2 rounded border border-slate-600/50">
            <div className="text-[9px] text-slate-400">耗熱 (MJ)</div>
            <div className="text-sm font-bold text-orange-400">{heat}</div>
          </div>
          <div className="bg-slate-700/50 p-2 rounded border border-slate-600/50">
            <div className="text-[9px] text-slate-400">產出目標</div>
            <div className="text-xs font-bold text-slate-200 truncate">{output}</div>
          </div>
          <div className="bg-slate-700/50 p-2 rounded border border-slate-600/50">
            <div className="text-[9px] text-slate-400">良率/效能</div>
            <div className={`text-xs font-bold ${parseFloat(yieldRate) < 98 ? 'text-red-400' : 'text-emerald-400'}`}>{yieldRate}%</div>
          </div>
        </div>

        {/* Instant Carbon Calc & Warning */}
        <div className="mt-3 pt-2 border-t border-slate-700">
          <div className="flex justify-between items-center bg-slate-900 p-2 rounded font-mono">
            <span className="text-[10px] text-slate-400">系統換算碳流率</span>
            <span className="text-sm font-bold text-white">
              {carbon} <span className="text-[9px] text-slate-500">kgCO2/h</span>
            </span>
          </div>
          {warning && (
            <div className="mt-2 text-[10px] text-red-300 flex items-center bg-red-950/60 p-2 rounded border border-red-800">
              <Activity className="w-3.5 h-3.5 mr-1.5 animate-pulse flex-shrink-0" /> <span className="font-sans">{warning}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PipeConnector() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center px-1 relative z-0 text-slate-500">
      <ArrowRight className="w-8 h-8" strokeWidth={1.5} />
    </div>
  );
}