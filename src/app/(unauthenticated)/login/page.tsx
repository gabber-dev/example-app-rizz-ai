import { GoogleSignInButton } from "@/components/GoogleSigninButton";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        <GoogleSignInButton text="Sign-in or Sign-up" />
      </div>
    </>
  );
}
