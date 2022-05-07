export const cnpj = (value: string) => {
  if (!value) return value;

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 2) return onlyNums;

  if (onlyNums.length <= 5)
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2)}`;

  if (onlyNums.length <= 8)
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}`;

  if (onlyNums.length <= 12)
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}/${onlyNums.slice(8, 12)}`;

  return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
    5,
    8
  )}/${onlyNums.slice(8, 12)}-${onlyNums.slice(12, 14)}`;
};

export const cpf = (value: string) => {
  if (!value) return value;

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 3) return onlyNums;

  if (onlyNums.length <= 6)
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3)}`;

  if (onlyNums.length <= 9)
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
      6,
      9
    )}`;

  return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
    6,
    9
  )}-${onlyNums.slice(9, 11)}`;
};

export const cellPhone = (value: string) => {
  if (!value) return value;

  let onlyNums = value.replace(/[^\d]/g, '');

  const isDdiIncluded =
    // @ts-ignore
    onlyNums.slice(0, 2) === 55 && onlyNums[2] && onlyNums[2] !== 9;

  if (isDdiIncluded) onlyNums = onlyNums.substring(2);

  if (onlyNums.length <= 2) {
    return onlyNums;
  }

  if (onlyNums.length <= 7) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}`;
  }

  return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(
    7,
    11
  )}`;
};

export const name = (value: string) => {
  if (!value) return value;

  return value.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

export const zipCode = (value: string) => {
  if (!value) return value;

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 5) return onlyNums;

  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`;
};
