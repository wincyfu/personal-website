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
    date: '2024-03-20',
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
  // 第2个：儿宝管家项目 (移动应用)
  {
    id: 'project-2',
    title: '儿宝管家项目',
    titleEn: 'Child Care Manager',
    category: '移动应用',
    categoryEn: 'Mobile App',
    imageUrl: '/images/child-doctor-app.jpg',
    description: '儿保管家是由山东大学齐鲁儿童医院专家团队与儿保所专门针对0-6岁幼儿及家长打造的线上问诊、防治幼儿疾病、普及科学育儿知识的专业平台',
    descriptionEn: 'Child Care Manager is a professional platform created by the expert team of Qilu Children\'s Hospital of Shandong University and the Child Health Institute specifically for 0-6 year old children and parents, providing online consultation, prevention and treatment of childhood diseases, and popularizing scientific parenting knowledge.',
    tags: ['医疗', '育儿', '咨询'],
    tagsEn: ['Medical', 'Parenting', 'Consultation'],
    date: '2023-04-20',
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
  // 第3个：AI健康助手 (移动应用)
  {
    id: 'project-3',
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
  // 第4个：锦礼商城项目 (移动应用)
  {
    id: 'project-4',
    title: '锦礼商城项目',
    titleEn: 'Jinli Mall Project',
    description: '锦礼商城是一款融合高端审美与东方文化意境的国风电商App。整体设计延续中国传统节气与礼品文化，以雅致的配色、精致的插画、书法字体与器物纹样，共同营造出温润典雅的使用体验',
    descriptionEn: 'Jinli Mall is a Chinese-style e-commerce app that integrates high-end aesthetics with oriental cultural charm. The overall design continues the traditional Chinese solar terms and gift culture, with elegant color schemes, exquisite illustrations, calligraphy fonts and artifact patterns, creating a warm and elegant user experience.',
    imageUrl: '/images/jinlishangcheng-app.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['电商', '国风', '礼品'],
    tagsEn: ['E-commerce', 'Chinese Style', 'Gifts'],
    date: '2020-04-17',
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
      '/images/detail-5-1.jpg'
    ]
  },
  // 第5个：VAV交友 (移动应用)
  {
    id: 'project-5',
    title: 'VAV交友',
    titleEn: 'VAV Dating',
    description: 'VAV交友是一个基于“同频互动、甜蜜连接”理念打造的社交平台，致力于帮助用户在真实、安全、轻松的氛围中找到与自己兴趣相投、性格契合的好友或伴侣。',
    descriptionEn: 'VAV Dating is a social application based on interest matching, which uses AI algorithms to recommend like-minded friends to users, providing a safe and efficient social experience.',
    imageUrl: '/images/vav.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['社交', '交友', 'AI匹配'],
    tagsEn: ['Social', 'Dating', 'AI Matching'],
    date: '2020.12.-2021.02',
    content: `
      # VAV交友应用设计

      VAV交友是一款基于兴趣匹配的社交应用，通过AI算法为用户推荐志趣相投的朋友，基于“同频互动、甜蜜连接”理念打造的社交平台，致力于帮助用户在真实、安全、轻松的氛围中找到与自己兴趣相投、性格契合的好友或伴侣。

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
  // 第6个：速速修项目 (移动应用)
  {
    id: 'project-6',
    title: '速速修项目',
    titleEn: 'Quick Repair Project',
    description: '速速修以"报修任务"、"养护任务"为业务切入点，以移动端应用为载体，将"报修任务"、"养护任务"的服务过程流程化、可视化',
    descriptionEn: 'Quick Repair takes "repair tasks" and "maintenance tasks" as business entry points, using mobile applications as carriers to streamline and visualize the service process of "repair tasks" and "maintenance tasks".',
    imageUrl: '/images/susuxiu-app.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['金融', '维修', '服务类'],
    tagsEn: ['Finance', 'Repair', 'Service'],
    date: '2022-02-23',
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
      '/images/detail-4-2.jpg'
    ]
  },
  // 第7个：AI自习室 (移动应用)
  {
    id: 'project-7',
    title: 'AI自习室',
    titleEn: 'AI Study Room',
    description: 'AI自习室是一款结合人工智能的学习辅助应用，为学生提供专注学习环境、学习计划制定、进度跟踪等功能，帮助提升学习效率',
    descriptionEn: 'AI Study Room is a learning assistance application that combines artificial intelligence, providing students with focused learning environment, learning plan formulation, progress tracking and other functions to help improve learning efficiency.',
    imageUrl: '/images/project-10.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['教育', 'AI', '学习辅助'],
    tagsEn: ['Education', 'AI', 'Learning Assistant'],
    date: '2024-08-20',
    content: `
      # AI自习室设计

      AI自习室是一款结合人工智能的学习辅助应用，为学生提供专注学习环境和智能学习建议。

      ## 核心功能

      - AI智能学习计划制定
      - 专注时间管理和番茄钟
      - 学习进度跟踪和分析
      - 在线自习室和学习社区
      - 学习资源推荐和整理

      ## 设计理念

      应用的设计理念是"科技助力学习，专注成就未来"，通过AI技术帮助学生制定个性化学习计划，提供沉浸式学习环境。
      界面设计简洁专注，减少干扰因素，让学生能够更好地投入学习。

      ## 创新特色

      结合近视预防功能，通过智能提醒帮助学生保护视力健康，实现学习效率与健康的平衡。
      AI算法能够根据学习习惯和效果，动态调整学习计划和休息建议。
    `,
    detailImages: [
      '/images/portfolio/project-ai-study-1.jpg',
      '/images/portfolio/project-ai-study-2.jpg'
    ]
  },
  // 第8个：环保行动 (移动应用)
  {
    id: 'project-8',
    title: 'ECOGO环保回收项目',
    titleEn: 'ECOGO Environmental Recycling Project',
    description: 'ECOGO 是一款面向企业的环保回收与社会责任管理平台，通过数据驱动和流程数字化，帮助企业高效实现 ESG 目标，推动循环经济发展。当前处于 MVP 阶段，聚焦验证用户需求闭环、核心功能逻辑与激励机制的可行性。',
    descriptionEn: 'ECOGO is an enterprise-oriented environmental recycling and social responsibility management platform that uses data-driven and process digitization to help companies efficiently achieve ESG goals and promote circular economy development. Currently in the MVP stage, focusing on validating user demand loops, core functional logic, and the feasibility of incentive mechanisms.',
    imageUrl: '/images/ecogo.jpg',
    category: '移动应用',
    categoryEn: 'Mobile App',
    tags: ['环保', '可持续发展', '绿色生活'],
    tagsEn: ['Environmental Protection', 'Sustainable Development', 'Green Living'],
    date: '2024-03',
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
      '/images/portfolio/project-eco-1.jpg',
      '/images/portfolio/project-eco-2.jpg'
    ]
  },

  // === 网站设计 (Website Design) ===
  // AIGC创作平台
  {
    id: 'project-9',
    title: 'AIGC创作平台',
    titleEn: 'AIGC Creation Platform',
    description: '为内容创作者设计的AI辅助创作平台，集成多种AI生成工具',
    descriptionEn: 'An AI-assisted creation platform designed for content creators, integrating various AI generation tools.',
    imageUrl: '/images/portfolio/project-3.jpg',
    category: 'AIGC',
    categoryEn: 'AIGC',
    tags: ['AI生成', '内容创作', '平台设计'],
    tagsEn: ['AI Generation', 'Content Creation', 'Platform Design'],
    date: '2023-12-05',
    content: `
      # AIGC创作平台设计

      这是为内容创作者设计的AI辅助创作平台，集成了多种AI生成工具，帮助创作者提高效率和创作质量。

      ## 平台功能

      - AI文本生成与编辑
      - AI图像创作与修改
      - AI视频制作辅助
      - 内容管理系统
      - 创作者社区

      ## 设计理念

      平台的设计理念是"赋能而不替代"，我们希望AI工具能够帮助创作者释放更多创造力，而不是简单地替代人类创作。
      界面设计注重工具的可访问性和学习曲线，确保各种技术水平的创作者都能轻松上手。

      ## 技术实现

      平台前端使用React和Next.js构建，后端集成了多种AI模型API，包括GPT系列、Stable Diffusion、Midjourney等。
      整个系统采用模块化设计，方便未来扩展更多AI功能。
    `,
    detailImages: [
      '/images/portfolio/project-10.jpg',
      '/images/portfolio/project-11.jpg',
      '/images/portfolio/project-12.jpg',
      '/images/portfolio/project-13.jpg'
    ]
  },
  // 产品设计项目
  {
    id: 'project-10',
    title: '产品设计系统',
    titleEn: 'Product Design System',
    description: '为大型企业设计的统一产品设计系统，包含组件库、设计规范和最佳实践',
    descriptionEn: 'A unified product design system designed for large enterprises, including component libraries, design specifications, and best practices.',
    imageUrl: '/images/portfolio/project-design-system.jpg',
    category: '产品设计',
    categoryEn: 'Product Design',
    tags: ['设计系统', '组件库', '企业级'],
    tagsEn: ['Design System', 'Component Library', 'Enterprise'],
    date: '2024-01-15',
    content: `
      # 产品设计系统

      这是为大型企业设计的统一产品设计系统，旨在提高设计效率和产品一致性。

      ## 系统组成

      - 基础设计原则和指导方针
      - 完整的UI组件库
      - 交互模式和最佳实践
      - 设计工具和开发规范
      - 品牌视觉识别系统

      ## 设计目标

      通过建立统一的设计语言，确保所有产品在视觉和交互上保持一致性，同时提高设计师和开发者的工作效率。

      ## 实施成果

      设计系统实施后，产品开发周期缩短了30%，设计一致性得到显著提升，用户体验更加统一和流畅。
    `,
    detailImages: [
      '/images/portfolio/design-system-1.jpg',
      '/images/portfolio/design-system-2.jpg'
    ]
  },

  // === 大屏设计 (Large Screen Design) ===
  // 沉浸式教育平台
  {
    id: 'project-11',
    title: '沉浸式教育平台',
    titleEn: 'Immersive Education Platform',
    description: '利用AR/VR技术打造的沉浸式教育平台，为K12学生提供互动学习体验',
    descriptionEn: 'An immersive education platform built with AR/VR technology, providing interactive learning experiences for K12 students.',
    imageUrl: '/images/portfolio/project-5.jpg',
    category: '教育科技',
    categoryEn: 'Education Technology',
    tags: ['AR/VR', '教育', '交互设计'],
    tagsEn: ['AR/VR', 'Education', 'Interaction Design'],
    date: '2024-01-30',
    content: `
      # 沉浸式教育平台设计

      这是一个利用AR/VR技术打造的沉浸式教育平台，为K12学生提供互动学习体验。

      ## 平台特点

      - 3D交互式学习内容
      - 虚拟实验室和模拟环境
      - 游戏化学习元素
      - 教师控制台和学习分析
      - 多人协作学习空间

      ## 设计方法论

      我们采用了以学生为中心的设计方法，通过大量的学生访谈和课堂观察，确定了最需要沉浸式体验的学习场景。
      然后与教育专家合作，确保平台内容符合教育标准和学习目标。

      ## 技术与设计平衡

      在设计过程中，我们需要平衡技术可能性与教育需求，确保AR/VR技术服务于教育目标，而不是为了技术而技术。
      同时考虑了不同学校的设备条件和技术环境，提供了多种适配方案。
    `,
    detailImages: [
      '/images/portfolio/project-2.jpg',
      '/images/portfolio/project-3.jpg',
      '/images/portfolio/project-4.jpg',
      '/images/portfolio/project-6.jpg'
    ]
  },
  // 数据可视化大屏
  {
    id: 'project-12',
    title: '数据可视化大屏',
    titleEn: 'Data Visualization Dashboard',
    description: '为企业管理层设计的实时数据监控大屏，提供直观的业务数据展示',
    descriptionEn: 'A real-time data monitoring dashboard designed for enterprise management, providing intuitive business data visualization.',
    imageUrl: '/images/portfolio/project-dashboard.jpg',
    category: '大屏设计',
    categoryEn: 'Dashboard Design',
    tags: ['数据可视化', '大屏', '实时监控'],
    tagsEn: ['Data Visualization', 'Dashboard', 'Real-time Monitoring'],
    date: '2024-03-10',
    content: `
      # 数据可视化大屏设计

      这是为企业管理层设计的实时数据监控大屏，提供直观的业务数据展示和分析。

      ## 功能特点

      - 实时业务数据监控
      - 多维度数据分析
      - 异常情况预警提醒
      - 自定义数据面板
      - 跨部门数据整合

      ## 设计挑战

      大屏设计的主要挑战是如何在有限的空间内展示大量数据，同时保持信息的清晰性和可读性。
      我们采用了分层信息架构和智能数据筛选，确保关键信息能够突出显示。

      ## 技术实现

      大屏使用了现代化的数据可视化技术，支持实时数据更新和交互式操作，为管理决策提供有力支持。
    `,
    detailImages: [
      '/images/portfolio/dashboard-1.jpg',
      '/images/portfolio/dashboard-2.jpg'
    ]
  },

  // === 其他设计 (Other Design) ===
  // 健康监测应用
  {
    id: 'project-13',
    title: '健康监测应用',
    titleEn: 'Health Monitoring App',
    description: '一款结合智能手环数据的健康监测应用，提供个性化健康建议',
    descriptionEn: 'A health monitoring application that integrates smart wearable data, providing personalized health recommendations.',
    imageUrl: '/images/portfolio/card-preview-2.jpg',
    category: '健康科技',
    categoryEn: 'Health Technology',
    tags: ['健康科技', '数据可视化', '移动应用'],
    tagsEn: ['Health Tech', 'Data Visualization', 'Mobile App'],
    date: '2023-07-18',
    content: `
      # 健康监测应用设计

      这是一款结合智能手环数据的健康监测应用，提供个性化健康建议和数据可视化功能。

      ## 核心功能

      - 实时健康数据监测（心率、步数、睡眠等）
      - 数据趋势分析和可视化
      - 个性化健康建议和提醒
      - 健康目标设置和追踪
      - 社交分享和挑战功能

      ## 设计挑战

      最大的设计挑战是如何将复杂的健康数据以简单直观的方式呈现给用户，同时保证数据的准确性和专业性。
      我们采用了分层设计，用户可以先看到简化的数据摘要，需要时再深入查看详细数据和专业分析。

      ## 用户反馈

      应用在测试阶段收到了非常积极的用户反馈，特别是对数据可视化和个性化建议功能的好评。
      用户表示这款应用帮助他们更好地了解自己的健康状况，并建立了更健康的生活习惯。
    `,
    detailImages: [
      '/images/portfolio/detail-4-1.jpg',
      '/images/portfolio/detail-4-2.jpg',
      '/images/portfolio/detail-4-3.jpg',
      '/images/portfolio/detail-4-4.jpg'
    ]
  },
  // 社交媒体重设计
  {
    id: 'project-14',
    title: '社交媒体重设计',
    titleEn: 'Social Media Redesign',
    description: '为知名社交平台进行的UI/UX全面重设计，提升用户参与度',
    descriptionEn: 'A comprehensive UI/UX redesign for a well-known social platform to improve user engagement.',
    imageUrl: '/images/portfolio/project-7.jpg',
    category: '其他设计',
    categoryEn: 'Other Design',
    tags: ['社交媒体', '用户体验', '重设计'],
    tagsEn: ['Social Media', 'User Experience', 'Redesign'],
    date: '2023-09-12',
    content: `
      # 社交媒体重设计项目

      这是为一个知名社交平台进行的UI/UX全面重设计项目，旨在提升用户参与度和留存率。

      ## 项目背景

      该社交平台面临用户活跃度下降和新用户留存率低的问题。通过用户研究，我们发现主要原因是界面过于复杂、信息流设计不合理、以及用户兴趣匹配度不高。

      ## 设计优化

      我们从以下几个方面进行了重设计：
      
      1. 简化主界面，减少视觉干扰
      2. 重新设计信息流算法和展示方式
      3. 改进用户兴趣标签系统
      4. 优化社交互动功能，增强用户连接性
      5. 设计新的内容创作工具，降低创作门槛

      ## 成果

      重设计上线后，平台用户日活跃度提升了28%，新用户30天留存率提高了35%，内容创作量增加了42%。
    `,
    detailImages: [
      '/images/portfolio/project-6.jpg',
      '/images/portfolio/project-7.jpg',
      '/images/portfolio/project-8.jpg',
      '/images/portfolio/project-9.jpg'
    ]
  },
  // 音乐创作工具
  {
    id: 'project-15',
    title: '音乐创作工具',
    titleEn: 'Music Creation Tool',
    description: '面向业余音乐爱好者的移动音乐创作应用，简化音乐制作流程',
    descriptionEn: 'A mobile music creation application for amateur music enthusiasts, simplifying the music production process.',
    imageUrl: '/images/portfolio/project-9.jpg',
    category: '其他设计',
    categoryEn: 'Other Design',
    tags: ['音乐', '创意工具', '用户界面'],
    tagsEn: ['Music', 'Creative Tools', 'User Interface'],
    date: '2023-12-18',
    content: `
      # 音乐创作工具设计

      这是一款面向业余音乐爱好者的移动音乐创作应用，旨在简化音乐制作流程，让普通用户也能创作出专业水准的音乐作品。

      ## 核心功能

      - 直观的循环和采样编辑器
      - AI辅助作曲和编曲功能
      - 内置高质量音源库
      - 实时音频效果处理
      - 社区分享和协作功能

      ## 设计挑战

      最大的设计挑战是如何在移动设备有限的屏幕空间内提供专业级的音乐创作功能，同时保持界面的简洁性和易用性。
      我们通过层级化的界面设计和智能上下文菜单，成功解决了这一难题。

      ## 创新点

      应用的最大创新在于"AI音乐伙伴"功能，它能够根据用户的初步创作，提供和声、节奏和编曲建议，大大降低了创作的技术门槛。
    `,
    detailImages: [
      '/images/portfolio/project-14.jpg',
      '/images/portfolio/project-15.jpg',
      '/images/portfolio/project-1.jpg',
      '/images/portfolio/project-5.jpg'
    ]
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getAllProjectIds(): string[] {
  return projects.map(project => project.id);
}
