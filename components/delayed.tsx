import React, { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  waitBeforeShow?: number;
  className?: string;
};

const Delayed = ({ children, waitBeforeShow = 500, className = "" }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? <div className={` ${className}`}>{children}</div> : null;
};

export default Delayed;
