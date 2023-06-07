import { getTimeFromTimestamp } from './getTimeFromTimestamp'
import { stringTruncateFromCenter } from './stringTruncateFromCenter'
import { formatNumber } from './formatNumber'

describe('function tests', () => {

    it('Проверка getTimeFromTimestamp', () => {
        expect(getTimeFromTimestamp("2022-08-02T07:18:05.000000Z")).toBe("07:18:05");
        expect(getTimeFromTimestamp(undefined)).toBe(" ");
        expect(getTimeFromTimestamp(null)).toBe(" ");
    });

    it('Проверка stringTruncateFromCenter', () => {
        expect(stringTruncateFromCenter("0x26df7dg6d4j6864j54h635k453", 10)).toBe("0x26d…5k453");
        expect(stringTruncateFromCenter("0x26df7dg6d4j6864j54h635k453", 11)).toBe("0x26df…5k453");
    });

    it('Проверка formatNumber', () => {
        expect(formatNumber(4629706)).toBe("4 629 706");
    });

});

