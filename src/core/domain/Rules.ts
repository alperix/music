import regex from "./Regex";
import text from "../resources/Texts.json";

const message = text.validation;

export const Rules = {
    REQ: (value: string) =>
        regex.REQ.test(value.trim()) ? "" : message.required,
    EMAIL: (value: string) =>
        regex.EMAIL.test(value.trim()) ? "" : message.email,
    TEL: (value: string) => (regex.TEL.test(value.trim()) ? "" : message.tel),
    ADDRESS: (value: string) =>
        regex.ADDRESS.test(value.trim()) ? "" : message.address,
    SVN: (value: string) => {
        let check = false;
        if (regex.SVN.test(value.trim())) check = checkSvn(value);
        return check ? "" : message.SVN;
    },
    AGE: (value: string) => {
        const int = regex.INTABS.test(value.trim());
        const age = int && Number(value.trim());
        const valid = age && age > 7 && age < 151;
        return valid ? "" : message.age;
    }
};

const checkSvn = (value: string): boolean => {
    // Initial Const-Value
    let sum = 0;
    const weights = [3, 7, 9, 5, 8, 4, 2, 1, 6];

    // Extract Number, CheckSum and Birthday for Recheck
    const number = value.substring(0, 3);
    const birthday = value.substring(4, 10);
    const checksum = Number(value.substring(3, 4));

    // get digits of STring number and Birthday
    const digits = (number + birthday).split("").map((s) => Number(s));
    // make sum of alle digits with weights of Index-Number
    for (let i = 0; i < weights.length; i++) {
        sum = sum + weights[i] * digits[i];
    }

    // if Modula 10 is 11 => recheck with number+1 and
    if (sum % 11 === 10) {
        // Convert Numbers , Checksum and Birthday to whole string
        return checkSvn(Number(number) + 1 + String(checksum) + birthday);
    }

    return sum % 11 === checksum;
};

export const svnHasBirthday = (svn: string, short: string) => {
    if (!svn || !short) return true;

    const s1 = svn.slice(-6);
    const sp = short.split(".");
    const s2 = `${sp[0]}${sp[1]}${sp[2].slice(-2)}`;

    return s1 === s2;
};
