import { SetStateAction, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

type ReactPortalProps = {
  children: any;
  portalId: string;
};

function ReactPortal({ children, portalId }: ReactPortalProps) {
  // cannot find solution for <setStateAction<any>>
  const [wrapperElement, setWrapperElement] =
    useState<SetStateAction<HTMLElement | DocumentFragment | any>>(null);

  function createPortalWrapper(portalId: string) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", portalId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  useLayoutEffect(() => {
    let element = document.getElementById(portalId) as HTMLElement | DocumentFragment;
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createPortalWrapper(portalId);
    }
    setWrapperElement(element);
    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [portalId]);
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
