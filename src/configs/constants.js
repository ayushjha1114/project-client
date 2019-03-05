import { getDateFormatted } from '../lib/utils';


const PUBLIC_IMAGE_FOLDER = 'images/';
export const DEFAULT_BANNER_IMAGE = 'images/default.png';

export default PUBLIC_IMAGE_FOLDER;

export const options = [
  {
    label: 'Cricket',
    value: 1,
  },
  {
    label: 'Football',
    value: 2,
  },
];

export const cricket = [
  {
    label: 'Fielder',
    value: 1,
  },
  {
    label: 'Batsman',

    value: 2,
  },
  {
    label: 'Bowler',
    value: 3,
  },
  {
    label: 'AllRounder',
    value: 4,
  },
];

export const football = [
  {
    label: 'Defender',
    value: 1,
  },
  {
    label: 'Striker',
    value: 2,
  },
];
export const traineePath = '/trainee';
export const dropdown1 = 'Cricket';
export const dropdown2 = 'Football';

export const column = [
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

/* export const actions = [
  {
    icon: <EditIcon />,
    handler: TraineeList.handlerEditDialogOpen,
  },
  {
    icon: <DeleteIcon />,
    handler: TraineeList.handlerRemoveDialogOpen,
  },
]; */
