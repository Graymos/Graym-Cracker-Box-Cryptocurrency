/* Initial blockchain implementation with SQLite3 - Core structure and database setup */
/* Note: Used AI assistance for the initial blockchain structure and SQLite3 integration */
import sha256 from "sha256";
import sqlite3 from "sqlite3";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_FILE = join(__dirname, 'blockchain.db');

const db = new sqlite3.Database(DB_FILE);

// Create tables if they don't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS blocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            block_index INTEGER,
            time INTEGER,
            nonce INTEGER,
            hash TEXT,
            previousHash TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            block_id INTEGER,
            amount REAL,
            sender TEXT,
            recipient TEXT,
            FOREIGN KEY (block_id) REFERENCES blocks(id)
        )
    `);
});
 // Used AI assistance for the initial blockchain structure and SQLite3 integration here
const objHippoChain = {
    chain: [],

    loadChain: () => {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT b.*, t.amount as decTransAmt, t.sender as strTransSender, t.recipient as strTransRecipient
                FROM blocks b
                LEFT JOIN transactions t ON b.id = t.block_id
                ORDER BY b.block_index
            `, (err, rows) => {
                if (err) {
                    console.error('Error loading blockchain:', err);
                    reject(err);
                    return;
                }

                // Group transactions by block
                const blocks = rows.reduce((acc, row) => {
                    const block = acc.find(b => b.index === row.block_index);
                    if (block) {
                        if (row.decTransAmt) {
                            block.transaction = {
                                decTransAmt: row.decTransAmt,
                                strTransSender: row.strTransSender,
                                strTransRecipient: row.strTransRecipient
                            };
                        }
                    } else {
                        acc.push({
                            index: row.block_index,
                            time: row.time,
                            nonce: row.nonce,
                            hash: row.hash,
                            previousHash: row.previousHash,
                            transaction: row.decTransAmt ? {
                                decTransAmt: row.decTransAmt,
                                strTransSender: row.strTransSender,
                                strTransRecipient: row.strTransRecipient
                            } : {}
                        });
                    }
                    return acc;
                }, []);

                objHippoChain.chain = blocks;
                resolve(blocks);
            });
        });
    },

    saveBlock: (block) => {
        return new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO blocks (block_index, time, nonce, hash, previousHash)
                VALUES (?, ?, ?, ?, ?)
            `, [block.index, block.time, block.nonce, block.hash, block.previousHash], function(err) {
                if (err) {
                    reject(err);
                    return;
                }

                const blockId = this.lastID;
                
                // Save transaction if it exists
                if (block.transaction && block.transaction.decTransAmt) {
                    db.run(`
                        INSERT INTO transactions (block_id, amount, sender, recipient)
                        VALUES (?, ?, ?, ?)
                    `, [blockId, block.transaction.decTransAmt, block.transaction.strTransSender, block.transaction.strTransRecipient], (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(block);
                    });
                } else {
                    resolve(block);
                }
            });
        });
    },

    getLastBlock: () => {
        return objHippoChain.chain[objHippoChain.chain.length - 1];
    },

    generateHash: (strPreviousHash, datStartTime, objNewTransaction) => {
        let strLocalHash = '';
        let intNonce = 0;

        while (strLocalHash.substring(0, 3) != '000') {
            intNonce++;
            strLocalHash = sha256(`${strPreviousHash}${datStartTime}${JSON.stringify(objNewTransaction)}${intNonce}`);
        }
        return { strLocalHash, intNonce };
    },

    hashExists: (hash) => {
        return objHippoChain.chain.some(block => block.hash === hash);
    },

    createNewBlock: async (decTransAmt, strTransSender, strTransRecipient) => {
        try {
            if (typeof decTransAmt !== 'number' || decTransAmt <= 0) {
                throw new Error('Amount must be a positive number');
            }
            if (!strTransSender || !strTransRecipient) {
                throw new Error('Sender and recipient are required');
            }

            const objNewTransaction = { decTransAmt, strTransSender, strTransRecipient };
            const datInitTime = Date.now();
            const previousBlock = objHippoChain.getLastBlock();
            let newCoinHash;
            
            do {
                newCoinHash = objHippoChain.generateHash(previousBlock.hash, datInitTime, objNewTransaction);
            } while (objHippoChain.hashExists(newCoinHash.strLocalHash));

            const newBlock = {
                index: previousBlock.index + 1,
                time: datInitTime,
                transaction: objNewTransaction,
                nonce: newCoinHash.intNonce,
                hash: newCoinHash.strLocalHash,
                previousHash: previousBlock.hash
            };
            
            await objHippoChain.saveBlock(newBlock);
            objHippoChain.chain.push(newBlock);
            return newBlock;
        } catch (error) {
            console.error('Error creating new block:', error);
            throw error;
        }
    },

    printChain: () => {
        console.log(objHippoChain.chain);
    },

    getChain: () => {
        return objHippoChain.chain;
    }
};

// Initialize the chain with genesis block if empty
objHippoChain.loadChain().then(blocks => {
    if (blocks.length === 0) {
        const genesisBlock = {
            index: 0,
            time: Date.now(),
            transaction: {},
            nonce: 0,
            hash: "000graymcracker",
            previousHash: "000beforegraymcracker"
        };
        objHippoChain.saveBlock(genesisBlock).then(() => {
            objHippoChain.chain.push(genesisBlock);
        });
    }
}).catch(err => {
    console.error('Error initializing blockchain:', err);
});

export default objHippoChain;