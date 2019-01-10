import { connect } from 'react-redux';

import List from './List';
import { getExpenseList, openDeleteModal } from '../../actions';
import { IMainState, IExpense } from '../../typings';

interface IStateProps {
  expenses: IExpense[];
}

interface IDispatchProps {
  getExpenses: (payload?: any) => void;
  openDeleteModal: (expense: IExpense) => void;
}

const mapStateToProps = (state: IMainState): IStateProps => {
  return {
    expenses: state.expenses
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  getExpenses: (payload?: any) => dispatch(getExpenseList(payload)),
  openDeleteModal: (expense: IExpense) => dispatch(openDeleteModal(expense))
});

export default connect<IStateProps, IDispatchProps, {}, IMainState>(mapStateToProps, mapDispatchToProps)(List);
