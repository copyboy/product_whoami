# Giscus Comment System Configuration Guide

Giscus is a comment system powered by GitHub Discussions. To make Giscus work properly, follow these steps:

## 1. Prepare a GitHub Repository

Giscus requires a public GitHub repository to store comments. It's recommended to create a dedicated repository for comments, such as `your-username/blog-comments`.

### Enable GitHub Discussions

1. Visit your GitHub repository
2. Click on the "Settings" tab at the top of the repository
3. Find "General" settings in the left menu
4. Scroll down to the "Features" section
5. Check the "Discussions" checkbox
6. Save changes

## 2. Install the Giscus App

1. Visit the [Giscus GitHub App](https://github.com/apps/giscus)
2. Click the "Install" button
3. Select the repository you want to authorize Giscus to access (choose the repository where you enabled Discussions)
4. Complete the installation

## 3. Get Giscus Configuration Parameters

1. Visit the [Giscus website](https://giscus.app/)
2. Fill out the form:
   - Select language
   - Enter repository name (format: `username/repo`)
   - Choose page-discussion mapping method (recommended: "Discussion title contains page pathname")
   - Select discussion category (recommended: "Announcements" category to prevent anyone from creating new discussions)
3. Check the features you want to enable
4. Choose a theme
5. Copy the generated configuration code

## 4. Update Site Configuration

1. Open `src/config/site.json`
2. Ensure the giscus section is configured correctly:
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

## Troubleshooting Common Issues

If Giscus doesn't work properly, check the following:

1. **404 Error**: Ensure the GitHub repository exists, is public, and has Discussions enabled
2. **Comments frame not loading**: Make sure the Giscus app is installed correctly to your GitHub repository
3. **Permission issues**: Check GitHub logs to confirm the Giscus app has permission to access your repository
4. **Configuration errors**: Verify that your `repoId` and `categoryId` match the values on GitHub

## Manually Creating Discussions (Optional)

If you want to pre-create discussions instead of waiting for the first user comment:

1. Visit the Discussions page of your repository
2. Create a new discussion
3. The title should include the page path, for example: if your page path is `/blog/hello-world`, the discussion title should include this path
4. Select the correct category (same as in your configuration)
5. Publish the discussion

After completing these steps, Giscus should load and display the comment system correctly. 