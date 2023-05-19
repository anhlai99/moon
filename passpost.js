import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

//tạo lớp passport
export function initialize(passport,getUserByEmail){
    const authenticateUser = async (email,password,done)=>{
        const user= getUserByEmail(email)
        if(user== null){
            return done(null,false,{mesenge:'no user with that email'})
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }
            else{
                return done(null,false,{mesenge:'password incorrect'})
            }
        }catch(e){
            return done(e)
        }

    }
    passport.use(new LocalStrategy({ usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done)=>{})
    passport.deserializeUser((id,done)=>{})
}
export default initialize;