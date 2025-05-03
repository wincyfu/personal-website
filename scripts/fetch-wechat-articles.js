const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 微信公众号配置
const WECHAT_CONFIG = {
  appId: 'wxc55746d5613de370',
  appSecret: 'd45fd3ad823caa99f4ea929267461787',
  grantType: 'client_credential'
};

// 文章数据保存路径
const DATA_FILE_PATH = path.join(__dirname, '../src/data/wechat-articles.json');

/**
 * 获取微信访问令牌
 */
async function getAccessToken() {
  try {
    console.log('获取微信访问令牌...');
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${WECHAT_CONFIG.grantType}&appid=${WECHAT_CONFIG.appId}&secret=${WECHAT_CONFIG.appSecret}`;
    const response = await axios.get(url);
    
    if (response.data.errcode) {
      throw new Error(`获取令牌失败: ${response.data.errmsg} (${response.data.errcode})`);
    }
    
    console.log('访问令牌获取成功!');
    return response.data.access_token;
  } catch (error) {
    console.error('获取微信访问令牌失败:', error.message);
    throw error;
  }
}

/**
 * 获取微信公众号素材
 */
async function getMaterials(accessToken) {
  try {
    console.log('获取公众号素材...');
    const url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${accessToken}`;
    const response = await axios.post(url, {
      type: 'news',
      offset: 0,
      count: 20
    });
    
    if (response.data.errcode) {
      throw new Error(`获取素材失败: ${response.data.errmsg} (${response.data.errcode})`);
    }
    
    console.log(`成功获取 ${response.data.item_count} 个素材!`);
    return response.data;
  } catch (error) {
    console.error('获取公众号素材失败:', error.message);
    throw error;
  }
}

/**
 * 将素材转换为网站使用的文章格式
 * 只保留原创文章
 */
function transformArticles(materials) {
  const articles = [];
  
  if (!materials.item || !Array.isArray(materials.item)) {
    console.warn('未找到有效的素材');
    return articles;
  }
  
  materials.item.forEach((material, materialIndex) => {
    if (material.content && material.content.news_item) {
      material.content.news_item.forEach((newsItem, newsIndex) => {
        // 只保留标题中包含"原创"的文章
        if (!newsItem.title || !newsItem.title.includes('原创')) {
          return; // 跳过非原创文章
        }
        
        // 设置分类为"原创内容"
        const category = '原创内容';
        
        articles.push({
          id: `${materialIndex}-${newsIndex}`,
          title: newsItem.title,
          coverImg: newsItem.thumb_url || '/images/tutorial-1.jpg', // 使用默认图片作为备选
          excerpt: newsItem.digest || newsItem.title.substring(0, 50) + '...',
          category: category,
          url: newsItem.url,
          publishDate: new Date(material.update_time * 1000).toISOString().split('T')[0]
        });
      });
    }
  });
  
  console.log(`转换完成，共筛选出 ${articles.length} 篇原创文章`);
  return articles;
}

/**
 * 保存文章数据到文件
 */
function saveArticles(articles) {
  try {
    // 确保目录存在
    const dirPath = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      console.log(`创建目录: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // 写入文件
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(articles, null, 2), 'utf-8');
    console.log(`文章数据已保存到: ${DATA_FILE_PATH}`);
    return true;
  } catch (error) {
    console.error('保存文章数据失败:', error.message);
    return false;
  }
}

/**
 * 保存备用文章数据
 */
function saveFallbackArticles() {
  const fallbackArticles = [
    {
      id: '1',
      title: '原创 | 胡想乱思',
      coverImg: '/images/tutorial-1.jpg', 
      excerpt: '昨天查了一下微信公众平台，居然惊现路转粉，朕心甚悦啊，于是乎决定要继续好好写，好好发。但是最近真的是太忙了...',
      category: '原创内容',
      url: 'http://mp.weixin.qq.com/s?__biz=MzAxMzcxNzQxNw==&mid=400141456&idx=1&sn=739c6a7d3440ae5a23ee3f75ffb5a0bf#rd',
      publishDate: '2015-10-24'
    },
    {
      id: '2',
      title: '原创 | 我是神经病 今天没吃药',
      coverImg: '/images/tutorial-2.jpg',
      excerpt: '我是属于易怒体质么…..我也不是很清楚，好像也不算是易怒也不算敏感，但有些时候看到某个词，某句话，我就非常想...',
      category: '原创内容',
      url: 'http://mp.weixin.qq.com/s?__biz=MzAxMzcxNzQxNw==&mid=400141456&idx=2&sn=3a5e1936ab50cfcb0afb6bc3b758ffc5#rd',
      publishDate: '2015-10-24'
    },
    {
      id: '3',
      title: '原创丨"作"(zuō)自己',
      coverImg: '/images/tutorial-3.jpg',
      excerpt: '点击上方"傅大仙儿" 订阅哦！N久不更了 借口就是我很忙 忙着到处出差 最近又有想写出来发泄一下的东西...',
      category: '原创内容',
      url: 'http://mp.weixin.qq.com/s?__biz=MzAxMzcxNzQxNw==&mid=402271026&idx=1&sn=4629fc4e1abe6217bf8ac2f10eb5bcd1#rd',
      publishDate: '2016-03-10'
    }
  ];
  
  return saveArticles(fallbackArticles);
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('开始获取微信公众号原创文章...');
    
    // 获取访问令牌
    const accessToken = await getAccessToken();
    
    // 获取素材
    const materials = await getMaterials(accessToken);
    
    // 转换文章
    const articles = transformArticles(materials);
    
    // 保存文章
    if (articles.length > 0) {
      saveArticles(articles);
    } else {
      console.warn('未找到原创文章，使用备用数据');
      saveFallbackArticles();
    }
    
    console.log('公众号原创文章获取完成!');
  } catch (error) {
    console.error('获取公众号文章失败:', error);
    console.log('使用备用文章数据...');
    saveFallbackArticles();
  }
}

// 运行主函数
main(); 