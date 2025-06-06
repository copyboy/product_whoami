module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4321', 'http://localhost:4321/blog', 'http://localhost:4321/projects'],
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': ['warn', { minScore: 0.6 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-results',
    },
  },
}; 