# Opvia Take-home Product Challenge

## Completed by: Kenan Garayev

## App & Its Features (User's Perspective)

### Main Features

- A table with scientific data, including datetime and numbers, is rendered on the screen.
- Users can click a "calculation column" button, which shows an additional input box, specific arithmetic operator buttons, and other functional buttons (clear, submit, delete column). This is a restricted input box where only specific input values are allowed.
- The input values can be either the column references (which users select by clicking on any cells within those columns) or by clicking the specific arithmetic operator buttons.
- Once formuls is constructed, a user could click submit.
- Users can construct any sensible, valid arithmetic formula. If a formula is invalid, nothing will happen, and a small error message will appear.
- If a formula is valid a column will be added to the right of the table with the formula's results for each row, except the last. For example, users could create a column to calculate 'Cell Density \* Volume'.
- An unlimited number of results columns can be added, each with different formulas.
- Results columns can also be removed by pressing the remove column button.
- In each column, the last row is reserved. A dropdown menu in each cell of that last row allows users to select a column aggregation function (max, min, median). Once selected, the cell displays the aggregated value.

### Additional/Prospective Features

- Show an error message if column aggregation is not possible due to the specific data type in that column.
- Add a feature to select result column cells to create additional results columns references in a formula to allow additional calculations with values from those rows.
- Introduce a reset functionality for the aggregation row.
- Implement a feature to label result column titles/names, allowing users to visually identify what each added column represents.
- Include a column delete function at the top of each column, symbolised by a small "x" icon in the corner of each column.
- Make formula input less restrictive. Instead of using buttons, allow for keyboard input combined with cell/column selection for an easier user experience.
- Enhance the UI by adding more features to improve user experience. For instance, maximise the use of Blueprint's built-in features and properties, such as adjusting row heights, and make column creation more dynamic and seamless.
- Implement improved visual/design changes.
- Create a more responsive design for different screen sizes and better accessibility with semantic HTML.

## Code and Structure (Software Engineers' Perspective)

### How the code works

- Utilises Blueprint Core and Table components.
- Maintains different state variables to add features (local state).
- When the calculation column button is clicked, a FormulaInput component renders, which includes space for displaying the formula, additional buttons for arithmetic operations, and clear, submit, and remove features.
- The addToFormula() function is invoked when a cell or arithmetic operator is clicked, adding the character to the formula string stored in the state. This function is called directly by the operators or from within the onCellFocus() callback, which adds a column name to the formula by looking up the columns array (an array of objects).
- The clearFormula() function is triggered when the clear button is clicked, resetting the formula state variable.
- When the submit button is clicked, the evalFormula() function is called. This crucial function uses the math.js module to evaluate the formula at each row by substiting the column names with the numerical values for each row. If an error occurs during formula evaluation, an error message is displayed to the user (by setting a state variable, setFormulaError). If everything is correct, a new results column is added by calling the addResultsCol() function.
- The addResultsCol() function adds the result to the allResultsCols state variable (an array of arrays, i.e., a matrix) and updates the header names of these columns by modifying the colHeaders state variable (an array of objects). Conversely, the removeResultsCol() function removes these.
- The getSparseRefFromIndexes() function converts row and column indices (numbers) into a special string representation to look up data from dummyData.
- The cellRenderer() function(is passed as a callback to the Column component with rowIndex and columnIndex parameters) has multiple flows internally depending on certain conditions:
  1. If we are dealing with the last row (a special case), the function returns a Cell component containing a dropdown menu for selecting the aggregation type. If an option is selected, it calls the onAggregateClick function to perform the calculation (this function is stored in the utils.ts file).
  2. When dealing with additional results columns (i.e., the column index is greater than or equal to the length of the original columns array), it returns an Editable Cell component with values from the additional results column.
  3. Otherwise, it returns an Editable Cell component with original values.
- Finally, the components are rendered, including the FormulaInput and the Table2 components, which contain all columns, original and added.

### Opportunities for Improvement of the Code

- The code was written in a rush, and several design flaws are apparent.
- It has become evident that using a state management system like Redux Toolkit, instead of local state, would be more logical due to the numerous state variables and the benefit of breaking the code into many components. Without Redux Toolkit, decoupling individual code/functions into separate modules is time-consuming and challenging. Prop drilling often occurs and callback functions need to be passed around. This increases the number of parameters needed for individual functions and components, affecting simplicity and readability.
- Original column data should be stored in a state in a simpler format and accessed instead of always using accessing and looping over the dummyData. Initially, this was not clear, but it became apparent that repeating this operation multiple times goes against the DRY (don't repeat yourself) principle.
- As briefly mentioned, the code should have been more modular. The OpviaTable component is extensive and contains many functions and state variables. Ideally, each component should perform only one function. Initially, functions were added only to this component due to concerns about speed, debugging, and explanation during the challenge. However, this resulted in reduced readability. An attempt was made to separate these, but the way they were coded (not using state management and not creating pure functions—most functions modify the local state directly and return nothing) made decoupling challenging. This should have been done from the start, creating many different components and utility functions.
- There are minor bugs and undesirable side effects that could be addressed. Not having spent much time reading the Blueprint documentation have limited a deeper understanding of Blueprint components. For example, when selecting an aggregation option, the value does not immediately display. Users must click another cell to see the result.

### Rate of Change Calculations

Before delving into the code, it's important to understand the fundamental concept of rate of change, which is equivalent to velocity (and can be negative or positive). Essentially, it is (Cell Count[1] - Cell Count[0]) / (Time[1] - Time[0]). Steps 1 and 2 below are optional but beneficial for functionality.

1. [Optional] Initially, add functionality to the onCellFocus() and evalFormula() functions to include result column variables in the formula for new column calculations.
2. [Optional] Following this, a Cell Count column can be calculated by multiplying Cell Density by Volume.
3. After steps 1 and 2, or by typing the entire formula into the input box: ((Cell Density x Volume)[1] - (Cell Density x Volume)[0]) / (Time[1] - Time[0]) is the formula we should use.
4. We must improve the evalFormula function to handle datetime data types, not just numbers. For instance, the function could check if the formula contains datetime data and convert this to computable values (e.g., convert to milliseconds).
5. We must handle a special case for the first row. The first row will not have a calculated rate of change value because there is no previous value for comparison. We can treat this as an edge case and return zero for that row.
6. Theoretically and conceptually, everything else should remain the same, with minor changes needed at most.

---

---

---

### Original Readme of the Task

Congratulations on being selected for the next stage of our interview process!

We really appreciate the time you have invested in the process so far and only invited you to this next challenge because we think there's a very good chance you'd be a great fit at Opvia. This is the penultimate step in the interview process! For context at this stage the probability of a candidate receiving an offer is (~25%).

This is our only opportunity to see how you deliver on a product problem, so we it very highly.

## How to complete this stage of the interview process

1. Please clone this repo and use it as your starting point. This is a simple create-react-app featuring the blueprintjs table component https://blueprintjs.com/docs/#table
2. Complete the 'Opvia product problem' below
3. When you are done, create a private repo and push your code to it
4. Invite _hfmw_ & _OliverWales_ to view the repo

## Opvia product problem

Scientists are using Opvia to store all their data in a standardised structure. The example data has come from a scientists who is uploading their bioreactor data into Opvia.

They have said that it would be useful if they could calculate the cell count in Opvia, as well as being able to see its maximum value.

The Opvia platform allows scientists to build what they need. So, instead of building in these specific features, we have identified two higher level features which would enable the customer to achieve what they need, whilst also being useful for other use-cases.

1. `Calculation columns`, where the user can add a column with a formula such as `Cell Density * Volume`
2. `Column aggregations`, where the user can aggregate data from a column e.g. `Max Cell Count`

You have a call scheduled with the scientist. Build a working MVP that you could give the user access to to get their feedback.

In the readme describe what improvements you would make, and how you would make it possible to do `Rate of change calculations` e.g. `Rate of Cell Count Growth`

#### FAQS

- Can I change the structure/content of the raw data? - yes feel free to, but don't feel obligated to (this is a product not an engineering challenge)
- Where is the data coming from? It's from an instrument (a bioreactor).
- Unsure whether to submit? Would you happily get on a call with a scientist and give them access? Would what you've showed them make them more excited about using Opvia?
- Ran out of time? Document any features that you'd like to have built.
- I have a question? Please ask!! Email `oli@opvia.io` and cc `will@opvia.io`
- How should I communicate? Please over communicate. We want to learn what it's like to work with you :)
- Do I need to write tests? - not unless it helps you! We're just looking for "a working MVP that you could give the user access to to get their feedback"
