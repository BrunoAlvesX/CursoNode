//modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';

//modulos internos
import fs from 'fs'
import { log } from 'console';
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
                deposit()
            } else if(action === 'Consultar saldo'){
                getAccountBalance()
            } else if(action === 'Sacar'){
                withdraw()
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

//add an amount to user account
function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([{
            name:'amount',
            message: 'Quanto voce deseja depositar?'
        }]).then((answer) => {
    
            const amount = answer['amount']
            //add an amount
            addAmount(accountName, amount)
            operation()
    
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta náo existe, escolha outro nome'))
        return false
    }
    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
}

function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJson)
}

//show account balance
function getAccountBalance(){
    inquirer.prompt([
        {
           name: 'accountName',
           message: 'Qual nome da sua conta?'
        }
    ]).then(answer => {
        
        const accountName = answer["accountName"]

        //verify if account exists
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlack.green(
            `Ola o saldo da sua conta e de R$${accountData.balance}`
            )),
        operation()

    }).catch(err => console.log(err))
}

//withdraw an amount from user account
function withdraw(){
    inquirer.prompt([
        {
           name: 'accountName',
           message: 'Qual nome da sua conta?'
        }
    ]).then(answer => {
      const accountName = answer['accountName']

      if(!checkAccount(accountName)){
        return getAccountBalance()
      }

      inquirer.prompt([
        {
            name: 'amount',
            message: 'Quanto voce deseja sacar?'
        }
      ]).then((answer) => 
        { 
            const amount = answer['amount']
            removeAmount(accountName, amount)
        })

    }).catch(err => console.log(err))
}

function removeAmount(accountName,amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro tente novamente mais tarde'))
        return withdraw()
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponivel'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },

        console.log(chalk.green(`Foi realizado o saque de R$${amount} da sua conta`)),
        operation()
    )
}