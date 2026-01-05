import React, { useState } from "react";

interface BudibaseEmbedProps {
  appUrl: string;
}

const BudibaseEmbed: React.FC<BudibaseEmbedProps> = ({ appUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex h-screen w-full flex-col items-center">
      {isLoading && <p>Loading Form...</p>}

      <iframe
        src={appUrl}
        className="h-full w-full border-none"
        onLoad={() => setIsLoading(false)}
        title="Budibase Form"
        allow="camera; microphone; geolocation"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
};

export default BudibaseEmbed;
