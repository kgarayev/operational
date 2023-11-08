import * as math from 'mathjs';
import { columns } from '../data/constants';
import { dummyTableData } from '../data/dummyData';

interface AggregateProps {
  columnIndex: number;
  keyword: 'max' | 'min' | 'median';
  rows: number;
  allResultsCols: number[][];
  aggregatedValues: { [key: number]: number };
  setAggregatedValues: (values: { [key: number]: number }) => void;
}

// a function to calculate an aggregate given a string of numbers
// uses math.js module
export const aggregate = (
  keyword: string,
  data: number[],
): number | undefined => {
  switch (keyword) {
    case 'max':
      return math.max(data);
    case 'min':
      return math.min(data);
    case 'median':
      return math.median(data);
    default:
      console.log(`${keyword} aggregation is invalid.`);
      return undefined;
  }
};

export const onAggregateClick = ({
  columnIndex,
  keyword,
  rows,
  allResultsCols,
  aggregatedValues,
  setAggregatedValues,
}: AggregateProps) => {
  let columnValues: number[] = [];

  // check to see if the column index is for the original set of columns or the new ones
  if (columnIndex < columns.length) {
    // if original then dummyTableData
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const value = dummyTableData[`${columnIndex}-${rowIndex}`];
      if (typeof value === 'number') {
        columnValues.push(value);
      } else {
        return;
      }
    }
  } else {
    // otherwise allResultsCols
    const resultsColumnIndex = columnIndex - columns.length;
    columnValues = allResultsCols[resultsColumnIndex] || [];
  }

  // call the aggregate function
  const result = aggregate(keyword, columnValues);

  // store in the new state
  const newState = { ...aggregatedValues, [columnIndex]: result ?? NaN };
  setAggregatedValues(newState);
};
