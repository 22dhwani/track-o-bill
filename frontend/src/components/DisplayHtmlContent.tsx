import DOMPurify from "dompurify";
import "../../styles/CKEditor.css";

function DisplayHTMLContent({ htmlContent }: { htmlContent: any }) {
  const trustedHTML = { __html: DOMPurify.sanitize(htmlContent) };
  // console.log(trustedHTML);
  return <div className="" dangerouslySetInnerHTML={trustedHTML} />;
}

export default DisplayHTMLContent;
