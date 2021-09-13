# Komputer Store

Assignment 4 for the forntend Accelerated course at Noroff. It uses a provided API

## Assignment4JS

The Komputer Store has 3 requirements:

_The Bank_

- Show bank balance.
- Show your outstanding loan if you have taken a loan.
- Ability to get a loan.
  - Restricted if you have an outstanding loan.
  - Restricted if you have already taken a loan and not bought a laptop.
  - Restricted if you try to loan more than double your balance.

_Work_

- Pay - this is the amount you earn by working (default 100kr).
- A bank button to transfer money you've earned into your bank balance.
  - If you have an outstanding loan, 10% of your salary is deducted and transferred to the
    outstanding loan.
  - The balance after the deducted 10% is transferred to the bank balance.
- A work button to increase the amount earned.
- A repay loan button to use the amount earned to repay an outstanding loan.
  - this button should only appear if a loan has been taken.

_Laptops_

- A laptop selection to choose which laptop to display with its respective information.
- A buy now button which will purchase the selected laptop. The needed amount will be taken from the bank balance.
  - If the bank balance is too low the purchase is cancelled.
