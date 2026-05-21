import React, { useState } from 'react';
import { 
  Leaf, Factory, Cpu, Zap, Flame, Activity, AlignVerticalSpaceAround,
  Database, Network, Boxes, FileBadge2, Download, 
  Droplets, Fan, ShieldCheck, Thermometer, ArrowRight, Settings, Sliders,
  FileText, AlertTriangle, ShieldAlert, Coins, X, Terminal, GitMerge, Recycle,
  CheckCircle2, Layers, PieChart, Gauge, BarChart3, ZoomIn
} from 'lucide-react';

// --- 產業、金管會合規、以及銀行授信評估資料庫 (完整 7 大產業) ---
const industryData = {
  steel: {
    id: 'steel', name: '鋼鐵產業',
    mechanism: '整合高爐與轉爐之高溫熔煉物料衡算，即時監控燃料與還原劑消耗。防篡改數據直連雲端，確保碳排核算真實性。',
    overview: { emissions: '180,000', risk: '低風險', trend: '↓ 3.2%', activeNodes: 4 },
    nodes: [
      { id: 'ST-01', title: '煉焦與燒結廠', desc: '煤礦與鐵礦石的初步高溫處理，產生高濃度 VOCs。', status: 'NORMAL', electric: '450', heat: '1,200', output: '焦炭/燒結礦', yieldRate: '99.2', carbon: '85.4', active: true, visualType: 'grinder', visualMetrics: { temp: '1,100°C', input: '煤/鐵礦/石灰石', voc: '12 ppm', vibration: '0.8 mm/s' }, ef: '原料熱值與揮發分換算' },
      { id: 'ST-02', title: '高爐煉鐵', desc: '投入高溫熱風進行還原反應，產出液態鐵水。', status: 'NORMAL', electric: '850', heat: '4,200', output: '熔融鐵水', yieldRate: '98.5', carbon: '215.4', active: true, visualType: 'blast-furnace', visualMetrics: { temp: '1,500°C', pressure: '4.2 atm', flow: '熱風 3000m³', recycle: '高爐氣回收' }, ef: '碳還原劑消耗 - 碳固存' },
      { id: 'ST-03', title: '轉爐煉鋼', desc: '吹氧降碳，調整合金成份，並大量摻配廢鋼。', status: 'ALERT', electric: '1,200', heat: '850', output: '鋼胚 (連鑄)', yieldRate: '96.2', carbon: '85.2', active: false, warning: '廢鋼摻配比例不足', visualType: 'converter-furnace', visualMetrics: { temp: '1,650°C', oxygen: '800 m³/h', scrap: '15%', argon: '底吹 50m³' }, ef: '電網係數 + 脫碳反應' },
      { id: 'ST-04', title: '軋延製程', desc: '透過多道軋輪將鋼胚壓延成各規格熱軋鋼材。', status: 'NORMAL', electric: '2,100', heat: '420', output: '熱軋鋼材', yieldRate: '99.1', carbon: '22.8', active: true, visualType: 'rolling-mill', visualMetrics: { rpm: '1,200 RPM', thickness: '2.5 mm', cooling: '水冷 500L', power: '2.1 MW' }, ef: '電力與加熱爐燃料' }
    ],
    finance: { annualEmissions: 180000, ebitdaBeforeCarbon: 12500000, annualDebtService: 3200000, defaultPrice: 30, defaultAllowance: 80 },
    complianceMetrics: [
      { id: 'FSC-ST01', category: '範疇一製程排放', label: '冶煉直接排放總量', value: '112,450 tCO2e', ratio: '62.4%', target: '符合氣候法碳費申報門檻', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-ST02', category: '範疇二電力排碳', label: '外購電力間接排放', value: '67,550 tCO2e', ratio: '37.6%', target: '經濟部契約容量契綠能條款', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-ST03', category: 'CBAM申報指標', label: '歐盟進口鋼鐵嵌入碳排', value: '1.45 tCO2e/t', ratio: 'N/A', target: '符合 CBAM 過渡期申報規範', status: '核對無誤 (BSI 第三方)' },
      { id: 'FSC-ST04', category: '過渡計劃與轉型', label: '低碳冶金與混氫高爐轉型', value: '減碳 8.5%', ratio: '對比基準年', target: '產發署「高碳轉型」專案補助', status: '執行中' }
    ],
    products: [ { name: '規格熱軋鋼捲 (HS-HRC)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量與熱值分配法 (Mass & Thermal)', primarySource: '機台電表 + 地磅實時數據', factorSource: '國家溫室氣體係數庫 v8.1', intensity: '1.85 tCO2e/噸', trend: '↓ 3.2%' } ],
    sllLink: { icp: '$373K USD', intensity: '1.42 t/噸', discount: '- 15.0 bps', saving: '↓ 3.2%', scopePct: { s1: 61, s2: 39, s3: 0 } }
  },
  cement: {
    id: 'cement', name: '水泥產業',
    mechanism: '雙重碳排來源嚴密監控：石灰石煆燒 (製程排放) 與旋窯化石燃料 (燃料排放)。動態追蹤 AFR 替代燃料比例。',
    overview: { emissions: '220,000', risk: '中低風險', trend: '↓ 4.1%', activeNodes: 3 },
    nodes: [
      { id: 'CE-01', title: '生料研磨 (Raw Mill)', desc: '石灰石與黏土混合研磨，高耗電馬達監控。', status: 'NORMAL', electric: '1,500', heat: '350', output: '生料 300t/h', yieldRate: '99.5', carbon: '45.0', active: true, visualType: 'grinder', visualMetrics: { input: '石灰石/黏土', rpm: '850 RPM', draft: '-150Pa', humidity: '12%' }, ef: '0.495 kgCO2e/kWh' },
      { id: 'CE-02', title: '預熱塔與旋窯 (Kiln)', desc: '高溫煆燒引發化學碳排，並燃燒替代燃料。', status: 'ALERT', electric: '450', heat: '3,800', output: '熟料 200t/h', yieldRate: '98.0', carbon: '185.5', active: true, visualType: 'rotary-kiln', visualMetrics: { temp: '1,450°C', fuel: 'AFR 15%', o2: '1.8%', nox: '350 ppm' }, ef: '化學排放 + 燃料' },
      { id: 'CE-03', title: '冷卻與水泥磨 (Mill)', desc: '熟料冷卻並研磨成水泥，精細度與耗電相關。', status: 'NORMAL', electric: '2,800', heat: '0', output: '水泥 210t/h', yieldRate: '99.8', carbon: '18.2', active: true, visualType: 'grinder', visualMetrics: { current: '6.6kV', load: '92%', tempOut: '80°C', fineness: '380 m²/kg' }, ef: '0.495 kgCO2e/kWh' }
    ],
    finance: { annualEmissions: 220000, ebitdaBeforeCarbon: 11000000, annualDebtService: 2800000, defaultPrice: 30, defaultAllowance: 75 },
    complianceMetrics: [
      { id: 'FSC-CE01', category: '範疇一製程排放', label: '石灰石分解化學反應排放', value: '158,620 tCO2e', ratio: '72.1%', target: '符合氣候法製程直接碳排查證', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-CE02', category: '範疇一燃料排放', label: '旋窯燃燒燃煤與AFR排放', value: '47,300 tCO2e', ratio: '21.5%', target: '產發署替代燃料(AFR)減量指引', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-CE03', category: '範疇二能源間接', label: '生料與水泥研磨耗電排放', value: '14,080 tCO2e', ratio: '6.4%', target: '能源局高耗能設備能效一級標準', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-CE04', category: '循環經濟指標', label: '替代熟料之爐石粉/飛灰使用率', value: '替代率 35%', ratio: 'N/A', target: '產發署循環經濟再利用比例', status: '合格 (符合CNS規範)' }
    ],
    products: [
      { name: '卜特蘭一型水泥 (Portland Cement I)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量分配法 (Mass Allocation)', primarySource: '旋窯熟料計量 + 煤粉計重', factorSource: 'CNS 15993 PCR', intensity: '0.78 tCO2e/噸', trend: '↓ 4.1%' },
      { name: '低碳預拌混凝土 (3000psi)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量分配法 (Mass Allocation)', primarySource: 'ERP 實時配方 + 電表', factorSource: '營建研究院碳足跡庫', intensity: '195 kgCO2e/m³', trend: '↓ 5.5%' }
    ],
    sllLink: { icp: '$516K USD', intensity: '0.62 t/噸', discount: '- 18.0 bps', saving: '↓ 5.2%', scopePct: { s1: 94, s2: 6, s3: 0 } }
  },
  petrochemical: {
    id: 'petrochemical', name: '煉油/石化',
    mechanism: '聚焦常減壓蒸餾與裂解製程之化石燃料直接燃燒與製程尾氣回收能效。全面對接DCS與連續排放監測 (CEMS)。',
    overview: { emissions: '320,000', risk: '中度風險', trend: '↓ 1.5%', activeNodes: 3 },
    nodes: [
      { id: 'PT-01', title: '常減壓蒸餾系統', desc: '原油加熱分離出 different 沸點餾分，監控燃料熱值。', status: 'NORMAL', electric: '920', heat: '5,100', output: '餾分油 450t/h', yieldRate: '99.1', carbon: '280.5', active: true, visualType: 'blast-furnace', visualMetrics: { temp: '370°C', feed: '原油 450t', pressure: '0.3MPa', reflux: '比率 1.2' }, ef: '燃燒熱值 x IPCC 係數' },
      { id: 'PT-02', title: '乙烯輕油裂解爐', desc: '高溫裂解石腦油產出乙烯，極高耗能製程。', status: 'NORMAL', electric: '1,450', heat: '6,200', output: '乙烯 120t/h', yieldRate: '98.2', carbon: '345.2', active: true, visualType: 'converter-furnace', visualMetrics: { temp: '850°C', input: '石腦油', efficiency: '熱效 92%', coilTemp: '1,050°C' }, ef: '熱焓量 x 天然氣係數' },
      { id: 'PT-03', title: '精餾與分離系統', desc: '多級塔槽精餾，控制冷凝端壓力與迴流比。', status: 'NORMAL', electric: '1,800', heat: '250', output: '丙烯', yieldRate: '95.5', carbon: '35.4', active: true, visualType: 'scrubber', visualMetrics: { temp: '85°C', reflux: '2.4', column: '38 階', vacuum: '-60kPa' }, ef: '0.495 kgCO2e/kWh' }
    ],
    finance: { annualEmissions: 320000, ebitdaBeforeCarbon: 22000000, annualDebtService: 5500000, defaultPrice: 30, defaultAllowance: 85 },
    complianceMetrics: [
      { id: 'FSC-PT01', category: '範疇一燃燒排放', label: '蒸餾與裂解燃燒排放', value: '218,240 tCO2e', ratio: '68.2%', target: '符合 CEMS 連線規範', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-PT02', category: '範疇一逸散排放', label: 'VOCs 逸散與精煉折算', value: '43,840 tCO2e', ratio: '13.7%', target: 'LDAR 設備元件洩漏檢測', status: '合格 (符合產業標準)' }
    ],
    products: [ { name: '高純度乙烯單體 (Ethylene)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '質量分配法 (Mass Allocation)', primarySource: '裂解爐中控計量', factorSource: '國家係數庫 v8.1', intensity: '1.32 tCO2e/噸', trend: '↓ 1.5%' } ],
    sllLink: { icp: '$922K USD', intensity: '1.25 t/噸', discount: '- 16.5 bps', saving: '↓ 4.2%', scopePct: { s1: 82, s2: 18, s3: 0 } }
  },
  chip: {
    id: 'chip', name: '晶片製造',
    mechanism: '重點監管無塵室高耗能及含氟溫室氣體 (F-GHGs)。強制監控尾氣破壞去除設備 (Local Scrubber) 之運轉率與破壞效率 (DRE)。',
    overview: { emissions: '138,000', risk: '極低風險', trend: '↓ 5.2%', activeNodes: 3 },
    nodes: [
      { id: 'CP-01', title: '黃光區 (EUV/空調)', desc: '無塵室核心，EUV機台與空調系統為主要電耗。', status: 'NORMAL', electric: '1,800', heat: '0', output: 'Wafer 150w/h', yieldRate: '99.8', carbon: '8.5', active: true, visualType: 'cleanroom', visualMetrics: { clean: 'Class 1', temp: '23.0°C', humidity: '45%', flow: '12k CFM' }, ef: '0.495 kgCO2e/kWh' },
      { id: 'CP-02', title: '蝕刻/CVD 機台', desc: '使用大量含氟溫室氣體 (F-GHGs) 進行沉積與蝕刻。', status: 'NORMAL', electric: '2,500', heat: '350', output: 'Wafer 145w/h', yieldRate: '98.5', carbon: '25.4', active: true, visualType: 'fab-equipment', visualMetrics: { rfPower: '5kW', gas: 'CF4/NF3', pressure: '10mT', plasma: 'Stable' }, ef: 'F-GHGs 耗用率' },
      { id: 'CP-03', title: '尾氣洗氣塔 (Scrubber)', desc: '高溫燃燒破壞有害氣體，需嚴密監控去除效率。', status: 'ALERT', electric: '850', heat: '900', output: '合規排放', yieldRate: '92.0', carbon: '115.0', active: false, warning: '燃燒器溫度偏低，DRE降至92%', visualType: 'scrubber', visualMetrics: { temp: '750°C', dre: '92%', flow: '200 L/m', ph: '7.2' }, ef: '未破壞 F-GHGs x GWP' }
    ],
    finance: { annualEmissions: 138000, ebitdaBeforeCarbon: 45000000, annualDebtService: 12000000, defaultPrice: 30, defaultAllowance: 90 },
    complianceMetrics: [
      { id: 'FSC-CP01', category: '範疇一氣體', label: '蝕刻CVD含氟氣體(F-GHGs)', value: '72,480 tCO2e', ratio: '52.4%', target: '世界半導體協會 (WSC) 減量協定', status: 'BSI 查證 (符合 14064-1)' },
      { id: 'FSC-CP02', category: '範疇二電力排碳', label: 'EUV 與廠務系統電耗', value: '61,540 tCO2e', ratio: '44.5%', target: 'RE100 綠電進程 (當前綠電比 18%)', status: 'BSI 查證 (符合 14064-1)' },
      { id: 'FSC-CP03', category: '水足跡指標', label: 'UPW 循環系統電耗', value: '4,280 tCO2e', ratio: '3.1%', target: '符合經濟部用水回收率規範 (>85%)', status: '合格 (符合產業標準)' },
      { id: 'FSC-CP04', category: '供應鏈範疇三', label: '矽晶圓/化學品採購生命週期', value: '14,200 tCO2e', ratio: 'N/A', target: '符合 IFRS S2 範疇三揭露', status: '系統自主計算' }
    ],
    products: [
      { name: '3奈米超級高效能晶片 (Wafer)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '晶片面積與光罩層數分配法 (Area & Layer)', primarySource: 'SECS/GEM通訊 + 廠務 SCADA', factorSource: 'SEMI S23 半導體能效指引', intensity: '4.85 tCO2e/片', trend: '↓ 5.2%' },
      { name: '8吋汽車電源管理IC (PMIC)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '晶片面積分配法 (Area Allocation)', primarySource: '8吋聯網流量計 + 電量計', factorSource: '台灣半導體產業協會 (TSIA) 係數', intensity: '1.12 tCO2e/K-pcs', trend: '↓ 3.8%' }
    ],
    sllLink: { icp: '$1.38M USD', intensity: '4.85 t/片', discount: '- 20.0 bps', saving: '↓ 4.8%', scopePct: { s1: 52, s2: 45, s3: 3 } }
  },
  chemical: {
    id: 'chemical', name: '化學製造',
    mechanism: '監管重點在於「反應合成熱」與「副產品回收」。整合高精度反應釜流量閥、壓力變送器，實時核算伴生與散失碳排。',
    overview: { emissions: '95,000', risk: '低風險', trend: '↓ 3.5%', activeNodes: 3 },
    nodes: [
      { id: 'CH-01', title: '自動配料混料釜', desc: '原料自動計量與混合，溫控與攪拌為主要電耗。', status: 'NORMAL', electric: '420', heat: '150', output: '調和液 80t', yieldRate: '99.5', carbon: '12.4', active: true, visualType: 'grinder', visualMetrics: { rpm: '120', temp: '45°C', purity: '99.5%', ph: '6.8' }, ef: '電網排放係數' },
      { id: 'CH-02', title: '合成反應釜', desc: '高溫高壓下進行化學合成，釋放大量反應熱。', status: 'NORMAL', electric: '1,100', heat: '1,800', output: '合成料 50t', yieldRate: '98.5', carbon: '85.2', active: true, visualType: 'fab-equipment', visualMetrics: { pressure: '15MPa', temp: '280°C', catalyst: '98%', reflux: 'On' }, ef: '熱焓+化學反應式' },
      { id: 'CH-03', title: '冷凝廢氣洗滌', desc: '副產物回收與廢氣處理，監控噴淋泵與真空度。', status: 'NORMAL', electric: '350', heat: '0', output: '達標排放', yieldRate: '95.0', carbon: '45.0', active: true, visualType: 'scrubber', visualMetrics: { temp: '15°C', vacuum: '-80kPa', recover: '95%', flow: '120L' }, ef: '電耗+逸散' }
    ],
    finance: { annualEmissions: 95000, ebitdaBeforeCarbon: 8200000, annualDebtService: 1900000, defaultPrice: 30, defaultAllowance: 90 },
    complianceMetrics: [
      { id: 'FSC-CH01', category: '範疇一製程排放', label: '非燃燒直接製程排放', value: '51,775 tCO2e', ratio: '54.5%', target: '氣候申報非燃料碳排', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-CH02', category: '範疇二電力排碳', label: '溫控系統電力消耗', value: '31,825 tCO2e', ratio: '33.5%', target: '高耗能公用設備一級標準', status: '已查證 (符合 14064-1)' }
    ],
    products: [ { name: '環保型增塑劑 (DOTP)', boundary: 'Cradle-to-Gate (搖籃到大門)', allocation: '化學計量分配法 (Stoichiometric)', primarySource: '反應釜感測器 + MES批次', factorSource: 'Ecoinvent v3.9 生命週期資料庫', intensity: '1.45 tCO2e/噸', trend: '↓ 2.1%' } ],
    sllLink: { icp: '$512K USD', intensity: '0.98 t/噸', discount: '- 14.0 bps', saving: '↓ 3.5%', scopePct: { s1: 54, s2: 34, s3: 12 } }
  },
  datacenter: {
    id: 'datacenter', name: '資料中心',
    mechanism: '針對資料中心 PUE 進行即時監控。深度整合 UPS 與冰水主機，監測冷熱通道氣流與 IT 設備負載之碳排關聯。',
    overview: { emissions: '85,000', risk: '極低風險', trend: '↓ 6.1%', activeNodes: 3 },
    nodes: [
      { id: 'DC-01', title: '冰水主機 (Chiller)', desc: '機房冷卻核心，監控出入水溫與流量計算 COP。', status: 'NORMAL', electric: '3,200', heat: '0', output: '冷能 4,500RT', yieldRate: '100', carbon: '15.5', active: true, visualType: 'chiller', visualMetrics: { flow: '12k L/m', tempIn: '12°C', tempOut: '7°C', cop: '5.2' }, ef: '電網排放係數' },
      { id: 'DC-02', title: 'UPS 智能配電', desc: '確保電力穩定供應，計算傳輸損耗與負載率。', status: 'NORMAL', electric: '8,500', heat: '0', output: '淨電力 8.2MW', yieldRate: '96.5', carbon: '4.2', active: true, visualType: 'ups-grid', visualMetrics: { load: '75%', loss: '3.5%', voltage: '380V', freq: '60Hz' }, ef: '傳輸損耗折算' },
      { id: 'DC-03', title: '高密度運算機房', desc: '伺服器核心負載，監控熱通道氣流與即時 PUE。', status: 'ALERT', electric: '8,200', heat: '850', output: '運算力 99.9%', yieldRate: '99.9', carbon: '45.8', active: true, warning: '熱通道氣流短路 (38°C)', visualType: 'server-rack', visualMetrics: { load: '85%', airflow: '15k CFM', temp: '38°C', pue: '1.28' }, ef: 'IT 負載耗電' }
    ],
    finance: { annualEmissions: 85000, ebitdaBeforeCarbon: 15000000, annualDebtService: 4200000, defaultPrice: 30, defaultAllowance: 95 },
    complianceMetrics: [
      { id: 'FSC-DC01', category: '範疇二耗電指標', label: 'IT 與伺服器核心用電', value: '74,885 tCO2e', ratio: '88.1%', target: '企業 RE100 淨零路徑目標 (30% 綠電)', status: '已查證 (符合 14064-1)' },
      { id: 'FSC-DC02', category: '範疇二廠務耗電', label: '冰水空調與冷卻系統電力', value: '6,715 tCO2e', ratio: '7.9%', target: '符合 PUE 設計規範限制 < 1.3', status: '已查證 (符合 14064-1)' }
    ],
    products: [ { name: '10U 高密度代管機櫃', boundary: 'Gate-to-Gate (大門到大門)', allocation: '實體用電分配法 (Physical Power)', primarySource: 'PDU 機櫃智慧電表', factorSource: '台灣發電排碳係數 (0.495)', intensity: '12.4 tCO2e/櫃年', trend: '↓ 6.1%' } ],
    sllLink: { icp: '$780K USD', intensity: '1.24 PUE', discount: '- 12.5 bps', saving: '↓ 6.1%', scopePct: { s1: 4, s2: 96, s3: 0 } }
  },
  power: {
    id: 'power', name: '發電廠',
    mechanism: '發電效率 (Heat Rate) 與燃料生命週期監管。精準對接汽輪機轉速與發電機激磁數據，核算國家電網排放係數。',
    overview: { emissions: '1,850,000', risk: '高風險', trend: '↓ 1.2%', activeNodes: 3 },
    nodes: [
      { id: 'PW-01', title: '超臨界燃氣鍋爐', desc: '燃燒天然氣產生高壓蒸汽，監控燃燒效率與 O2。', status: 'NORMAL', electric: '500', heat: '15,000', output: '高壓蒸汽 800t', yieldRate: '99.5', carbon: '1250.0', active: true, visualType: 'power-boiler', visualMetrics: { fuel: '天然氣', temp: '1,300°C', pressure: '25MPa', o2: '2.1%' }, ef: '天然氣熱值係數' },
      { id: 'PW-02', title: '重型汽輪機', desc: '蒸汽推動汽輪機旋轉，監控轉速與熱能轉換率。', status: 'NORMAL', electric: '0', heat: '14,500', output: '動能 500MW', yieldRate: '98.5', carbon: '0', active: true, visualType: 'turbine', visualMetrics: { rpm: '3,600', steamIn: '560°C', vacuum: '-95kPa', vibration: '1.2' }, ef: '熱能轉換率' },
      { id: 'PW-03', title: '發電機與升壓站', desc: '機械能轉為電能併入電網，監控功率因數與廠用電。', status: 'NORMAL', electric: '500,000', heat: '150', output: '電能 495MW', yieldRate: '99.0', carbon: '0', active: true, visualType: 'generator', visualMetrics: { voltage: '20kV', freq: '60Hz', pf: '0.95', load: '98%' }, ef: '廠用電耗損' }
    ],
    finance: { annualEmissions: 1850000, ebitdaBeforeCarbon: 95000000, annualDebtService: 28000000, defaultPrice: 30, defaultAllowance: 80 },
    complianceMetrics: [
      { id: 'FSC-PW01', category: '發電排碳係數', label: '售電電力排碳密集度', value: '0.495 kgCO2e/kWh', ratio: '100%', target: '能源署國家發電排碳目標 (0.45)', status: '經濟部核定' },
      { id: 'FSC-PW02', category: '範疇一燃料消耗', label: '天然氣與煤炭總燃燒排放', value: '1,846,300 tCO2e', ratio: '99.8%', target: '空污法與溫管法國家核配額度', status: '環境部登錄完畢' }
    ],
    products: [ { name: '民營燃氣基載電能 (1 MWh)', boundary: 'Gate-to-Gate (營運端發電)', allocation: '不適用物理分攤 (直接發電歸屬)', primarySource: '合格併網電表 (Taipower Billing)', factorSource: '能源署公用售電業電力排碳係數', intensity: '495.0 kgCO2e/MWh', trend: '↓ 1.2%' } ],
    sllLink: { icp: '$2.77M USD', intensity: '0.495 kg/kWh', discount: '- 25.0 bps', saving: '↓ 1.2%', scopePct: { s1: 100, s2: 0, s3: 0 } }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('chip');
  const currentIndustry = industryData[activeTab] || industryData['chip'];

  const [carbonPrice, setCarbonPrice] = useState(currentIndustry.finance.defaultPrice);
  const [allowancePct, setAllowancePct] = useState(currentIndustry.finance.defaultAllowance);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCarbonPrice(industryData[tabId].finance.defaultPrice);
    setAllowancePct(industryData[tabId].finance.defaultAllowance);
    setSelectedNode(null);
  };

  const fBase = currentIndustry.finance;
  const taxableEmissions = Math.max(0, fBase.annualEmissions * (1 - allowancePct / 100));
  const totalCarbonCost = taxableEmissions * carbonPrice;
  const adjustedEbitda = fBase.ebitdaBeforeCarbon - totalCarbonCost;
  const dscr = Math.max(0, adjustedEbitda / fBase.annualDebtService);
  const ebitdaErosion = (totalCarbonCost / fBase.ebitdaBeforeCarbon) * 100;

  let creditRating = 'AAA';
  let ratingColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (dscr >= 2.5) { creditRating = 'AAA'; ratingColor = 'text-emerald-600 bg-emerald-50 border-emerald-200'; } 
  else if (dscr >= 1.8) { creditRating = 'A'; ratingColor = 'text-teal-600 bg-teal-50 border-teal-200'; } 
  else if (dscr >= 1.3) { creditRating = 'BBB'; ratingColor = 'text-yellow-600 bg-yellow-50 border-yellow-200'; } 
  else if (dscr >= 1.0) { creditRating = 'BB'; ratingColor = 'text-orange-600 bg-orange-50 border-orange-200'; } 
  else { creditRating = 'D'; ratingColor = 'text-red-600 bg-red-50 border-red-200'; }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* 導覽列：高對比黑底白字 */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-md text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-1.5 rounded-lg border border-blue-500 shadow-sm">
              <Activity className="text-white w-6 h-6 animate-pulse" />
            </div>
            <span className="text-2xl font-extrabold tracking-widest">
              ECO<span className="text-blue-400 font-light">RISK</span> <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 ml-1">OS</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700 overflow-x-auto">
            {Object.values(industryData).map(ind => (
              <button 
                key={ind.id} onClick={() => handleTabChange(ind.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${activeTab === ind.id ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {ind.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* --- Top Dashboard Overview (Light Theme) --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold text-slate-900 flex items-center mb-3 tracking-wide">
                <Factory className="w-8 h-8 mr-3 text-blue-600" />
                {currentIndustry.name} 數位孿生風控中心
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">{currentIndustry.mechanism}</p>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 min-w-[160px] shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">年估算總排碳</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-800 font-mono">{currentIndustry.overview.emissions}</span>
                  <span className="text-sm text-slate-500">tCO2e</span>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 min-w-[160px] shadow-sm">
                <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">授信風險評級</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-700">{currentIndustry.overview.risk}</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 min-w-[160px] shadow-sm">
                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">減碳趨勢</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-blue-700 font-mono">{currentIndustry.overview.trend}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 relative z-10">
            <a href="#architecture" className="text-sm px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full font-bold text-slate-700 transition-colors flex items-center shadow-sm">
               <Layers className="w-5 h-5 mr-2 text-blue-600" /> 01. 2.5D 立體數據拓樸
            </a>
            <a href="#stress-test" className="text-sm px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full font-bold text-slate-700 transition-colors flex items-center shadow-sm">
               <Sliders className="w-5 h-5 mr-2 text-blue-600" /> 02. 財務壓力測試
            </a>
            <a href="#compliance" className="text-sm px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full font-bold text-slate-700 transition-colors flex items-center shadow-sm">
               <FileText className="w-5 h-5 mr-2 text-blue-600" /> 03. 合規與產品足跡
            </a>
          </div>
        </div>

        {/* --- Phase 1: 2.5D Isometric Interactive PFD (Light Theme Adapated) --- */}
        <section id="architecture" className="scroll-mt-24">
          <SectionHeader title="01 / 2.5D 數位孿生製程拓樸 (Digital Twin Lineage)" subtitle="透過立體管線追蹤能源與物質流向，點擊各廠區節點以下鑽 (Drill-down) 深入檢視專屬的動態圖表與核算邏輯。" />
          
          <div className="bg-slate-100/50 p-8 rounded-3xl shadow-inner border border-slate-200 relative overflow-hidden mt-6">
            
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <Boxes className="w-6 h-6 text-blue-600" />
                <h3 className="text-base font-extrabold tracking-widest text-slate-800 uppercase">Isometric Process Flow</h3>
              </div>
              <div className="flex items-center text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 animate-ping"></div>
                LIVE MATERIAL FLOW
              </div>
            </div>

            {/* Isometric pseudo-3D container */}
            <div className="relative py-12 px-4 overflow-x-auto">
              
              {/* Flow Lines (Background connecting pipeline) */}
              <div className="absolute inset-0 pointer-events-none z-0 mt-36 hidden lg:block">
                 <div className="w-[85%] h-3 bg-slate-300 mx-auto rounded-full relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(250,204,21,0.8)_50%,transparent_100%)] w-[200%] animate-[slide_3s_linear_infinite]"></div>
                 </div>
              </div>

              {/* Node Layout - using transform to give a slight 3D perspective to the container */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative justify-center items-end z-10 min-w-max px-8">
                {currentIndustry.nodes.map((node, idx) => (
                  <div key={idx} className="relative group perspective-1000 w-64 flex flex-col items-center">
                    
                    {/* Connector line down to the main pipeline */}
                    <div className="absolute left-1/2 -bottom-6 w-2 h-6 bg-slate-300 -translate-x-1/2 z-0 shadow-inner hidden lg:block">
                      <div className="w-full h-full bg-yellow-400/60 animate-pulse"></div>
                    </div>

                    {/* Floating Monitor Speech Bubble */}
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-5 w-full mb-6 relative z-20 transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      {/* Speech Bubble Tail */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-blue-100 transform rotate-45"></div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-extrabold text-slate-800 text-sm tracking-wide">{node.title}</h5>
                        <span className={`flex h-3 w-3 relative`}>
                          {node.status === 'ALERT' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${node.status === 'ALERT' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-slate-500 mb-4 h-9 line-clamp-2 leading-relaxed font-semibold">
                        {node.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col items-center">
                          <span className="text-[10px] text-slate-400 font-bold uppercase mb-1 font-sans tracking-wider">能耗 (kW)</span>
                          <span className="font-black text-slate-700 text-sm">{node.electric}</span>
                        </div>
                        <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 flex flex-col items-center">
                          <span className="text-[10px] text-blue-500 font-bold uppercase mb-1 font-sans tracking-wider">碳流率 (kg/h)</span>
                          <span className="font-black text-blue-700 text-sm">{node.carbon}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedNode(node)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-md shadow-blue-500/20"
                      >
                        <ZoomIn className="w-4 h-4 mr-2" /> Zoom in 分析
                      </button>
                    </div>

                    {/* 2.5D SVG Illustration Area */}
                    <div className="p-0 flex justify-center items-end h-40 relative overflow-visible z-10 w-full group-hover:scale-105 transition-transform duration-300">
                      <IsometricVectorIllustration type={node.visualType} status={node.status} />
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* --- AI Data Gateway Visualization (具象化 AI 數據閘道) --- */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-center mb-8">
                <Database className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-extrabold tracking-widest text-slate-800 uppercase">AI 數據核算閘道器 (Data Gateway)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* 1. 累積與清洗 */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
                  <div className="flex items-center text-blue-600 mb-4">
                    <Database className="w-5 h-5 mr-2" />
                    <h4 className="text-sm font-extrabold uppercase tracking-wider">1. 數據累積與清洗</h4>
                  </div>
                  <div className="h-16 flex items-end justify-between gap-1.5 mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-inner">
                    {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="w-full bg-blue-100 rounded-t-sm relative transition-all" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 left-0 w-full bg-blue-500" style={{ height: `${h/2}%` }}></div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">高速感測器數據池 (Data Lake) 匯總，執行演算法剃除異常雜訊與離群值。</p>
                </div>

                {/* 2. 系統性計算 */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
                  <div className="flex items-center text-cyan-600 mb-4">
                    <Settings className="w-5 h-5 mr-2 animate-[spin_4s_linear_infinite]" />
                    <h4 className="text-sm font-extrabold uppercase tracking-wider">2. ISO 14067 運算</h4>
                  </div>
                  <div className="h-16 flex items-center justify-center mb-4 text-slate-600 font-mono text-sm font-bold bg-white rounded-xl border border-slate-200 shadow-inner px-2">
                     <span className="text-emerald-500 mr-2 text-lg">Σ</span> (Activity × <span className="text-blue-500 mx-1">EF</span> × GWP)
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">動態套用國家與 IPCC 排放係數庫，即時換算為精準的碳當量 (CO2e)。</p>
                </div>

                {/* 3. 系統性分類 */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
                  <div className="flex items-center text-purple-600 mb-4">
                    <AlignVerticalSpaceAround className="w-5 h-5 mr-2" />
                    <h4 className="text-sm font-extrabold uppercase tracking-wider">3. 類別歸戶輸出</h4>
                  </div>
                  <div className="h-16 flex flex-col justify-center gap-2 mb-4 px-4 bg-white rounded-xl border border-slate-200 shadow-inner">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold"><span className="text-orange-500">Scope 1</span><div className="w-24 h-2 bg-slate-100 rounded-full"><div className="w-3/4 h-full bg-orange-500 rounded-full"></div></div></div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold"><span className="text-blue-500">Scope 2</span><div className="w-24 h-2 bg-slate-100 rounded-full"><div className="w-1/2 h-full bg-blue-500 rounded-full"></div></div></div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold"><span className="text-slate-500">Scope 3</span><div className="w-24 h-2 bg-slate-100 rounded-full"><div className="w-1/4 h-full bg-slate-400 rounded-full"></div></div></div>
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">結構化歸戶，即時推送至右下方的「合規矩陣」與「財務壓力測試模型」。</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- Phase 2: Bank Credit Stress Test --- */}
        <section id="stress-test" className="space-y-4 scroll-mt-24">
          <SectionHeader title="02 / 授信風控與壓力測試" subtitle="動態模擬碳價變動對 EBITDA 與還款覆蓋率 (DSCR) 之衝擊。" />
          
          <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-5 bg-slate-50 text-slate-800 flex justify-between items-center border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <Sliders className="w-6 h-6 text-blue-600" />
                <h3 className="font-extrabold text-lg tracking-wide">動態情境模擬器</h3>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 font-mono px-3 py-1.5 rounded-md border border-blue-200 font-bold">DSCR-v2.1</span>
            </div>
            
            <div className="p-8 flex flex-col lg:flex-row gap-8">
              <div className="space-y-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex-1">
                <div>
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-slate-600 font-extrabold uppercase tracking-wider">未來碳權價格 (USD/噸)</span>
                    <span className="text-blue-600 font-black font-mono text-xl">${carbonPrice}</span>
                  </div>
                  <input type="range" min="10" max="150" step="5" value={carbonPrice} onChange={(e) => setCarbonPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>
                <div>
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-slate-600 font-extrabold uppercase tracking-wider">免費配額比例 (%)</span>
                    <span className="text-emerald-600 font-black font-mono text-xl">{allowancePct}%</span>
                  </div>
                  <input type="range" min="0" max="100" step="5" value={allowancePct} onChange={(e) => setAllowancePct(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-center">
                    <span className="text-xs text-slate-500 font-extrabold tracking-widest uppercase mb-2">預估碳財務成本</span>
                    <p className="text-3xl font-black text-slate-800 font-mono">${totalCarbonCost.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm flex flex-col justify-center">
                    <span className="text-xs text-slate-500 font-extrabold tracking-widest uppercase mb-2">EBITDA 侵蝕率</span>
                    <p className="text-3xl font-black text-red-500 font-mono">{ebitdaErosion.toFixed(1)}%</p>
                    <div className="absolute bottom-0 left-0 h-2 bg-red-400 transition-all duration-300" style={{width: `${Math.min(100, ebitdaErosion)}%`}}></div>
                  </div>
                </div>

                <div className={`p-8 rounded-3xl border-2 ${ratingColor} flex flex-col justify-between items-start gap-6 shadow-sm`}>
                  <div className="flex items-center space-x-5 w-full">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      {dscr < 1.0 ? <ShieldAlert className="w-12 h-12 text-red-500" /> : dscr < 1.3 ? <AlertTriangle className="w-12 h-12 text-yellow-500" /> : <ShieldCheck className="w-12 h-12 text-emerald-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 font-extrabold tracking-widest uppercase mb-1">信用評等預測 | DSCR {dscr.toFixed(2)}x</p>
                      <h4 className="font-black text-slate-900 text-3xl flex items-center">
                        RATING <span className="ml-3 font-mono tracking-widest text-4xl">{creditRating}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Phase 3: Compliance & Products (Matches Screenshot Layout) --- */}
        <section id="compliance" className="space-y-6 scroll-mt-24">
          <SectionHeader title="03 / 金管會與永續合規揭露報告" subtitle="符合 FSC 及 GHG Protocol 之雙重驗證數據。" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Wider): FSC + PCF */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* FSC Matrix */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 overflow-hidden">
                <div className="flex items-center mb-5 pb-3 border-b border-slate-100">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  <h3 className="font-extrabold text-lg text-slate-800">金管會上市櫃碳申報合規指標 (FSC Regulatory Matrix)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-slate-500 font-bold border-b border-slate-100">
                        <th className="pb-3 px-2">指標編碼</th>
                        <th className="pb-3 px-2">合規監管類別</th>
                        <th className="pb-3 px-2">關鍵實施數據 (年累計)</th>
                        <th className="pb-3 px-2">法規/轉型政策依據</th>
                        <th className="pb-3 px-2 text-right">稽核驗證狀態</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentIndustry.complianceMetrics.map((metric) => (
                        <tr key={metric.id} className="hover:bg-slate-50/50">
                          <td className="py-4 px-2 font-bold text-blue-600 cursor-pointer hover:underline">{metric.id}</td>
                          <td className="py-4 px-2 font-bold text-slate-700">{metric.category}</td>
                          <td className="py-4 px-2 font-mono font-extrabold text-slate-900">
                            {metric.value} <span className="text-xs text-slate-500 font-medium">({metric.ratio})</span>
                          </td>
                          <td className="py-4 px-2 text-slate-500 text-xs">{metric.target}</td>
                          <td className="py-4 px-2 text-right">
                            <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border ${metric.status.includes('查證') || metric.status.includes('通過') || metric.status.includes('合格') || metric.status.includes('無誤') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                              {metric.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PCF Details */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center">
                    <Boxes className="w-6 h-6 mr-3 text-blue-600" />
                    <h3 className="font-extrabold text-lg text-slate-800">產品碳足跡深度解析表 (ISO 14067 PCF Factor Mapping)</h3>
                  </div>
                  <button className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                    <Download className="w-4 h-4 mr-1.5" /> 匯出合規報告
                  </button>
                </div>
                
                <div className="space-y-4">
                  {currentIndustry.products.map((prod, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                        <span className="font-extrabold text-lg text-slate-800">{prod.name}</span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-bold mt-2 sm:mt-0">
                          計算範疇: {prod.boundary}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          <div>
                            <p className="text-slate-500 font-semibold mb-1">數據分攤方法</p>
                            <p className="font-bold text-slate-800">{prod.allocation}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 font-semibold mb-1">一級活動數據源</p>
                            <p className="font-bold text-slate-800">{prod.primarySource}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 font-semibold mb-1">排放係數庫來源</p>
                            <p className="font-bold text-slate-800">{prod.factorSource}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center min-w-[200px]">
                          <p className="text-xs text-slate-500 font-semibold mb-1">產品碳足跡值</p>
                          <p className="text-2xl font-black font-mono text-slate-900">{prod.intensity}</p>
                          <p className="text-xs text-emerald-600 font-bold mt-1">{prod.trend} 較前季</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Narrower): GHG Sources + IoT Logs */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* GHG Source Analysis */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                <div className="flex items-center mb-5 pb-3 border-b border-slate-100">
                  <AlignVerticalSpaceAround className="w-5 h-5 mr-3 text-blue-600" />
                  <h3 className="font-extrabold text-base text-slate-800">溫室氣體排碳來源分析 (當前製程)</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold text-slate-700">
                      <span>範疇一 (直接溫室氣體排放)</span>
                      <span>{currentIndustry.sllLink.scopePct.s1}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-[#f97316] h-2.5 rounded-full" style={{width: `${currentIndustry.sllLink.scopePct.s1}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold text-slate-700">
                      <span>範疇二 (輸入能源間接排放)</span>
                      <span>{currentIndustry.sllLink.scopePct.s2}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-[#3b82f6] h-2.5 rounded-full" style={{width: `${currentIndustry.sllLink.scopePct.s2}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold text-slate-700">
                      <span>範疇三 (價值鏈上下游排放)</span>
                      <span>{currentIndustry.sllLink.scopePct.s3}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-[#94a3b8] h-2.5 rounded-full" style={{width: `${currentIndustry.sllLink.scopePct.s3}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* IoT Audit Trail */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-72">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                  <div className="flex items-center">
                    <FileBadge2 className="w-5 h-5 mr-2 text-slate-600" />
                    <h3 className="font-extrabold text-sm text-slate-800">現場 IoT 節點自動化防篡改日誌</h3>
                  </div>
                  <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Ledger Synced
                  </span>
                </div>
                {/* Dark Table for Logs */}
                <div className="flex-1 bg-[#1e293b] font-mono text-xs overflow-y-auto">
                  <table className="w-full text-left text-slate-300">
                    <thead className="bg-[#0f172a] text-slate-400 sticky top-0 border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-2.5 font-semibold">時間</th>
                        <th className="px-4 py-2.5 font-semibold">事件點</th>
                        <th className="px-4 py-2.5 font-semibold">原始數值</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-blue-400">15:34:02</td>
                        <td className="px-4 py-3 text-emerald-400">UNIT 3: 電表 API 讀取</td>
                        <td className="px-4 py-3">890.2 kWh</td>
                      </tr>
                      <tr className="bg-red-900/20 hover:bg-red-900/30">
                        <td className="px-4 py-3 text-blue-400">15:33:45</td>
                        <td className="px-4 py-3 text-red-400 font-bold">UNIT 2: 閥值異常</td>
                        <td className="px-4 py-3 text-slate-200">Temp=1,650C</td>
                      </tr>
                      <tr className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-blue-400">15:30:00</td>
                        <td className="px-4 py-3 text-blue-400">ERP 完工同步</td>
                        <td className="px-4 py-3">Batch #A992</td>
                      </tr>
                      <tr className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-blue-400">15:28:12</td>
                        <td className="px-4 py-3 text-emerald-400">UNIT 1: 流量計 API</td>
                        <td className="px-4 py-3">Flow 12,050</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* --- Overlay Modal: 節點詳細數據血緣透視 --- */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setSelectedNode(null)}></div>
          
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl border border-blue-200">
                  <Activity className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-2xl">{selectedNode.title} 流程解析</h3>
                  <p className="text-sm text-slate-500 font-mono mt-1 font-bold">NODE_ID: {selectedNode.id} | STATUS: {selectedNode.status}</p>
                </div>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-700 transition-colors bg-white border border-slate-200 p-2.5 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Custom Animated Flow & Raw Data */}
            <div className="p-8 overflow-y-auto space-y-10">
              
              {/* Row 1: 客製化動態流程圖 (Custom Animated Flow Chart) */}
              <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm">
                <h4 className="text-sm font-extrabold text-slate-700 uppercase mb-6 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" /> 連續動作示意圖與物理特徵 (Process Analytics)
                </h4>
                
                {/* 替換為客製化動態圖表 */}
                <CustomDrillDownChart node={selectedNode} />
              </div>

              {/* Row 2: Sensor Raw Data */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-700 uppercase mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-600" /> Sensor Raw Data & Factors
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {Object.entries(selectedNode.visualMetrics).map(([k, v], i) => (
                    <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                      <span className="text-slate-500 text-xs block mb-2 uppercase font-bold">{k}</span>
                      <span className="text-slate-900 font-black text-xl">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl text-sm text-slate-800 flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <p className="mb-2"><span className="text-blue-700 font-extrabold mr-2">使用係數 (EF):</span> <span className="font-mono bg-white px-2 py-1 border border-blue-200 rounded">{selectedNode.ef}</span></p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center font-mono mt-4 sm:mt-0 shadow-sm">
                    <span>Formula: [Activity] × [EF]</span>
                    <span className="text-emerald-600 font-bold flex items-center ml-4 bg-emerald-50 px-2 py-1 rounded"><CheckCircle2 className="w-4 h-4 mr-1"/> Validated</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/*运动線條動畫樣式 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
        @keyframes slide-down { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
      `}} />
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="border-l-[6px] border-blue-600 pl-5 mb-8">
      <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase">{title}</h2>
      <p className="text-slate-600 mt-2 max-w-4xl text-base leading-relaxed font-medium">{subtitle}</p>
    </div>
  );
}

// ==========================================
// 客製化：單元下鑽動態物理圖表 (Node Drill-down Custom SVG/Charts)
// ==========================================
function CustomDrillDownChart({ node }) {
  const type = node.visualType;

  // 1. 鋼鐵與加熱設備 (高爐、轉爐、鍋爐) - 展現熱能流向與化學轉換
  if (type === 'blast-furnace' || type === 'converter-furnace' || type === 'power-boiler') {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 w-full">
        {/* Input (燃料/原料) */}
        <div className="flex flex-col items-center w-32">
          <div className="bg-white border-2 border-orange-200 w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-50 opacity-50"></div>
            <Flame className="w-8 h-8 text-orange-500 mb-2 z-10" />
            <span className="text-xs font-extrabold text-slate-700 z-10">燃料/原料</span>
          </div>
          <span className="mt-3 text-sm font-mono font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">{node.heat} MJ</span>
        </div>

        {/* Animated Flow Arrow */}
        <div className="flex-1 flex justify-center hidden md:flex">
          <svg width="100%" height="40" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="100%" y2="20" stroke="#facc15" strokeWidth="4" strokeDasharray="10 5" className="animate-[slide_1s_linear_infinite]" style={{ filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.6))' }} />
            <polygon points="100%,15 100%,25 calc(100% + 10px),20" fill="#facc15" transform="translate(-10,0)"/>
          </svg>
        </div>

        {/* Core Process (高溫熔煉) */}
        <div className="flex flex-col items-center relative z-10">
          <div className={`bg-slate-900 border-4 w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-xl relative overflow-hidden ${node.status === 'ALERT' ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'border-slate-700'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#eab308_0%,_transparent_70%)] opacity-40 animate-pulse"></div>
            <Factory className="w-12 h-12 text-white mb-2 z-10" />
            <span className="text-sm font-extrabold text-white z-10">{node.title}</span>
            <span className="text-[10px] text-yellow-400 font-mono mt-1 z-10">{node.visualMetrics.temp || '高溫反應'}</span>
          </div>
        </div>

        {/* Output Split Flow */}
        <div className="flex-1 flex justify-center hidden md:flex relative h-32">
          {/* Product flow */}
          <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute inset-0">
            <path d="M 0 64 L 50% 64 L 50% 20 L 100% 20" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="10 5" className="animate-[slide_1s_linear_infinite]" />
          </svg>
          {/* Carbon/Waste flow */}
          <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute inset-0">
            <path d="M 0 64 L 50% 64 L 50% 108 L 100% 108" fill="none" stroke="#facc15" strokeWidth="4" strokeDasharray="10 5" className="animate-[slide_1s_linear_infinite]" style={{ filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.6))' }} />
          </svg>
        </div>

        {/* Outputs */}
        <div className="flex flex-col gap-6 items-center w-32">
          <div className="flex flex-col items-center">
            <div className="bg-white border-2 border-emerald-200 w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-md">
              <Boxes className="w-8 h-8 text-emerald-500 mb-2" />
              <span className="text-[11px] font-extrabold text-slate-700 text-center leading-tight">物理產出<br/>{node.output.split(' ')[0]}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-50 border-2 border-yellow-300 w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(250,204,21,0.2)_100%)] animate-[slide-down_2s_linear_infinite Burglar] bg-[size:100%_200%]"></div>
              <Activity className="w-8 h-8 text-yellow-500 mb-2 z-10" />
              <span className="text-[11px] font-extrabold text-yellow-800 z-10">碳排流率<br/>{node.carbon} kg</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. 水泥旋窯 (Rotary Kiln) - 凸顯化學分解與燃料的圓餅圖分佈
  if (type === 'rotary-kiln') {
    return (
      <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4 w-full">
        {/* Kiln Detailed Animation */}
        <div className="flex flex-col items-center">
           <div className="w-56 h-40 relative">
             <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-md overflow-visible">
               <polygon points="0,50 30,50 30,55 0,55" fill="#94a3b8" />
               <circle cx="10" cy="45" r="3" fill="#cbd5e1" className="animate-[slide_1s_linear_infinite]" />
               <circle cx="20" cy="45" r="3" fill="#cbd5e1" className="animate-[slide_1s_linear_infinite]" />
               <polygon points="40,80 60,80 50,110" fill="#94a3b8" />
               <polygon points="140,80 160,80 150,110" fill="#94a3b8" />
               <g transform="rotate(10, 100, 60)">
                 <rect x="20" y="40" width="160" height="40" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
                 <rect x="50" y="40" width="10" height="40" fill="#64748b" />
                 <rect x="140" y="40" width="10" height="40" fill="#64748b" />
                 <path d="M 170 45 Q 140 60 170 75 Z" fill="#eab308" className="animate-pulse" />
               </g>
               <path d="M 30 40 Q 30 10 60 10" fill="none" stroke="#facc15" strokeWidth="4" strokeDasharray="5 5" className="animate-[slide-down_2s_linear_infinite_reverse]" style={{ filter: 'drop-shadow(0 0 3px #facc15)' }} />
             </svg>
           </div>
           <span className="mt-2 text-sm font-extrabold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">高溫煆燒 (約 1450°C)</span>
        </div>

        {/* Distribution Pie Chart natively in SVG */}
        <div className="flex flex-col items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm w-full max-w-sm">
           <h5 className="text-xs font-extrabold text-slate-500 uppercase mb-4 tracking-wider flex items-center">
             <PieChart className="w-4 h-4 mr-2 text-blue-500" /> 碳排來源佔比 (Process vs Fuel)
           </h5>
           <div className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-inner" 
                style={{ background: `conic-gradient(#facc15 0% 72%, #94a3b8 72% 100%)` }}>
             <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
               <span className="text-slate-800 text-base font-black">100%</span>
             </div>
           </div>
           <div className="mt-6 w-full space-y-3 text-xs font-bold text-slate-600">
             <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-100"><span className="flex items-center"><span className="w-3 h-3 rounded-sm bg-yellow-400 mr-2"></span> 石灰石分解 (CaCO3)</span><span className="font-mono text-yellow-600 text-sm">72%</span></div>
             <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-100"><span className="flex items-center"><span className="w-3 h-3 rounded-sm bg-slate-400 mr-2"></span> 化石燃料燃燒</span><span className="font-mono text-slate-600 text-sm">28%</span></div>
           </div>
        </div>
      </div>
    );
  }

  // 3. 電子/化工 (Scrubber / 洗氣塔) - 展現氣體過濾與破壞效率
  if (type === 'scrubber') {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-4 w-full">
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-56 bg-white border-[3px] border-slate-300 rounded-t-full rounded-b-xl shadow-lg overflow-hidden flex flex-col items-center">
            <div className="absolute top-8 w-full border-b-[3px] border-blue-200"></div>
            <div className="absolute top-10 w-full h-full flex justify-around px-4 opacity-70">
               <div className="w-1.5 h-full bg-blue-300 animate-[slide-down_0.5s_linear_infinite]"></div>
               <div className="w-1.5 h-full bg-blue-300 animate-[slide-down_0.7s_linear_infinite]"></div>
               <div className="w-1.5 h-full bg-blue-300 animate-[slide-down_0.6s_linear_infinite]"></div>
               <div className="w-1.5 h-full bg-blue-300 animate-[slide-down_0.8s_linear_infinite]"></div>
            </div>
            <div className="absolute bottom-4 -left-4 w-12 h-6 bg-slate-200 rounded-full"></div>
            <div className="absolute bottom-0 w-full h-full flex justify-around px-6">
               <div className="w-3 h-3 rounded-full bg-yellow-400 animate-[slide_2.5s_linear_infinite_reverse]"></div>
               <div className="w-4 h-4 rounded-full bg-emerald-300 animate-[slide_3.5s_linear_infinite_reverse]" style={{ animationDelay: '1s' }}></div>
               <div className="w-3 h-3 rounded-full bg-emerald-400 animate-[slide_2s_linear_infinite_reverse]"></div>
            </div>
            <div className="w-full h-6 bg-blue-500/20 absolute top-20 border-y-2 border-blue-200 flex items-center justify-center"><div className="w-full h-1 bg-blue-300/50"></div></div>
            <div className="w-full h-6 bg-blue-500/20 absolute top-32 border-y-2 border-blue-200 flex items-center justify-center"><div className="w-full h-1 bg-blue-300/50"></div></div>
          </div>
          <span className="mt-4 text-sm font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">尾氣破壞與化學洗滌</span>
        </div>

        <div className="flex flex-col items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm w-full max-w-sm">
           <h5 className="text-xs font-extrabold text-slate-500 uppercase mb-6 tracking-wider flex items-center">
             <Gauge className="w-4 h-4 mr-2 text-emerald-500" /> 去除效率 (DRE) 實時監控
           </h5>
           <div className="relative w-48 h-24 overflow-hidden mb-2">
             <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[18px] border-slate-100 border-b-transparent border-r-transparent transform -rotate-45"></div>
             <div className={`absolute top-0 left-0 w-48 h-48 rounded-full border-[18px] border-b-transparent border-r-transparent transform rotate-[135deg] transition-all duration-1000 ${node.status === 'ALERT' ? 'border-red-400' : 'border-emerald-400'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white w-32 h-16 rounded-t-full justify-end pb-2">
               <span className={`text-4xl font-black font-mono ${node.status === 'ALERT' ? 'text-red-500' : 'text-emerald-500'}`}>{node.visualMetrics.dre || '99%'}</span>
             </div>
           </div>
           <p className={`text-sm font-bold mt-4 bg-slate-50 px-4 py-2 rounded-xl border ${node.status === 'ALERT' ? 'text-red-500 border-red-100' : 'text-slate-600 border-slate-100'}`}>
             {node.status === 'ALERT' ? '⚠️ 效率低於法定標準 (95%)' : '✅ 設備運轉與吸收率正常'}
           </p>
        </div>
      </div>
    );
  }

  // 4. 通用設備 (軋延、無塵室、研磨機、機房) - 歷史趨勢長條圖 (已修正為常駐顯示數據)
  return (
    <div className="w-full flex flex-col bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm text-slate-700 uppercase font-extrabold flex items-center tracking-wider"><BarChart3 className="w-5 h-5 mr-2 text-blue-500" /> 歷史能耗趨勢 (過去 7 天)</span>
        <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-lg border border-blue-100">單位: kWh</span>
      </div>
      <div className="flex items-end justify-between w-full h-48 border-b-2 border-slate-200 px-2 gap-4 relative pt-8">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-8 z-0">
           <div className="w-full h-px bg-slate-100"></div>
           <div className="w-full h-px bg-slate-100"></div>
           <div className="w-full h-px bg-slate-100"></div>
        </div>
        {[60, 80, 45, 90, 75, 55, 85].map((h, i) => {
          const rawElectric = parseFloat(node.electric?.toString().replace(/,/g,'')) || 0;
          const val = (rawElectric * (h/100)).toFixed(0);
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group z-10 h-full justify-end">
              <div className="w-full bg-blue-100 rounded-t-lg relative transition-all duration-300 hover:bg-blue-500 hover:shadow-lg flex justify-center" style={{ height: `${h}%` }}>
                 <div className="absolute -top-7 text-xs text-slate-600 font-mono font-bold transition-colors group-hover:text-blue-600 bg-white/80 px-1 rounded">
                   {val}
                 </div>
              </div>
              <span className="text-[11px] text-slate-500 font-bold uppercase mt-1">D-{7-i}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 2.5D Isometric SVG Factory Components (全彩 3D Low-Poly 科技視角)
// ==========================================
function IsometricVectorIllustration({ type, status }) {
  const isAlert = status === 'ALERT';
  
  const topColor = "#ffffff";     // Matte White
  const leftColor = "#f1f5f9";    // Matte Light Grey
  const rightColor = "#e2e8f0";   // Matte Grey
  const darkTop = "#94a3b8";      
  const darkLeft = "#64748b";
  const darkRight = "#475569";
  
  const flowColor = "#facc15";    // Glowing Bright Yellow
  const flowGlow = "rgba(250,204,21,0.6)"; 

  const IsoCube = ({ x, y, sizeX, sizeY, h, colorLeft=leftColor, colorRight=rightColor, colorTop=topColor }) => {
    const dxX = sizeX * 0.866; const dyX = sizeX * 0.5;
    const dxY = sizeY * 0.866; const dyY = sizeY * 0.5;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <polygon points={`0,0 -${dxX},${dyX} 0,${dyX+dyY} ${dxY},${dyY}`} fill={colorTop} stroke="#cbd5e1" strokeWidth="0.5" strokeLinejoin="round"/>
        <polygon points={`-${dxX},${dyX} 0,${dyX+dyY} 0,${dyX+dyY+h} -${dxX},${dyX+h}`} fill={colorLeft} stroke="#cbd5e1" strokeWidth="0.5" strokeLinejoin="round"/>
        <polygon points={`0,${dyX+dyY} ${dxY},${dyY} ${dxY},${dyY+h} 0,${dyX+dyY+h}`} fill={colorRight} stroke="#cbd5e1" strokeWidth="0.5" strokeLinejoin="round"/>
      </g>
    );
  };

  const IsoCylinder = ({ x, y, r, h, colorTop={topColor}, colorSide={rightColor}, colorSideDark={leftColor} }) => (
    <g>
      <ellipse cx={x} cy={y+h} rx={r} ry={r*0.5} fill={colorSideDark} />
      <path d={`M ${x-r} ${y} L ${x-r} ${y+h} A ${r} ${r*0.5} 0 0 0 ${x+r} ${y+h} L ${x+r} ${y} Z`} fill={colorSide} stroke="#cbd5e1" strokeWidth="0.5"/>
      <ellipse cx={x} cy={y} rx={r} ry={r*0.5} fill={colorTop} stroke="#cbd5e1" strokeWidth="0.5"/>
    </g>
  );

  const BasePlatform = () => (
    <g transform="translate(100, 160)">
      <polygon points="0,0 -90,-45 0,-90 90,-45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
      <polygon points="-90,-45 0,0 0,10 -90,-35" fill="#e2e8f0"/>
      <polygon points="90,-45 0,0 0,10 90,-35" fill="#cbd5e1"/>
      <polygon points="-90,-35 0,10 0,15 -90,-25" fill="#0ea5e9" opacity="0.9"/>
      <polygon points="90,-35 0,10 0,15 90,-25" fill="#0284c7" opacity="0.9"/>
    </g>
  );

  const IsoPipeline = ({ points, animate = true }) => (
    <g>
      <polyline points={points} fill="none" stroke="#eab308" strokeWidth="4" strokeLinejoin="round" opacity="0.5" />
      <polyline points={points} fill="none" stroke={flowColor} strokeWidth="3" strokeLinejoin="round" 
        className={animate ? "animate-[slide_1.5s_linear_infinite]" : ""} strokeDasharray={animate ? "8 6" : "none"}
        style={{ filter: `drop-shadow(0px 0px 4px ${flowGlow})` }} />
    </g>
  );

  if (type === 'blast-furnace' || type === 'converter-furnace' || type === 'power-boiler') {
    return (
      <svg className="w-full h-full max-w-[200px] drop-shadow-xl" viewBox="0 0 200 200" overflow="visible">
        <BasePlatform />
        <IsoPipeline points="40,110 70,95 100,110 100,130" />
        <IsoPipeline points="100,50 100,20 140,0" />
        <IsoCylinder x={100} y={70} r={25} h={40} colorTop={darkTop} colorSide={darkRight} colorSideDark={darkLeft} />
        <IsoCylinder x={100} y={45} r={18} h={25} colorTop="#fca5a5" colorSide="#ef4444" colorSideDark="#b91c1c" />
        <IsoCylinder x={100} y={25} r={10} h={20} colorTop={darkTop} colorSide={darkRight} colorSideDark={darkLeft} />
        <IsoCube x={60} y={115} sizeX={10} sizeY={15} h={30} />
        <ellipse cx="100" cy="45" rx="15" ry="7" fill={flowColor} style={{ filter: `drop-shadow(0 0 8px ${flowColor})` }} className="animate-pulse"/>
      </svg>
    );
  }

  if (type === 'rotary-kiln') {
    return (
      <svg className="w-full h-full max-w-[200px] drop-shadow-xl" viewBox="0 0 200 200" overflow="visible">
        <BasePlatform />
        <IsoPipeline points="30,110 60,95 130,60 160,75" />
        <IsoCube x={60} y={110} sizeX={10} sizeY={10} h={25} />
        <IsoCube x={140} y={70} sizeX={10} sizeY={10} h={35} />
        <g transform="rotate(-15, 100, 90)">
           <IsoCylinder x={100} y={60} r={15} h={70} colorTop={darkTop} colorSide={darkRight} colorSideDark={darkLeft} />
           <path d="M 85 90 L 85 110 A 15 7.5 0 0 0 115 110 L 115 90 Z" fill="#f97316" opacity="0.8" className="animate-pulse" />
        </g>
      </svg>
    );
  }

  if (type === 'scrubber') {
    return (
      <svg className="w-full h-full max-w-[200px] drop-shadow-xl" viewBox="0 0 200 200" overflow="visible">
        <BasePlatform />
        <IsoPipeline points="50,110 80,95 100,105" />
        <IsoPipeline points="100,45 100,10 130,-5" />
        <IsoCylinder x={100} y={45} r={20} h={75} colorTop="#86efac" colorSide="#10b981" colorSideDark="#059669" />
        <IsoCylinder x={140} y={80} r={12} h={40} colorTop={topColor} colorSide={rightColor} colorSideDark={leftColor} />
      </svg>
    );
  }

  if (type === 'rolling-mill') {
    return (
      <svg className="w-full h-full max-w-[200px] drop-shadow-xl" viewBox="0 0 200 200" overflow="visible">
        <BasePlatform />
        <polygon points="40,115 150,60 155,62.5 45,117.5" fill="#ef4444" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 5px rgba(239,68,68,0.5))' }} />
        <IsoCube x={70} y={100} sizeX={8} sizeY={20} h={35} colorTop="#93c5fd" colorLeft="#2563eb" colorRight="#3b82f6" />
        <IsoCube x={105} y={82} sizeX={8} sizeY={20} h={35} colorTop="#93c5fd" colorLeft="#2563eb" colorRight="#3b82f6" />
        <IsoCube x={140} y={65} sizeX={8} sizeY={20} h={35} colorTop="#93c5fd" colorLeft="#2563eb" colorRight="#3b82f6" />
      </svg>
    );
  }

  if (type === 'server-rack' || type === 'cleanroom' || type === 'fab-equipment') {
    return (
      <svg className="w-full h-full max-w-[220px] drop-shadow-xl" viewBox="0 0 200 200" overflow="visible">
        <BasePlatform />
        <IsoPipeline points="40,105 80,85 120,105" />
        <IsoCube x={90} y={80} sizeX={15} sizeY={25} h={45} colorTop="#a5b4fc" colorLeft="#4f46e5" colorRight="#6366f1" />
        <IsoCube x={130} y={60} sizeX={15} sizeY={25} h={45} colorTop="#a5b4fc" colorLeft="#4f46e5" colorRight="#6366f1" />
        <ellipse cx="100" cy="40" rx="15" ry="8" fill="#cbd5e1" opacity="0.8" className="animate-pulse" filter="blur(2px)"/>
        <ellipse cx="115" cy="35" rx="10" ry="5" fill="#94a3b8" opacity="0.6" className="animate-pulse" filter="blur(2px)"/>
        <circle cx="85" cy="90" r="1.5" fill="#34d399" className="animate-ping" />
        <circle cx="125" cy="70" r="1.5" fill="#34d399" className="animate-ping" />
      </svg>
    );
  }

  return (
    <svg className="w-full h-full max-w-[200px] drop-shadow-xl" viewBox="0 0 200 200" overflow="visible">
      <BasePlatform />
      <IsoCube x={100} y={80} sizeX={25} sizeY={25} h={25} />
      <IsoCylinder x={100} y={60} r={20} h={15} colorTop={darkTop} colorSide={darkRight} colorSideDark={darkLeft} />
      <ellipse cx="100" cy="70" rx="15" ry="7.5" fill={flowColor} opacity="0.8" className="animate-spin" style={{ transformOrigin: '100px 70px', animationDuration: '2s' }}/>
    </svg>
  );
}