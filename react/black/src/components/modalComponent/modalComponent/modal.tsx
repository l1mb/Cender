import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Background from "../modalBackground/background";
import Content from "../modalContent/content";

const portalDiv = document.getElementById("portal-root") as HTMLElement;

const Modal: React.FC<{ isOpen: boolean; setOpen: (e: boolean) => void }> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.isOpen) return;

    function listener(evt: MouseEvent) {
      if (contentRef.current) {
        if (contentRef?.current?.contains(evt.target as Node)) return;
      }

      props.setOpen(false);
    }

    window.addEventListener("click", listener);

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener("click", listener);
  }, [props.isOpen]);

  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Background>
      <Content ref={contentRef}>{props.children}</Content>
    </Background>,
    portalDiv
  );
};

export default Modal;
