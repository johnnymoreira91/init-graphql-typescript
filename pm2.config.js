const os = require('os')

const numCpu = os.cpus().length

let enviroment = 'local'
let sourceFile = null
let port = 4000

if (process.env.NODE_ENV === 'local') {
  sourceFile = 'src/server.ts'
  port = 4000
} else {
  sourceFile = 'dist/server.js'
  port = Number(process.env.PORT) ?? 4000
}

module.exports = {
  apps: [
    {
      name: "app-style",
      script: sourceFile,
      instances: numCpu,
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: '1024M',
      env: {
        NODE_ENV: enviroment,
        PORT: port,
      },
    },
  ],
};
