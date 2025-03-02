import { useEffect } from 'react';

const WebcamView = ({ videoRef }) => {
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error('Error accessing webcam: ', err));
    }
  }, [videoRef]);

  return <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }}></video>;
};

export default WebcamView;
