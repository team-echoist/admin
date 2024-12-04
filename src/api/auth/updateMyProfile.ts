import { ResponseType } from "..";
import fetchData from "../fetchData";

export default async function updateMyProfile(image: File) {
  const url = `/admin-info/images`;

  const formData = new FormData();
  formData.append("image", image);

  return fetchData<ResponseType<unknown>, FormData>({
    url,
    method: "POST",
    body: formData,
  });
}
