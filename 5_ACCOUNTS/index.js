//modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';

//modulos internos
import fs from 'fs'
console.log('iniciamos o accounts')

operation()

function operation() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'O que vc deseja fazer',
            choices: [
                'Criar Conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
        ])
        .then((answer) => {
            const action = answer['action']
            if (action === 'Criar Conta') {
                createAccount()
            } else if(action === 'Depositar'){

            } else if(action === 'Consultar saldo'){
                
            } else if(action === 'Sacar'){
                
            } else if(action === 'Sair'){
                console.log(chalk.bgBlue.black('Obrigado por usar o accounts'))
                process.exit()
            }
        })
        .catch((err) => console.log(err))
}

//create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('Defina as opcoes da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    inquirer
        .prompt([{
            name: 'accountName',
            message: 'Digite um nome para sua conta'
        }
    ]).then(answer => {
        const accountName = answer['accountName']
        console.info(accountName)

        //caso o diretorio da conta nao existe deve-se criar ele
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(
                chalk.bgRed.black('Esta conta já existe,escolha outro nome'),
            )
            buildAccount()
            return 
        }

        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": 0}`, function(err){
            console.log(err)
        })
        console.log(chalk.green('Parabéns a sua conta foi criada'))
        operation()

    }).catch(err => console.log(err))
}


