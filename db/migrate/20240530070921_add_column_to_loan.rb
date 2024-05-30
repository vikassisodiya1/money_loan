class AddColumnToLoan < ActiveRecord::Migration[7.1]
  def change
    add_column :loans, :interest_rate, :decimal, default: 5
    add_column :loans, :total_loan_amount, :decimal, default: 0
  end
end
