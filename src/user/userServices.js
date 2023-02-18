let userModel = require("./userModel");
let key = "somekey234567884456753456";
let encryptor = require("simple-encryptor")(key);

module.exports.createUserDBService = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findOne(
      {
        $and: [
          {
            email: userDetails.email,
          },
        ],
      },
      function search(req, res) {
        console.log("Antes");
        console.log(res);
        try {
          console.log("entro");
          if (res !== null) {
            console.log("entro 2");
            reject({ status: false, msg: "Eror" });
          } else {
            console.log("Falso");
            let userModelData = new userModel();

            userModelData.firstname = userDetails.firstname;
            userModelData.lastname = userDetails.lastname;
            userModelData.email = userDetails.email;
            userModelData.password = userDetails.password;
            let encrypted = encryptor.encrypt(userDetails.password);
            userModelData.password = encrypted;

            userModelData.save(function resultHandle(error, result) {
              if (error) {
                reject(false);
              } else {
                resolve(true);
              }
            });
          }
        } catch (e) {
          reject({ status: false, msg: "Algo sucedio" });
        }
      }
    );
  }).catch((error) => {
    console.log("Entro en el catch");
    console.log(error);
  });
};

module.exports.findUserDBService = (userDetails) => {
  return new Promise(function findDocument(resolve, reject) {
   console.log("Vengo del servicio")
   userModel.findOne(
        {$and : [
          {
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            email: userDetails.email,
          }
        ]},
      function search(req, res) {
         console.log(res)
         if(res !== null){
            resolve({ status:true, firstname: userDetails.firstname, lastname:userDetails.lastname, email:userDetails.email })
         }else{
            reject({ status:false, msg:"El usuario no se encontro" })
         }
  });
  }).catch((error) => {
    console.log("Entro en el catch");
    console.log(error);
  });
};

module.exports.deleteuserDBService = (userDetails) => {
  return new Promise(function findDocument(resolve, reject){
     userModel.findOne({"$and": [{ firstname: userDetails.firstname, email: userDetails.email }] }, function search(req, res){
        try {
          
           if(res !== null){
              let desencriptado = encryptor.decrypt(res.password);
              console.log(desencriptado === userDetails.password)
              if(desencriptado === userDetails.password){
                 userModel.deleteOne({"$and": [{ firstname: userDetails.firstname, lastname: userDetails.lastname, email: userDetails.email }] }, function deleteUser(req, res){
                    try {
                       if(res.deletedCount === 1){
                          resolve({ status: true, msg: "Usuario Eliminado" });
                       }else {
                          console.log("Falso")
                          reject({ status: false, msg: "Usuario No Existente o No Eliminado" });
                          console.log("Envio")
                       }
                    } catch (e) {
                       reject({ status: false, msg: "Algo sucedio mal" })
                    }
                 })
              }else{
                 reject({ status: false, msg: "Contraseña Incorrecta" })
              }
           }else{
              reject({ status: false, msg: "Usuario no existente" })
           }
        } catch (e) {
           console.log("Error")
        }
     } )
  })
}

module.exports.loginuserDBService = (userDetails) => {
  return new Promise(function findDocument(resolve, reject){
     userModel.findOne({"$and": [{ firstname: userDetails.firstname, email: userDetails.email }] }, function search(req, res){
        try {
           if(res !== null){
              let desencriptado = encryptor.decrypt(res.password);
              console.log(desencriptado === userDetails.password)
              if(desencriptado === userDetails.password){
                resolve({ status: true, msg: "Usuario Identificado", firstname: userDetails.firstname, lastname: userDetails.lastname, email: userDetails.email })
              }else{
                 reject({ status: false, msg: "Contraseña Incorrecta" })
              }
           }else{
              reject({ status: false, msg: "Usuario no existente" })
           }
        } catch {
           console.log("Error")
        }
     } )
  }).catch((error) => {
    console.log(error)
  })
}

module.exports.updateuserDBService = (userDetails) => {
  return new Promise(function updateDocument(resolve, reject){
    userModel.updateOne({email:userDetails.email}, {$set:{firstname:userDetails.firstname, lastname:userDetails.lastname}}, function search(req, res){
      console.log(res) 
      if(res.modifiedCount === 1){
        resolve({ status:true, msg:"El usuario se modifico exitosamente", firstname:userDetails.firstname, lastname:userDetails.lastname })
       }else{
        reject({ status:false, msg:"No se pudo actualizar ya que envio los mismos datos" })
       }
    })
 }).catch((error) => {
   console.log(error)
 })
}