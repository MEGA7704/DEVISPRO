import { build } from 'esbuild';
await build({entryPoints:['src/worker.js'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:'public/_worker.js',conditions:['workerd','browser'],external:[],logLevel:'info'});
