let userService = require('./userServices');

let createUserControllerFunc = async (req, res) =>  {
    try {
    let status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

let loginUserControllerFunc = async (req, res) => {
    let result = null;
    console.log("Entro al controlador")
    try {
        result =  await userService.loginuserDBService(req.body);
        console.log(result);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

let finduserControllerFunc = async (req, res) => {
    let result = await userService.findUserDBService(req.body);
    try {
        if(result.status){
            res.send({ "status": true, "message": result.msg, "user": result.nombre, "lastname": result.apellido, "email": result.email })
        }
    } catch (error){
        console.log("Entro en el Controller (Catch) ")
        console.log(error)
        res.send({ "status": false, "message": "Usuario No Existente" });
    }
}

let deleteuserControllerFunc = async (req, res) => {
    try{
        console.log("Soy del controller eliminar")
        let result = await userService.deleteuserDBService(req.body);
        if(result.status){
            res.send({ "status": true, "message": result.msg })
        }
    } catch(error) {
        console.log("Entro en el Controller (Catch) ")
        console.log(error)
        res.send({ "status": false, "message": "Usuario No Existente o No Se Pudo Eliminar" });
    }
}

let updateuserControllerFunc = async (req, res) => {
    try{
        let result = await userService.updateuserDBService(req.body)
        if(result.status){
            res.send({ status:true, msg: result.msg, firstname: result.firstname, lastname:result.lastname})
        }else{
            res.send({ status:false, msg: result.msg })
        }
    }catch{
        res.send({ status:false, msg: "Intentelo mas tarde" })
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, finduserControllerFunc, deleteuserControllerFunc, updateuserControllerFunc };