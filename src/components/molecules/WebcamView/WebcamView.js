import { useEffect } from 'react';
import styles from './WebcamView.module.css';

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

  return <video ref={videoRef} autoPlay className={styles.video}></video>;
};

export default WebcamView;
