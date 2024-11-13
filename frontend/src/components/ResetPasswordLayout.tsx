import { Formik, FormikErrors } from "formik";
import Modal from "./Modal";
import Heading from "./Heading";
import PasswordInput from "./PasswordInput";
import Button from "./Button";

function ResetPasswordLayout({ onClose }: { onClose: () => void }) {
  const validate = (values: any) => {
    const errors: FormikErrors<any> = {};
    if (!values.oldPassword) {
      errors.oldPassword = "Please include a valid old password";
    } else if (values.oldPassword.length < 6) {
      errors.oldPassword =
        "Please include a  password with minimum 6 characters";
    }
    if (!values.password) {
      errors.password = "Please include a valid new password";
    } else if (values.password.length < 6) {
      errors.password = "Please include a  password with minimum 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please include a valid confirm password";
    } else if (values.confirmPassword.length < 6) {
      errors.confirmPassword =
        "Please include a  password with minimum 6 characters";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Both the passwords do not match";
    }

    return errors;
  };
  return (
    <Modal className="!pt-0 px-0 overflow-y-scroll overflow-x-hidden h-max  max-h-[80%]  !pb-0">
      <div className="py-5">
        <Heading
          variant="subTitle"
          text="Update your Password"
          headingclassname="font-roboto-semibold"
        />
        <Heading
          headingclassname="!font-normal text-sm font-family-roboto"
          variant="subTitle"
          text="Your new password must be different from previous used passwords"
        />
        <Formik<AnalyserNode>
          initialValues={{
            oldPassword: "",
            password: "",
            confirmPassword: "",
          }}
          enableReinitialize
          onSubmit={async (values) => {
            const formData = new FormData(); //initialize formdata
            const encodedOldPass = btoa(values.oldPassword);
            const encodedNewPass = btoa(values.password);

            formData.set("old_password", encodedOldPass);
            formData.set("new_password", encodedNewPass);

            setTimeout(() => {
              onClose();
            }, 1000);
          }}
          validate={validate}
        >
          {(props) => (
            <div className="   my-3 ">
              <form onSubmit={props.handleSubmit} autoComplete="off">
                <input className="hidden" autoComplete="false" />
                <div className="mb-5">
                  <PasswordInput
                    placeholder="Enter old password"
                    placeholderclassname="placeholder:text-sm"
                    id="oldPassword"
                    value={props?.values?.oldPassword}
                    className="w-full dark:text-black dark:border-black"
                    onChange={props.handleChange}
                  />

                  {props.touched.oldPassword && props.errors.oldPassword ? (
                    <p
                      className="text-red-600 font-semibold "
                      children={props?.errors.oldPassword}
                    />
                  ) : null}
                </div>
                <div className="mt-5 mb-3">
                  <PasswordInput
                    placeholderclassname="placeholder:text-sm"
                    placeholder="Enter new password"
                    id="password"
                    value={props.values.password}
                    className="w-full dark:text-black dark:border-black"
                    onChange={props.handleChange}
                  />
                  {props.touched.password && props.errors.password ? (
                    <p
                      className="text-red-600 font-semibold "
                      children={props?.errors.password}
                    />
                  ) : null}
                </div>
                <div className="mt-5 mb-3">
                  <PasswordInput
                    placeholder="Enter confirm password"
                    placeholderclassname="placeholder:text-sm"
                    id="confirmPassword"
                    value={props.values.confirmPassword}
                    className="w-full dark:text-black dark:border-black"
                    onChange={props.handleChange}
                  />
                  {props.touched.confirmPassword &&
                  props.errors.confirmPassword ? (
                    <p
                      className="text-red-600 font-semibold "
                      children={props?.errors.confirmPassword}
                    />
                  ) : null}
                </div>
                <div className="flex gap-3">
                  <Button
                    color="gray"
                    variant="ghost"
                    size="small"
                    buttonClassName="ml-auto px-6 py-2   w-max  font-normal rounded-sm text-md font-family-roboto  tracking-wide"
                    onClick={async () => {
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    loading={false}
                    variant="filled"
                    size="small"
                    type="submit"
                    buttonClassName="px-6 py-2 w-max   font-normal rounded-sm text-md font-family-roboto  tracking-wide"
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default ResetPasswordLayout;
