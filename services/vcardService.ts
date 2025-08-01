import type { Employee } from '../types';

export const generateVCard = (employee: Employee): string => {
  const { name, designation, email, phone, department, photoUrl, linkedIn, website } = employee;

  // VCard Standard requires specific formatting
  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${name.split(' ').slice(1).join(' ')};${name.split(' ')[0]};;;`,
    `FN:${name}`,
    `TITLE:${designation}`,
    `ORG:SELCO India;${department}`, // Set company name
    `TEL;TYPE=WORK,VOICE:${phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${email}`,
  ];

  if (photoUrl) {
    // Note: Linking to external photos in vCards has spotty support.
    // For best results, photo should be base64 encoded, but that's complex without backend/file access.
    // This provides a link, which some clients might use.
    vCard.push(`PHOTO;VALUE=URL:${photoUrl}`);
  }

  if (website) {
    vCard.push(`URL;TYPE=WORK:${website}`);
  }
  
  if (linkedIn) {
      vCard.push(`URL;TYPE=LINKEDIN:${linkedIn}`);
  }

  vCard.push(`REV:${new Date().toISOString()}`);
  vCard.push('END:VCARD');

  return vCard.join('\n');
};