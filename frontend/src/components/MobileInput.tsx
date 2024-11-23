import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Input from "./Input";
import DownArrow from "../images/DownArrow.svg";
import Error from "./Error";

export interface PhoneSelectProps {
  onChange?: (phoneNo: string) => void;
  value: string;
  id: string;
  className: string;
  isTouch: any;
  disabled?: boolean;
}

const people = [
  { id: 91, name: "India" },
  { id: 1, name: "United States Of America" },
  { id: 44, name: "United Kingdom" },
  { id: 54, name: "Argentina" },
  { id: 86, name: "China" },
];

function MobileInput({
  onChange = () => {
    console.log();
  },
  value,
  className,
  isTouch,
  disabled,
}: PhoneSelectProps) {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");
  const [phoneNo, setPhoneNo] = useState(value);
  const [error, setError] = useState("");

  return (
    <div className="relative">
      <Combobox
        disabled={false}
        value={selectedPerson}
        onChange={setSelectedPerson}
        displayValue={(person: any) => `(+${person.id})`}
      >
        <div className="relative">
          <div className="flex rounded-[8px] border border-lightPurple ">
            <Combobox.Button className="md:w-32 xs:w-28  p-0 border-0 flex items-center">
              <Combobox.Input
                className={`flex items-center w-11/12  py-1  text-md     ${
                  disabled ? "cursor-not-allowed" : "cursor-text"
                } font-semibold font-sans  text-textColor  text-left !my-0 border-0   pl-3  rounded-lg  ${className} `}
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(person: any) => `(+${person.id})`}
                autoComplete="new-password"
                placeholder={"+1"}
              />
              <img src={DownArrow} className="mt-1 " />
            </Combobox.Button>

            <Transition
              className="absolute mt-1 max-h-60 soft-searchbar z-50 w-52 overflow-auto rounded-[4px] bg-white   text-base shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              enter="transition-all duration-300"
              enterFrom="top-[90%] opacity-0"
              enterTo="top-full opacity-100"
              leave="transition-all ease-out duration-75"
              leaveFrom="top-full opacity-100"
              leaveTo="top-[90%] opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className={"overflow-y-scroll h-44"}>
                {people.length === 0 && query !== "" ? (
                  <div
                    className={`relative  ${
                      disabled ? "cursor-not-allowed" : "cursor-text"
                    }  select-none py-2 px-4`}
                  >
                    {"Nodata"}
                  </div>
                ) : (
                  people.map((country) => (
                    <Combobox.Option
                      key={country.name}
                      value={country}
                      className={({ active, selected }) =>
                        `  ${
                          disabled ? "cursor-not-allowed" : "cursor-text"
                        } flex select-none py-2 pr-4  ${
                          selected ? "" : active ? " text-[#F3C3F7]" : ""
                        }`
                      }
                    >
                      {({ selected }) => (
                        <p
                          className={`pl-3 flex w-full font-sans tracking-wide items-center space-x-1 ${
                            selected ? "text-[#F3C3F7] font-semibold" : ""
                          }`}
                        >
                          <span className="flex-grow">{country.name}</span>
                          <span className="whitespace-nowrap">
                            +{country.id}
                          </span>
                        </p>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!disabled) {
                  if (e.target.value.length > 10) {
                    setError("A number cannot exceed more than 10 digits");
                    return;
                  }
                  setPhoneNo(e.target.value);
                  onChange(`+${+selectedPerson.id} ${e.target.value}`);
                  setError("");
                }
              }}
              disabled={disabled}
              className={`border-0 font-semibold pl-3 !my-0  ${
                disabled ? "cursor-not-allowed" : "cursor-text"
              }`}
              value={phoneNo}
            />
          </div>
        </div>
      </Combobox>
      {isTouch && <Error error={error} />}
    </div>
  );
}

export default MobileInput;
