"use client"
import Image from 'next/image'
import { compareAsc, format } from "date-fns";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
export default function Home() {
  const images = [
    { url: "https://picsum.photos/seed/a/1600/900" },
    { url: "https://picsum.photos/seed/b/1920/1080" },
    { url: "https://picsum.photos/seed/c/1366/768" },
  ];

  return (
    <main className="">
      <Slide autoplay={true}
        infinite
        duration={900}

      >
        <div className="each-slide-effect">
          <div>
            <img
              style={{
                width: '100%',
                height: '100vh'
              }}
              // width={500}
              // height={500}
              alt='2'
              src='https://fastly.picsum.photos/id/894/1600/900.jpg?hmac=M_pAIVIjnPfXgiUeQMr3E1sctWFWjHexWE98lslWn0A'
            />
          </div>
        </div>
        <div className="each-slide-effect">
          <div>
            <img
              style={{
                width: '100%',
                height: '100vh'
              }}
              alt='1'
              src="https://fastly.picsum.photos/id/546/1920/1080.jpg?hmac=KyEhbNzKKi8gaqjpiub5xUSwPPIMgrXog1gAB2c45t8" />
          </div>
        </div>
        <div className="each-slide-effect">
          <div>
            <img
              style={{
                width: '100%',
                height: '100vh'
              }}
              src="https://fastly.picsum.photos/id/896/1366/768.jpg?hmac=Xr3JBTrmVVs46j3AAFTZ508458uqzp-9la7MsPSbF6w" alt='2' />
          </div>
        </div>
      </Slide>
    </main>
  )
}
