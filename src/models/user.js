import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
},{timestamps:true})

UserSchema.pre('save', function(next){
    const user= this;
    const SALT= bcrypt.genSaltSync(9);
    const encriptPassword= bcrypt.hashSync(user.password,SALT);
    user.password= encriptPassword;
    next();
});

UserSchema.methods.comparePassword= function compare(password){
    return bcrypt.compareSync(password,this.password);
}
UserSchema.methods.getJWT= function generate(){
    return jwt.sign({id: this.id,email:this.email},'twitter_secret',{
        expiresIn: '1h'
    });
}
const User= mongoose.model('User',UserSchema);

export default User;