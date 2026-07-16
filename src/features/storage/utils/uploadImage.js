import {
  getSignedUploadUrl,
  getSignedDownloadUrl,
  uploadFile,
} from "../api/storageApi";

export const uploadNewImage = async (
  file,
  folder = "catalog_products"
) => {
  if (!file) return "";

  const signResponse = await getSignedUploadUrl({
    bucket: "zook_data",
    filename: file.name,
    folder,
    upsert: false,
  });

  await uploadFile(signResponse.data.signedUrl, file);

  const downloadResponse = await getSignedDownloadUrl({
    bucket: signResponse.data.bucket,
    key: signResponse.data.key,
    expiresIn: 86400,
  });

  return downloadResponse.data.signedUrl;
};