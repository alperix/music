import regex from "./Regex";
import { setTemplate } from "../Resources";

import text from "@/core/resources/Texts.json";

const message = text.validation;

export type interval = {
    min?: number;
    max?: number;
    value: string;
    number?: boolean;
    regex?: keyof typeof Rules;
};

export const Rules = {
    REQ: (value: string) =>
        regex.REQ.test(value.trim()) ? "" : message.required,

    INT: (value: string) => (regex.INT.test(value.trim()) ? "" : message.INT),
    INTABS: (value: string) => (regex.INTABS.test(value.trim()) ? "" : message.INTABS),
    NUM: (value: string) => (regex.NUM.test(value.trim()) ? "" : message.NUM),
    NUMABS: (value: string) => (regex.NUMABS.test(value.trim()) ? "" : message.NUMABS),

    EMAIL: (value: string) =>
        regex.EMAIL.test(value.trim()) ? "" : message.email,
    TEL: (value: string) => (regex.TEL.test(value.trim()) ? "" : message.tel),
    ADDRESS: (value: string) =>
        regex.ADDRESS.test(value.trim()) ? "" : message.address,
    SVN: (value: string) => {
        let check = false;
        if (regex.SVN.test(value.trim())) check = checkSvn(value);
        return check ? "" : message.SVN;
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
                msg = templated(message.limitNumber);
            else if (min && value < min) msg = templated(message.minNumber);
            else if (max && value > max) msg = templated(message.maxNumber);

        } else {

            const regex = new RegExp(
                `^.{${min ? min : ""}, ${max ? max : ""}}$`
            );

            if (!regex.test(data.value)) {
                if (min && max) msg = templated(message.limitText);
                else if (min) msg = templated(message.minText);
                else if (max) msg = templated(message.maxText);
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
