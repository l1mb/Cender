import React from "react";
import defaultPic from "@/assets/images/profile/default-profile.jpg";
import styles from "./profileImage.module.scss";

interface ImageProps {
  extraClass: string;
  link: string;
}

const ProfileImage: React.FC<ImageProps> = () => <img className={styles.img} src={defaultPic} alt="text" />;

export default ProfileImage;
