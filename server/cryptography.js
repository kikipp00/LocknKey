const crypto = require("crypto");
const secret = "19vF3YGHHtdozCyUkRYcqUCVclDPxr3H";

const encrypt = (text) => {
    const iv = Buffer.from(crypto.randomBytes(16)) //iv is identifier
    const cipher = crypto.createCipheriv(
        "aes-256-ctr",
        Buffer.from(secret),
        iv
    );

    const encryptedText = Buffer.concat([
        cipher.update(text),
        cipher.final(),
    ]);

    return {
        iv: iv.toString("hex"),
        text: encryptedText.toString("hex"),
    };
};

const decrypt = (ciphertext) => {
    const decipher = crypto.createDecipheriv(
        "aes-256-ctr",
        Buffer.from(secret),
        Buffer.from(ciphertext.iv, "hex")
    );

    const decryptedText = Buffer.concat([
        decipher.update(Buffer.from(ciphertext.text, "hex")),
        decipher.final(),
    ]);

    return decryptedText.toString()
}

module.exports = { encrypt, decrypt }