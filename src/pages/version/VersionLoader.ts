import getVersion from "../../api/version/getVersion";

export const VersionLoader = async () => {
  const data = await getVersion();

  return data;
};
