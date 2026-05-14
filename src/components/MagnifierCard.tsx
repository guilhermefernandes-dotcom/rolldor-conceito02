import whatsappScreen from "@/assets/whatsapp-vip-screen.png";
import iphoneMockup from "@/assets/iphone-mockup.png";

/**
 * Bento V6 — animated magnifier card.
 * Original snippet: HFMEDIA "fpbentov6". Adapted to use:
 *  - WhatsApp screenshot as the phone screen
 *  - Generated iPhone mockup PNG as the device frame
 *  - Soft radial-gradient as the background "light" (replaces missing asset)
 */
export function MagnifierCard() {
  return (
    <>
      <div className="fpbentov6">
        <div className="contentfpbentov6">
          <h2 className="headfpbentov6">Your bento needs this</h2>
          <p className="descriptionfpbentov6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div className="content2fpbentov6">
          <div className="content2fpbentov6inside">
            <img className="mockupv6" src={iphoneMockup} alt="" />
          </div>
        </div>
        <div className="dot1xbzxfz6"></div>
        <div className="dot2xbzxfz6"></div>
        <div className="dot3xbzxfz6"></div>
        <div className="dot4xbzxfz6"></div>
      </div>

      <style>{`
        :root{
          --bentov6light: radial-gradient(ellipse at center, #ffffff 0%, #e8ecff 40%, #d2d9ff 100%);
          --bentov6screen: url("${whatsappScreen}") center center/cover no-repeat;
          --bentov6borderradius: 40px;
          --bentov6background: #d2d9ff;
          --bentov6border: 2px solid #ffffff;
          --bentov6fonthead: "Questrial", sans-serif;
          --bentov6colorhead: #262331;
          --bentov6fontdescription: "Inter Tight", sans-serif;
          --bentov6colordescription: #757f9e;
          --bentov6dotsbackground: #bbc2f0;
          --bentov6dotsborder: 2px solid #828cd1;
          --bentov6lightcolor: hue-rotate(0deg) saturate(1) brightness(1);
          --bentov6lightcolorhover: hue-rotate(0deg) saturate(5) brightness(1.1) blur(20px);
        }

        .content2fpbentov6::before{
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 100%;
          width: 180px;
          height: 180px;
          background: var(--bentov6screen);
          background-size: 900px;
          background-repeat: no-repeat;
          animation: 4s ease lupa infinite;
          filter: drop-shadow(0px 30px 20px #000);
          z-index: 9;
          transition: 0.5s;
        }

        @media(max-width: 1024px){
          .content2fpbentov6::before{
            width: 150px;
            height: 150px;
            background-size: 800px;
          }
        }

        @keyframes lupa{
          0%{transform:translate(-105%,-50%);background-position:left -600px;}
          50%{transform:translate(5%,-50%);background-position:right -600px;}
          100%{transform:translate(-105%,-50%);background-position:left -600px;}
        }

        .content2fpbentov6inside{
          padding: 0;
          display: flex;
          justify-content: center;
          position: relative;
          top: 15px;
          transform-origin: bottom;
          transition: transform 1s;
        }
        .fpbentov6:hover .content2fpbentov6inside{
          transform: scale(1.2);
        }
        .fpbentov6:hover .content2fpbentov6::before{
          opacity: 0;
        }
        .fpbentov6:hover .contentfpbentov6{
          opacity: 0;
          filter: blur(20px);
        }
        .mockupv6{
          width: 430px;
          z-index: 2;
          filter: saturate(1) contrast(1) hue-rotate(20deg);
        }
        .content2fpbentov6inside:before{
          content: "";
          position: absolute;
          top: 33px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bentov6screen);
          background-size: cover;
          background-position: top center;
          border-radius: 46px;
          width: 270px;
          height: 560px;
          z-index: 1;
        }

        .fpbentov6:before{
          content: "";
          position: absolute;
          width: 110%;
          height: 105%;
          background: var(--bentov6light);
          filter: var(--bentov6lightcolor);
          top: 0;
          z-index: 1;
          transition: 1s;
          transform-origin: bottom;
          will-change: filter;
        }
        .fpbentov6:hover:before{
          filter: var(--bentov6lightcolorhover);
          transform: scaley(1.6);
        }

        .headfpbentov6{
          color: var(--bentov6colorhead);
          font-family: var(--bentov6fonthead);
          font-size: 26px;
          line-height: 1.2em;
          text-align: center;
          font-weight: 600;
          margin: 0;
          word-break: break-word;
        }
        .descriptionfpbentov6{
          color: var(--bentov6colordescription);
          font-family: var(--bentov6fontdescription);
          font-size: 16px;
          line-height: 1.2em;
          text-align: center;
          font-weight: 400;
          margin: 0;
          word-break: break-word;
        }

        .fpbentov6{
          width: 100%;
          height: 100%;
          min-height: 600px;
          background: var(--bentov6background);
          border: var(--bentov6border);
          border-radius: var(--bentov6borderradius);
          display: flex;
          flex-direction: column;
          gap: 0px;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          position: relative;
          white-space: normal;
          -webkit-tap-highlight-color: transparent;
          padding: 0px;
          overflow: hidden;
          user-select: none;
        }

        .contentfpbentov6{
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
          justify-content: center;
          align-items: center;
          padding: 10px 30px;
          padding-top: 60px;
          box-sizing: border-box;
          position: relative;
          white-space: normal;
          z-index: 15;
          transition: 2s;
        }

        .content2fpbentov6{
          width: 100%;
          gap: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
        }

        @media(max-width: 1024px){
          .headfpbentov6{ font-size: 26px; }
          .descriptionfpbentov6{ font-size: 16px; }
          .mockupv6{ width: 230px; z-index: 2; }
          .content2fpbentov6inside:before{
            top: 18px;
            border-radius: 24px;
            width: 144px;
            height: 300px;
          }
        }

        .dot1xbzxfz6{
          background: var(--bentov6dotsbackground);
          border: var(--bentov6dotsborder);
          height: 15px; width: 15px; border-radius: 50px;
          z-index: 2; position: absolute; top: 40px; left: 40px;
        }
        .dot2xbzxfz6{
          background: var(--bentov6dotsbackground);
          border: var(--bentov6dotsborder);
          height: 15px; width: 15px; border-radius: 50px;
          z-index: 2; position: absolute; top: 40px; right: 40px;
        }
        .dot3xbzxfz6{
          background: var(--bentov6dotsbackground);
          border: var(--bentov6dotsborder);
          height: 15px; width: 15px; border-radius: 50px;
          z-index: 2; position: absolute; bottom: 40px; right: 40px;
        }
        .dot4xbzxfz6{
          background: var(--bentov6dotsbackground);
          border: var(--bentov6dotsborder);
          height: 15px; width: 15px; border-radius: 50px;
          z-index: 2; position: absolute; bottom: 40px; left: 40px;
        }
      `}</style>
    </>
  );
}
