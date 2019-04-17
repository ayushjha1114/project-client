import { getDateFormatted } from '../lib/utils';


const PUBLIC_IMAGE_FOLDER = 'images/';
export const DEFAULT_BANNER_IMAGE = 'images/trash-pickup.jpg';

export default PUBLIC_IMAGE_FOLDER;

export const userPath = '/user';
export const adminPath = '/admin';

export const columnArr = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'email',
    label: 'Email Address',
    format: value => value && value.toUpperCase(),
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: getDateFormatted,
  },
];

export const complaintArr = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'email',
    label: 'Email Address',
    format: value => value && value.toUpperCase(),
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: getDateFormatted,
  },
  {
    field: 'complaint',
    label: 'Complaint',
  },
];
