import React from 'react';
import { View, StyleSheet, SectionList } from 'react-native';

import { IExpense } from '../../typings';
import { toddMMMForHumans, getRefreshDate } from '../../util';
import SectionHeader from './Components/SectionHeader';
import ExpenseRow from './Components/ExpenseRow';

export interface IListProps {
  expenses: IExpense[];
  getExpenses: (from: Date) => any;
  openDeleteModal: (expense: IExpense) => any;
}

export default class List extends React.Component<IListProps, {}> {
  public render() {
    return (
      <View style={styles.rootView}>
        {this.renderList()}
      </View>
    );
  }

  private renderList = () => {
    const sections = this.getExpenseSections();

    return <SectionList
      sections={sections}
      renderSectionHeader={this.renderHeader}
      renderItem={this.renderExpense}
      keyExtractor={(item, index) => item + index}
    />;
  }

  private getExpenseSections = () => {
    const { expenses } = this.props;
    const results: { [key: string]: IExpense[] } = {};

    expenses.forEach((e: IExpense) => {
      const formattedDate = toddMMMForHumans(e.createdAt);
      results[formattedDate] = [...results[formattedDate] || [], e];
    });

    return Object.keys(results).map((title: string) => ({
      title,
      data: results[title]
    }));
  }

  private renderHeader = (props: any) => <SectionHeader {...props} />;

  private renderExpense = (props: { item: IExpense }) => <ExpenseRow {...{
    ...props,
    openDeleteModal: this.props.openDeleteModal
  }} />

  onRefresh = () => {
    this.props.getExpenses(getRefreshDate());
  }
}

const styles = StyleSheet.create({
  rootView: {
    paddingTop: 20
  },
  refreshButton: {
    backgroundColor: '#003249'
  }
});
