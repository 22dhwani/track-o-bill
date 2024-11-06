function Aboutcard(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-slate-300 shadow-sm rounded-md dark:bg-dimGray ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export default Aboutcard;
