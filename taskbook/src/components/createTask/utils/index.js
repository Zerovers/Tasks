export const createConfig = ({ payload }) => {
  const { name, email, text } = payload;
  const form = new FormData();
  form.append('username', `${name}`);
  form.append('email', `${email}`);
  form.append('text', `${text}`);
  return {
    crossDomain: true,
    method: 'POST',
    mimeType: 'multipart/form-data',
    contentType: false,
    processData: false,
    body: form,
    dataType: 'json'
  };
};
