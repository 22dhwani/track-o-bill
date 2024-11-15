function Link(props: { className: string; link: string; text: string }) {
  return (
    <a href={props.link} className={props.className}>
      {props.text}
    </a>
  );
}

export default Link;
