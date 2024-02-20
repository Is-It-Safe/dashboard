/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from 'react';
import { BasicSelect, ErrorMessage, LabelSelect } from './styled';
import { FieldError, set } from 'react-hook-form';
import Select from 'react-select';


export type Option = { label: string; value: string };

type ISelect = {
  label?: ReactNode;
  error?: FieldError | undefined;
  options: Array<Option>;
  previousValue?: Option | null;
  onChange: (value: Option) => void;
  dataTestid?: string;
};

const SelectComponent = ({
  label,
  error,
  options,
  onChange,
  dataTestid,
  previousValue,
}: ISelect) => {
  const hasError = !!error;
  const [selected, setSelected] = useState<Option | null>(null);

  const change = (value: Option | null) => {
    if (value) {
      setSelected(value);
      onChange(value);
    }
  };
  const customStyles = {
    control: (base: any, state: any) => {
      let fontWeight = 400;
      let borderColor = '#9D8DF4';
      let borderWidth = '1px';
      if (state.isFocused && !hasError) {
        borderColor = '#6200EE';
        fontWeight = 600;
        borderWidth = '0.2px';
      }
      if (hasError) {
        borderColor = '#eb3d3d';
      }
      return {
        ...base,
        borderColor,
        fontWeight,
        borderWidth,
        '&:hover': {
          borderColor: '#6200EE',
        },
      };
    },
    option: (base: any) => ({
      ...base,
      backgroundColor: 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#9D8DF4',
        color: 'white',
      },
    }),
  };

  return (
    <BasicSelect data-testid={dataTestid}>
      <LabelSelect hasError={hasError}>{label}</LabelSelect>
      <Select
        options={options}
        value={!selected ? previousValue : selected}
        onChange={(value) => change(value)}
        isMulti={false}
        isSearchable={false}
        styles={{
          ...customStyles,
        }}
      />
      {hasError && (
        <ErrorMessage data-testid="input-error">
          Selecione um valor
        </ErrorMessage>
      )}
    </BasicSelect>
  );
};

export { SelectComponent };
