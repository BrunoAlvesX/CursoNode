const Task = require('../models/Task')

module.exports = class TaskController{
    static createTask(request, response){
        response.render('tasks/create')
    }

    static async createTaskSave(request, response){
        const task  = {
            title: request.body.title,
            description: request.body.description,
            done: false
        }
        
        await Task.create(task)

        response.redirect('/tasks')
    }

    static async removeTask(request,response){
        const id = request.body.id

        await Task.destroy({where: {id: id}})

        response.redirect('/tasks')
    }

    static async updateTask(request,response){
        const id = request.params.id

        const task = await Task.findOne({where: {id: id}, raw: true })

        response.render('tasks/edit', { task })
    }

     static async updateTaskPost(request,response){
        const id = request.body.id

        const task = {
            title: request.body.title,
            description: request.body.description
        }

        await Task.update(task, {where: {id:id}})

        response.redirect('/tasks')
    }

    static async toggleTaskStatus(request,response){
        const id = request.body.id

        const task = {
            done: request.body.done === '0' ? true : false
        }

        await Task.update(task, {where: {id:id}})

        response.redirect('/tasks')
    }

    static async showTasks(request, response){

        const tasks = await Task.findAll({raw: true})

        response.render('tasks/all' , {tasks})
    }
}