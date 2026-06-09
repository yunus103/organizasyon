export function turkishSlugify(input: string): string {
  if (!input) return "";

  const turkishMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u'
  };

  let str = input.toString();

  // Replace Turkish characters
  Object.keys(turkishMap).forEach(key => {
    str = str.replace(new RegExp(key, 'g'), turkishMap[key]);
  });

  // Normalize other accents and diacritics
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-alphanumeric except spaces and hyphens
    .replace(/[\s_-]+/g, '-')  // replace spaces/underscores/hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');  // trim hyphens from ends
}
