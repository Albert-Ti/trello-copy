export const swaggerUploadOptions = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const limit10mb = { limits: { fileSize: 10 * 1024 * 1024 } };
