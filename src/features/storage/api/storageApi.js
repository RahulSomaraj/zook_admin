import { api } from "../../../lib/axios";

// Get signed upload URL
export const getSignedUploadUrl = async (payload) => {
  const { data } = await api.post("/storage/uploads/sign", payload);
  return data;
};

// Get signed download URL
export const getSignedDownloadUrl = async (payload) => {
  const { data } = await api.post("/storage/downloads/sign", payload);
  return data;
};

// Upload file to Storage
export const uploadFile = async (signedUrl, file) => {
  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return response;
};