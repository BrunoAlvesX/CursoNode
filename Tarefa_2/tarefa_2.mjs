import inquirer from 'inquirer';
import chalk from 'chalk';

inquirer.prompt([
    {
        name: 'nome',
        message: 'Qual o seu nome?'
    },
    {
        name: 'idade',
        message: 'Qual a sua idade?'
    }
]).then((answers) => {
    const nome = answers.nome;
    const idade = answers.idade;
    console.log(chalk.yellow(`O seu nome é ${nome}, e tem ${idade} anos`));
})
.catch(err => console.log(err))