1. Initialize the project (it will generate package.json configuration file)

```bash
npm init
```

2. Install neccessary TypeScript dependencies:

```bash
npm install typescript ts-node @types/node @swc/core --save-dev
```

3. Install TON related dependencies:

```bash
npm install @ton/core ton-crypto @ton-community/func-js @ton/ton @ton/sandbox @ton/test-utils --save-dev
```

4. Install jest

```bash
npm install jest ts-jest @types/jest --save-dev
```

5. Create **tsconfig.json** file with following content:

```bash
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "ts-node": {
    "transpileOnly": true,
    "transpiler": "ts-node/transpilers/swc"
  }
}
```

6. Edit **package.json** file as following:

```bash
{
   //...your previous package.json contents
    "scripts": {
        "test": "npm run compile && jest",
        "compile": "ts-node ./scripts/compile.ts",
        "deploy": "npm run compile && set TESTNET=true && ts-node ./scripts/deploy.ts",
        "deploy:mainnet": "npm run compile && ts-node ./scripts/deploy.ts",
        "onchaintest": "set TESTNET=true && ts-node ./scripts/onchaintest.ts",
        "onchaintest:mainnet": "ts-node ./scripts/onchaintest.ts"
    },
}
```

7. Create **jest.config.js** with following content:

```bash
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
};
```

8. Install dependencies for deploying smart contract:

```bash
npm install qs @types/qs qrcode-terminal @types/qrcode-terminal dotenv @orbs-network/ton-access --save-dev
```
