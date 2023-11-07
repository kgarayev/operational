// all import statements
import { useState } from 'react';
import * as math from 'mathjs';
import { aggregate, onAggregateClick } from '../utils/utils';
import FormulaInput from './FormulaInput';
import { columns } from '../data/constants';
import { dummyTableData } from '../data/dummyData';
import { Button, Icon } from '@blueprintjs/core';
import {
  Column,
  EditableCell2,
  Table2,
  FocusedCellCoordinates,
  Cell,
} from '@blueprintjs/table';

interface ColAggregates {
  max: number;
  min: number;
  median: number;
}

// key component
const OpviaTable: React.FC = () => {
  // local state
  const [formula, setFormula] = useState('');
  const [showFormula, setShowFormula] = useState(false);
  const [rows, setRows] = useState(8);
  const [allResultsCols, setAllResultsCols] = useState<number[][]>([]);
  const [colHeaders, setColHeaders] = useState(columns);
  const [formulaError, setFormulaError] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(3);
  const [aggregatedValues, setAggregatedValues] = useState<{
    [key: number]: number;
  }>({});

  // a function that adds a piece of a string/character to the formula string
  const addToFormula = (symbol: string) => {
    const newState = formula + ' ' + symbol;
    setFormula(newState);
    // setFormula((prevFormula) => `${prevFormula} ${symbol}`);
  };

  // a function that clears formula state
  const clearFormula = () => {
    setFormula(``);
    setFormulaError(``);
  };

  // a function that adds the cell reference to the formula string
  // utlilising a Table property - see below
  const onCellFocus = (focusedCell: FocusedCellCoordinates) => {
    if (focusedCell === null) return;
    if (!showFormula) return;

    const { col } = focusedCell;

    try {
      const cellReference = `${columns[col].columnName}`;
      addToFormula(cellReference);
    } catch {
      return;
    }
  };

  // a function to remove last results column from the list of results
  const removeResultsCol = () => {
    // removing the last element from the allResultsCols array
    const newAllResultsCols = allResultsCols.slice(0, -1);
    setAllResultsCols(newAllResultsCols);

    // update the column headers (i.e. remove the last header)
    const newColHeaders = colHeaders.slice(
      0,
      columns.length + newAllResultsCols.length,
    );

    setColHeaders(newColHeaders);
  };

  // a function to add results column
  const addResultsCol = (newResults: number[]) => {
    // prepare a new object for the column headers array
    const newColHeader = {
      columnName: `Result ${allResultsCols.length + 1}`,
      columnType: 'data',
      columnId: `var_col_${colHeaders.length}`,
    };

    // update the state with the new results column
    const newResultsState = [...allResultsCols, newResults];
    const newColHeadsState = [...colHeaders, newColHeader];

    setAllResultsCols(newResultsState);
    setColHeaders(newColHeadsState);
  };

  // a function to evaluate the formula from the state
  const evalFormula = () => {
    const newResults: number[] = [];

    let hasError = false;

    // loop through each row and do the calculation
    for (let row = 0; row < rows; row++) {
      let evaluatedFormula = formula;

      // loop through columns array to get individual cell values
      columns.forEach((column, index) => {
        // obtain the cell value by using the key
        const cellValue = dummyTableData[`${index}-${row}`];

        // replacing column names with actual values in the corresponding row
        const stringValue = cellValue.toString();
        const modifiedFormula = evaluatedFormula.split(column.columnName);
        evaluatedFormula = modifiedFormula.join(stringValue);
      });

      try {
        // use math.js module to evaluate the numerical (arithmetical) formula
        const result = math.evaluate(evaluatedFormula);

        // if the result is not a number, then break out of the loop and show an error
        if (isNaN(result)) {
          hasError = true;
          setFormulaError('The formula is invalid.');
          break;
        } else {
          // if all OK, then show numbers with up to 3 decimal places
          newResults.push(Number(result.toFixed(decimalPlaces)));
        }
      } catch (error) {
        // if there is an error during the evaluation
        hasError = true;
        console.log(formulaError);

        setFormulaError('The formula is invalid.');
        // console.log(error);
        break;
      }
    }

    // final error check
    if (hasError) {
      setFormulaError('The formula is invalid.');
    } else {
      setFormulaError('');

      // adding the results
      addResultsCol(newResults);
    }
  };

  // an original function from the task
  const getSparseRefFromIndexes = (
    rowIndex: number,
    columnIndex: number,
  ): string => `${columnIndex}-${rowIndex}`;

  // a original function, from the task slightly modified
  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    if (rowIndex === rows) {
      // Return a cell with a button for each column in the last row
      return (
        <Cell>
          <select
            defaultValue=""
            onChange={(event) => {
              if (event.target.value !== '') {
                onAggregateClick({
                  columnIndex: columnIndex,
                  keyword: event.target.value as 'max' | 'min' | 'median',
                  rows: rows,
                  allResultsCols: allResultsCols,
                  aggregatedValues: aggregatedValues,
                  setAggregatedValues: setAggregatedValues,
                });
              }
            }}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="max">Max</option>
            <option value="min">Min</option>
            <option value="median">Median</option>
          </select>
          {aggregatedValues[columnIndex]}
        </Cell>
      );
    }

    // logic to check if the additional columns need to be rendered
    if (columnIndex >= columns.length) {
      // normalise the index
      const resultsColumnIndex = columnIndex - columns.length;
      // save the results and render
      const results = allResultsCols[resultsColumnIndex];
      return <EditableCell2 value={String(results[rowIndex] || '')} />;
    }

    // original logic
    const sparsePosition = getSparseRefFromIndexes(rowIndex, columnIndex);
    const value = dummyTableData[sparsePosition];
    return <EditableCell2 value={String(value)} />;
  };

  // an original array mapping from the task
  const cols = colHeaders.map((column, index) => (
    <Column
      key={column.columnId}
      cellRenderer={(rowIndex) => cellRenderer(rowIndex, index)}
      name={column.columnName}
    />
  ));

  return (
    <>
      <FormulaInput
        evalFormula={evalFormula}
        removeResultsCol={removeResultsCol}
        addToFormula={addToFormula}
        clearFormula={clearFormula}
        formula={formula}
        setFormula={setFormula}
        formulaError={formulaError}
        showFormula={showFormula}
        setShowFormula={setShowFormula}
      />

      <Table2
        defaultRowHeight={30}
        numRows={rows + 1}
        enableFocusedCell={true}
        onFocusedCell={onCellFocus}
        enableColumnResizing={true}
      >
        {cols}
      </Table2>
    </>
  );
};

export default OpviaTable;
