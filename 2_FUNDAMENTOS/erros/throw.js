const x = 10

//checar se o x e um numero
if (!Number.isInteger(x)) {
    throw new Error("O valor de x não é um número inteiro")
}
