/* Client-side bilingual interface. Case records stay source-labelled; only presentation text changes. */
window.CRN_I18N = (() => {
  const STORAGE_KEY = "crn-language";
  const dictionaries = {
    "zh-CN": {
      "meta.title": "CRN — 案件与追偿网络",
      "meta.description": "CRN 汇集案件材料、投资者提交的信息与可核验的链上证据；不构成司法认定。",
      "boot.network": "案件与追偿网络",
      "boot.initializing": "正在初始化证据网络…",
      "boot.skip": "跳过",
      "nav.home": "CRN 首页",
      "nav.primary": "主导航",
      "nav.case": "案件",
      "nav.onchain": "链上",
      "nav.evidence": "证据",
      "nav.victims": "受影响者",
      "nav.bounty": "悬赏",
      "nav.search": "搜索公开案件记录",
      "nav.share": "分享案件",
      "language.label": "选择语言",
      "hero.file": "案件档案",
      "hero.title": "投资者<br><span>追偿</span><br>网络",
      "hero.estimate": "估算金额 · 公开来源待补充",
      "hero.description": "面向案件材料、可核验链上证据与投资者信息提交的公开网络。",
      "hero.explore": "查看案件",
      "hero.schematic": "链上关系示意",
      "hero.schematicAria": "示意性链上关系图；4#、1# 以及来源标注的交易所参考链接均不代表钱包归属或平台关联认定。",
      "hero.networkTitle": "链上关系示意图",
      "hero.networkDesc": "仅为示意图；4#、1# 及交易所参考链接由提交材料提供，不代表钱包归属或平台关联认定。公开链上数据仍待核验。",
      "hero.estimated": "估算",
      "hero.wallet": "4#",
      "hero.okx": "OKX",
      "hero.flow": "1#",
      "hero.destination": "Binance",
      "hero.noRecords": "来源标注的区块浏览器链接 · 等待核验",
      "hero.dataPending": "数据待补充",
      "hero.statusAria": "案件状态概览",
      "hero.scroll": "下滑查看案件",
      "case.index": "01 / 案件档案",
      "case.title": "案件概览",
      "case.description": "公开信息仅限可供审阅的内容；未经核验的记录会被明确标注。",
      "timeline.index": "02 / 时间线",
      "timeline.title": "案件时间线",
      "timeline.description": "以下为脱敏的报送时间线；所有条目均待独立核验，打开条目查看状态与来源。",
      "network.index": "03 / 关系网络",
      "network.title": "人物 / 实体网络",
      "network.description": "此视图仅可展示公开、必要且经过审阅的关系。",
      "network.case": "案件",
      "network.pending": "数据待补充",
      "network.select": "选择节点查看公开档案",
      "network.graphAria": "公开关系图。除案件外的所有节点均为数据待补充。",
      "onchain.index": "04 / 链上",
      "onchain.title": "追踪资金流向",
      "onchain.description": "在获得可核验链上记录前，资金流向不会被当作事实展示。",
      "onchain.note": "这是一种调查结构视图，不代表已确认的交易或钱包所有权。",
      "onchain.flowAria": "标注为数据待补充的资金流结构视图",
      "onchain.transactions": "交易记录",
      "onchain.transactionsDescription": "经公开验证的交易记录将在此处显示。",
      "onchain.searchTx": "搜索 TXID",
      "onchain.noTransactions": "暂无公开交易记录",
      "onchain.noTransactionsDescription": "除来源标注的外部浏览器链接外，交易记录与钱包归属信息均待独立核验后发布。",
      "evidence.index": "05 / 证据",
      "evidence.title": "证据中心",
      "evidence.description": "公开页面仅展示摘要。敏感原件必须保持受控审阅。",
      "evidence.categories": "证据类别",
      "evidence.all": "全部",
      "evidence.onchain": "链上",
      "evidence.communication": "沟通记录",
      "evidence.payment": "付款记录",
      "evidence.legal": "法律文件",
      "evidence.secureIntake": "安全收集",
      "evidence.submitTitle": "有材料需要提交？",
      "evidence.submitDescription": "本地演示模式仅在本设备预览文件；未配置服务器端存储。",
      "evidence.submit": "提交证据",
      "recovery.index": "06 / 投资者追偿",
      "recovery.title": "您是否<br />受到影响？",
      "recovery.description": "请安全地分享信息。报告损失或提交信息时从不要求连接钱包。",
      "recovery.victim": "我是受影响者",
      "recovery.haveEvidence": "我有证据",
      "recovery.haveInfo": "我有信息",
      "updates.index": "07 / 动态",
      "updates.title": "案件动态与媒体",
      "updates.description": "仅当来源可识别时，才会发布动态和媒体引用。",
      "bounty.index": "08 / 可选模块",
      "bounty.title": "悬赏",
      "bounty.description": "在核心模式下，案件分发完全可用，但活动奖励、验证与领取功能已禁用。",
      "bounty.mode": "应用模式：",
      "share.index": "09 / 传播已核验信息",
      "share.title": "分享本<br /><em>案件。</em>",
      "share.description": "帮助将经过谨慎标注的公开信息传递给可能贡献证据或线索的人。",
      "share.open": "打开分享中心",
      "share.copy": "复制案件链接",
      "share.assurance": "分享无需钱包或有效悬赏。",
      "legal.index": "法律声明",
      "legal.copy": "本网站整理并展示与案件有关的材料、投资者提交的信息与可核验的链上数据；不构成司法机关作出的刑事认定。未经法律程序确认的事项，仍以有管辖权机关的最终认定为准。运营方不鼓励暴力、骚扰、威胁、私刑、人肉搜索，或攻击无关人员。公开信息必须遵守适用的隐私、数据保护及其他法律。",
      "footer.network": "案件与追偿网络",
      "footer.legal": "法律声明",
      "floating.share": "分享案件",
      "mobile.navigation": "移动导航",
      "modal.closeDetails": "关闭详情",
      "modal.closeShare": "关闭分享中心",
      "modal.closeEvidence": "关闭证据表单",
      "modal.closeInfo": "关闭信息表单",
      "modal.closeBounty": "关闭悬赏详情",
      "share.distribution": "分发中心",
      "share.modalTitle": "分享案件",
      "share.modalCopy": "帮助传播经过谨慎标注的公开信息。",
      "share.url": "案件分享链接",
      "share.qr": "当前案件链接",
      "share.cardTitle": "分享卡片",
      "share.cardDescription": "用于分发的本地生成、清晰标注的视觉卡片。",
      "share.generate": "生成分享卡片",
      "share.download": "下载图片",
      "share.shareImage": "分享图片",
      "share.native": "系统分享",
      "form.localDemo": "本地演示模式",
      "form.evidenceTitle": "提交证据",
      "form.evidenceWarning": "请勿提交私钥、助记词、密码或双重验证代码。本演示未配置服务器端存储。",
      "form.evidenceType": "证据类型",
      "form.eventDate": "事件日期",
      "form.evidenceDescription": "证据说明",
      "form.evidencePlaceholder": "说明该材料可能相关的原因。",
      "form.relatedPerson": "关联人员",
      "form.relatedWallet": "关联钱包",
      "form.relatedTx": "关联 TXID",
      "form.email": "联系邮箱",
      "form.dropFiles": "拖放文件或选择文件",
      "form.fileTypes": "JPG、PNG、WEBP、PDF、DOCX、XLSX、CSV、TXT、MP4、MOV、MP3、WAV、ZIP",
      "form.createLocal": "创建本地证据记录",
      "form.recoveryCenter": "投资者追偿中心",
      "form.shareInformation": "分享信息",
      "form.recoveryWarning": "仅为本地演示。请勿包含密码、私钥、助记词或双重验证代码。",
      "form.name": "姓名 / 别名",
      "form.country": "国家 / 地区",
      "form.amount": "投资金额",
      "form.investmentDate": "投资日期",
      "form.project": "项目 / 平台",
      "form.wallet": "钱包地址",
      "form.txHash": "交易哈希",
      "form.description": "说明",
      "form.saveDraft": "保存本地演示草稿",
      "bounty.modalIndex": "可选激励模块",
      "bounty.modalTitle": "悬赏已关闭",
      "bounty.modalCopy": "核心模式下没有有效活动。案件浏览、证据提交、二维码、分享与推荐链接仍可正常使用。",
      "bounty.campaign": "活动",
      "bounty.pool": "资金池",
      "bounty.claim": "领取",
      "bounty.noActive": "暂无有效悬赏",
      "bounty.unavailable": "数据不可用",
      "bounty.disabled": "已禁用",
      "bounty.sponsor": "发起方仪表盘",
      "bounty.funded": "总资助 · 数据不可用",
      "bounty.sponsorDescription": "在配置经审阅的合约和有效活动前，资助、暂停、关闭和提取控件均已禁用。",
      "bounty.sharer": "分享者仪表盘",
      "bounty.earned": "总收益 · 数据不可用",
      "bounty.sharerDescription": "推荐链接仍可用于分发分析，但核心模式下不会计算奖励。",
      "bounty.claimDemo": "领取奖励（演示）",
      "status.case": "案件状态",
      "status.onchain": "链上",
      "status.evidence": "证据",
      "status.recovery": "追偿",
      "label.caseId": "案件 ID",
      "label.firstReported": "首次报告",
      "label.lastUpdated": "最后更新",
      "label.jurisdictions": "司法辖区",
      "metric.estimatedFunds": "估算资金",
      "metric.affected": "受影响投资者",
      "metric.wallets": "已追踪钱包",
      "metric.transactions": "交易记录",
      "metric.evidence": "证据条目",
      "metric.jurisdictions": "司法辖区",
      "updates.case": "案件动态",
      "updates.media": "媒体中心",
      "updates.pending": "数据待补充",
      "updates.none": "暂无媒体记录",
      "updates.caseDescription": "当前尚未发布可追溯到来源的公开动态。",
      "updates.mediaDescription": "新闻和媒体引用仅会在具备可核验来源时加入。",
      "timeline.open": "打开",
      "timeline.record": "时间线记录",
      "timeline.date": "日期",
      "timeline.status": "状态",
      "timeline.source": "来源",
      "timeline.updatedAt": "更新时间",
      "network.publicInfo": "仅展示公开且必要的详情；不包含敏感身份、联系方式、银行或凭证信息。",
      "network.entityType": "实体类型",
      "network.publicName": "公开名称",
      "network.relationship": "关系",
      "network.evidenceCount": "证据数量",
      "network.openProfile": "打开 {name} 的公开档案",
      "network.openExplorer": "在 Etherscan 中查看 4#",
      "network.openTronExplorer": "在 TRONSCAN 中查看 1#",
      "network.openOkxExplorer": "在 TRONSCAN 中查看 OKX 参考地址",
      "network.openBinanceExplorer": "在 TRONSCAN 中查看 Binance 参考地址",
      "chart.investorFunds": "投资者资金",
      "chart.wallet": "钱包",
      "chart.aggregation": "归集",
      "chart.destination": "去向",
      "chart.noAmount": "无金额",
      "chart.noTxid": "无 TXID",
      "chart.noChain": "无链信息",
      "chart.notPublished": "未发布",
      "chart.walletProfile": "钱包档案",
      "chart.publicPending": "公开数据待补充",
      "chart.address": "地址",
      "chart.chain": "链",
      "chart.firstSeen": "首次发现",
      "chart.lastSeen": "最后发现",
      "evidence.register": "公开证据登记册",
      "evidence.emptyTitle": "数据待补充",
      "evidence.emptyCopy": "本阶段案件档案中尚未发布公开证据摘要。请使用安全收集入口准备待审阅的信息。",
      "evidence.status": "状态",
      "evidence.source": "来源",
      "evidence.previewReady": "本地预览已就绪",
      "evidence.retry": "重试",
      "evidence.remove": "移除 {name}",
      "evidence.removeShort": "移除",
      "evidence.previewRefreshed": "已刷新 {name} 的本地预览。",
      "evidence.invalidType": "{name} 不是允许的文件类型。",
      "evidence.created": "已创建本地证据记录 {id}；没有上传任何文件。",
      "share.qrUnavailable": "二维码预览不可用；仍可复制案件链接。",
      "share.copied": "案件链接已复制到剪贴板。",
      "share.copyFailed": "无法复制链接，请手动选择并复制。",
      "share.openFailed": "无法打开该分享方式，请改为复制案件链接。",
      "share.wechat": "在微信中，请点击“⋯”菜单后分享给朋友或朋友圈。",
      "share.nativeUnavailable": "当前环境不支持系统分享，请选择平台或复制链接。",
      "share.nativeFailed": "系统分享不可用，请选择其他分享方式。",
      "share.generateFirst": "请先生成分享卡片。",
      "share.imageUnsupported": "当前环境不支持图片分享，请改为下载卡片。",
      "share.imageFailed": "图片无法分享，请改为下载。",
      "card.unavailable": "此浏览器不支持生成分享卡片。",
      "card.generated": "已在本地生成分享卡片。",
      "card.failed": "无法生成分享卡片，请重试。",
      "card.downloadFailed": "无法下载该卡片。",
      "card.network": "案件与追偿网络",
      "card.estimate": "估算金额 · 公开来源待补充",
      "card.recovery1": "投资者追偿",
      "card.recovery2": "案件",
      "card.investigation": "链上调查",
      "card.tags": "证据 / 透明 / 追偿",
      "card.qr": "分享中心内含二维码",
      "search.public": "公开记录搜索",
      "search.title": "搜索",
      "search.copy": "搜索案件 ID、公开实体名称、证据 ID、钱包地址或 TXID。不会建立私密信息索引。",
      "search.placeholder": "案件 ID、钱包、TXID、证据 ID",
      "search.enter": "请输入搜索词。",
      "search.noResults": "未找到公开记录",
      "search.noResultsCopy": "本演示仅提供已审阅的公开记录。",
      "search.caseFile": "CRN 案件档案",
      "search.caseOverview": "公开案件概览",
      "search.caseDrawer": "本页提供公开案件概览。",
      "recovery.reportImpact": "报告损失",
      "recovery.localSaved": "本地草稿仅保存在当前设备会话中；没有发送任何信息。",
      "bounty.coreContinues": "核心功能继续可用",
      "bounty.coreCopy": "无需连接钱包，也可使用分享、推荐归因、二维码、证据收集和案件浏览。",
      "bounty.view": "查看悬赏状态",
      "bounty.claimDisabled": "领取已禁用：未配置有效活动或链上合约。",
      "bounty.claimRequires": "实际领取需要验证方证明和合约校验。",
      "wallet.connected": "钱包已连接：{account}",
      "wallet.unavailable": "钱包连接不可用。只有真实的链上领取才需要钱包。",
      "error.initialization": "部分界面元素无法初始化，核心内容仍可使用。",
      "boot.loading": "正在载入案件档案…",
      "boot.amount": "50,000,000 USDT · 估算"
    },
    en: {}
  };

  // English is intentionally kept as a complete fallback; page markup is English before initialization.
  const english = {
    "meta.title": "CRN — Case & Recovery Network", "meta.description": "CRN organizes case materials, submitted investor information, and verifiable on-chain evidence. It does not make judicial findings.",
    "boot.network": "CASE & RECOVERY NETWORK", "boot.initializing": "INITIALIZING EVIDENCE NETWORK…", "boot.skip": "SKIP", "nav.home": "CRN home", "nav.primary": "Primary navigation", "nav.case": "CASE", "nav.onchain": "ON-CHAIN", "nav.evidence": "EVIDENCE", "nav.victims": "VICTIMS", "nav.bounty": "BOUNTY", "nav.search": "Search public case records", "nav.share": "SHARE CASE", "language.label": "Select language",
    "hero.file": "CASE FILE", "hero.title": "INVESTOR<br><span>RECOVERY</span><br>NETWORK", "hero.estimate": "ESTIMATED FIGURE · PUBLIC SOURCE PENDING", "hero.description": "A public network for case materials, verifiable on-chain evidence, and investor information submission.", "hero.explore": "EXPLORE CASE", "hero.schematic": "ON-CHAIN SCHEMATIC", "hero.schematicAria": "Illustrative on-chain network schematic; 4# and 1# are external explorer links and do not establish wallet ownership.", "hero.networkTitle": "On-chain network schematic", "hero.networkDesc": "An illustrative network only. The 4# and 1# links were supplied in submitted materials and do not establish wallet ownership. Public chain data is pending verification.", "hero.estimated": "ESTIMATED", "hero.wallet": "4#", "hero.flow": "1#", "hero.destination": "DEST.", "hero.noRecords": "SOURCE-LABELLED EXPLORER LINKS · VERIFICATION PENDING", "hero.dataPending": "DATA PENDING", "hero.statusAria": "Case status overview", "hero.scroll": "SCROLL TO INVESTIGATE",
    "case.index": "01 / CASE FILE", "case.title": "CASE OVERVIEW", "case.description": "Public information is intentionally limited to material that is available for review. Unverified records remain marked accordingly.", "timeline.index": "02 / CHRONOLOGY", "timeline.title": "CASE TIMELINE", "timeline.description": "Open an entry to inspect its public status and source availability.", "network.index": "03 / RELATIONSHIPS", "network.title": "PERSON / ENTITY NETWORK", "network.description": "Only public, necessary and reviewed relationships may appear in this view.", "network.case": "CASE", "network.pending": "DATA PENDING", "network.select": "SELECT A NODE FOR PUBLIC PROFILE", "network.graphAria": "Public relationship graph. All non-case nodes are data pending.", "onchain.index": "04 / ON-CHAIN", "onchain.title": "FOLLOW THE MONEY", "onchain.description": "Funds are not visualized as fact until verified chain records are available.", "onchain.note": "This is a structural investigation view, not a statement of transactions or wallet ownership.", "onchain.flowAria": "Structural fund flow view, marked data pending", "onchain.transactions": "TRANSACTIONS", "onchain.transactionsDescription": "Publicly validated transaction records will appear here.", "onchain.searchTx": "SEARCH TXID", "onchain.noTransactions": "NO PUBLIC TRANSACTION RECORDS", "onchain.noTransactionsDescription": "Except for a source-labelled external explorer link, transaction records and wallet ownership information remain pending independent verification.",
    "evidence.index": "05 / EVIDENCE", "evidence.title": "EVIDENCE CENTER", "evidence.description": "Public pages show summaries only. Sensitive originals must remain under controlled review.", "evidence.categories": "Evidence categories", "evidence.all": "ALL", "evidence.onchain": "ON-CHAIN", "evidence.communication": "COMMUNICATION", "evidence.payment": "PAYMENT RECORDS", "evidence.legal": "LEGAL DOCUMENTS", "evidence.secureIntake": "SECURE INTAKE", "evidence.submitTitle": "HAVE MATERIAL TO SUBMIT?", "evidence.submitDescription": "Local demo mode supports a private file preview on this device only. No server-side storage is configured.", "evidence.submit": "SUBMIT EVIDENCE", "recovery.index": "06 / INVESTOR RECOVERY", "recovery.title": "WERE YOU<br>AFFECTED?", "recovery.description": "Share information securely. Connecting a wallet is never required to report an impact or submit information.", "recovery.victim": "I AM A VICTIM", "recovery.haveEvidence": "I HAVE EVIDENCE", "recovery.haveInfo": "I HAVE INFORMATION", "updates.index": "07 / UPDATES", "updates.title": "CASE UPDATES & MEDIA", "updates.description": "Updates and media references are published only when their sources can be identified.", "bounty.index": "08 / OPTIONAL MODULE", "bounty.title": "BOUNTY", "bounty.description": "In Core mode, case distribution is fully available while campaign rewards, verification and claiming are disabled.", "bounty.mode": "APP MODE:", "share.index": "09 / SPREAD VERIFIED INFORMATION", "share.title": "SHARE THIS<br><em>CASE.</em>", "share.description": "Help route public, carefully labeled information to people who may be able to contribute evidence or intelligence.", "share.open": "OPEN SHARE CENTER", "share.copy": "COPY CASE LINK", "share.assurance": "Sharing does not require a wallet or active bounty.", "legal.index": "LEGAL NOTICE", "legal.copy": "This website organizes and displays case-related materials, investor-submitted information and verifiable on-chain data. It does not constitute a criminal finding by a judicial authority. Matters not confirmed through legal process remain subject to the final determination of competent authorities. The operator does not encourage violence, harassment, threats, vigilantism, doxxing, or attacks on uninvolved people. Public information must comply with applicable privacy, data-protection and other laws.", "footer.network": "CASE & RECOVERY NETWORK", "footer.legal": "LEGAL NOTICE", "floating.share": "SHARE", "mobile.navigation": "Mobile navigation",
    "modal.closeDetails": "Close details", "modal.closeShare": "Close share center", "modal.closeEvidence": "Close evidence form", "modal.closeInfo": "Close information form", "modal.closeBounty": "Close bounty details", "share.distribution": "DISTRIBUTION CENTER", "share.modalTitle": "SHARE THE CASE", "share.modalCopy": "Help spread carefully labeled public information.", "share.url": "Case share URL", "share.qr": "CURRENT CASE URL", "share.cardTitle": "SHARE CARD", "share.cardDescription": "A local, clearly labeled visual card for distribution.", "share.generate": "GENERATE SHARE CARD", "share.download": "DOWNLOAD IMAGE", "share.shareImage": "SHARE IMAGE", "share.native": "NATIVE SHARE", "form.localDemo": "LOCAL DEMO MODE", "form.evidenceTitle": "SUBMIT EVIDENCE", "form.evidenceWarning": "DO NOT SUBMIT private keys, seed phrases, passwords or 2FA codes. No server-side storage is configured in this demo.", "form.evidenceType": "EVIDENCE TYPE", "form.eventDate": "EVENT DATE", "form.evidenceDescription": "EVIDENCE DESCRIPTION", "form.evidencePlaceholder": "Describe why the material may be relevant.", "form.relatedPerson": "RELATED PERSON", "form.relatedWallet": "RELATED WALLET", "form.relatedTx": "RELATED TXID", "form.email": "CONTACT EMAIL", "form.dropFiles": "DROP FILES HERE OR SELECT FILES", "form.fileTypes": "JPG, PNG, WEBP, PDF, DOCX, XLSX, CSV, TXT, MP4, MOV, MP3, WAV, ZIP", "form.createLocal": "CREATE LOCAL EVIDENCE RECORD", "form.recoveryCenter": "INVESTOR RECOVERY CENTER", "form.shareInformation": "SHARE INFORMATION", "form.recoveryWarning": "Local demo mode only. Do not include passwords, private keys, seed phrases or 2FA codes.", "form.name": "NAME / ALIAS", "form.country": "COUNTRY", "form.amount": "INVESTMENT AMOUNT", "form.investmentDate": "INVESTMENT DATE", "form.project": "PROJECT / PLATFORM", "form.wallet": "WALLET ADDRESS", "form.txHash": "TRANSACTION HASH", "form.description": "DESCRIPTION", "form.saveDraft": "SAVE LOCAL DEMO DRAFT",
    "bounty.modalIndex": "OPTIONAL INCENTIVE MODULE", "bounty.modalTitle": "BOUNTY IS OFF", "bounty.modalCopy": "There is no active campaign in Core mode. Case browsing, evidence submission, QR, sharing and referral links continue normally.", "bounty.campaign": "CAMPAIGN", "bounty.pool": "POOL", "bounty.claim": "CLAIM", "bounty.noActive": "NO ACTIVE BOUNTY", "bounty.unavailable": "DATA UNAVAILABLE", "bounty.disabled": "DISABLED", "bounty.sponsor": "SPONSOR DASHBOARD", "bounty.funded": "TOTAL FUNDED · DATA UNAVAILABLE", "bounty.sponsorDescription": "Fund, pause, close and withdraw controls are disabled until a reviewed contract and active campaign are configured.", "bounty.sharer": "SHARER DASHBOARD", "bounty.earned": "TOTAL EARNED · DATA UNAVAILABLE", "bounty.sharerDescription": "Referral links continue to work for distribution analytics, but no rewards are calculated in Core mode.", "bounty.claimDemo": "CLAIM REWARD (DEMO)",
    "status.case": "CASE STATUS", "status.onchain": "ON-CHAIN", "status.evidence": "EVIDENCE", "status.recovery": "RECOVERY", "label.caseId": "CASE ID", "label.firstReported": "FIRST REPORTED", "label.lastUpdated": "LAST UPDATED", "label.jurisdictions": "JURISDICTIONS", "metric.estimatedFunds": "ESTIMATED FUNDS", "metric.affected": "AFFECTED INVESTORS", "metric.wallets": "WALLETS TRACKED", "metric.transactions": "TRANSACTIONS", "metric.evidence": "EVIDENCE ITEMS", "metric.jurisdictions": "JURISDICTIONS", "updates.case": "CASE UPDATES", "updates.media": "MEDIA CENTER", "updates.pending": "DATA PENDING", "updates.none": "NO MEDIA RECORDS", "updates.caseDescription": "No source-attributed public updates are currently published.", "updates.mediaDescription": "News and media references are added only with a verifiable source.", "timeline.open": "OPEN", "timeline.record": "TIMELINE RECORD", "timeline.date": "DATE", "timeline.status": "STATUS", "timeline.source": "SOURCE", "timeline.updatedAt": "UPDATED AT", "network.publicInfo": "Only public, necessary details are displayed. No sensitive identity, contact, banking or credential information is included.", "network.entityType": "ENTITY TYPE", "network.publicName": "PUBLIC NAME", "network.relationship": "RELATIONSHIP", "network.evidenceCount": "EVIDENCE COUNT", "network.openProfile": "Open {name} public profile", "network.openExplorer": "VIEW 4# ON ETHERSCAN", "network.openTronExplorer": "VIEW 1# ON TRONSCAN",
    "chart.investorFunds": "INVESTOR FUNDS", "chart.wallet": "WALLET", "chart.aggregation": "AGGREGATION", "chart.destination": "DESTINATION", "chart.noAmount": "NO AMOUNT", "chart.noTxid": "NO TXID", "chart.noChain": "NO CHAIN", "chart.notPublished": "NOT PUBLISHED", "chart.walletProfile": "WALLET PROFILE", "chart.publicPending": "PUBLIC DATA PENDING", "chart.address": "ADDRESS", "chart.chain": "CHAIN", "chart.firstSeen": "FIRST SEEN", "chart.lastSeen": "LAST SEEN", "evidence.register": "PUBLIC EVIDENCE REGISTER", "evidence.emptyTitle": "DATA PENDING", "evidence.emptyCopy": "No public evidence summary is published in this first-phase case file. Use the secure intake entry to prepare information for review.", "evidence.status": "STATUS", "evidence.source": "SOURCE", "evidence.previewReady": "Local preview ready", "evidence.retry": "RETRY", "evidence.remove": "Remove {name}", "evidence.removeShort": "REMOVE", "evidence.previewRefreshed": "Local preview refreshed for {name}.", "evidence.invalidType": "{name} is not a permitted file type.", "evidence.created": "Local evidence record {id} created. No files were uploaded.",
    "share.qrUnavailable": "QR preview is unavailable; the case link can still be copied.", "share.copied": "Case link copied to clipboard.", "share.copyFailed": "Unable to copy the link. Select it and copy manually.", "share.openFailed": "This share option could not be opened. Copy the case link instead.", "share.wechat": "In WeChat, tap the ⋯ menu to share with friends or Moments.", "share.nativeUnavailable": "Native sharing is not available here. Choose a platform or copy the link.", "share.nativeFailed": "Native sharing was unavailable. Choose another share option.", "share.generateFirst": "Generate a share card first.", "share.imageUnsupported": "Image sharing is not supported here. Download the card instead.", "share.imageFailed": "The image could not be shared. Download it instead.", "card.unavailable": "Share card generation is unavailable in this browser.", "card.generated": "Share card generated locally.", "card.failed": "Unable to generate the share card. Try again.", "card.downloadFailed": "The card could not be downloaded.", "card.network": "CASE & RECOVERY NETWORK", "card.estimate": "ESTIMATED FIGURE · PUBLIC SOURCE PENDING", "card.recovery1": "INVESTOR", "card.recovery2": "RECOVERY CASE", "card.investigation": "ON-CHAIN INVESTIGATION", "card.tags": "EVIDENCE  /  TRANSPARENCY  /  RECOVERY", "card.qr": "QR IN SHARE CENTER", "search.public": "PUBLIC RECORD SEARCH", "search.title": "SEARCH", "search.copy": "Search case ID, public entity name, evidence ID, wallet address or TxID. No private information is indexed.", "search.placeholder": "CASE ID, WALLET, TXID, EVIDENCE ID", "search.enter": "Enter a search term.", "search.noResults": "NO PUBLIC RECORD FOUND", "search.noResultsCopy": "Only reviewed public records are available in this demo.", "search.caseFile": "CRN Case File", "search.caseOverview": "Public case overview", "search.caseDrawer": "The public case overview is available on this page.", "recovery.reportImpact": "REPORT AN IMPACT", "recovery.localSaved": "Local draft saved on this device session only. No information was sent.", "bounty.coreContinues": "CORE CONTINUES", "bounty.coreCopy": "Share, referral attribution, QR, evidence intake and case browsing remain available with no wallet connection.", "bounty.view": "VIEW BOUNTY STATUS", "bounty.claimDisabled": "Claim is disabled: no active campaign or on-chain contract is configured.", "bounty.claimRequires": "A real claim requires a verifier attestation and contract validation.", "wallet.connected": "Wallet connected: {account}", "wallet.unavailable": "Wallet connection is unavailable. A wallet is only needed for a real on-chain claim.", "error.initialization": "Some interface elements could not initialize. Core content remains available.", "boot.loading": "LOADING CASE FILE…", "boot.amount": "50,000,000 USDT · ESTIMATED"
  };
  dictionaries.en = english;
  Object.assign(dictionaries.en, {
    "hero.schematicAria": "Illustrative on-chain network schematic; 4#, 1#, and source-labelled exchange references do not establish wallet ownership or platform association.",
    "hero.networkDesc": "An illustrative network only. The 4#, 1#, and exchange-reference links were supplied in submitted materials and do not establish wallet ownership or platform association. Public chain data is pending verification.",
    "hero.okx": "OKX",
    "hero.destination": "Binance",
    "network.openOkxExplorer": "VIEW OKX REFERENCE ON TRONSCAN",
    "network.openBinanceExplorer": "VIEW BINANCE REFERENCE ON TRONSCAN"
  });

  const valueKeys = {
    "ESTIMATED FIGURE · PUBLIC SOURCE PENDING": "hero.estimate", "ACTIVE": "value.active", "TRACKING": "value.tracking", "COLLECTING": "value.collecting", "IN PROGRESS": "value.inProgress", "DATA PENDING": "hero.dataPending", "DATA PENDING / Multiple": "value.jurisdictionsPending", "UNDER REVIEW": "value.underReview", "PUBLIC SOURCE PENDING": "value.publicSourcePending", "ESTIMATED · PUBLIC SOURCE PENDING": "value.estimatedSourcePending", "NO VERIFIED COUNT PUBLISHED": "value.noVerifiedCount", "NO VERIFIED ADDRESSES PUBLISHED": "value.noVerifiedAddresses", "NO VERIFIED TXIDS PUBLISHED": "value.noVerifiedTxids", "UNDER CONTROLLED REVIEW": "value.controlledReview", "CRN PUBLIC INTAKE": "value.publicIntake", "CASE": "value.case", "ENTITY": "value.entity", "WALLET": "value.wallet", "TRANSACTION": "value.transaction", "EXCHANGE": "value.exchange", "CRN CASE FILE": "value.caseFile", "PUBLIC ENTITY DATA": "value.publicEntityData", "WALLET DATA": "value.walletData", "TRANSACTION DATA": "value.transactionData", "DESTINATION DATA": "value.destinationData", "CENTRAL CASE RECORD": "value.centralCase", "NOT PUBLISHED": "chart.notPublished", "ESTIMATED FUNDS": "metric.estimatedFunds", "AFFECTED INVESTORS": "metric.affected", "WALLETS TRACKED": "metric.wallets", "TRANSACTIONS": "metric.transactions", "EVIDENCE ITEMS": "metric.evidence", "JURISDICTIONS": "metric.jurisdictions"
  };
  Object.assign(dictionaries["zh-CN"], {
    "value.active": "进行中", "value.tracking": "追踪中", "value.collecting": "收集中", "value.inProgress": "处理中", "value.jurisdictionsPending": "数据待补充 / 多个", "value.underReview": "审阅中", "value.publicSourcePending": "公开来源待补充", "value.estimatedSourcePending": "估算 · 公开来源待补充", "value.noVerifiedCount": "暂无已核验数量", "value.noVerifiedAddresses": "暂无已核验地址", "value.noVerifiedTxids": "暂无已核验 TXID", "value.controlledReview": "受控审阅中", "value.publicIntake": "CRN 公开收集入口", "value.case": "案件", "value.entity": "实体", "value.wallet": "钱包", "value.transaction": "交易", "value.exchange": "交易所", "value.caseFile": "CRN 案件档案", "value.publicEntityData": "公开实体数据", "value.walletData": "钱包数据", "value.transactionData": "交易数据", "value.destinationData": "去向数据", "value.centralCase": "核心案件记录"
  });
  Object.assign(dictionaries.en, { "value.active": "ACTIVE", "value.tracking": "TRACKING", "value.collecting": "COLLECTING", "value.inProgress": "IN PROGRESS", "value.jurisdictionsPending": "DATA PENDING / Multiple", "value.underReview": "UNDER REVIEW", "value.publicSourcePending": "PUBLIC SOURCE PENDING", "value.estimatedSourcePending": "ESTIMATED · PUBLIC SOURCE PENDING", "value.noVerifiedCount": "NO VERIFIED COUNT PUBLISHED", "value.noVerifiedAddresses": "NO VERIFIED ADDRESSES PUBLISHED", "value.noVerifiedTxids": "NO VERIFIED TXIDS PUBLISHED", "value.controlledReview": "UNDER CONTROLLED REVIEW", "value.publicIntake": "CRN PUBLIC INTAKE", "value.case": "CASE", "value.entity": "ENTITY", "value.wallet": "WALLET", "value.transaction": "TRANSACTION", "value.exchange": "EXCHANGE", "value.caseFile": "CRN CASE FILE", "value.publicEntityData": "PUBLIC ENTITY DATA", "value.walletData": "WALLET DATA", "value.transactionData": "TRANSACTION DATA", "value.destinationData": "DESTINATION DATA", "value.centralCase": "CENTRAL CASE RECORD" });
  Object.assign(dictionaries["zh-CN"], {
    "timeline.TL-JUN-27.title": "相关行程记录（据报）", "timeline.TL-JUN-27.summary": "材料称，相关人员于当日发生与后续案件事件有关的境外行程；不含姓名、航班或地点。",
    "timeline.TL-JUL-01.title": "相关人员失联报告", "timeline.TL-JUL-01.summary": "材料称，相关人员自当日开始失去联系；尚待独立核验。",
    "timeline.TL-JUL-02-03.title": "境外会面线索（据报）", "timeline.TL-JUL-02-03.summary": "材料提出可能存在相关人员之间的境外会面；尚未独立证实。",
    "timeline.TL-JUL-03.title": "拘押信息被转发（据报）", "timeline.TL-JUL-03.summary": "材料称，关于相关人员遭拘押的信息及地点被转发；该说法尚未得到独立证实。",
    "timeline.TL-JUL-03-VERIFY.title": "后续核验程序启动（据报）", "timeline.TL-JUL-03-VERIFY.summary": "材料称，相关方启动法律咨询与现场核验；公开结论仍待来源文件支持。",
    "timeline.TL-JUL-12.title": "消息记录已留存", "timeline.TL-JUL-12.summary": "材料保存了一则与案件争议有关的消息；原始内容仅限受控审阅。",
    "timeline.TL-JUL-15.title": "补充消息记录已留存", "timeline.TL-JUL-15.summary": "材料保存了后续消息与截图；原始内容仅限受控审阅。",
    "timeline.TL-JUL-22.title": "最后一次消息活动（据报）", "timeline.TL-JUL-22.summary": "材料称，相关人员在当日出现最后一次可见消息活动；原文及身份信息不在公开页展示。",
    "form.projectDocs": "项目文件", "form.corporateRecords": "公司记录"
  });
  Object.assign(dictionaries.en, {
    "timeline.description": "This is a redacted reported chronology. Every entry remains pending independent verification; open an entry to see its status and source.",
    "timeline.TL-JUN-27.title": "Reported related travel", "timeline.TL-JUN-27.summary": "Submitted materials describe related overseas travel connected to later case events. Names, flight details and locations are withheld.",
    "timeline.TL-JUL-01.title": "Reported loss of contact", "timeline.TL-JUL-01.summary": "Submitted materials report that contact with a related individual ceased on this date. Independent verification remains pending.",
    "timeline.TL-JUL-02-03.title": "Reported overseas-meeting lead", "timeline.TL-JUL-02-03.summary": "Submitted materials raise a possible overseas meeting between related individuals. It has not been independently confirmed.",
    "timeline.TL-JUL-03.title": "Reported detention claim circulated", "timeline.TL-JUL-03.summary": "Submitted materials report that a detention claim and a location were circulated. The claim has not been independently confirmed.",
    "timeline.TL-JUL-03-VERIFY.title": "Reported follow-up verification", "timeline.TL-JUL-03-VERIFY.summary": "Submitted materials describe legal consultation and on-site checking after the claim circulated. Public conclusions remain pending source documentation.",
    "timeline.TL-JUL-12.title": "Message record retained", "timeline.TL-JUL-12.summary": "Submitted materials retain a message associated with the case dispute. Original content remains under controlled review.",
    "timeline.TL-JUL-15.title": "Additional message record retained", "timeline.TL-JUL-15.summary": "Submitted materials retain later messages and screenshots. Original content remains under controlled review.",
    "timeline.TL-JUL-22.title": "Latest reported message activity", "timeline.TL-JUL-22.summary": "Submitted materials report the latest visible message activity on this date. The original wording and identity details are withheld.",
    "form.projectDocs": "PROJECT DOCUMENTS", "form.corporateRecords": "CORPORATE RECORDS"
  });

  const normalize = value => String(value || "").toLowerCase().startsWith("en") ? "en" : "zh-CN";
  const urlLanguage = () => new URLSearchParams(location.search).get("lang");
  let language = normalize(urlLanguage() || (() => { try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; } })() || "zh-CN");
  const interpolate = (text, params) => String(text).replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);
  const t = (key, fallback = key, params = {}) => interpolate(dictionaries[language]?.[key] ?? dictionaries.en[key] ?? fallback, params);
  const value = raw => t(valueKeys[raw], raw);

  function applyStatic() {
    document.documentElement.lang = language;
    document.title = t("meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t("meta.title"));
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t("meta.description"));
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", t("meta.title"));
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", t("meta.description"));
    document.querySelectorAll("[data-i18n]").forEach(node => {
      const text = t(node.dataset.i18n, node.textContent);
      if (node.dataset.i18nHtml !== undefined) node.innerHTML = text; else node.textContent = text;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(node => node.setAttribute("aria-label", t(node.dataset.i18nAria, node.getAttribute("aria-label") || "")));
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder, node.getAttribute("placeholder") || "")));
    document.querySelectorAll("[data-language]").forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active));
    });
  }
  function setLanguage(next, announce = true) {
    const normalized = normalize(next); if (normalized === language && document.documentElement.lang === normalized) return;
    language = normalized;
    try { localStorage.setItem(STORAGE_KEY, language); } catch (_) { /* Local preference is optional. */ }
    applyStatic();
    if (announce) document.dispatchEvent(new CustomEvent("crn-language-changed", { detail: { language } }));
  }
  function init() {
    applyStatic();
    document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
  return Object.freeze({ t, value, getLanguage: () => language, setLanguage });
})();
