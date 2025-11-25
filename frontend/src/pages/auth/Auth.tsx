
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { initialSignInFormData, initialSignUpFormData, signinFormControls, signUpFormControls } from "@/config/authConfig";

import CommonForm from "@/components/Auth-Common-form";
import { useAuth } from "@/components/hooks/useAuth";



const AuthPage = () => {
 const {
  signInFormData,
  setSignInFormData,
  signUpFormData,
  setSignUpFormData,
  handelRegister,
  handelLogin,
  activeTab,
  setActiveTab
} = useAuth();


    const handelTabChange = (tab: string) => {
        
        if (tab === "signin") {
            setSignInFormData(initialSignInFormData);
        }
        if (tab === "signup") {
            setSignUpFormData(initialSignUpFormData);
        }
        setActiveTab(tab);
        // console.log(tab);

    }
    function checkIfsignInValid() {
        if (signInFormData && signInFormData.email && signInFormData.password) {
            return true;
        }
        return false;
    }
    function checkIfsignUPValid(){
        if (signUpFormData && signUpFormData.username && signUpFormData.email && signUpFormData.password) {
            return true;
        }
        return false;
    }
    // console.log(signInFormData);
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-5 h-15 flex items-center border-b">
                <Link to={"/"} className="flex items-center justify-center">
                    <span className="font-extrabold text-xl">Palmmind</span>

                </Link>

            </header>
            <div className="flex items-center justify-center min-h-screen bg-background ">
                <Tabs defaultValue="signin" value={activeTab}
                    onValueChange={handelTabChange}
                    className="w-full max-w-md">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">sign in</TabsTrigger>
                        <TabsTrigger value="signup">sign up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>Signin</CardTitle>
                                <CardDescription>Enter your email and password to signin</CardDescription>

                            </CardHeader>
                            <CardContent className="space-y-2">
                               <CommonForm  formControls={signinFormControls} buttonText="sign in" formData={signInFormData}
                               setFormData={setSignInFormData}
                               isButtonDisabled={!checkIfsignInValid()}
                               handelSubmit={handelLogin}
                                />

                            </CardContent>
                            
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>Signup</CardTitle>
                                <CardDescription>create an account for chat</CardDescription>

                            </CardHeader>
                            <CardContent className="space-y-2">
                               <CommonForm formControls={signUpFormControls} buttonText="sign up" formData={signUpFormData}
                               setFormData={setSignUpFormData}
                                 isButtonDisabled={!checkIfsignUPValid()}
                                 handelSubmit={handelRegister} />
                            </CardContent>
                            
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default AuthPage;