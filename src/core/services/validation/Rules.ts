import regex from "./Regex";
import messages from "./Messages.json"

import { setTemplate } from "../Resources";

export type interval = {
    min?: number;
    max?: number;
    value: string;
    number?: boolean;
    regex?: keyof typeof Rules;
};

export const Rules = {
    REQ: (value: string) =>
        regex.REQ.test(value.trim()) ? "" : messages.required,

    INT: (value: string) => (regex.INT.test(value.trim()) ? "" : messages.INT),
    INTABS: (value: string) => (regex.INTABS.test(value.trim()) ? "" : messages.INTABS),
    NUM: (value: string) => (regex.NUM.test(value.trim()) ? "" : messages.NUM),
    NUMABS: (value: string) => (regex.NUMABS.test(value.trim()) ? "" : messages.NUMABS),

    EMAIL: (value: string) =>
        regex.EMAIL.test(value.trim()) ? "" : messages.email,
    TEL: (value: string) => (regex.TEL.test(value.trim()) ? "" : messages.tel),
    ADDRESS: (value: string) =>
        regex.ADDRESS.test(value.trim()) ? "" : messages.address,
    SVN: (value: string) => {
        let check = false;
        if (regex.SVN.test(value.trim())) check = checkSvn(value);
        return check ? "" : messages.SVN;
    }
};

export const CustomRules = {
    LIMITS: (data: interval) => {
        const { min, max } = data;
        const templated = (m: string) => setTemplate(m, { min, max });
        let msg = "";

        if (data.number) {

            if (data.regex)
            {
                msg = Rules[data.regex](data.value);
                if (msg) return msg;
            }        

            const value = Number(data.value);

            if (min && max && (value < min || value > max))
                msg = templated(messages.limitNumber);
            else if (min && value < min) msg = templated(messages.minNumber);
            else if (max && value > max) msg = templated(messages.maxNumber);

        } else {

            const regex = new RegExp(
                `^.{${min ? min : ""}, ${max ? max : ""}}$`
            );

            if (!regex.test(data.value)) {
                if (min && max) msg = templated(messages.limitText);
                else if (min) msg = templated(messages.minText);
                else if (max) msg = templated(messages.maxText);
            }
        }

        return msg;
    }
};

export const checkSvn = (value: string): boolean => {
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
