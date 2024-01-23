import React, { useRef, useEffect } from "react";
import { useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const Selfie = ({ selfie, setSelfie }) => {
  const webcamRef = useRef(null);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelfie(imageSrc);
  }, [webcamRef]);

  const reset = () => {
    setSelfie("");
  };

  const onUserMedia = (e) => {
    //console.log(e);
  };

  return (
    <div className="p-2 rounded-md">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
        onUserMedia={onUserMedia}
        style={{
          borderRadius: 10,
        }}
      />
      <div className="absolute md:top-[310px] md:left-[860px] md:w-[140px] w-20 left-[40px] top-[210px] rounded-lg">
        <img className="rounded-lg" src={selfie} alt="" />
      </div>
      <div className="mt-5 flex gap-5">
        <button
          className=" text-white bg-black text-sm font-bold px-3 py-2.5 rounded-md"
          type="button"
          onClick={capturePhoto}
        >
          Capture
        </button>
        {selfie && (
          <button
            className=" text-white outline bg-orange-400  px-3 py-2.5 text-sm font-bold rounded-md"
            type="button"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Selfie;
