import {reDate, reTime} from './postRegex.js';

export const Created = (props) => {

  const { datetime } = props;
  const date = datetime.match(reDate);
  const time = datetime.match(reTime);

  return (
    <span className="created_time">{date} {time} </span>
  );
}
