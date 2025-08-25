"use client";

import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import AccordionSection from "@/components/AccordionSection";
import {
  faCopy,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faGift,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";
import "./gift.css";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  ScrollSmoother,
  TextPlugin,
  CustomEase
);

export default function Home() {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionIds = ["opening", "biodata", "waktu", "galeri", "ucapan"];
  const banks = [
    {
      number: "0123456789",
      name: "Nama Penerima",
      src: "bca.png",
      alt: "BCA",
    },
    {
      number: "0123456789",
      name: "Nama Penerima",
      src: "gopay.svg",
      alt: "GOPAY",
    },
  ];
  const galeries = [
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
  ];
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleOpenInvitation = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };
  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      setIsFullscreen(true);
      elem.requestFullscreen?.().catch((err) => {
        setIsFullscreen(false);
        console.warn("Fullscreen gagal:", err);
      });
    } else {
      setIsFullscreen(false);
      document.exitFullscreen?.();
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

  useEffect(() => {
    if (!opened) return;
    const handleVisibilityChange = () => {
      if (!document.hidden && audioRef.current && !isPlaying) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else if (
        document.hidden &&
        audioRef.current &&
        !audioRef.current.paused
      ) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);
  const [active, setActive] = useState<string | null>(null);

  const sectionsGiftRef = {
    eAmplop: useRef<HTMLDivElement>(null),
    giftRegistry: useRef<HTMLDivElement>(null),
  };
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    Object.values(sectionsGiftRef).forEach((ref) => {
      if (ref.current) {
        ref.current.style.display = "none";
        ref.current.style.overflow = "hidden";
      }
    });
  }, []);

  return (
    <>
      {opened && (
        <>
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
                      scrollTo: { y: el, offsetY: 20 },
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
          <div className="fixed bottom-4 left-4 z-50 flex flex-col items-center gap-2">
            <button
              onClick={toggleAudio}
              className=" bg-white text-[#756863] p-2 size-10 rounded-full shadow-lg hover:scale-105 transition"
              aria-label="Kontrol Musik"
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={faPauseCircle}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="bg-white text-[#756863] p-2 size-10 rounded-full shadow-lg hover:scale-105 transition"
              aria-label="Fullscreen"
            >
              {isFullscreen ? (
                <FontAwesomeIcon icon={faCompressArrowsAlt}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faExpandArrowsAlt}></FontAwesomeIcon>
              )}
            </button>
          </div>
        </>
      )}

      <div id="smooth-wrapper">
        <div
          id="smooth-content"
          className="bg-[#FCFCFD] text-[#756863] font-serif"
        >
          {/* Background Music */}
          <audio ref={audioRef} loop>
            <source
              src="/Juicy Luicy  - Lagu Nikah (Official Lyric Video).mp3"
              type="audio/mpeg"
            />
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

              <section className="relative py-32 text-center px-6 overflow-hidden min-h-screen">
                <div
                  className="absolute inset-0 bg-center bg-cover"
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
                className="py-16 text-center px-6 min-h-screen"
              >
                {/* <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: "url('/bg-biodata.jpg')",
                }}
                data-speed="0.5"
              ></div> */}
                <h2 className="text-2xl font-bold mb-8">Biodata Pengantin</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <img
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
                    <div>
                      <p className="font-medium">Keluarga Bapak Masrukin</p>
                      <p className="font-medium">Ibu Murti</p>
                    </div>
                    <div>
                      <p className="font-medium">
                        Keluarga Bapak Suwarno (Alm)
                      </p>
                      <p className="font-medium">Ibu Prahesti Rahayu Kartini</p>
                    </div>
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
                className="py-16 text-center px-6 min-h-screen"
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

              <section className="relative py-32 text-center px-6 overflow-hidden min-h-screen">
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{
                    backgroundImage:
                      "url('https://i.ibb.co.com/Mxm3Z5Vx/bg-pengantin-resized.jpg')",
                  }}
                  data-speed="0.5"
                ></div>
              </section>
              {/* Section 6 - Timeline */}
              <section
                id="timeline"
                ref={(el) => {
                  sectionsRef.current[4] = el;
                }}
                className="py-16 text-center px-6 bg-[#f9f9fa]"
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
                  {/* <source src="/moment.mp4" type="video/mp4" /> */}
                </video>
                <h2 className="text-2xl font-bold mt-8">Galeri Momen</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                  {galeries.map((img, i) => (
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
                <h3 className="text-xl font-bold mb-6">Doa & Ucapan</h3>
                <h2 className="text-2xl font-bold mb-6">Teruntuk Mempelai</h2>
                <p>
                  Sapa dan kirim ucapan beserta doa yang terbaik untuk mereka
                  yang berbahagia, sembari mengkonfirmasi kehadiran anda pada
                  acara pernikahan kedua mempelai.
                </p>
                {/* Form */}
                <div className="max-w-2xl mx-auto text-left space-y-4 mb-8">
                  <input
                    type="text"
                    placeholder="Nama"
                    className="w-full p-3 border-b border-[#aaa] bg-transparent focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    placeholder="Ucapan"
                    className="w-full p-3 border-b border-[#aaa] bg-transparent focus:outline-none"
                  ></textarea>
                  <select
                    className="w-full p-3 border-b border-[#aaa] bg-transparent focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Konfirmasi Kehadiran
                    </option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak">Tidak Hadir</option>
                  </select>
                  <div className="text-right">
                    <button className="bg-[#756863] text-white px-6 py-2 rounded shadow">
                      Kirim
                    </button>
                  </div>
                </div>
                {/* Statistik */}
                <div className="max-w-md mx-auto flex justify-center gap-6 mb-8">
                  <div className="border p-4 rounded text-center">
                    <p className="text-2xl font-bold">8</p>
                    <p>Hadir</p>
                  </div>
                  <div className="border p-4 rounded text-center">
                    <p className="text-2xl font-bold  ">0</p>
                    <p>Tidak Hadir</p>
                  </div>
                </div>
                {/* Daftar Komentar */}
                <div className="max-w-2xl mx-auto space-y-6 text-left">
                  {[
                    {
                      name: "Test",
                      message: "Selamat ya!",
                      date: "9 bulan, 2 minggu lalu",
                    },
                    {
                      name: "Airin",
                      message: "Selamat ya ❤️",
                      date: "11 bulan, 3 minggu lalu",
                    },
                    {
                      name: "Coba",
                      message: "Selamat yaaa",
                      date: "12 bulan lalu",
                    },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="font-semibold flex items-center gap-1">
                        {item.name} <span className="text-green-500">✔</span>
                      </p>
                      <p>{item.message}</p>
                      <p className="text-sm text-gray-200 mt-1 flex items-center gap-1">
                        <span>🕒</span>
                        {item.date}
                        <span className="mx-2">•</span>
                        <button className="underline text-sm cursor-pointer">
                          Reply
                        </button>
                      </p>
                    </div>
                  ))}
                </div>
                <blockquote className="italic max-w-2xl mx-auto font-thin text-md leading-relaxed mt-10">
                  “Semoga Allah memberkahimu dan memberkahi apa yang menjadi
                  tanggung jawabmu, serta menyatukan kalian berdua dalam
                  kebaikan.”
                </blockquote>
                <p className="mt-4 font-bold">
                  (HR. Ahmad, at-Tirmidzi, an-Nasa’i, Abu Dawud, dan Ibnu Majah)
                </p>
              </section>

              {/* Section 9 - Hadiah */}
              <section
                id="gift"
                ref={(el) => {
                  sectionsRef.current[7] = el;
                }}
                className="py-16 text-center px-6 min-h-screen"
              >
                <div className="m-auto max-w-xl w-full bg-[#fcfcfd] text-[#4b4039] rounded-md overflow-hidden shadow-xl">
                  <img
                    src="https://i.ibb.co.com/xqm7LjbN/bg-biodata-resized.jpg" // Ubah ke nama file kamu
                    alt="Pasangan"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h2 className="text-3xl font-serif font-semibold mb-4">
                      Hadiah Pernikahan
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed mb-6">
                      Doa Restu Anda merupakan karunia yang sangat berarti bagi
                      kami. Namun jika memberi adalah ungkapan tanda kasih Anda,
                      kami akan senang hati menerimanya yang tentu akan semakin
                      melengkapi kebahagiaan kami.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                      <button
                        onClick={() => toggleSection("e-amplop")}
                        className="w-fit px-6 py-3 bg-[#756863] text-white font-semibold rounded-lg shadow hover:scale-105 transition mb-2"
                      >
                        E-Amplop
                      </button>
                      <button
                        onClick={() => toggleSection("gift-registry")}
                        className="w-fit px-6 py-3 bg-[#756863] text-white font-semibold rounded-lg shadow hover:scale-105 transition mb-2"
                      >
                        Gift Registry
                      </button>
                      <AccordionSection isOpen={openSection === "e-amplop"}>
                        <div id="bank-cards" className="bank-cards ">
                          {banks.map((item) => (
                            <div key={`bank-${item.src}`} className="bank-card">
                              <img
                                src={`/${item.src}`}
                                className="bank-logo"
                                alt={item.alt}
                              ></img>
                              <p className="card-number">{item.number}</p>
                              <p className="card-name">{item.name}</p>
                              <button className="copy-btn">
                                <FontAwesomeIcon
                                  icon={faCopy}
                                ></FontAwesomeIcon>{" "}
                                Salin
                              </button>
                            </div>
                          ))}
                        </div>

                        <div
                          id="gift-address"
                          className="gift-address text-white"
                        >
                          <h3>KIRIM KADO</h3>
                          <p>
                            Jl. Lorem Ipsum No. 01, RT01 RW01, Kel. Dolor, Kec.
                            Sit Amet, Kota Bandung
                          </p>
                          <button className="copy-btn">
                            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>{" "}
                            SALIN
                          </button>
                        </div>

                        <div className="gift-confirmation">
                          <h3>Konfirmasi Kirim Hadiah</h3>
                          <form>
                            <input
                              type="text"
                              name="name"
                              placeholder="Tuliskan Nama Anda"
                              required
                            />
                            <input
                              type="text"
                              name="amount"
                              placeholder="Nominal/Kado"
                              required
                            />
                            <select name="destination" required>
                              <option value="">Rekening/Alamat Tujuan</option>
                              <option value="BCA - 0123456789">
                                BCA - 0123456789
                              </option>
                              <option value="Gopay - 0123456789">
                                Gopay - 0123456789
                              </option>
                              <option value="Alamat Rumah">Alamat Rumah</option>
                            </select>
                            <button type="submit" className="btn">
                              Konfirmasi via WhatsApp
                            </button>
                          </form>
                        </div>
                      </AccordionSection>
                      <AccordionSection
                        isOpen={openSection === "gift-registry"}
                      >
                        <div className="gift-address-card">
                          <div className="icon">
                            <FontAwesomeIcon icon={faGift}></FontAwesomeIcon>
                          </div>
                          <div className="details">
                            <div className="name">Nama Penerima</div>
                            <div className="address">
                              Jl. Lorem Ipsum No. 21, Kel. Dolor, Kec. Sit Amet,
                              Kota Bandung, 40XXX
                            </div>
                          </div>
                          <button className="btn-copy">
                            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>{" "}
                            Salin
                          </button>
                        </div>

                        <div className="gift-suggestions  text-white">
                          <h3>REKOMENDASI KADO</h3>
                          <div className="gift-carousel">
                            <div className="gift-item">
                              <img
                                src="https://attarivitation.com/wp-content/uploads/2025/06/09faff98-f96e-498f-be58-da01f0919d2c.webp"
                                alt="Debellin Cookware Set"
                              ></img>
                              <p className="title">Debellin Cookware Set</p>
                              <p className="price">Rp 899.000</p>
                              <p className="amount">Amount : 1</p>
                            </div>
                            <div className="gift-item">
                              <img
                                src="https://attarivitation.com/wp-content/uploads/2025/06/09faff98-f96e-498f-be58-da01f0919d2c.webp"
                                alt="Sprei Bedcover"
                              ></img>
                              <p className="title">Sprei Bedcover</p>
                              <p className="price">Rp 379.000</p>
                              <p className="amount">Amount : 1</p>
                            </div>
                            <div className="gift-item">
                              <img
                                src="https://attarivitation.com/wp-content/uploads/2025/06/09faff98-f96e-498f-be58-da01f0919d2c.webp"
                                alt="Vacuum Cleaner"
                              ></img>
                              <p className="title">Vacuum Cleaner</p>
                              <p className="price">Rp 99.500</p>
                              <p className="amount">Amount : 1</p>
                            </div>
                          </div>
                          <button className="btn view-all">
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>{" "}
                            Lihat Semua Kado
                          </button>
                        </div>
                      </AccordionSection>
                    </div>
                  </div>
                </div>
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
