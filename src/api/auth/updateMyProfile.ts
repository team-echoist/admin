import AxiosInstance from "../AxiosInstance";

export default async function updateMyProfile(image: File) {
  const url = `/admin-info/images`;

  const formData = new FormData();
  formData.append("image", image);

  return AxiosInstance.post(url, formData);
}
