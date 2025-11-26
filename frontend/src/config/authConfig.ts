import type { FormControlType, SignInFormData, SignUpFormData } from "../types/auth";

export const signUpFormControls:FormControlType[]=[
    {
        name:"username",
        label:"Username",
        type:"text",
        placeholder:"Enter your username",
        required:true,
        ComponentType:'input',
       
    },
    {
        name:"email",
        label:"Email",
        type:"email",
        placeholder:"Enter your email",
        required:true,
        ComponentType:'input',
    },
    {
        name:"password",
        label:"Password",
        type:"password",
        placeholder:"Enter your password",
        required:true,
        ComponentType:'input',
    }
]
export const signinFormControls:FormControlType[]=[
 
    {
        name:"email",
        label:"Email",
        type:"email",
        placeholder:"Enter your email",
        required:true,
        ComponentType:'input',
    },
    {
        name:"password",
        label:"Password",
        type:"password",
        placeholder:"Enter your password",
        required:true,
        ComponentType:'input',
    }
]
export const initialSignInFormData: SignInFormData = {
  email: "",
  password: "",
};

export const initialSignUpFormData: SignUpFormData = {
  username: "",
  email: "", 
  password: "",
};
