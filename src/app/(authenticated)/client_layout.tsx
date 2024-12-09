"use client";

import { AuthenticatedHeader } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ReactModal from "react-modal";
import { PaywallPopup } from "@/components/PaywallPopup";
import { useAppState } from "@/components/AppStateProvider";
import { SignupWallPopup } from "@/components/SignupWallPopup";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { showPaywall, setShowPaywall, showSignupWall, setShowSignupWall } =
    useAppState();
  return (
    <>
      <Toaster />
      <ReactModal
        isOpen={showPaywall !== null}
        onRequestClose={() => {
          setShowPaywall(null);
        }}
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-lg bg-blur flex justify-center items-center"
        className="w-3/4 h-1/2 max-h-[500px] max-w-[600px] bg-white rounded-lg shadow-lg outline-none"
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-full h-full flex justify-center items-center">
          <PaywallPopup />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={showSignupWall}
        onRequestClose={() => {
          setShowSignupWall(false);
        }}
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-lg bg-blur flex justify-center items-center"
        className="w-3/4 h-1/2 max-h-[500px] max-w-[600px] bg-white rounded-lg shadow-lg outline-none"
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-full h-full flex justify-center items-center">
          <SignupWallPopup />
        </div>
      </ReactModal>
      <div className="fixed flex justify-center top-0 left-0 right-0 h-[50px] z-[10]">
        <div className="w-full bg-neutral">
          <AuthenticatedHeader />
        </div>
      </div>

      <div className="fixed flex justify-center top-[62px] left-[8px] right-[8px] bottom-[58px]">
        {children}
      </div>
      <div className="fixed flex justify-center bottom-0 left-0 right-0 h-[50px] z-[10]">
        <div className="w-full bg-neutral">
          <Footer />
        </div>
      </div>
    </>
  );
}
