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
    return await bcrypt.hash(password, salt);

};

UserSchema.methods.matchPassword = function(password){
    await bcrypt.compare(password, this.password);
    
}

module.exports = model('Usuario', UsuarioSchema)