const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文章数据保存路径
const DATA_FILE_PATH = path.join(__dirname, '../src/data/wechat-articles.json');

// 现有文章数据
let existingArticles = [];
try {
  if (fs.existsSync(DATA_FILE_PATH)) {
    existingArticles = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'));
  }
} catch (error) {
  console.error('读取现有文章失败:', error.message);
  existingArticles = [];
}

// 创建命令行交互接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 提示用户输入
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// 保存文章数据
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

// 主函数
async function main() {
  console.log('=== 微信公众号原创文章手动导入工具 ===');
  console.log('注意: 只有标题中包含"原创"的文章才会被显示在网站上');
  console.log(`当前已有 ${existingArticles.length} 篇原创文章\n`);
  
  let continueAdding = true;
  
  while(continueAdding) {
    console.log('\n--- 添加新文章 ---');
    
    // 获取用户输入的文章信息
    let title = await askQuestion('标题 (必须包含"原创"): ');
    
    // 确保标题包含"原创"
    while (!title.includes('原创')) {
      console.log('\n⚠️ 错误: 标题必须包含"原创"才能在网站上显示');
      title = await askQuestion('标题 (必须包含"原创"): ');
    }
    
    const excerpt = await askQuestion('摘要 (可留空，将使用标题): ');
    const url = await askQuestion('微信文章链接: ');
    const coverImg = await askQuestion('封面图片URL (留空使用默认图片 /images/tutorial-1.jpg): ');
    const publishDate = await askQuestion('发布日期 (YYYY-MM-DD，留空使用今天): ');
    
    // 生成ID
    const id = (existingArticles.length + 1).toString();
    
    // 创建文章对象
    const newArticle = {
      id,
      title,
      excerpt: excerpt || `${title.substring(0, 50)}...`,
      url,
      coverImg: coverImg || '/images/tutorial-1.jpg',
      category: '原创内容',
      publishDate: publishDate || new Date().toISOString().split('T')[0]
    };
    
    // 添加到数组
    existingArticles.push(newArticle);
    
    console.log('\n文章已添加:');
    console.log(newArticle);
    
    // 询问是否继续添加
    const answer = await askQuestion('\n是否继续添加文章? (y/n): ');
    continueAdding = answer.toLowerCase() === 'y';
  }
  
  // 保存文章
  saveArticles(existingArticles);
  
  console.log('\n=== 文章导入完成 ===');
  rl.close();
}

// 运行主函数
main(); 