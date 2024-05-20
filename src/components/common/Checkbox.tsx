import { css } from '@emotion/react';
import { InputHTMLAttributes } from 'react';

import { CHECKED, UNCHECKED } from '@assets/images';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  labelHidden: boolean;
  description: string;
}

export default function Checkbox({
  id,
  checked,
  labelHidden,
  description,
  onChange,
}: CheckboxProps) {
  return (
    <>
      <input id={id} type="checkbox" checked={checked} css={screenReaderOnly} onChange={onChange} />
      <label css={label} htmlFor={id}>
        <img
          src={checked ? CHECKED : UNCHECKED}
          width={24}
          height={24}
          css={checkIcon}
          alt="check icon"
        />
        <span css={[labelText, labelHidden && screenReaderOnly]}>{description}</span>
      </label>
    </>
  );
}

const screenReaderOnly = css`
  position: absolute;
  overflow: hidden;

  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;

  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;

const label = css`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 24px;
`;

const checkIcon = css`
  cursor: pointer;
`;

const labelText = css`
  font-size: 12px;
  font-weight: 400;
`;
