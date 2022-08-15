const {Schema, model} = require('mongodb');
const  bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    email: {
        type:  String,
        required: false
    },
    pass: {
        type:  String,
        required: true
    }
}, 
    {
        timestamps: true
    

})

UsuarioSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(password, salt);
    
}

module.exports = model('Usuario', UsuarioSchema)