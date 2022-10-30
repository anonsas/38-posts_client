import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ReactPortal({ children, portalId }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  function createPortalWrapper(portalId) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', portalId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  useLayoutEffect(() => {
    let element = document.getElementById(portalId);
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
