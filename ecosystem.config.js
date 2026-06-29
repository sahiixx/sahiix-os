module.exports = {
  apps: [
    {
      name: 'sahiix-estate-api',
      script: './server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOST: '0.0.0.0'
      },
      log_file: '/tmp/sahiix-estate-api.log',
      out_file: '/tmp/sahiix-estate-api-out.log',
      error_file: '/tmp/sahiix-estate-api-error.log',
      merge_logs: true,
      time: true,
      autorestart: true,
      restart_delay: 3000,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      kill_timeout: 5000,
      listen_timeout: 10000
    },
    {
      name: 'sahiix-estate-whatsapp',
      script: './whatsapp-bot.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        HOST: '0.0.0.0'
      },
      log_file: '/tmp/sahiix-estate-whatsapp.log',
      out_file: '/tmp/sahiix-estate-whatsapp-out.log',
      error_file: '/tmp/sahiix-estate-whatsapp-error.log',
      merge_logs: true,
      time: true,
      autorestart: true,
      restart_delay: 3000,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      kill_timeout: 5000,
      listen_timeout: 10000
    }
  ]
};
