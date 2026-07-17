export const UploadEndpoints = {
  upload:       () => '/upload',
  uploadPublic: () => '/upload/public',
  delete:       (key) => `/upload/${key}`,
};
