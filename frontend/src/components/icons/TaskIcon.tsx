import { SVGProps } from 'react';

const TaskIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props}>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M9 3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1h-2V3a1 1 0 1 0-2 0v1H9V3zm2 1v3a1 1 0 1 0 2 0V4h-2zm4 0h2v3a1 1 0 1 1-2 0V4zM9 4v3a1 1 0 0 1-2 0V4h2zm-1 6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default TaskIcon;
