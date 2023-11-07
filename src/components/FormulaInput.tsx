import { useState } from 'react';
import { Button, Icon } from '@blueprintjs/core';
import { Plus, Minus, Slash, Cross } from '@blueprintjs/icons';

interface FormulaInputProps {
  evalFormula: () => void;
  removeResultsCol: () => void;
  addToFormula: (symbol: string) => void;
  clearFormula: () => void;
  formula: string;
  setFormula: (text: string) => void;
  formulaError: string;
  showFormula: boolean;
  setShowFormula: (text: boolean) => void;
}

const FormulaInput: React.FC<FormulaInputProps> = ({
  evalFormula,
  removeResultsCol,
  addToFormula,
  clearFormula,
  formula,
  setFormula,
  formulaError,
  showFormula,
  setShowFormula,
}) => {
  return (
    <>
      <Button
        icon={<Icon icon="function" />}
        text="Calculation column"
        onClick={() => setShowFormula(!showFormula)}
      />
      {showFormula && (
        <div>
          <div
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              margin: '10px 0',
            }}
          >
            {formula}
          </div>
          <Button icon={<Plus />} onClick={() => addToFormula(' + ')} />
          <Button icon={<Minus />} onClick={() => addToFormula(' - ')} />
          <Button icon={<Slash />} onClick={() => addToFormula(' / ')} />
          <Button icon={<Cross />} onClick={() => addToFormula(' * ')} />
          <Button text="(" onClick={() => addToFormula(' ( ')} />
          <Button text=")" onClick={() => addToFormula(' ) ')} />
          <Button text="Clear" onClick={clearFormula} />
          <Button
            text="Submit"
            onClick={() => {
              evalFormula();
              setFormula(``);
            }}
          />
          <Button
            icon={<Icon icon="cross-circle" />}
            text="Remove Last Results"
            onClick={removeResultsCol}
          />
        </div>
      )}
      {formulaError && <p style={{ color: 'red' }}>{formulaError}</p>}
    </>
  );
};

export default FormulaInput;
