import { hex } from "../build/main.compiled.json";
import { beginCell, Cell, contractAddress, StateInit, storeStateInit, toNano } from "@ton/core";
import qs from "qs";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";


dotenv.config();

const deploy_link: string = `https://app.tonkeeper.com/transfer/`;
const deploy_ton_amount: number = 0.05;

async function deployScript() {

    console.log(`Deploying to ${process.env.TESTNET ? 'testnet' : "mainnet"}!!!`);

    // Loading compiled code and initializing initial Data Cell
    const codeCell: Cell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];
    const dataCell: Cell = new Cell();

    // Init cell creating. It is important for deploying
    const stateInit: StateInit = {
        code: codeCell,
        data: dataCell,
    };

    const stateInitBuilder = beginCell();
    storeStateInit(stateInit)(stateInitBuilder);
    const stateInitCell = stateInitBuilder.endCell();

    // Computing contract address
    const address = contractAddress(0, {
        code: codeCell,
        data: dataCell,
    });

    console.log("Your contract address is ", address);

    let link =
        deploy_link +
        address.toString({
            testOnly: process.env.TESTNET ? true : false,
        }) + "?" +
        qs.stringify({
            text: "Deploy contract1",
            amount: toNano(deploy_ton_amount).toString(10),
            init: stateInitCell.toBoc({ idx: false }).toString("base64"),
        });

    console.log("Link : ", link);

    qrcode.generate(link, { small: true }, (code) => {
        console.log(code);
    });

}


deployScript();