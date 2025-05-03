import { useState, useEffect } from 'react';
// 完全移除对 JSON 文件的导入

export interface WechatArticle {
  id: string;
  title: string;
  coverImg: string;
  excerpt: string;
  category: string;
  url: string;
  publishDate: string;
  readCount?: number;
  likeCount?: number;
  shareCount?: number;
}

// 使用默认的硬编码文章数据
const defaultArticles: WechatArticle[] = [
  {
    id: "0-0",
    title: "AIGC实践｜AI/AR助力文旅沉浸式互动体验探索",
    coverImg: "/images/tutorial-1.jpg",
    excerpt: "最近比较感兴趣的AR互动探索，这是一篇灵感驱动的初步尝试。因时间有限，制作的案例实现效果还比较粗糙，旨在抛砖引玉，为AI技术在更多领域的应用提供有益参考。",
    category: "AI/AR文旅",
    url: "https://mp.weixin.qq.com/s/VQOjXNQQN2C7uQ0X-gN70w",
    publishDate: "2024-12-24",
    readCount: 2486,
    likeCount: 178,
    shareCount: 93
  },
  {
    id: "1-0",
    title: "AIGC实践｜用AI制作视频短片创作全流程",
    coverImg: "/images/tutorial-2.jpg",
    excerpt: "本篇文章将详细展示如何使用AI工具从概念构思到画面生成再到最终成片的全过程，涵盖剧本创作、分镜头设计、视觉效果生成及音乐配制等各个阶段。让我们一同启程，再次踏上这探索之旅吧～！",
    category: "AI视频",
    url: "https://mp.weixin.qq.com/s/cPLEQqRfGKqhUcbsKe-juA",
    publishDate: "2024-06-12",
    readCount: 893,
    likeCount: 56,
    shareCount: 18
  },
  {
    id: "2-0",
    title: "AIGC实践｜AI助力微短剧创作全流程探索",
    coverImg: "/images/tutorial-3.jpg",
    excerpt: "在本次的AI创作中，更多的精力用在故事脚本的部分，希望通过这个故事展示生存的多维度：公鹿为了生存寻找食物，狼群为了生存寻找鹿作为食物，它们的捕猎行为纯粹是生存需求的驱动，不掺杂额外的贪婪或恶意",
    category: "AI微短剧",
    url: "https://mp.weixin.qq.com/s/hmRBxAOcTpaz4fa8PuK3xw",
    publishDate: "2024-11-29",
    readCount: 2541,
    likeCount: 213,
    shareCount: 97
  },
  {
    id: "3-0",
    title: "AIGC实践｜探索用AI实现粘土风小游戏开发全流程",
    coverImg: "/images/tutorial-4.jpg",
    excerpt: "本文将详细介绍如何利用AI工具探索实现游戏开发的全过程，从概念构思、角色设计到画面生成、音效制作再到编程开发，直至游戏最终成型。",
    category: "AI游戏开发",
    url: "https://mp.weixin.qq.com/s/Nz_G_xwQhudbg7IlNq5ETQ",
    publishDate: "2024-05-09",
    readCount: 762,
    likeCount: 45,
    shareCount: 12
  },
  {
    id: "4-0",
    title: "AIGC实践｜探索用AI做包装设计全流程",
    coverImg: "/images/tutorial-5.jpg",
    excerpt: "本次我将尝试使用AI完成包装设计，展示我如何使用AI探索包装设计从概念构思到视觉设计，再到最终成品的过程，涵盖品牌定位、设计元素生成、包装效果展示、及后期运营等阶段。让我们再次踏上这段探索之旅吧～！",
    category: "AI包装",
    url: "https://mp.weixin.qq.com/s/n2wUbURa1mngG0zDEH9S_A",
    publishDate: "2024-07-15",
    readCount: 624,
    likeCount: 38,
    shareCount: 9
  },
  {
    id: "5-0",
    title: "AIGC实践｜用AI工具打造动态有声绘本",
    coverImg: "/images/tutorial-6.jpg",
    excerpt: "本文将向你展示如何运用WHEE及其他AI工具，创作出一本充满乐趣又富有教育意义的动态有声绘本。让我们一起将创意变为现实，开启一段有趣的创意之旅吧！",
    category: "AI绘本",
    url: "https://mp.weixin.qq.com/s?__biz=MzAxMzcxNzQxNw==&mid=2649759617&idx=1&sn=ebd151b585e1f8b03c56b254d546bcff&scene=21&poc_token=HJcMDmijZgBlhyBeOE3oiGkYl8Z8ISJPuZvj2h9L",
    publishDate: "2024-04-08",
    readCount: 1856,
    likeCount: 142,
    shareCount: 78
  },
  {
    id: "6-0",
    title: "AIGC实践｜AI助力文旅短视频创作全流程",
    coverImg: "/images/tutorial-7.jpg",
    excerpt: "本次我将尝试使用AI辅助进行城市宣传片的创作探索。我将尽可能详细的展示使用AI辅助创作城市宣传片的全过程，从灵感捕捉到最终成品呈现。现在，让我们一同踏上这段充满创意的探索之旅吧！",
    category: "AI文旅视频",
    url: "https://mp.weixin.qq.com/s/-6tFAD0Ax-LHzzHwqIBUJw",
    publishDate: "2024-09-30",
    readCount: 2103,
    likeCount: 193,
    shareCount: 124
  },
  {
    id: "7-0",
    title: "Stable-DiffusionLoRA模型训练教程(新手篇)｜LoRA训练个人经验总结与复盘",
    coverImg: "/images/tutorial-8.jpg",
    excerpt: "本篇文章仅整理归纳我的LoRA训练思路及步骤，以及自己遇到的问题和解决方案的复盘整理。希望对新手炼丹师们有所启发和帮助。",
    category: "LoRA训练",
    url: "https://mp.weixin.qq.com/s/_1xukwo-D1EYogGo2usyXw",
    publishDate: "2023-11-16",
    readCount: 1478,
    likeCount: 86,
    shareCount: 52
  },
  {
    id: "8-0",
    title: "AIGC实践｜AI助力广告片创作探索全流程",
    coverImg: "/images/tutorial-9.jpg",
    excerpt: "本次我将使用AI辅助尝试进行AI广告片的创作探索。将尽可能详细的展示使用AI辅助创作广告片的全过程，从灵感捕捉到最终成品呈现。现在，让我们一同踏上这段充满创意的探索之旅吧！",
    category: "AI广告",
    url: "https://mp.weixin.qq.com/s?__biz=MzAxMzcxNzQxNw==&mid=2649761295&idx=1&sn=065e8facce2f81d533fe87eccd262248&chksm=839adcc9b4ed55df57af95b6131571d1d872bd274cba4649685ca679808c3664fe3ec195cd0f&scene=178&cur_album_id=2891855147943968770&search_click_id=#rd",
    publishDate: "2024-10-31",
    readCount: 1650,
    likeCount: 132,
    shareCount: 76
  }
];

export default function useWechatArticles(customArticles?: WechatArticle[]) {
  const [articles, setArticles] = useState<WechatArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // 使用自定义文章数据或默认数据
      const sourceArticles = customArticles || defaultArticles;
      
      // 处理文章的封面图片，确保有效
      const processedArticles = sourceArticles.map(article => ({
        ...article,
        // 确保封面图有效，如果是空字符串或无效URL，使用默认图片
        coverImg: article.coverImg && article.coverImg !== "" 
          ? article.coverImg 
          : `/images/tutorial-${Math.floor(Math.random() * 6) + 1}.jpg`,
        // 确保标题不为空
        title: article.title || "无标题文章"
      }));
      
      // 添加短暂延迟以显示加载状态
      const timer = setTimeout(() => {
        setArticles(processedArticles);
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error loading articles:', err);
      setError('获取文章失败，请稍后再试');
      setLoading(false);
    }
  }, [customArticles]);

  return { articles, loading, error };
} 