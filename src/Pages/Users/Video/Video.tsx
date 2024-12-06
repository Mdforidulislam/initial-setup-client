import  { useState } from 'react';

export default function Video() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [convertedLinks, setConvertedLinks] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState<string>('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert the video to a link (placeholder logic for conversion)
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      // Add the link to the list of converted links
      setConvertedLinks((prevLinks) => [...prevLinks, url]);
    }
  };

  const handleConvertLink = () => {
    // Logic to convert and store the video link can be implemented here
    console.log("Convert link logic would go here");
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopyMessage('Link copied successfully!');
    setTimeout(() => {
      setCopyMessage('');
    }, 2000); // Clear the message after 2 seconds
  };

  
  return (
    <div className="h-full bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 flex flex-col">
        {/* Video Preview Section */}
        <div className="flex-1 mb-6">
          {videoUrl ? (
            <video
              className="w-full rounded-lg"
              controls
              src={videoUrl}
            />
          ) : (
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg">
              <span className="text-gray-500">No video uploaded</span>
            </div>
          )}
        </div>

        {/* Upload Video Section */}
        <div className="flex flex-col space-y-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleUpload}
            className="w-full py-2 border rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleConvertLink}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Convert Video Link
          </button>
        </div>

        {/* Converted Links Section */}
        {convertedLinks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Converted Links:</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <ul className="space-y-2">
                {convertedLinks.map((link, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition">
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline truncate"
                    >
                      {link}
                    </a>
                    <button 
                      onClick={() => handleCopy(link)} 
                      className="text-gray-500 hover:text-blue-600"
                      title="Copy Link"
                    >
                      Copy
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Copy Confirmation Message */}
        {copyMessage && (
          <div className="mt-4 text-green-600 font-semibold">
            {copyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
