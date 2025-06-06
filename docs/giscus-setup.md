# Giscus 评论系统配置指南

Giscus是一个基于GitHub Discussions的评论系统。要使Giscus正常工作，请按照以下步骤配置：

## 1. 准备GitHub仓库

Giscus需要一个公开的GitHub仓库来存储评论。建议创建一个专门用于评论的仓库，例如`your-username/blog-comments`。

### 启用GitHub Discussions

1. 访问您的GitHub仓库
2. 点击仓库顶部的"Settings"选项卡
3. 在左侧菜单中找到"General"设置
4. 向下滚动至"Features"部分
5. 勾选"Discussions"复选框
6. 保存更改

## 2. 安装Giscus应用

1. 访问[Giscus GitHub应用](https://github.com/apps/giscus)
2. 点击"Install"按钮
3. 选择您要授权Giscus访问的仓库（选择您启用了Discussions的仓库）
4. 完成安装

## 3. 获取Giscus配置参数

1. 访问[Giscus官网](https://giscus.app/)
2. 填写表单:
   - 选择语言
   - 输入仓库名称（格式为`username/repo`）
   - 选择页面-讨论映射方式（建议选择"Discussion title contains page pathname"）
   - 选择讨论类别（建议选择"Announcements"分类，避免任何人都能创建新讨论）
3. 勾选您想启用的功能
4. 选择主题
5. 复制生成的配置代码

## 4. 更新站点配置

1. 打开`src/config/site.json`
2. 确保giscus部分配置正确:
   ```json
   "giscus": {
     "enabled": true,
     "repo": "your-username/your-repo",
     "repoId": "your-repo-id",
     "category": "Announcements",
     "categoryId": "your-category-id",
     "mapping": "pathname",
     "strict": "0",
     "theme": "preferred_color_scheme",
     "reactionsEnabled": true,
     "emitMetadata": false,
     "inputPosition": "top",
     "lang": "en",
     "loading": "lazy"
   }
   ```

## 常见问题排查

如果Giscus不能正常工作，请检查以下几点：

1. **404错误**: 确保GitHub仓库存在且为公开状态，并且已启用Discussions功能
2. **未加载评论框**: 确保已正确安装Giscus应用到您的GitHub仓库
3. **权限问题**: 查看GitHub日志，确认Giscus应用有权限访问您的仓库
4. **配置错误**: 确保您的`repoId`和`categoryId`与GitHub上的值匹配

## 手动创建讨论（可选）

如果您想预先创建讨论而不等待用户第一次评论：

1. 访问仓库的Discussions页面
2. 创建新讨论
3. 标题需要包含页面路径，例如：如果您的页面路径是`/blog/hello-world`，讨论标题应包含这个路径
4. 选择正确的分类（与配置中的相同）
5. 发布讨论

完成以上步骤后，Giscus应该能正确加载并显示评论系统。 