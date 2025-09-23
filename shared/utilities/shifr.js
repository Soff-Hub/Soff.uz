// Harfni shifrlash funksiyasi
function encryptChar(char, keywordChar) {
    const charCode = char.charCodeAt(0);
    const keywordCode = keywordChar.charCodeAt(0);

    const base = charCode >= 65 && charCode <= 90 ? 65 : 97;

    return String.fromCharCode(
        ((charCode - base + (keywordCode - base)) % 26) + base
    );
}

export function encryptEmail(email, keyword) {
    let encrypted = '';
    const keywordLength = keyword.length;

    for (let i = 0, j = 0; i < email.length; i++) {
        const char = email[i];

        if (/[a-zA-Z]/.test(char)) {
            const keywordChar = keyword[j % keywordLength].toLowerCase();
            encrypted += encryptChar(char, keywordChar);
            j++;
        } else {
            encrypted += char;
        }
    }

    return encrypted.toLocaleLowerCase();
}
 
function decryptChar(char, keywordChar) {
    const charCode = char.charCodeAt(0);
    const keywordCode = keywordChar.charCodeAt(0);

    const base = charCode >= 65 && charCode <= 90 ? 65 : 97;

    // Deshifrlangan harfni qaytarish
    return String.fromCharCode(
        ((charCode - base - (keywordCode - base) + 26) % 26) + base
    );
}

export function decryptEmail(encryptedEmail, keyword) {
    let decrypted = '';
    const keywordLength = keyword.length;

    for (let i = 0, j = 0; i < encryptedEmail.length; i++) {
        const char = encryptedEmail[i];

        if (/[a-zA-Z]/.test(char)) {
            const keywordChar = keyword[j % keywordLength].toLowerCase();
            decrypted += decryptChar(char, keywordChar);
            j++;
        } else {
            decrypted += char;
        }
    }

    return decrypted;
}