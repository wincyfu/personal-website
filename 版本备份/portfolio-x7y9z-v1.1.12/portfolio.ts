export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl: string;
  category: string;
  categoryEn?: string;
  tags: string[];
  tagsEn?: string[];
  date: string;
  content: string;
  contentEn?: string;
  detailImages?: string[];
}

export const projects: Project[] = [
  // === 移动端设计 (Mobile Design) - 8个项目 ===
  // 第1个：好旅程项目 (UI设计)
  {
    id: 'project-1',
    title: '好旅程项目',
    titleEn: 'Good Journey Project',
    description: '以"定制游"为核心卖点，集高质量旅游内容、社区社交平台及定制旅游行程功能为一体，是一套集成线上连锁加盟+会员制旅行+社交+PaaS的平台',
    descriptionEn: 'With "customized tours" as the core selling point, it integrates high-quality travel content, community social platform, and customized travel itinerary functions into a comprehensive platform that combines online chain franchising + membership travel + social networking + PaaS.',
    imageUrl: '/images/good-journey-project.jpg',
    category: 'UI设计',
    categoryEn: 'UI Design',
    tags: ['UI设计', '交互设计', '产品设计'],
    tagsEn: ['UI Design', 'Interaction Design', 'Product Design'],
    date: '2019.12-2020.10',
    content: `
      # 好旅程 - 综合旅游预订平台

      好旅程是飞侠旅行的全面升级版，从单一的机票火车票预订平台发展为涵盖"机票"、"电影"、"充值"、"社区"等全方位生活服务的综合性旅游APP。

      ## 产品定位

      以"定制游"为核心卖点，融合高质量旅游内容、社区社交平台和个性化行程定制功能，打造集线上连锁加盟、会员制旅行、社交互动和PaaS服务于一体的综合平台。

      ## 我的职责

      **前期**：担任UI设计师兼产品设计，负责用户调研、界面设计与原型搭建

      **后期**：专注UI设计，完成移动端界面设计，并设计了专属IP形象应用于整个项目

      ## 项目特色

      兼具社区属性和电商属性，为用户提供从内容获取到行程定制的一站式旅游解决方案。
    `,
    contentEn: `
      # Good Journey - Comprehensive Travel Booking Platform

      Good Journey is a comprehensive upgrade of Flying Hero Travel, evolving from a single flight and train ticket booking platform to a comprehensive travel APP covering "flights", "movies", "recharge", "community" and other all-round life services.

      ## Product Positioning

      With "customized tours" as the core selling point, it integrates high-quality travel content, community social platform and personalized itinerary customization functions to create a comprehensive platform that combines online chain franchising + membership travel + social interaction + PaaS services.

      ## My Responsibilities

      **Early Stage**: Served as UI designer and product designer, responsible for user research, interface design and prototype construction

      **Later Stage**: Focused on UI design, completed mobile interface design, and designed exclusive IP image applied to the entire project

      ## Project Features

      With both community and e-commerce attributes, it provides users with a one-stop travel solution from content acquisition to itinerary customization.
    `,
    detailImages: [
      '/images/portfolio/detail-1-1.jpg',
      '/images/portfolio/detail-1-2.jpg', 
      '/images/portfolio/detail-1-3.jpg',
      '/images/portfolio/detail-1-4.jpg',
      '/images/portfolio/detail-1-5.jpg',
      '/images/portfolio/detail-1-6.jpg',
      '/images/portfolio/detail-1-7.jpg',
      '/images/portfolio/detail-1-8.jpg',
      '/images/portfolio/detail-1-9.jpg',
      '/images/portfolio/detail-1-10.jpg',
      '/images/portfolio/detail-1-11.jpg',
      '/images/portfolio/detail-1-12.jpg',
      '/images/portfolio/detail-1-13.jpg',
      '/images/portfolio/detail-1-14.jpg',
      '/images/portfolio/detail-1-15.jpg'
    ]
  },
  // 第2个：AI健康助手 (移动应用)
  {
    id: 'project-2',
    title: 'AI健康助手',
    titleEn: 'AI Health Assistant',
    description: 'AI健康助手是一款人工智能技术的健康管理小程序，旨在为用户提供便捷、个性化的健康服务。包括智能导诊与挂号、全流程就医陪诊、健康档案管理、智能报告解读、个性化健康建议等',
    descriptionEn: 'AI Health Assistant is a health management mini-program based on artificial intelligence technology, aiming to provide users with convenient and personalized health services. Including intelligent triage and registration, full-process medical accompaniment, health record management, intelligent report interpretation, personalized health recommendations, etc.',
    imageUrl: '/images/AI-health-app.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['AI', '健康', '小程序'],
    tagsEn: ['AI', 'Health', 'Mini Program'],
    date: '2025.03',
    content: `
      # AI健康助手

      这是一款结合人工智能技术的健康管理小程序，旨在为用户提供便捷、个性化的健康服务。

      ## 核心功能

      - 智能导诊与挂号系统
      - 全流程就医陪诊服务
      - 健康档案智能管理
      - 医疗报告智能解读
      - 个性化健康建议

      ## 设计理念

      应用的设计理念是"科技赋能健康"，通过AI技术降低专业医疗知识的理解门槛，让普通用户也能轻松管理自己的健康状况。
      界面设计简洁直观，以用户体验为中心，确保各年龄段用户都能轻松操作。

      ## 用户研究成果

      通过对医疗场景的深入调研，我们发现用户在就医过程中面临的主要痛点是：预约难、等待时间长、看不懂检查报告、缺乏后续健康指导。
      因此我们在设计中特别注重解决这些痛点，提供全流程的医疗服务辅助。
    `,
    detailImages: [
      '/images/detail-3-1.jpg?v=20250630',
      '/images/detail-3-2.jpg?v=20250630',
      '/images/detail-3-3.jpg?v=20250630',
      '/images/detail-3-4.jpg?v=20250630'
    ]
  },
  // 第3个：ECOGO环保回收项目 (移动应用)
  {
    id: 'project-3',
    title: 'ECOGO环保回收项目',
    titleEn: 'ECOGO Environmental Recycling Project',
    description: 'ECOGO 是一款面向企业的环保回收与社会责任管理平台，通过数据驱动和流程数字化，帮助企业高效实现 ESG 目标，推动循环经济发展。当前处于 MVP 阶段，聚焦验证用户需求闭环、核心功能逻辑与激励机制的可行性。',
    descriptionEn: 'ECOGO is an enterprise-oriented environmental recycling and social responsibility management platform that uses data-driven and process digitization to help companies efficiently achieve ESG goals and promote circular economy development. Currently in the MVP stage, focusing on validating user demand loops, core functional logic, and the feasibility of incentive mechanisms.',
    imageUrl: '/images/ecogo.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['环保', '可持续发展', '绿色生活'],
    tagsEn: ['Environmental Protection', 'Sustainable Development', 'Green Living'],
    date: '2024.03',
    content: `
      # ECOGO环保回收项目

      ECOGO是一款面向企业的环保回收与社会责任管理平台，通过数据驱动和流程数字化，帮助企业高效实现ESG目标，推动循环经济发展。当前处于MVP阶段，聚焦验证用户需求闭环、核心功能逻辑与激励机制的可行性。

      ## 核心功能

      - 碳减量追踪与管理：自动识别环保行为并换算为tCO₂e，支持可视化年度碳减量报告
      - 资源回收全流程数字化：上传销毁影像、收货凭证、运送轨迹等，确保流程可审计
      - 节能指标集中呈现：整合资源回收、运输节能、仓储节能三大维度，支持ESG报告撰写
      - 环保行为兑换激励机制：碳减量自动转换为回收币，可兑换环保周边产品
      - 社会责任项目支持：提供CSR模块，一键上传公益活动记录，提升企业形象

      ## 设计理念

      整体视觉采用环保风格的手工纹理底色与自然绿配色，传达"真实、可持续、有温度"的品牌调性。界面结构清晰简洁，以图表化和图像化的方式降低操作门槛，让非专业用户也能轻松理解环保行为与碳效益的关联。通过"上传—换算—激励—再行动"的可循环闭环设计，形成持续的环保行为驱动力。

      ## 用户研究成果

      通过对企业环保管理需求的深入调研，我们发现企业在ESG目标实现上的主要痛点是：缺乏量化追踪工具、流程透明度不足、员工参与积极性不高。因此ECOGO在产品设计中特别注重数据可视化展示、全流程数字化记录以及激励机制设计，帮助企业建立可执行、可追踪、可激励的环保管理体系。
    `,
    detailImages: [
      '/videos/ecogo-demo.mp4',
      '/images/ecogo-detail-1.jpg',
      '/images/ecogo-detail-2.jpg',
      '/images/ecogo-detail-3.jpg',
      '/images/ecogo-detail-4.jpg',
      '/images/ecogo-detail-5.jpg'
    ]
  },
  // 第4个：儿宝管家项目 (移动应用)
  {
    id: 'project-4',
    title: '儿宝管家项目',
    titleEn: 'Child Care Manager',
    category: '移动应用',
    categoryEn: 'Mobile App',
    imageUrl: '/images/child-doctor-app.jpg',
    description: '儿保管家是由山东大学齐鲁儿童医院专家团队与儿保所专门针对0-6岁幼儿及家长打造的线上问诊、防治幼儿疾病、普及科学育儿知识的专业平台',
    descriptionEn: 'Child Care Manager is a professional platform created by the expert team of Qilu Children\'s Hospital of Shandong University and the Child Health Institute specifically for 0-6 year old children and parents, providing online consultation, prevention and treatment of childhood diseases, and popularizing scientific parenting knowledge.',
    tags: ['医疗', '育儿', '咨询'],
    tagsEn: ['Medical', 'Parenting', 'Consultation'],
    date: '2018.10-2019.06',
    content: `
      # 儿宝管家项目设计

      儿保管家是由山东大学齐鲁儿童医院专家团队与儿保所专门针对0-6岁幼儿及家长打造的线上问诊、防治幼儿疾病、普及科学育儿知识的专业平台。

      ## 核心功能

      - 在线儿科问诊与咨询
      - 0-6岁幼儿成长记录与评估
      - 家长育儿知识科普与培训
      - 预防接种提醒与管理
      - 儿童常见疾病防治指导

      ## 设计理念

      应用采用温暖柔和的色彩系统，易于操作的界面布局，将专业医疗知识以直观易懂的方式呈现给家长用户，
      特别关注用户体验的流畅性和信息获取的便捷性，让父母能安心地管理孩子的健康成长。

      ## 项目成果

      该平台上线后，服务于济南市幼儿园及儿童医院，得到了山东省多家医院和幼儿园家长及老师的认可和采用，
      有效降低了幼儿园老师每日纸质填写表格的压力，提高了家长科学育儿的知识水平，为幼儿健康成长提供了有力支持。
    `,
    detailImages: [
      '/images/detail-2-0.jpg',
      '/images/detail-2-1.jpg',
      '/images/detail-2-2.jpg',
      '/images/detail-2-3.jpg',
      '/images/detail-2-4.jpg',
      '/images/detail-2-5.jpg',
      '/images/detail-2-6.jpg',
      '/images/detail-2-7.jpg'
    ]
  },
  // 第5个：近视无忧项目 (移动应用)
  {
    id: 'project-5',
    title: '近视无忧项目',
    titleEn: 'Myopia-Free Project',
    description: '近视无忧 App 是一款聚焦视力健康管理app，提供近视防控包购买、护眼仪器使用、AI自习室预约与线下体验一体化服务，打造"专业产品 + 科学服务 + 数据反馈 + 安全保障"的全流程近视管理体系，连接家庭与门店，共筑清晰视界。',
    descriptionEn: 'Myopia-Free App is a vision health management application that provides integrated services including myopia prevention package purchase, eye protection device usage, AI study room booking, and offline experience, creating a comprehensive myopia management system.',
    imageUrl: '/images/jinshiwuyou.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['视力健康', 'AI', '近视防控'],
    tagsEn: ['Vision Health', 'AI', 'Myopia Prevention'],
    date: '2024.06-2024.08',
    content: `
      # 项目简介

      近视无忧 App 是一款聚焦视力健康管理的双端平台，覆盖 B 端商户与 C 端用户双场景。通过数字化方式连接家庭、门店与护眼服务，打造一站式近视防控闭环体系。

      项目采用"产品购买 + 设备体验 + 数据反馈 + 保险保障"的完整用户链路，为儿童和成人提供专业的近视防控解决方案。

      ## 核心功能

      ### C端用户功能
      - **近视防控包购买**：提供儿童/成人专属防控服务包，包含专业定制的视力管理服务
      - **护眼设备体验**：配送护眼雾化仪、热敷仪、视力训练仪等专业设备
      - **AI护眼自习室**：预约线下门店自习空间，AI辅助管理自习时长与护眼间隔
      - **视力成长档案**：建立专属视力档案，支持验光报告上传与个性化建议生成
      - **会员积分体系**：护眼打卡与消费获取积分，兑换商品或体验服务

      ### B端商户功能
      - **客户档案管理**：一键建档客户信息，追踪购买记录与护眼习惯
      - **自习服务运营**：管理护眼自习室时间段，记录训练数据生成反馈报告
      - **产品库存管理**：管理防控包与设备库存，配置销售策略与扫码核销
      - **活动转化工具**：设置优惠券、拼团活动，数据看板追踪转化效果


    `,
    detailImages: [
      '/images/jinshiwuyou-detail-1.jpg',
      '/images/jinshiwuyou-detail-2.jpg',
      '/images/jinshiwuyou-detail-3.jpg',
      '/images/jinshiwuyou-detail-4.jpg',
      '/images/jinshiwuyou-detail-5.jpg',
      '/images/jinshiwuyou-detail-6.jpg',
      '/images/jinshiwuyou-detail-7.jpg',
      '/images/jinshiwuyou-detail-8.jpg',
      '/images/jinshiwuyou-detail-9.jpg',
      '/images/jinshiwuyou-detail-10.jpg',
      '/images/jinshiwuyou-detail-11.jpg'
    ]
  },
  // 第6个：锦礼商城项目 (移动应用)
  {
    id: 'project-6',
    title: '锦礼商城项目',
    titleEn: 'Jinli Mall Project',
    description: '锦礼商城是一款融合高端审美与东方文化意境的国风电商App。整体设计延续中国传统节气与礼品文化，以雅致的配色、精致的插画、书法字体与器物纹样，共同营造出温润典雅的使用体验',
    descriptionEn: 'Jinli Mall is a Chinese-style e-commerce app that integrates high-end aesthetics with oriental cultural charm. The overall design continues the traditional Chinese solar terms and gift culture, with elegant color schemes, exquisite illustrations, calligraphy fonts and artifact patterns, creating a warm and elegant user experience.',
    imageUrl: '/images/jinlishangcheng-app.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['电商', '国风', '礼品'],
    tagsEn: ['E-commerce', 'Chinese Style', 'Gifts'],
    date: '2020.04-2020.05',
    content: `
      # 锦礼商城项目

      锦礼商城是一款融合高端审美与东方文化意境的国风电商App，专注于传统文化礼品购物体验。

      ## 核心功能

      - 中国传统节气主题购物推荐
      - 国风高端礼品定制服务
      - 文化礼品专区与品牌故事
      - 传统文化知识科普
      - 个性化礼品推荐系统

      ## 设计理念

      整体设计延续中国传统节气与礼品文化，以雅致的配色、精致的插画、书法字体与器物纹样，共同营造出温润典雅的使用体验。
      我们力求在现代电商交互便捷性与传统文化审美之间找到平衡点，打造既有文化底蕴又不失易用性的电商平台。

      ## 用户研究成果

      通过对目标用户群体的深入研究，我们发现高端礼品市场的用户更注重产品背后的文化内涵和品牌故事，而非单纯的价格比较。
      因此我们在产品展示中特别强调了每件商品的文化背景，增加了产品的情感连接和价值感知。
    `,
    detailImages: [
      '/images/detail-5-1.jpg',
      '/images/detail-5-2.jpg',
      '/images/detail-5-3.jpg',
      '/images/detail-5-4.jpg'
    ]
  },
  // 第7个：VAV交友 (移动应用)
  {
    id: 'project-7',
    title: 'VAV交友',
    titleEn: 'VAV Dating',
    description: 'VAV交友是一个基于"同频互动、甜蜜连接"理念打造的社交平台，致力于帮助用户在真实、安全、轻松的氛围中找到与自己兴趣相投、性格契合的好友或伴侣。',
    descriptionEn: 'VAV Dating is a social application based on interest matching, which uses AI algorithms to recommend like-minded friends to users, providing a safe and efficient social experience.',
    imageUrl: '/images/vav.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['社交', '交友', 'AI匹配'],
    tagsEn: ['Social', 'Dating', 'AI Matching'],
    date: '2020.12-2021.02',
    content: `
      # VAV交友应用设计

      VAV交友是一款基于兴趣匹配的社交应用，通过AI算法为用户推荐志趣相投的朋友，基于"同频互动、甜蜜连接"理念打造的社交平台，致力于帮助用户在真实、安全、轻松的氛围中找到与自己兴趣相投、性格契合的好友或伴侣。

      ## 核心功能

      - 基于兴趣标签的智能匹配算法
      - 主题线下活动，搭建兴趣圈子和话题讨论区
      - 恋爱成长学院，提供情感课程、脱单指南等内容
      - 线下牵线服务，更精准匹配
      - 用户安全保护机制

      ## 设计理念

      应用的设计理念是"真实连接，安全社交"，从从 1.0 版本的基础社交功能搭建，到 2.0 阶段的全新视觉升级与核心功能迭代我们通过简洁友好的界面设计，让用户能够轻松表达自己的兴趣和个性。同时注重用户隐私保护，提供多层次的安全验证机制。

      ## 用户研究成果

      通过对年轻用户社交需求的深入调研，我们发现用户更希望基于共同兴趣建立连接，而非单纯的外貌匹配。
      因此我们在产品设计中特别强调了兴趣展示和话题讨论功能。
    `,
    detailImages: [
      '/images/vav-detail-1.jpg',
      '/images/vav-detail-2.jpg',
      '/images/vav-detail-3.jpg',
      '/images/vav-detail-4.jpg'
    ]
  },
  // 第8个：速速修项目 (移动应用)
  {
    id: 'project-8',
    title: '速速修项目',
    titleEn: 'Quick Repair Project',
    description: '速速修以"报修任务"、"养护任务"为业务切入点，以移动端应用为载体，将"报修任务"、"养护任务"的服务过程流程化、可视化',
    descriptionEn: 'Quick Repair takes "repair tasks" and "maintenance tasks" as business entry points, using mobile applications as carriers to streamline and visualize the service process of "repair tasks" and "maintenance tasks".',
    imageUrl: '/images/susuxiu-app.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['金融', '维修', '服务类'],
    tagsEn: ['Finance', 'Repair', 'Service'],
    date: '2022.02-2022.03',
    content: `
      # 速速修项目

      速速修是一款专注于设备报修与养护的移动应用，为用户提供高效、便捷的维修服务体验。

      ## 核心功能

      - 一键快速报修
      - 实时维修进度跟踪
      - 维修任务智能分配
      - 设备养护提醒管理
      - 服务评价与反馈系统

      ## 设计理念

      应用的设计理念是"简化流程，提升体验"，通过流程化、可视化的设计，让用户轻松完成报修和养护任务。
      界面设计注重操作简便性和信息透明度，确保用户随时了解服务进度。

      ## 用户研究成果

      通过对设备维修服务场景的调研，我们发现用户的主要痛点在于：维修进度不透明、服务质量参差不齐、缺乏便捷的反馈渠道。
      因此我们在设计中特别关注维修全流程的可视化展示，让用户从报修到完成的每一步都清晰可见。
    `,
    detailImages: [
      '/images/detail-4-1.jpg',
      '/images/detail-4-2.jpg',
      '/images/detail-4-3.jpg'
    ]
  },

  // === 网站设计 (Website Design) ===
  // 幼儿园管理系统
  {
    id: 'project-9',
    title: '幼儿园管理系统',
    titleEn: 'Kindergarten Management System',
    description: '"儿宝管家幼儿园管理系统"是一套面向园长、教师、保教医、后厨、采购等多角色的智能管理平台，覆盖园务、健康、膳食等核心业务，支持上级监管机构接入，实现园所运营的全流程数字化管理，全面提升管理效率，保障儿童在园期间的健康与安全。',
    descriptionEn: '"Child Care Manager Kindergarten Management System" is an intelligent management platform for multiple roles including principals, teachers, healthcare staff, kitchen staff, and procurement personnel. It covers core business areas such as administration, health, and nutrition, supports integration with supervisory institutions, and achieves full-process digital management of kindergarten operations, comprehensively improving management efficiency and ensuring children\'s health and safety during their time at the kindergarten.',
    imageUrl: '/images/yeyglxt.jpg',
    category: '产品设计',
    categoryEn: 'Product Design',
    tags: ['管理系统', '教育', '多角色'],
    tagsEn: ['Management System', 'Education', 'Multi-role'],
    date: '2020.02-2020.12',
    content: `
      # 幼儿园管理系统设计

      "儿宝管家幼儿园管理系统"是一套面向园长、教师、保教医、后厨、采购等多角色的智能管理平台，覆盖园务、健康、膳食等核心业务，支持上级监管机构接入，实现园所运营的全流程数字化管理。

      ## 核心功能

      - 多角色权限管理：园长、教师、保教医、后厨、采购等不同角色的差异化功能
      - 园务管理：班级管理、学生档案、教师管理、课程安排等
      - 健康管理：体检记录、疫苗接种、健康监测、疾病预防等
      - 膳食管理：营养配餐、食材采购、食品安全、营养分析等
      - 监管对接：支持上级教育部门和卫生部门的数据对接和监管

      ## 设计理念

      系统的设计理念是"安全第一、效率优先"，通过数字化手段全面提升幼儿园管理效率，确保儿童在园期间的健康与安全。
      界面设计简洁直观，考虑到不同年龄段工作人员的使用习惯，降低学习成本，提高工作效率。

      ## 项目成果

      系统上线后显著提升了幼儿园的管理效率，实现了园务管理的标准化和规范化，为儿童健康成长提供了有力保障。
      同时满足了监管部门的数据要求，提升了幼儿园的管理水平和服务质量。
    `,
    detailImages: [
      '/images/youeryuan-detail-1.jpg',
      '/images/youeryuan-detail-2.jpg',
      '/images/youeryuan-detail-3.jpg',
      '/images/youeryuan-detail-4.jpg',
      '/images/youeryuan-detail-5.jpg',
      '/images/youeryuan-detail-6.jpg'
    ]
  },
  // 官网设计合集
  {
    id: 'project-10',
    title: '官网设计合集',
    titleEn: 'Official Website Design Collection',
    description: '汇集了多个不同行业的官网设计案例，包括管理中心官网、飞侠官网、儿宝管家官网、健康运官网等。设计注重品牌识别与用户体验的统一，通过清晰的信息架构、视觉风格与功能布局，为各类平台打造专业、高效的线上展示与服务窗口。',
    descriptionEn: 'A collection of official website design cases from various industries, including management center websites, Flying Hero website, Child Care Manager website, Health Run website, and more. The design focuses on the unity of brand identity and user experience, creating professional and efficient online display and service portals for various platforms through clear information architecture, visual style, and functional layout.',
    imageUrl: '/images/guanwangshejiheji.jpg',
    category: '产品设计',
    categoryEn: 'Product Design',
    tags: ['官网设计', '品牌识别', '用户体验'],
    tagsEn: ['Website Design', 'Brand Identity', 'User Experience'],
    date: '2018-2023期间',
    content: `
      # 官网设计合集

      这是一个汇集了多个不同行业官网设计案例的作品集，展示了从2018年到2023年期间的官网设计实践。

      ## 设计案例

      - 管理中心官网：企业级管理平台的官方网站
      - 飞侠官网：旅游服务平台的品牌官网
      - 儿宝管家官网：儿童健康管理平台官网
      - 健康运官网：健康管理服务平台官网
      - 其他行业官网设计案例

      ## 设计理念

      设计注重品牌识别与用户体验的统一，通过清晰的信息架构、一致的视觉风格与合理的功能布局，为各类平台打造专业、高效的线上展示与服务窗口。
    `,
    detailImages: [
      '/images/guanwang-detail-1.jpg',
      '/images/guanwang-detail-2.jpg',
      '/images/guanwang-detail-3.jpg',
      '/images/guanwang-detail-4.jpg'
    ]
  },

  // === 大屏设计 (Large Screen Design) ===
  // 项目管理大屏
  {
    id: 'project-11',
    title: '项目管理大屏',
    titleEn: 'Project Management Dashboard',
    description: '本项目是一套面向城市重大工程建设的全过程数字化管理系统，覆盖从前期筹备、审批流转、施工建设到竣工验收的全流程。系统结合大数据分析、视频监控、卫星遥感、无人机影像等手段，实现投资动态、施工进度、关键节点的实时可视与智能化分析。',
    descriptionEn: 'This project is a comprehensive digital management system for urban major engineering construction, covering the entire process from preliminary preparation, approval workflow, construction to completion acceptance. The system combines big data analysis, video monitoring, satellite remote sensing, drone imaging and other means to achieve real-time visualization and intelligent analysis of investment dynamics, construction progress, and key nodes.',
    imageUrl: '/images/xmgldp.jpg',
    category: '大屏设计',
    categoryEn: 'Dashboard Design',
    tags: ['项目管理', '大屏', '数据可视化'],
    tagsEn: ['Project Management', 'Dashboard', 'Data Visualization'],
    date: '2023.06-2023.08',
    content: `
      # 项目管理大屏

      本项目是一套面向城市重大工程建设的全过程数字化管理系统，覆盖从前期筹备、审批流转、施工建设到竣工验收的全流程。系统结合大数据分析、视频监控、卫星遥感、无人机影像等手段，实现投资动态、施工进度、关键节点的实时可视与智能化分析。

      平台结构包括大屏展示端、后台管理系统与手机移动端，满足政府监管部门、项目建设方等多角色在不同场景下的管理需求，有效推动多方协作与决策效率提升，是智慧城市基础设施建设的数字化支撑工具之一。

      ## 核心功能

      项目总览与投资趋势可视化展示、施工进度动态监控与预警、关键节点实时追踪与分析、视频监控与卫星遥感数据集成、无人机影像实时回放与分析、多角色权限管理与数据配置、移动端项目概况查看与任务核查

      ## 设计理念

      我全程参与了本系统从0到1的设计与落地工作，设计理念围绕"数据驱动、全程可视、智能决策"展开。通过构建政务级可视化界面，将复杂的工程数据转化为直观的图表和动态展示，让决策者能够快速掌握项目全貌。同时注重多端协同设计，确保大屏展示、后台管理、移动监控三端数据同步，满足不同场景下的管理需求。
    `,
    detailImages: [
      '/images/xiangmuguanli-detail-1.jpg',
      '/images/xiangmuguanli-detail-2.jpg',
      '/images/xiangmuguanli-detail-3.jpg',
      '/images/xiangmuguanli-detail-4.jpg'
    ]
  },
  // 运维管理大屏
  {
    id: 'project-12',
    title: '运维管理大屏',
    titleEn: 'Operations Management Dashboard',
    description: '面向路网机电设施的智能化运维管理平台，覆盖运维养护、工单处理、设备管理、故障报修等核心功能模块。系统通过数字化手段整合道路沿线各类机电设备的运行状态与维护记录，实现问题发现、任务派发、维修处理、进度跟踪的全流程闭环管理。',
    descriptionEn: 'An intelligent operation and maintenance management platform for road network electromechanical facilities, covering core functional modules such as operation and maintenance, work order processing, equipment management, and fault repair. The system integrates the operating status and maintenance records of various electromechanical equipment along the road through digital means, realizing the full-process closed-loop management of problem discovery, task assignment, repair processing, and progress tracking.',
    imageUrl: '/images/ywgldp.jpg',
    category: '大屏设计',
    categoryEn: 'Dashboard Design',
    tags: ['运维监控', '大屏', '实时数据'],
    tagsEn: ['Operations Monitoring', 'Dashboard', 'Real-time Data'],
    date: '2024.03-2024.04',
    content: `
      # 运维管理大屏

      ## 项目介绍

      运维系统是一套面向路网机电设备的数字化养护与管理平台，覆盖从日常巡检、任务派发、维修处置，到设备全生命周期管理的全流程运维闭环。

      系统集成运维养护、养护工单、设备管理、故障报修等功能，基于"问题快速发现、任务高效响应、数据透明闭环"的设计理念，赋能管理单位提升维护效率、规范作业流程、保障设施安全，打造"看得见、管得住、可追溯"的智慧运维新模式。
    `,
    detailImages: [
      '/images/yydp-detail-1.jpg',
      '/images/yydp-detail-2.jpg'
    ]
  },
  // 大屏设计合集
  {
    id: 'project-12-1',
    title: '大屏设计合集',
    titleEn: 'Dashboard Design Collection',
    description: '本模块集中展示多个大屏界面设计稿，体现了对信息布局、视觉层级与色彩表达的综合设计能力。页面设计突出数据可读性与视觉冲击力，适用于会议展示、监控指挥等多种使用场景。',
    descriptionEn: 'This module centrally displays multiple large screen interface design drafts, demonstrating comprehensive design capabilities in information layout, visual hierarchy, and color expression. The page design emphasizes data readability and visual impact, suitable for various usage scenarios such as meeting presentations and monitoring command.',
    imageUrl: '/images/dpsjhj.jpg',
    category: '大屏设计',
    categoryEn: 'Dashboard Design',
    tags: ['设计合集', '大屏', '数据展示'],
    tagsEn: ['Design Collection', 'Dashboard', 'Data Display'],
    date: '2021-2023期间',
    content: `
      # 大屏设计合集
    `,
    detailImages: [
      '/images/dphj-detail-1.jpg',
      '/images/dphj-detail-2.jpg',
      '/images/dphj-detail-3.jpg',
      '/images/dphj-detail-4.jpg',
      '/images/dphj-detail-5.jpg',
      '/images/dphj-detail-6.jpg',
      '/images/dphj-detail-7.jpg'
    ]
  },

  // === 其他设计 (Other Design) ===
  // LOGO设计-知之教育
  {
    id: 'project-13',
    title: 'LOGO设计-知之教育',
    titleEn: 'LOGO Design - Zhizhi Education',
    description: '本次"知之教育"Logo设计以"老鼠""教育""少儿"三个核心关键词为创意基础，结合"知之为知之，不知为不知"的儒家教育理念，打造出一个富有亲和力、寓意明确、易于识别的视觉标识。',
    descriptionEn: 'This "Zhizhi Education" Logo design is based on three core keywords: "mouse", "education", and "children", combined with the Confucian educational concept of "knowing what you know and knowing what you don\'t know", creating a visual identity that is friendly, meaningful, and easily recognizable.',
    imageUrl: '/images/zzjy.jpg',
    category: '其他设计',
    categoryEn: 'Other Design',
    tags: ['LOGO设计', '品牌设计', '教育'],
    tagsEn: ['LOGO Design', 'Brand Design', 'Education'],
    date: '2020.11',
    content: `
      # LOGO设计-知之教育

      本次"知之教育"Logo设计以"老鼠""教育""少儿"三个核心关键词为创意基础，结合"知之为知之，不知为不知"的儒家教育理念，打造出一个富有亲和力、寓意明确、易于识别的视觉标识。

      Logo主形象采用拟人化的小老鼠形象，象征聪明、机灵、好奇心强，契合儿童的成长特质与学习状态。整体造型简洁圆润，增强亲切感与辨识度，适应少儿教育品牌的视觉气质。
    `,
    detailImages: [
      '/images/zhizhijiaoyu-detail-1.jpg',
      '/images/zhizhijiaoyu-detail-2.jpg',
      '/images/zhizhijiaoyu-detail-3.jpg',
      '/images/zhizhijiaoyu-detail-4.jpg',
      '/images/zhizhijiaoyu-detail-5.jpg'
    ]
  },
  // IP设计合集
  {
    id: 'project-14',
    title: 'IP设计合集',
    titleEn: 'IP Design Collection',
    description: '汇集多个原创IP形象设计作品，涵盖不同风格与应用场景。通过角色设定、造型设计与表情延展，塑造出具有辨识度与传播力的视觉形象。设计过程中注重人物性格与风格统一，力求让每个角色既具故事感，又具应用延展性，提升整体视觉表现力与品牌特性。',
    descriptionEn: 'A collection of original IP character design works, covering different styles and application scenarios. Through character setting, styling design and expression extension, creating visual images with recognition and communication power. The design process focuses on character personality and style unity, striving to make each character both story-rich and application-extensible, enhancing overall visual performance and brand characteristics.',
    imageUrl: '/images/ipsjhj.jpg',
    category: '其他设计',
    categoryEn: 'Other Design',
    tags: ['IP设计', '角色设计', '品牌形象'],
    tagsEn: ['IP Design', 'Character Design', 'Brand Image'],
    date: '2024-2025',
    content: `
      # IP设计合集

      本IP视觉设计项目合集涵盖文旅IP、潮玩IP、App形象延伸及表情包等多元领域，专注于打造具有鲜明个性与文化内涵的品牌视觉资产。

      通过系统化的形象策划与创新设计，实现IP形象的多场景延展与生态构建，提升品牌辨识度与用户情感连接。

      项目注重角色设计与视觉符号的精炼，形成独特且易于传播的视觉语言，助力品牌在数字与实体渠道实现高效传播与价值增值。
    `,
    detailImages: [
      '/images/ip-design-detail-1.jpg',
      '/images/ip-design-detail-2.jpg'
    ]
  },
  // 组件库建立
  {
    id: 'project-15',
    title: '组件库建立',
    titleEn: 'Component Library Establishment',
    description: '通过组件化思维重构设计流程，建立统一、高效的设计组件库，提升团队协同效率与设计复用价值。以业务产品为载体，围绕实际项目需求，构建覆盖大屏设计场景与业务后台系统的通用组件体系。',
    descriptionEn: 'Reconstructing the design process through component-based thinking, establishing a unified and efficient design component library to improve team collaboration efficiency and design reuse value. Using business products as carriers, building a universal component system covering large screen design scenarios and business backend systems based on actual project requirements.',
    imageUrl: '/images/xmzjk.jpg',
    category: '其他设计',
    categoryEn: 'Other Design',
    tags: ['组件库', '界面设计', '系统设计'],
    tagsEn: ['Component Library', 'Interface Design', 'System Design'],
    date: '2020.11-2021.05',
    content: `
      # 组件库建立

      组件库不仅承载了设计规范的标准化输出，也推动了从单点交付向系统化设计能力的转变，强化了设计与业务的融合深度。在项目推进过程中，团队逐步建立起从样式规范、组件拆解、场景复用到版本迭代的全流程机制，为后续设计落地与跨团队协作提供强有力支撑。
    `,
    detailImages: [
      '/images/xiangmuzujian- detail-1.jpg',
      '/images/xiangmuzujian- detail-2.jpg',
      '/images/xiangmuzujian- detail-3.jpg',
      '/images/xiangmuzujian- detail-4.jpg'
    ]
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getAllProjectIds(): string[] {
  return projects.map(project => project.id);
}
