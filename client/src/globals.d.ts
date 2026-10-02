declare module "*.css";
declare module "*.jpg";
declare module "*.png";

interface Window {
  __chatStartupReady?: () => void;
  __chatStartupFail?: (reason: unknown) => void;
}
