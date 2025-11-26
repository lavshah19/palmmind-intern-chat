import type { CommonFormProps } from "@/types/auth";
import { Button } from "../ui/button";


import FormControls from "./from-control";



const CommonForm = ({
  handelSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}: CommonFormProps) => {
  return (
    <form onSubmit={handelSubmit}>
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} className="mt-4 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
