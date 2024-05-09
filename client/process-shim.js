import { process } from 'node-libs-browser/mock/process';

process.versions = Object.assign(process.versions || {}, {
  node: '14.0.0', // Or any other desired Node.js version
});

window.process = process;
