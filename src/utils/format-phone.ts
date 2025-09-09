export const formatPhone = (phone: string) => {
  const clean = phone.replace("@s.whatsapp.net", "");


  const country = clean.slice(0, 2);
  const ddd = clean.slice(2, 4);
  const number = clean.slice(4);


  const formatted =
    number.length === 9
      ? `${number.slice(0, 5)}-${number.slice(5)}`
      : `${number.slice(0, 4)}-${number.slice(4)}`;

  return `+${country} (${ddd}) ${formatted}`;
};
