"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, type CSSProperties, type MouseEvent, type SyntheticEvent } from "react";
import { imageAt } from "@/lib/images";

const col = (extra: CSSProperties): CSSProperties => ({ display: "flex", flexWrap: "wrap", ...extra });

export default function ProjectMosaic() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Media lives in /public. If a file is ever missing it falls back to an
  // approved site image (poster for videos, swapped src for images).
  const fallbackFor = (src: string) => imageAt(Array.from(src).reduce((a, c) => a + c.charCodeAt(0), 0));

  const videoProps = (src: string) => ({
    className: "advideo",
    muted: true,
    loop: true,
    playsInline: true,
    preload: "metadata" as const,
    style: { width: "100%", height: "100%", objectFit: "cover" as const },
    src,
    onError: (e: SyntheticEvent<HTMLVideoElement>) => {
      e.currentTarget.poster = fallbackFor(src);
    },
    onMouseEnter: (e: MouseEvent<HTMLVideoElement>) => void e.currentTarget.play().catch(() => {}),
    onMouseLeave: (e: MouseEvent<HTMLVideoElement>) => e.currentTarget.pause(),
    onClick: () => setVideoSrc(src),
  });

  const imgProps = (src: string, style?: CSSProperties) => ({
    className: "project_img",
    src,
    style: { width: "100%", height: "100%", objectFit: "cover" as const, ...style },
    alt: "",
    // the request can fail before hydration, so also check on mount
    ref: (el: HTMLImageElement | null) => {
      if (el && el.complete && el.naturalWidth === 0) el.src = fallbackFor(src);
    },
    onError: (e: SyntheticEvent<HTMLImageElement>) => {
      const fb = fallbackFor(src);
      if (!e.currentTarget.src.endsWith(fb)) e.currentTarget.src = fb;
    },
    onClick: (e: MouseEvent<HTMLImageElement>) => setImageSrc(e.currentTarget.src),
  });

  return (
    <>
      {videoSrc && (
        <section className="ad_video_full">
          <div className="lightbox_bar">
            <span className="video_close_btn" style={{ cursor: "pointer" }} onClick={() => setVideoSrc(null)}>
              X
            </span>
          </div>
          <div className="col-6">
            <video controls autoPlay style={{ height: "100%", width: "100%" }} src={videoSrc}></video>
          </div>
        </section>
      )}
      {imageSrc && (
        <section className="p_img" onClick={() => setImageSrc(null)}>
          <div className="lightbox_bar">
            <span className="img_close_btn" style={{ cursor: "pointer" }}>
              X
            </span>
          </div>
          <div className="col-6">
            <img style={{ width: "100%" }} src={imageSrc} alt="" />
          </div>
        </section>
      )}

      <section className="project_mosaic">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span className="project_vspan">
            <span style={col({ width: "100%", height: "20%" })}>
              <span style={col({ width: "30%", height: "100%", flexDirection: "column" })}>
                <span className="sectors-images sectors-accent-yellow" style={{ width: "100%", height: "44%" }}></span>
                <span className="sectors-images ad-video-play" style={{ width: "100%", height: "56%" }}>
                  <video {...videoProps("/Nerolac (1).mov")}></video>
                </span>
              </span>
              <span className="sectors-images" style={{ width: "26%", height: "100%" }}>
                <img {...imgProps("/P2.JPG")} />
              </span>
              <span className="sectors-images" style={{ width: "44%", height: "100%" }}>
                <video {...videoProps("/Saino.mov")}></video>
              </span>
            </span>
            <span style={col({ width: "100%", height: "40%" })}>
              <span style={col({ width: "70%", height: "100%", flexDirection: "column" })}>
                <span style={col({ width: "100%", height: "50%" })}>
                  <span className="sectors-images" style={{ width: "59%", height: "100%" }}>
                    <video {...videoProps("/Patanjali.mov")}></video>
                  </span>
                  <span className="sectors-images" style={{ width: "41%", height: "100%" }}>
                    <img {...imgProps("/P1.JPG")} />
                  </span>
                </span>
                <span style={col({ width: "100%", height: "50%" })}>
                  <span className="sectors-images" style={{ width: "21%", height: "100%" }}>
                    <img {...imgProps("/IMG_8525.JPG")} />
                  </span>
                  <span className="sectors-images" style={{ width: "79%", height: "100%" }}>
                    <video {...videoProps("/Laxman Rekha.mov")}></video>
                  </span>
                </span>
              </span>
              <span style={col({ width: "30%", height: "100%", flexDirection: "column" })}>
                <span className="sectors-images" style={{ width: "100%", height: "28%" }}>
                  <video {...videoProps("/Woodland.mov")}></video>
                </span>
                <span className="sectors-images" style={{ width: "100%", height: "36%" }}>
                  <video {...videoProps("/Sony Vaio (1).mov")}></video>
                </span>
                <span className="sectors-images" style={{ width: "100%", height: "36%" }}>
                  <img {...imgProps("/art work.jpg")} />
                </span>
              </span>
            </span>
            <span style={col({ width: "100%", height: "20%" })}>
              <span className="sectors-images" style={{ width: "55%", height: "100%" }}>
                <video {...videoProps("/Road Safety.mov")}></video>
              </span>
              <span style={col({ width: "45%", height: "100%" })}>
                <span style={col({ width: "67%", height: "100%", flexDirection: "column" })}>
                  <span className="sectors-images" style={col({ width: "100%", height: "64%" })}>
                    <video {...videoProps("/DOMs Stationary (1).mov")}></video>
                  </span>
                  <span className="sectors-images" style={col({ width: "45%", height: "36%" })}>
                    <img {...imgProps("/3.JPG")} />
                  </span>
                </span>
                <span className="sectors-images" style={{ width: "33%", height: "100%" }}>
                  <img {...imgProps("/1.JPG")} />
                </span>
              </span>
            </span>
            <span style={col({ width: "100%", height: "20%" })}>
              <span className="sectors-images" style={{ width: "35%", height: "100%" }}>
                <video {...videoProps("/Ajay Toothpaste.mov")}></video>
              </span>
              <span className="sectors-images" style={{ width: "41%", height: "100%" }}>
                <video {...videoProps("/Beti Bachao.mov")}></video>
              </span>
              <span style={col({ width: "24%", height: "100%", flexDirection: "column" })}>
                <span style={col({ width: "100%", height: "50%" })}>
                  <span className="sectors-images" style={{ width: "100%", height: "100%" }}>
                    <video {...videoProps("/Navneet Youva (1).mov")}></video>
                  </span>
                </span>
                <span className="sectors-images sectors-accent-black" style={{ width: "100%", height: "50%" }}></span>
              </span>
            </span>
          </span>
        </div>
      </section>
    </>
  );
}
