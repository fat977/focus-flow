import { Button } from "@/components/ui";
import { useSocialAuth } from "../hooks/useSocialAuth";

function SocialAuthBtns() {
  const { loginWithGoogle, loginWithGithub } = useSocialAuth();

  return (
    <div className="space-y-2 w-full py-2">
      <div className="relative flex py-5 items-center">
        <div className="grow border-t border-(--grey-300)"></div>
        <span className="shrink mx-4 text-(--grey-400) text-sm">
          Or continue with
        </span>
        <div className="grow border-t border-(--grey-300)"></div>
      </div>

      {/* Social Auth Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={loginWithGoogle}
          variant="google"
          fullWidth
          className="justify-center "
        >
          <img
            src="/form/social-media/google-icon.png"
            className="w-5 h-5"
            alt="google"
          />
          Google
        </Button>

        <Button
          onClick={loginWithGithub}
          variant="github"
          className="justify-center "
          fullWidth
        >
          <img
            src="/form/social-media/github-icon.png"
            className="w-5 h-5 invert"
            alt="github"
          />
          GitHub
        </Button>
      </div>
    </div>
  );
}

export default SocialAuthBtns;
