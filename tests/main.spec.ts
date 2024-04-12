import { Cell, Address, toNano, fromNano } from "@ton/core";
import { hex } from "../build/main.compiled.json";
import { Blockchain } from "@ton/sandbox";
import { MainContract } from "../wrappers/mainContract";
import "@ton/test-utils";


const test_name: string = "Simple test"


describe("main.fc contract tests", () => {

    it(test_name, async () => {

        const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];

        const tempBlockChain = await Blockchain.create();

        const myContract = tempBlockChain.openContract(
            await MainContract.createFromConfig({}, codeCell)
        );

    });

});