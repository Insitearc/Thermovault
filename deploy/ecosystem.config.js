module.exports = {
  apps: [
    {
      name: 'thermovault-next',
      cwd: '/path/to/your/app', // REPLACE
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      autorestart: true,
      max_restarts: 5
    }
  ]
}
