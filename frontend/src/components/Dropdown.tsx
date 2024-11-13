import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../../styles/Dropdown.css";

function DropdownCompoenet(props: {
  options: any;
  className?: string;
  onChange: (newValue: any) => void;
  placeholder?: string;
  value?: { label: any; value: any };
  menuClassName?: string;
  dropDownClassName?: string;
  placeholderclassname?: string;
  arrowClassName?: string;
}) {
  const [value, setValue] = useState(props.options[0]);
  return (
    <div className={` ${props.className}`}>
      <Dropdown
        menuClassName={props.menuClassName + " z-10"}
        className={`rounded-sm font-family-roboto tracking-wide ${props.dropDownClassName}`}
        arrowClassName={`mt-1 text-primaryBlue ${props.arrowClassName}`}
        placeholderClassName={`text-sm font-family-roboto  tracking-wide text-textColor ${props.placeholderclassname}`}
        options={props.options}
        onChange={(newValue) => {
          setValue(newValue);
          props.onChange(newValue);
        }}
        value={props.placeholder ?? props.value?.label}
        placeholder={props.placeholder ?? value}
      />
    </div>
  );
}

export default DropdownCompoenet;
