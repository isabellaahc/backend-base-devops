import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";
import { esPrimo } from "../src/numeros.js";
import { esPalindromo } from "../src/palindromo.js";

describe("Pruebas para endpoints", () => {

    test("endpoint key", () => {
        expect(1 + 1).toBe(2);
    });

    test("Test endpoint palindromo, cuando la frase es palindromo", async () => {
        const frase = "Anita lava la tina";
        return await request(app)
        .get("/palindromo/" + frase)
        .expect("Content-Type", /text/)
        .expect(200)
        .then((response) => {
            expect(response.text).toBe("Hola, La frase ingresada es palindromo");
        });
    });

    test("Test endpoint palindromo, cuando la frase es palindromo", async () => {
        const frase = "reconocer";
        return await request(app)
        .get("/palindromo/" + frase)
        .expect("Content-Type", /text/)
        .expect(200)
        .then((response) => {
            expect(response.text).toBe("Hola, La frase ingresada es palindromo");
        });
    });

    test("Test endpoint palindromo, cuando la frase no es palindromo", async () => {
        const frase = "Hola que tal";
        return await request(app)
        .get("/palindromo/" + frase)
        .expect("Content-Type", /text/)
        .expect(200)
        .then((response) => {
            expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
        });
    });

    test("Test endpoint palindromo. Espera error 404 cuando no hay frase", async () => {
        const frase = "";
        return await request(app)
        .get("/palindromo/" + frase)
        .expect("Content-Type", /text/)
        .expect(404)
    });

    test("Test endpoint primo. Espera 404 por ingresar un string", async () => {
        const numero = "";
        return await request(app)
        .get("/primo/" + numero)
        .expect("Content-Type", /text/)
        .expect(404)
    });

    test("Test endpoint primo, cuando el numero es primo", async () => {
        const numero = 2;
        return await request(app)
        .get("/primo/" + numero)
        .expect("Content-Type", /text/)
        .expect(200)
        .then((response) => {
            expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
        });
    });

    test("Test endpoint primo, cuando el numero no es primo", async () => {
        const numero = 4;
        return await request(app)
        .get("/primo/" + numero)
        .expect("Content-Type", /text/)
        .expect(200)
        .then((response) => {
            expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
        });
    });

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });
});

describe("Pruebas para números primos", () => {
    
    test("Numeros pequeños que son primos", () => {
        expect(esPrimo(2)).toBe(true);
        expect(esPrimo(3)).toBe(true);
        expect(esPrimo(5)).toBe(true);
        expect(esPrimo(7)).toBe(true);

    });

    test("Numeros pequeños que no son primos", () => {
        expect(esPrimo(4)).toBe(false);
        expect(esPrimo(6)).toBe(false);
        expect(esPrimo(9)).toBe(false);
    });

    test("Numero menor a 2, no es primo", () => {
        expect(esPrimo(1)).toBe(false);
    });

    test("Numero negativo, no es primo", () => {
        expect(esPrimo(-1)).toBe(false);
    });

    test("Numero más grande que no es primo", () => {
        expect(esPrimo(100)).toBe(false);
    });

    test("Numero más que es primo", () => {
        expect(esPrimo(97)).toBe(true);
    });

    test('Prueba número extremadamente alto', () => {
        expect(esPrimo(Number.MAX_SAFE_INTEGER)).toBe(false);
    });

});

describe("esPalindromo", () => {
    test("La frase 'Anita lava la tina' es palindromo", () => {
        expect(esPalindromo("Anita lava la tina")).toBe(true);
    });

    test("La frase 'la ruta natural' es palindromo", () => {
        expect(esPalindromo("La ruta natural")).toBe(true);
    });

    test("La palabra 'reconocer' es palindromo", () => {
        expect(esPalindromo("reconocer")).toBe(true);
    });

    test("Debería devolver false para 'Hola mundo'", () => {
        expect(esPalindromo("Hola")).toBe(false);
        expect(esPalindromo("Chao")).toBe(false);
    });

    test("Debería devolver true para un sting vacio", () => {
        let x = '';
        expect(esPalindromo(x)).toBe(true);
    });

});