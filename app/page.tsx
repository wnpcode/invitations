"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
// CustomBounce requires CustomEase
import { CustomBounce } from "gsap/CustomBounce";
// CustomWiggle requires CustomEase
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
);

export default function Home() {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // refs untuk animasi GSAP
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionIds = [
    "opening",
    "biodata",
    "waktu",
    "galeri",
    "ucapan",
    "terimakasih",
  ];

  const handleOpenInvitation = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (opened && sectionsRef.current.length > 0) {
      gsap.fromTo(
        "#menu",
        {
          autoAlpha: 0,
          y: 100,
        },
        {
          autoAlpha: 1,
          y: 0,
        }
      );
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true, // aktifkan data-speed
        });
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });
      // ScrollSpy - Highlight menu based on current section
      sectionIds.forEach((id, index) => {
        const sectionEl = document.getElementById(id);
        if (sectionEl) {
          ScrollTrigger.create({
            trigger: sectionEl,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
        }
      });
    }
  }, [opened]);

  return (
    <>
      {opened && (
        <nav
          id="menu"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-fit bg-white rounded-2xl shadow z-50 px-4 py-2 flex justify-center gap-4 text-sm font-semibold"
        >
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => {
                const el = document.getElementById(id);
                if (el) {
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: el, offsetY: 0 },
                    ease: "power2.out",
                  });
                }
              }}
              className={`${
                activeSection === id
                  ? "text-[#756863] text-md "
                  : "text-gray-400 text-sm"
              } transition`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
      )}

      <div id="smooth-wrapper">
        <div
          id="smooth-content"
          className="bg-[#FCFCFD] text-[#756863] font-serif"
        >
          {/* Background Music */}
          <audio ref={audioRef} loop>
            <source src="/music.mp3" type="audio/mpeg" />
          </audio>

          {/* Section 1 - Cover */}
          {!opened ? (
            <section className="h-screen flex flex-col justify-center items-center text-center p-6">
              <h1 className="text-xl mb-2">Kepada Yth.</h1>
              <h2 className="text-2xl font-bold">Bapak/Ibu/Saudara/i</h2>
              <p className="mt-4">Kami mengundang Anda ke pernikahan kami</p>
              <div className="mt-6">
                <img
                  src="https://i.ibb.co.com/6cd5Kwpm/image.png"
                  alt="Mempelai"
                  width={250}
                  height={250}
                  className="rounded-full shadow-lg"
                />
              </div>
              <h3 className="text-2xl mt-4 font-semibold">Aisyah & Warto</h3>
              <button
                onClick={handleOpenInvitation}
                className="mt-8 px-6 py-3 rounded-2xl bg-[#756863] text-white shadow-lg hover:scale-105 transition"
              >
                Buka Undangan
              </button>
            </section>
          ) : (
            <div>
              {/* Section 2 - Opening */}
              <section
                id="opening"
                ref={(el) => {
                  sectionsRef.current[0] = el;
                }}
                className="h-screen flex flex-col justify-center items-center text-center p-6"
              >
                <img
                  src="https://i.ibb.co.com/qFn029hh/couple.png"
                  alt="Pengantin"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-md"
                />
                <h2 className="text-3xl font-bold mt-6">Aisyah & Warto</h2>
                <p className="mt-2 text-lg">12 Desember 2025</p>
              </section>

              <section className="relative py-32 text-center px-6 overflow-hidden h-screen">
                <div
                  className="absolute inset-0 -z-10 bg-center bg-cover"
                  style={{
                    backgroundImage:
                      "url('https://i.ibb.co.com/xqm7LjbN/bg-biodata-resized.jpg')",
                  }}
                  data-speed="0.5"
                ></div>
              </section>
              {/* Section 3 - Biodata */}
              <section
                id="biodata"
                ref={(el) => {
                  sectionsRef.current[1] = el;
                }}
                className="py-16 text-center px-6 h-screen"
              >
                {/* <div
                className="absolute inset-0 -z-10 bg-center bg-cover"
                style={{
                  backgroundImage: "url('/bg-biodata.jpg')",
                }}
                data-speed="0.5"
              ></div> */}
                <h2 className="text-2xl font-bold mb-8">Biodata Pengantin</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <img
                      // src=""
                      src="https://i.ibb.co.com/0R2FffKy/mempelai-wanita-resized.jpg"
                      alt="Mempelai Wanita"
                      width={200}
                      height={200}
                      className="rounded-full mx-auto"
                    />
                    <h3 className="text-xl font-semibold mt-4">
                      Aisyah Nimas Adara
                    </h3>
                    <p>Putri dari Bapak Masrukin & Ibu Kurnia Ismiasih</p>
                  </div>
                  <div>
                    <img
                      // src=""
                      src="https://i.ibb.co.com/R4zMLJgP/mempelai-pria-resized.jpg"
                      alt="Mempelai Pria"
                      width={200}
                      height={200}
                      className="rounded-full mx-auto"
                    />
                    <h3 className="text-xl font-semibold mt-4">
                      Warto Nur Prasetyo
                    </h3>
                    <p>
                      Putra dari Bapak Suwarno (alm) & Ibu Prahesti Rahayu
                      Kartini
                    </p>
                  </div>
                </div>
                {/* Tambahan "Yang Berbahagia" */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6">
                    Yang Berbahagia
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    {/* Keluarga kiri */}
                    <div>
                      <p className="font-medium">Keluarga Bapak Masrukin</p>
                      <p className="font-medium">Ibu Murti</p>
                    </div>
                    {/* Keluarga tengah */}
                    <div>
                      <p className="font-medium">
                        Keluarga Bapak Suwarno (Alm)
                      </p>
                      <p className="font-medium">Ibu Prahesti Rahayu Kartini</p>
                    </div>
                    {/* Keluarga kanan */}
                    <div>
                      <p className="font-medium">Keluarga Bapak Tri</p>
                      <p className="font-medium">Ibu Kurnia Ismiasih</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 - Ayat Suci */}
              <section
                ref={(el) => {
                  sectionsRef.current[2] = el;
                }}
                className="py-16 text-center px-6 bg-[#756863] text-white"
              >
                <p className="italic max-w-2xl mx-auto">
                  “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
                  menciptakan untukmu pasangan-pasangan dari jenismu sendiri,
                  agar kamu merasa tenteram kepadanya, dan Dia menjadikan di
                  antaramu rasa kasih dan sayang.” (QS. Ar-Rum: 21)
                </p>
              </section>

              {/* Section 5 - Waktu & Tempat */}
              <section
                id="waktu"
                ref={(el) => {
                  sectionsRef.current[3] = el;
                }}
                className="py-16 text-center px-6 h-screen"
              >
                <h2 className="text-2xl font-bold mb-6">Waktu & Tempat</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold">Akad Nikah</h3>
                    <p>Minggu, 12 Desember 2025 • 09.00 WIB</p>
                    <p>Masjid Agung Al-Falah</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Resepsi</h3>
                    <p>Minggu, 12 Desember 2025 • 11.00 WIB</p>
                    <p>Gedung Serbaguna Harmony</p>
                  </div>
                </div>
              </section>

              {/* Section 6 - Timeline */}
              <section
                id="timeline"
                ref={(el) => {
                  sectionsRef.current[4] = el;
                }}
                className="py-16 text-center px-6 bg-[#f9f9fa]"
                style={{ backgroundImage: "url('/bg-timeline.jpg')" }}
              >
                <h2 className="text-2xl font-bold mb-8">Perjalanan Cinta</h2>
                <div className="space-y-4 max-w-xl mx-auto">
                  <p>2015 - Pertemuan pertama di kampus</p>
                  <p>2017 - Mulai menjalin hubungan</p>
                  <p>2023 - Lamaran</p>
                  <p>2025 - Hari Pernikahan</p>
                </div>
              </section>

              {/* Section 7 - Video & Gallery */}
              <section
                id="galeri"
                ref={(el) => {
                  sectionsRef.current[5] = el;
                }}
                className="py-16 text-center px-6 "
              >
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                >
                  <source src="/moment.mp4" type="video/mp4" />
                </video>
                <h2 className="text-2xl font-bold mt-8">Galeri Momen</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                  {[
                    {
                      src: "https://i.ibb.co.com/kzYVRx8/gallery1.jpg",
                      span: "row-span-2 col-span-2",
                    },
                    {
                      src: "https://i.ibb.co.com/fVM4XSwH/gallery2.jpg",
                      span: "row-span-1 col-span-1",
                    },
                    {
                      src: "https://i.ibb.co.com/PsdgjbCW/gallery3.jpg",
                      span: "row-span-2 col-span-1",
                    },
                    {
                      src: "https://i.ibb.co.com/hJWzskgQ/gallery4.jpg",
                      span: "row-span-1 col-span-2",
                    },
                    {
                      src: "https://i.ibb.co.com/0RqVm6N4/gallery5.jpg",
                      span: "row-span-1 col-span-1",
                    },
                    {
                      src: "https://i.ibb.co.com/V54Jd0k/gallery6.jpg",
                      span: "row-span-2 col-span-2",
                    },
                    {
                      src: "https://i.ibb.co.com/svR69pd9/gallery7.jpg",
                      span: "row-span-1 col-span-1",
                    },
                    {
                      src: "https://i.ibb.co.com/DHHr7q2Z/gallery8.jpg",
                      span: "row-span-1 col-span-1",
                    },
                  ].map((img, i) => (
                    <div
                      key={i}
                      className={`relative ${img.span} overflow-hidden rounded-xl`}
                    >
                      <img
                        src={img.src}
                        alt="Galeri"
                        className="w-full h-full hover:scale-105 transition-transform duration-500  object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
                <blockquote className="italic mt-8">
                  "Cinta sejati bukan hanya saling memandang, tetapi melihat
                  bersama ke arah yang sama."
                </blockquote>
              </section>

              {/* Section 8 - Doa & Ucapan */}
              <section
                id="ucapan"
                ref={(el) => {
                  sectionsRef.current[6] = el;
                }}
                className="py-16 text-center px-6 bg-[#756863] text-white "
              >
                <h2 className="text-2xl font-bold mb-6">Doa & Ucapan</h2>
                <p>Silakan tinggalkan doa dan ucapan terbaik untuk pengantin</p>
                <textarea
                  className="w-full md:w-1/2 p-3 rounded-lg mt-6 text-black"
                  placeholder="Tulis doa & ucapan..."
                />
                <button className="mt-4 px-6 py-2 bg-white text-[#756863] rounded-lg shadow">
                  Kirim
                </button>
              </section>

              {/* Section 9 - Hadiah */}
              <section
                id="gift"
                ref={(el) => {
                  sectionsRef.current[7] = el;
                }}
                className="py-16 text-center px-6 h-screen"
              >
                <h2 className="text-2xl font-bold mb-6">Hadiah & E-Amplop</h2>
                <p className="mb-4">
                  Jika berkenan memberikan hadiah, silakan transfer ke rekening:
                </p>
                <p className="font-semibold">BCA 123456789 a.n Aisyah</p>
                <button className="mt-6 px-6 py-2 bg-[#756863] text-white rounded-lg shadow">
                  Salin Rekening
                </button>
              </section>

              {/* Section 10 - Terimakasih */}
              <section
                id="terimakasih"
                ref={(el) => {
                  sectionsRef.current[8] = el;
                }}
                className="py-16 text-center px-6 bg-[#756863] text-white h-96"
              >
                <h2 className="text-2xl font-bold">Terima Kasih</h2>
                <p className="mt-4">
                  Kehadiran dan doa restu Anda merupakan hadiah terindah bagi
                  kami
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
