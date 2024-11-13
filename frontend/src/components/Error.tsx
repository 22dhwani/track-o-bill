import Heading from "./Heading";

function Error(props: { error: string; className?: string }) {
  return (
    <div className={props.className}>
      <Heading
        headingclassname="text-red-600 my-0 font-semibold"
        variant="smallTitle"
        text={props.error}
      />
    </div>
  );
}

export default Error;
