export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  date: string;
  content: string;
  detailImages?: string[];
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '好旅程项目',
    description: '以"定制游"为核心卖点，集高质量旅游内容、社区社交平台及定制旅游行程功能为一体，是一套集成线上连锁加盟+会员制旅行+社交+PaaS的平台',
    imageUrl: '/images/portfolio/card-preview-1.jpg',
    category: 'UI设计',
    tags: ['UI设计', '交互设计', '产品设计'],
    date: '2024-03-20',
    content: `
      # 好旅程项目

      在这个项目中，我担任 UI计师和前期一部分产品设计的职责，主要负责用户调研、界面设计与原型搭建。到后期有了专门的产品接管了这个项目，就专注于ui
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
  {
    id: 'project-2',
    title: '儿宝管家项目',
    category: '移动应用',
    imageUrl: '/images/portfolio/child-doctor-app.jpg',
    description: '儿保管家是由山东大学齐鲁儿童医院专家团队与儿保所专门针对0-6岁幼儿及家长打造的线上问诊、防治幼儿疾病、普及科学育儿知识的专业平台',
    tags: ['医疗', '育儿', '咨询'],
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

      该平台上线后，已服务超过10万名儿童和家庭，得到了山东省多家医院的认可和采用，
      有效降低了儿科门诊的压力，提高了家长科学育儿的知识水平，为幼儿健康成长提供了有力支持。
    `,
    detailImages: [
      '/images/detail-2-1.jpg',
      '/images/detail-2-2.jpg',
      '/images/detail-2-3.jpg',
      '/images/detail-2-4.jpg',
      '/images/detail-2-5.jpg',
      '/images/detail-2-6.jpg'
    ]
  },
  {
    id: 'project-3',
    title: 'AIGC创作平台',
    description: '为内容创作者设计的AI辅助创作平台，集成多种AI生成工具',
    imageUrl: '/images/portfolio/project-3.jpg',
    category: 'AIGC',
    tags: ['AI生成', '内容创作', '平台设计'],
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
  {
    id: 'project-13',
    title: 'AI健康助手',
    description: 'AI健康助手是一款人工智能技术的健康管理小程序，旨在为用户提供便捷、个性化的健康服务。包括智能导诊与挂号、全流程就医陪诊、健康档案管理、智能报告解读、个性化健康建议等',
    imageUrl: '/images/AI-health-app.jpg',
    category: '移动应用',
    tags: ['AI', '健康', '小程序'],
    date: '2025-03',
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
      '/images/detail-3-1.jpg'
    ]
  },
  {
    id: 'project-14',
    title: '速速修项目',
    description: '速速修以"报修任务"、"养护任务"为业务切入点，以移动端应用为载体，将"报修任务"、"养护任务"的服务过程流程化、可视化',
    imageUrl: '/images/susuxiu-app.jpg',
    category: '移动应用',
    tags: ['金融', '维修', '服务类'],
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
  {
    id: 'project-15',
    title: '锦礼商城项目',
    description: '锦礼商城是一款融合高端审美与东方文化意境的国风电商App。整体设计延续中国传统节气与礼品文化，以雅致的配色、精致的插画、书法字体与器物纹样，共同营造出温润典雅的使用体验',
    imageUrl: '/images/jinlishangcheng-app.jpg',
    category: '移动应用',
    tags: ['电商', '国风', '礼品'],
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
      因此我们在产品展示中特别强调了每件商品的文化背景、制作工艺和设计灵感，增加了产品的情感连接和价值感知。
    `,
    detailImages: [
      '/images/detail-5-1.jpg'
    ]
  },
  {
    id: 'project-4',
    title: '健康监测应用',
    description: '一款结合智能手环数据的健康监测应用，提供个性化健康建议',
    imageUrl: '/images/portfolio/card-preview-2.jpg',
    category: '健康科技',
    tags: ['健康科技', '数据可视化', '移动应用'],
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
  {
    id: 'project-5',
    title: '沉浸式教育平台',
    description: '利用AR/VR技术打造的沉浸式教育平台，为K12学生提供互动学习体验',
    imageUrl: '/images/portfolio/project-5.jpg',
    category: '教育科技',
    tags: ['AR/VR', '教育', '交互设计'],
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
  {
    id: 'project-6',
    title: '金融管理APP',
    description: '面向年轻用户的个人金融管理应用，简化预算与投资管理',
    imageUrl: '/images/portfolio/project-6.jpg',
    category: '移动应用',
    tags: ['金融科技', '用户界面', '数据可视化'],
    date: '2023-11-08',
    content: `
      # 金融管理APP设计

      这是一款面向年轻用户的个人金融管理应用，帮助用户简化预算与投资管理。

      ## 核心功能

      - 智能预算规划和支出追踪
      - 投资组合管理和分析
      - 财务目标设定与监控
      - 金融知识学习模块
      - 智能省钱提示和建议

      ## 设计理念

      我们的设计理念是"让金融变简单"，旨在降低金融管理的门槛，让年轻用户能够轻松上手。
      界面设计简洁直观，使用了大量数据可视化元素，让用户能够一目了然地了解自己的财务状况。

      ## 用户研究成果

      通过对目标用户群体的深入研究，我们发现年轻用户对金融工具的主要痛点是：复杂性高、专业术语多、学习成本高。
      因此我们在设计中特别注重简化流程，解释术语，并提供学习资源。
    `,
    detailImages: [
      '/images/portfolio/project-14.jpg',
      '/images/portfolio/project-15.jpg',
      '/images/portfolio/project-1.jpg',
      '/images/portfolio/project-5.jpg'
    ]
  },
  {
    id: 'project-7',
    title: '社交媒体重设计',
    description: '为知名社交平台进行的UI/UX全面重设计，提升用户参与度',
    imageUrl: '/images/portfolio/project-7.jpg',
    category: 'UI设计',
    tags: ['社交媒体', '用户体验', '重设计'],
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
  {
    id: 'project-8',
    title: '旅行规划应用',
    description: '结合AI推荐的智能旅行规划应用，提供个性化旅行体验',
    imageUrl: '/images/portfolio/project-8.jpg',
    category: '移动应用',
    tags: ['旅行', 'AI推荐', '地图集成'],
    date: '2024-02-10',
    content: `
      # 旅行规划应用设计

      这是一款结合AI推荐的智能旅行规划应用，为用户提供个性化旅行体验。

      ## 主要功能

      - 基于用户偏好的AI旅行路线推荐
      - 实时天气和景点人流量信息
      - 多人协作的行程规划工具
      - 离线地图和导航功能
      - 旅行记录和社区分享

      ## 设计特点

      应用采用了模块化设计，用户可以根据自己的需求自定义界面和功能。我们特别注重了离线功能的设计，确保用户在无网络环境下仍能获得基本服务。

      ## 用户反馈

      在Beta测试阶段，用户对AI推荐功能给予了很高评价，特别是它能够根据用户的实际偏好和过往行为提供真正个性化的推荐。
      用户还特别喜欢多人协作功能，让团队旅行规划变得更加简单高效。
    `,
    detailImages: [
      '/images/portfolio/project-14.jpg',
      '/images/portfolio/project-15.jpg',
      '/images/portfolio/project-1.jpg',
      '/images/portfolio/project-5.jpg'
    ]
  },
  {
    id: 'project-9',
    title: '音乐创作工具',
    description: '面向业余音乐爱好者的移动音乐创作应用，简化音乐制作流程',
    imageUrl: '/images/portfolio/project-9.jpg',
    category: '移动应用',
    tags: ['音乐', '创意工具', '用户界面'],
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
  },
  {
    id: 'project-10',
    title: '智能家居控制中心',
    description: '整合多品牌智能家居设备的统一控制应用，提供场景化自动化功能',
    imageUrl: '/images/portfolio/project-10.jpg',
    category: '移动应用',
    tags: ['智能家居', 'IoT', '自动化'],
    date: '2024-01-05',
    content: `
      # 智能家居控制中心设计

      这是一款整合多品牌智能家居设备的统一控制应用，提供场景化自动化功能，让用户能够更加便捷地管理家中的智能设备。

      ## 主要功能

      - 统一控制面板，支持30+品牌设备
      - 场景创建和自动化规则设定
      - 基于位置和时间的智能触发
      - 能源使用监控和优化建议
      - 多用户权限管理

      ## 设计理念

      应用的核心设计理念是"化繁为简"，将复杂的设备控制和自动化规则简化为用户能够轻松理解和操作的界面。
      我们特别注重了信息架构的设计，确保用户能够快速找到并控制需要的设备。

      ## 技术挑战

      最大的技术挑战是如何整合不同品牌、不同协议的智能家居设备。我们设计了一个灵活的适配器系统，通过统一的界面抽象，为用户提供一致的使用体验。
    `,
    detailImages: [
      '/images/portfolio/project-14.jpg',
      '/images/portfolio/project-15.jpg',
      '/images/portfolio/project-1.jpg',
      '/images/portfolio/project-5.jpg'
    ]
  },
  {
    id: 'project-11',
    title: '语言学习助手',
    description: '基于AI对话的语言学习应用，提供沉浸式会话练习',
    imageUrl: '/images/portfolio/project-11.jpg',
    category: 'UI设计',
    tags: ['教育', 'AI对话', '语言学习'],
    date: '2023-10-25',
    content: `
      # 语言学习助手设计

      这是一款基于AI对话的语言学习应用，通过提供沉浸式会话练习，帮助用户更有效地学习外语。

      ## 核心功能

      - AI角色扮演对话练习
      - 实时语法和发音纠正
      - 个性化学习计划
      - 情境化词汇学习
      - 学习进度追踪和分析

      ## 设计创新

      应用的最大创新在于"情境对话"功能，用户可以选择不同的真实场景（如餐厅点餐、酒店入住等），与AI进行角色扮演对话，练习实用的语言技能。

      ## 用户研究发现

      通过大量用户研究，我们发现传统语言学习软件的最大问题是缺乏真实对话练习机会。这款应用正是针对这一痛点设计的，让用户随时随地都能获得近似真实的语言练习环境。
    `,
    detailImages: [
      '/images/portfolio/project-14.jpg',
      '/images/portfolio/project-15.jpg',
      '/images/portfolio/project-1.jpg',
      '/images/portfolio/project-5.jpg'
    ]
  },
  {
    id: 'project-12',
    title: '健康食谱规划',
    description: '根据个人健康目标和饮食限制自动生成食谱的移动应用',
    imageUrl: '/images/portfolio/project-12.jpg',
    category: '移动应用',
    tags: ['健康生活', '饮食规划', '个性化'],
    date: '2023-08-15',
    content: `
      # 健康食谱规划应用设计

      这是一款根据个人健康目标和饮食限制自动生成食谱的移动应用，帮助用户更简单地规划健康饮食。

      ## 主要功能

      - 基于健康目标的个性化食谱推荐
      - 食材库和营养数据库
      - 膳食计划和购物清单生成
      - 饮食记录和营养分析
      - 智能食材替换建议

      ## 设计特点

      应用的设计充分考虑了不同用户的饮食需求和限制（如素食、无麸质、低碳水等），提供高度个性化的食谱建议。
      界面设计直观易用，即使是烹饪新手也能轻松跟随食谱操作。

      ## 用户反馈

      用户特别喜欢"智能替换"功能，当家中缺少某种食材时，应用能够根据营养价值和口味相似度，推荐合适的替代品，大大提高了食谱的实用性。
    `,
    detailImages: [
      '/images/portfolio/project-14.jpg',
      '/images/portfolio/project-15.jpg',
      '/images/portfolio/project-1.jpg',
      '/images/portfolio/project-5.jpg'
    ]
  },
  {
    id: 'project-other-1',
    title: '品牌VI系统设计',
    description: '为科技初创公司设计全套品牌视觉识别系统，包含标志、色彩、字体和应用规范',
    imageUrl: '/images/portfolio/project-13.jpg',
    category: '品牌设计',
    tags: ['VI设计', '品牌标识', '企业形象'],
    date: '2023-11-20',
    content: `
      # 品牌VI系统设计

      为科技初创公司设计的全套品牌视觉识别系统，帮助建立一致性和专业的品牌形象。

      ## 设计内容

      - 品牌标志设计与应用规范
      - 企业色彩系统与色彩应用指南
      - 字体系统与排版规则
      - 名片、信纸等商务应用设计
      - 数字媒体应用规范

      ## 设计过程

      从品牌理念和价值观分析入手，进行市场与竞品研究，确定设计方向。经过多轮沟通与修改，最终形成完整的视觉识别体系。

      ## 成果

      交付了完整的VI手册和应用素材，帮助客户在各种场景中保持一致的品牌形象，提升了品牌认知度和专业形象。
    `,
    detailImages: [
      '/images/portfolio/project-14.jpg',
      '/images/portfolio/project-15.jpg',
      '/images/portfolio/project-1.jpg',
      '/images/portfolio/project-5.jpg'
    ]
  },
  {
    id: 'project-other-2',
    title: '创意海报设计系列',
    description: '为文化艺术展览设计的系列创意海报，融合传统元素与现代设计语言',
    imageUrl: '/images/portfolio/project-16.jpg',
    category: '平面设计',
    tags: ['海报设计', '创意视觉', '文化艺术'],
    date: '2023-09-30',
    content: `
      # 创意海报设计系列

      为文化艺术展览设计的系列创意海报，通过视觉设计传达文化内涵与艺术氛围。

      ## 设计理念

      将传统文化元素与现代设计语言融合，创造具有文化深度和视觉冲击力的海报设计。通过色彩、构图和创意表现，吸引目标受众的注意。

      ## 设计要素

      - 独特的视觉构图和空间层次
      - 中西文字体的艺术处理
      - 传统文化符号的现代演绎
      - 色彩与情绪的表达

      ## 应用场景

      设计作品应用于线上宣传、展览现场、户外广告牌和文创产品等多种渠道，形成统一而丰富的视觉体验。
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
