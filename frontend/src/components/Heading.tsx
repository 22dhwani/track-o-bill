const Heading = (props: {
  variant?: string;
  text: React.ReactNode;
  headingclassname?: string;
}) => {
  switch (props.variant) {
    case "bigTitle":
      return (
        <h1
          className={`text-2xl tracking-wide lg:text-2xl font-bold   ${props.headingclassname} `}
          {...props}
        >
          {props.text}
        </h1>
      );
    case "headingTitle":
      return (
        <h3
          className={`text-xl  tracking-wide font-bold   ${props.headingclassname} `}
          {...props}
        >
          {props.text}
        </h3>
      );
    case "subTitle":
      return (
        <h4
          className={`text-lg  tracking-wide font-semibold  ${props.headingclassname}  `}
          {...props}
        >
          {props.text}
        </h4>
      );
    case "subHeader":
      return (
        <h5
          className={`text-base  tracking-wide font-semibold   ${props.headingclassname} `}
          {...props}
        >
          {props.text}
        </h5>
      );
    case "smallTitle":
      return (
        <h5
          className={`text-sm  tracking-wide  font-normal  ${props.headingclassname} `}
          {...props}
        >
          {props.text}
        </h5>
      );

    default:
      return <p {...props}>{props.text}</p>;
  }
};

export default Heading;
