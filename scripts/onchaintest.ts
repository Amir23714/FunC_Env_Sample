import { Address, Cell, beginCell, contractAddress, fromNano, toNano } from "@ton/core";
import { hex } from "../build/main.compiled.json"
import { getHttpV4Endpoint } from "@orbs-network/ton-access"
import { TonClient4 } from "@ton/ton"
import qs from "qs";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";

dotenv.config();

async function onchainTestScript() {

    console.log(`Onchain test (${process.env.TESTNET ? "TESTnet" : "MAINnet"})`);

    const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];
    const dataCell = new Cell();

    const address = contractAddress(0, {
        code: codeCell,
        data: dataCell
    });

    const endpoint = await getHttpV4Endpoint({
        network: process.env.TESTNET ? "testnet" : "mainnet",
    });

    const client4 = new TonClient4({ endpoint });

    const latestBlock = await client4.getLastBlock();
    let status = await client4.getAccount(latestBlock.last.seqno, address);

    if (status.account.state.type !== "active") {
        console.log("Contract is not active");
        return;
    }

}

onchainTestScript();