import React, { useEffect } from "react";

const TelegramChat = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src = "https://cdn.commoninja.com/sdk/latest/commonninja.js";
    script.defer = true;
    document.body.appendChild(script);

    // Clean up script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="commonninja_component pid-fb2a69ea-262c-4c09-9763-ea8ac56d9326"></div>
  );
};

export default TelegramChat;
