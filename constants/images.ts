import { Image } from "react-native";
import success from "@/assets/images/success.png";
import warning from "@/assets/images/warning.png";
import error from "@/assets/images/error.png";

export const successImage = Image.resolveAssetSource(success).uri
export const warningImage = Image.resolveAssetSource(warning).uri;
export const errorImage = Image.resolveAssetSource(error).uri;