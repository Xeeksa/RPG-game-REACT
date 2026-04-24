import { describe, it, expect } from 'vitest';
import { Character } from "./Character";

describe('Character.addExp', () => {
    it('Добавляет опыт без повышения уровня', () => {
        const player = new Character('Test', 20, 0, 1, 0);
        player.addExp(15);
        expect(player.experience).toBe(15);
        expect(player.level).toBe(1);
    });

    it('Повышает уровень при достижении порога', () => {
        const player = new Character('Test', 20, 0, 1, 0);
        player.addExp(60);
        expect(player.level).toBe(2);
        expect(player.experience).toBe(60);
    });

    it('Не повышает уровень выше 10 и не добавляет опыт', () => {
        const player = new Character('Test', 20, 0, 10, 0);
        player.addExp(10000);
        expect(player.level).toBe(10);
        expect(player.experience).toBe(0);
    });
});