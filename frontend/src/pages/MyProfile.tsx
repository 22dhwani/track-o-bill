import { Formik } from "formik";
import Card from "../components/Card";
import Heading from "../components/Heading";
import { NoProfileImage } from "../components/Icons";
import Input from "../components/Input";
import Label from "../components/Label";
import Error from "../components/Error";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import TextArea from "../components/TextArea";

function MyProfile() {
  // eslint-disable-next-line prefer-const

  //   //validate the logs entered in the form
  //   const validate = (values: any) => {
  //     const errors: FormikErrors<any> = {};
  //     if (!values.email) {
  //       errors.email = "Please include an email address";
  //     } else if (!values.email.includes("@")) {
  //       errors.email = "Please include a valid email address";
  //     }

  //     if (!values.first_name) {
  //       errors.first_name = "Please include a first name";
  //     }

  //     return errors;
  //   };
  const user = {
    first_name: "Bill",
    email: "bill.gates@example.com",
    last_name: "Gates",
    mobile_number: "123-456-7890",
    image: undefined,
    address: "No address",
  };
  const navigate = useNavigate();
  const inputClassName =
    "items-center w-full  md:w-full !text-mediumGray outline-none  font-medium font-family-roboto   border rounded-lg    ease-in focus:caret-slate-500  lg:mr-3";
  const buttonClassName =
    "   w-full   xs:mx-auto md:mx-0  rounded-sm text-sm font-family-roboto tracking-wide ";
  return (
    <Card className="bg-transparent  text-white  !overflow-x-clip h-max">
      <Heading
        variant="subHeader"
        headingclassname="my-3 font-roboto-semibold"
        text="EDIT PROFILE"
      />
      <Formik<any>
        initialValues={{
          first_name: user?.first_name,
          email: user?.email,
          last_name: user?.last_name,
          mobile_number: user?.mobile_number,
          image: undefined,
          address: user?.address ?? "No address",
        }}
        enableReinitialize
        onSubmit={async (values) => {
          console.log(values);
        }}
        // validate={validate}
      >
        {(props) => (
          <form autoComplete="off" onSubmit={props.handleSubmit}>
            <input className="hidden" autoComplete="false" />
            <div className=" flex gap-10 items-center">
              <div className="my-5 w-24  py-3  bg-dimGray rounded-full h-24 flex  items-center justify-center">
                <NoProfileImage color="#9333ea" />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className={
                    buttonClassName + " border-[0.5px] border-slate-300 px-5"
                  }
                >
                  <span className="flex items-center space-x-2 text-primaryBlue font-family-roboto justify-center py-2">
                    Change Picture
                  </span>
                  <Input
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                      if (ev?.target?.files?.length) {
                        props.setFieldValue("image", ev?.target?.files[0]);
                      }
                    }}
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                  />
                </label>
                {props?.values?.image && (
                  <span className="text-textColor font-family-roboto text-xs text-center">
                    {"1 File Selected"}
                  </span>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5 my-5">
              <div className="">
                <Label
                  required
                  label="First Name"
                  className="ml-1 text-white"
                />
                <Input
                  id="first_name"
                  value={props.values.first_name}
                  className={inputClassName}
                  onChange={props.handleChange}
                />
                {props.touched.first_name && props.errors.first_name ? (
                  <Error error={"Please include a first name"} />
                ) : null}
              </div>
              <div className="">
                <Label required label="Last Name" className="ml-1 text-white" />
                <Input
                  id="last_name"
                  value={props.values.last_name}
                  className={inputClassName}
                  onChange={props.handleChange}
                />
                {props.touched.last_name && props.errors.last_name ? (
                  <Error error="Please include a last name" />
                ) : null}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5 my-5">
              <div>
                <Label required label="Email" className="ml-1 text-white" />
                <Input
                  id="email"
                  disabled
                  value={props.values.email}
                  className={`${inputClassName} `}
                />
                {props.touched.last_name && props.errors.last_name ? (
                  <Error error="Please include an email address" />
                ) : null}
              </div>
              <div>
                <Label label="Street Address" className="ml-1 text-white" />
                <Input
                  id="address"
                  value={props.values.address}
                  className={`${inputClassName} `}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5 my-5">
              <div>
                <Label required label="About Me" className="ml-1 text-white" />
                <TextArea
                  row="15"
                  id="bio"
                  disabled
                  value={props.values.bio}
                  className={`${inputClassName} `}
                />
                {props.touched.last_name && props.errors.last_name ? (
                  <Error error="Please include an email address" />
                ) : null}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5 my-5"></div>
            <div className="sticky bottom-0 left-0 flex w-[100%] py-5 gap-4 border-t-[0.2px] border-t-slate-200 ">
              <div className="lg:w-1/6 flex gap-3 ">
                <Button
                  type="submit"
                  variant="filled"
                  color="primary"
                  buttonClassName={buttonClassName}
                  centerclassname="flex justify-center items-center"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  color="gray"
                  buttonClassName={buttonClassName}
                  centerclassname="flex justify-center items-center"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Card>
  );
}

export default MyProfile;