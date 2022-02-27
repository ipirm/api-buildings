import { ImageInterface } from "./image.inteface";


export interface MetaInterface {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image: ImageInterface;
  twitter_title: string;
  twitter_description: string;
  twitter_image: ImageInterface;
  facebook_title: string;
  facebook_description: string;
  facebook_image: ImageInterface;
}

export const MetaInstance: MetaInterface = {
  meta_description: "",
  meta_image: {
    alt: "",
    url: ""
  },
  meta_keywords: "",
  meta_title: "",
  facebook_image: {
    alt: "",
    url: ""
  },
  facebook_description: "",
  facebook_title: "",
  twitter_description: "",
  twitter_image: {
    alt: "",
    url: ""
  },
  twitter_title: ""
};
