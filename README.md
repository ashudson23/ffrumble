Pre-requisites:
1. Visual Studio Community 2019
1. Tools > Get Tools and Features... > "Desktop development with C++" workload
1. Start PowerShell as Administrator and run:
```
npm install --global windows-build-tools
npm install --global node-gyp@latest
npm prefix -g | % {npm config set node_gyp "$_\node_modules\node-gyp\bin\node-gyp.js"}
npm config set msvs_version 2019
```
1. From elevated terminal (bash if you're good):
```
node index.js
```
