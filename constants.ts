import type { Employee } from './types';
import { v4 as uuidv4 } from 'uuid';

export const DUMMY_EMPLOYEES: Employee[] = [
  {
    id: uuidv4(),
    name: 'Alice Johnson',
    designation: 'Senior Software Engineer',
    email: 'alice.j@selcoindia.com',
    phone: '+1-202-555-0191',
    department: 'Technology',
    photoUrl: 'https://picsum.photos/seed/alice/400/400',
    linkedIn: 'https://linkedin.com/in/alicejohnson',
    website: 'https://alicej.dev'
  },
  {
    id: uuidv4(),
    name: 'Bob Williams',
    designation: 'Product Manager',
    email: 'bob.w@selcoindia.com',
    phone: '+1-202-555-0164',
    department: 'Product',
    photoUrl: 'https://picsum.photos/seed/bob/400/400',
    linkedIn: 'https://linkedin.com/in/bobwilliams',
  },
   {
    id: uuidv4(),
    name: 'Charlie Brown',
    designation: 'UX/UI Designer',
    email: 'charlie.b@selcoindia.com',
    phone: '+1-202-555-0138',
    department: 'Design',
    photoUrl: 'https://picsum.photos/seed/charlie/400/400',
    website: 'https://charlieb.design'
  },
];