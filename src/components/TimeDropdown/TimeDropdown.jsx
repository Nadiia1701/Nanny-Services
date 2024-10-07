import { useState } from 'react';
import css from './TimeDropdown.module.css';
import { FiClock } from 'react-icons/fi';

const timeOptions = [
  { hour: '09', minute: '00' },
  { hour: '09', minute: '30' },
  { hour: '10', minute: '00' },
  { hour: '10', minute: '30' },
  { hour: '11', minute: '00' },
  { hour: '11', minute: '30' },
  { hour: '12', minute: '00' },
  { hour: '12', minute: '30' },
  { hour: '13', minute: '00' },
  { hour: '13', minute: '30' },
  { hour: '14', minute: '00' },
  { hour: '14', minute: '30' },
  { hour: '15', minute: '00' },
  { hour: '15', minute: '30' },
  { hour: '16', minute: '00' },
  { hour: '16', minute: '30' },
  { hour: '17', minute: '00' },
  { hour: '17', minute: '30' },
  { hour: '18', minute: '00' },
  { hour: '18', minute: '30' },
  { hour: '19', minute: '00' },
  { hour: '19', minute: '30' },
  { hour: '20', minute: '00' },
];

export default function TimeDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTime = (hour, minute) => {
    onChange(`${hour}:${minute}`);
    setIsOpen(false);
  };

  return (
    <div className={css.timeDropdown}>
      <input
        type="text"
        value={value}
        readOnly
        placeholder="00:00"
        className={css.input}
      />
      {isOpen && (
        <div className={css.dropdownMenu}>
          <span className={css.timeTitle}>Meeting time</span>
          {timeOptions.map(({ hour, minute }) => (
            <div
              key={`${hour}:${minute}`}
              className={css.dropdownItem}
              onClick={() => handleSelectTime(hour, minute)}
            >
              <span className={css.hour}>{hour}</span> :{' '}
              <span className={css.minute}>{minute}</span>
            </div>
          ))}
        </div>
      )}
      <FiClock className={css.iconClock} onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
}
