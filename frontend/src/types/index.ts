export type SignInFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = {
  username: string;
  email: string; 
  password: string;
};
export type CheckAuthResponse = {
  success: boolean;
  user?: any;
};
export type AuthContextType = {
  signInFormData: MyFormData;
  setSignInFormData: React.Dispatch<React.SetStateAction<MyFormData>>;

  signUpFormData: MyFormData;
  setSignUpFormData: React.Dispatch<React.SetStateAction<MyFormData>>;

  authUser: {
    authenticate: boolean;
    user: any;
  };
  setAuthUser: React.Dispatch<
    React.SetStateAction<{
      authenticate: boolean;
      user: any;
    }>
  >;

  isLoading: boolean;

  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;

  handelRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  handelLogin: (e: React.FormEvent<HTMLFormElement>) => void;

  checkAuth: () => Promise<void>;
  logOut: () => void;
};

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "file"
  | "checkbox"
  | "radio";

export type FormControlType = {
  name: string;
  label: string;
  type: InputType;
  placeholder: string;
  required: boolean;
  ComponentType: "input" | "textarea" | "select";
  options?: { value: string; label: string,id:string }[];
};

export type MyFormData = {
  email: string;
  password: string;
  username?: string;
};


export type CommonFormProps = {
  handelSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText?: string;
  formControls: FormControlType[];
  formData: MyFormData;
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>;
  isButtonDisabled?: boolean;
};

export type FormControlsProps = {
  formControls: FormControlType[];
  formData: MyFormData;
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>;
};