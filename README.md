# Opvia Take-home Product Challenge
## Completed by: Kenan Garayev

### Main Features
- Dynamic Formula Input: There's a formula input component that lets users create and apply formulas to the data dynamically.
- Calculation Columns: Users can add a new column to the table after they input the formula and if the formula is valid. For example, they could create a column to calculate 'Cell Density * Volume'.
- Data Aggregation Controls: At the end of the table, users can select an aggregation function (Max, Min, Median) to apply to each column. They could do this by selecting an item in a drop-down menu on the last row of the table.

### Additional/Prospective Features

- Enhanced UI: Improve the user interface by adding buttons within table cells or providing more intuitive controls for formula input.
- Formula Input Enhancements: Address minor UI issues, such as ensuring the formula input is not empty unless the formula column button is clicked.
- Results Column Title: Add a title for additional results columns to provide clarity and context to users.


### Opportunities for Improvement

- Storing Original Column Data: To enhance performance and flexibility, consider storing the original column data in the component's state or abstracting away the data extraction process.
- State Management: Implement a state management solution like Redux Toolkit to manage the component's state more efficiently, especially when dealing with complex data manipulation.
- Modular Code: Consider abstracting the functions into separate modules and importing them to improve code organization and maintainability.

### Rate of Change Calculations
To enable rate of change calculations (i.e., Rate of Cell Count Growth):

1. Process time-based data format (like the one in the column 0) by the evalFormula function in addition to numbers. For example, users could input expressions like (Cell Count[0] - Cell Count[1]) / (Time[0] - Time[1]) to calculate the rate of cell count growth.
2. Modify the formula evaluation process to handle time-based calculations by incorporating timestamps or time-related data from the original data source.
3. If the time-based calculation is applied, it needs to be obvious that the first row will have a value of 0 (since there is no previous value to calculate the rate of growth from - i.e. relative value). 

By implementing these enhancements, users will have the capability to calculate and visualize rate of change metrics in the table component.

-----------

### Original Readme

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

